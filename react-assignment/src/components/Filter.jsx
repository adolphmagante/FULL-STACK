import React, { useEffect, useState } from 'react';
import { getFilterOptions } from '../redux/character/selector';
import { useSelector, useDispatch } from 'react-redux';
import { FormControlLabel, FormGroup, Checkbox, FormLabel, Box, Paper, Collapse, IconButton, Typography } from '@mui/material';
import { setFilters } from '../redux/character/slice';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';

const Filter = () => {
    const filterOptions = useSelector(getFilterOptions);
    const dispatch = useDispatch();
    const [selectedOptions, setSelectedOptions] = useState([]);
    const [openCategories, setOpenCategories] = useState([]);
    const filterItems = useSelector((state) => state.characters.filters);

    useEffect(() => {
        if (filterItems && typeof filterItems === 'object') {
            const selected = [];
            for (const key in filterItems) {
                if (Array.isArray(filterItems[key])) {
                    selected.push(...filterItems[key].map(item => `${key}-${item.replace(/\s+/g, '')}`));
                }
            }
            setSelectedOptions(selected);
        }
    }, [filterItems]);

    const handleCheckboxChange = (option) => {
        const isChecked = selectedOptions.includes(option.id);
        dispatch(setFilters({ name: option.name, value: option.value, checked: !isChecked }));
    };

    const handleCategoryToggle = (category) => {
        setOpenCategories(prev => {
            const isOpen = prev.includes(category);
            if (isOpen) {
                return prev.filter(item => item !== category);
            } else {
                return [...prev, category];
            }
        });
    };

    return (
        <Box sx={{ p: 2, boxShadow: 3 }}> 
            <Typography variant="h6" sx={{ mb: 1, fontWeight: 'bold', alignItems: 'left', display: 'flex' }}>
                FILTERS
            </Typography>
            {filterOptions.map(category => (
                <Paper key={category.category} sx={{ p: 2, mb: 2, boxShadow: 1 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <FormLabel
                            component="legend"
                            sx={{ textAlign: 'left', fontWeight: 'bold', color: 'black', cursor: 'pointer' }}
                            onClick={() => handleCategoryToggle(category.category)}
                        >
                            {category.category.toLocaleUpperCase()}
                        </FormLabel>
                        <IconButton onClick={() => handleCategoryToggle(category.category)}>
                            {openCategories.includes(category.category) ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                        </IconButton>
                    </Box>
                    <Collapse in={openCategories.includes(category.category)}>
                        <FormGroup>
                            {category.options.map(option => (
                                <FormControlLabel
                                    key={option.id}
                                    control={
                                        <Checkbox
                                            checked={selectedOptions.includes(option.id)}
                                            onChange={() => handleCheckboxChange(option)}
                                            name={option.name}
                                        />
                                    }
                                    label={option.value}
                                    sx={{ textAlign: 'left' }}
                                />
                            ))}
                        </FormGroup>
                    </Collapse>
                </Paper>
            ))}
        </Box>
    );
};

export default Filter;