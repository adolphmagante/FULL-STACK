document.addEventListener('DOMContentLoaded', () => {
    const taskForm = document.getElementById('task-form');
    const taskList = document.getElementById('task-list');
    const searchInput = document.getElementById('search');
    const taskFilter = document.getElementById('task-filter');
    const tableHeaders = document.querySelectorAll('#task-table th[data-sort]');
    const dueDateInput = document.getElementById('task-due-date');
    const submitButton = taskForm.querySelector('button[type="submit"]');

    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    let sortOrder = 'asc';
    let sortColumn = 'title';

    // Set the minimum date for the due date input to today
    const today = new Date().toISOString().split('T')[0];
    dueDateInput.setAttribute('min', today);

    taskForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const id = document.getElementById('task-id').value;
        if (id) {
            editTask(e);
        } else {
            addTask(e);
        }
    });
    taskList.addEventListener('click', handleTaskClick);
    searchInput.addEventListener('input', filterTasks);
    taskFilter.addEventListener('change', () => filterTasksByStatus(taskFilter.value));
    tableHeaders.forEach(header => header.addEventListener('click', () => sortTasksBy(header.dataset.sort)));

    function addTask(e) {
        const title = document.getElementById('task-title').value.trim();
        const desc = document.getElementById('task-desc').value.trim();
        const dueDate = document.getElementById('task-due-date').value;

        if (!title || !desc || !dueDate) {
            alert('Please fill in all fields.');
            return;
        }

        if (new Date(dueDate) < new Date(today)) {
            alert('Due date cannot be in the past.');
            return;
        }

        const task = {
            id: Date.now(),
            title,
            desc,
            dueDate,
            completed: false
        };

        tasks.push(task);
        localStorage.setItem('tasks', JSON.stringify(tasks));
        renderTasks(tasks);
        taskForm.reset();
        document.getElementById('task-id').value = ''; // Clear the hidden input field
        submitButton.textContent = 'Add Task'; // Reset button text
    }

    function handleTaskClick(e) {
        const button = e.target.closest('button');
        if (!button) return;

        if (button.classList.contains('delete')) {
            const taskId = button.parentElement.parentElement.dataset.id;
            deleteTask(taskId);
        } else if (button.classList.contains('edit')) {
            const taskId = button.parentElement.parentElement.dataset.id;
            populateEditForm(taskId);
        } else if (button.classList.contains('complete')) {
            const taskId = button.parentElement.parentElement.dataset.id;
            toggleTaskCompletion(taskId);
        } else if (button.classList.contains('undo')) {
            const taskId = button.parentElement.parentElement.dataset.id;
            toggleTaskCompletion(taskId);
        }
    }

    function deleteTask(id) {
        if (confirm('Are you sure you want to delete this task?')) {
            tasks = tasks.filter(task => task.id != id);
            localStorage.setItem('tasks', JSON.stringify(tasks));
            renderTasks(tasks);
        }
    }

    function populateEditForm(id) {
        const task = tasks.find(task => task.id == id);
        document.getElementById('task-title').value = task.title;
        document.getElementById('task-desc').value = task.desc;
        document.getElementById('task-due-date').value = task.dueDate;
        document.getElementById('task-id').value = task.id;
        submitButton.textContent = 'Edit Task'; // Change button text to "Edit Task"
    }

    function editTask(e) {
        const id = document.getElementById('task-id').value;
        const title = document.getElementById('task-title').value.trim();
        const desc = document.getElementById('task-desc').value.trim();
        const dueDate = document.getElementById('task-due-date').value;

        if (!title || !desc || !dueDate) {
            alert('Please fill in all fields.');
            return;
        }

        if (new Date(dueDate) < new Date(today)) {
            alert('Due date cannot be in the past.');
            return;
        }

        const taskIndex = tasks.findIndex(task => task.id == id);
        tasks[taskIndex] = {
            ...tasks[taskIndex],
            title,
            desc,
            dueDate
        };

        localStorage.setItem('tasks', JSON.stringify(tasks));
        renderTasks(tasks);
        taskForm.reset();
        document.getElementById('task-id').value = ''; // Clear the hidden input field
        submitButton.textContent = 'Add Task'; // Reset button text
    }

    function toggleTaskCompletion(id) {
        const task = tasks.find(task => task.id == id);
        task.completed = !task.completed;
        localStorage.setItem('tasks', JSON.stringify(tasks));
        filterTasksByStatus(taskFilter.value);
    }

    function filterTasks() {
        const searchTerm = searchInput.value.toLowerCase();
        const filteredTasks = tasks.filter(task => 
            task.title.toLowerCase().includes(searchTerm) || 
            task.desc.toLowerCase().includes(searchTerm)
        );
        renderTasks(filteredTasks);
    }

    function filterTasksByStatus(status) {
        let filteredTasks;
        if (status === 'completed') {
            filteredTasks = tasks.filter(task => task.completed);
        } else if (status === 'incomplete') {
            filteredTasks = tasks.filter(task => !task.completed);
        } else {
            filteredTasks = tasks;
        }
        renderTasks(filteredTasks);
    }

    function sortTasksBy(column) {
        sortColumn = column;
        sortOrder = sortOrder === 'asc' ? 'desc' : 'asc';
        renderTasks(tasks);
    }

    function renderTasks(tasks) {
        let filteredTasks = tasks;

        // Apply current filter
        const status = taskFilter.value;
        if (status === 'completed') {
            filteredTasks = tasks.filter(task => task.completed);
        } else if (status === 'incomplete') {
            filteredTasks = tasks.filter(task => !task.completed);
        }

        // Apply sorting
        filteredTasks.sort((a, b) => {
            if (a[sortColumn] < b[sortColumn]) return sortOrder === 'asc' ? -1 : 1;
            if (a[sortColumn] > b[sortColumn]) return sortOrder === 'asc' ? 1 : -1;
            return 0;
        });

        taskList.innerHTML = '';
        filteredTasks.forEach(task => {
            const tr = document.createElement('tr');
            tr.dataset.id = task.id;
            tr.className = task.completed ? 'completed' : 'incomplete';
            const isPastDue = new Date(task.dueDate) < new Date();
            tr.innerHTML = `
                <td>${task.title}</td>
                <td>${task.desc}</td>
                <td>${task.completed ? 'Completed' : 'Incomplete'}</td>
                <td>${task.dueDate}</td>
                <td class="actions">
                    <button class="${task.completed ? 'undo' : 'complete'}" ${task.completed && isPastDue ? 'style="display:none;"' : ''}>
                        <i class="fas ${task.completed ? 'fa-undo' : 'fa-check'}"></i>
                        <span class="button-text">${task.completed ? 'Undo' : 'Complete'}</span>
                    </button>
                    ${!task.completed ? '<button class="edit"><i class="fas fa-edit"></i><span class="button-text">Edit</span></button>' : ''}
                    <button class="delete"><i class="fas fa-trash"></i><span class="button-text">Delete</span></button>
                </td>
            `;
            taskList.appendChild(tr);
        });
    }

    renderTasks(tasks);
});
