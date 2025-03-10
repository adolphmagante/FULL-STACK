import { createSlice } from '@reduxjs/toolkit';
import { fetchCharacters } from './actions';
import { initialState } from './types';



const characterSlice = createSlice({
  name: 'characters',
  initialState,
  reducers: {
    setError(state, action) {
      state.error = action.payload;
    },
    setLoading(state, action) {
      state.loading = action.payload;
    },
    setCharacters(state, action) {
      state.characters = action.payload;
    },
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
    setSortOrder(state, action) {
      state.sortOrder = action.payload;
    },
    setFilters(state, action) {
      const { name, value, checked } = action.payload;
      if (!state.filters[name]) {
      state.filters[name] = [];
      }
      if (checked) {
      state.filters[name].push(value);
      } else {
      state.filters[name] = state.filters[name].filter(item => item !== value);
      if (state.filters[name].length === 0) {
        delete state.filters[name];
      }
      }
    },
    removeFilter(state, action) {
      const { name, value } = action.payload;
      if (state.filters[name]) {
        state.filters[name] = state.filters[name].filter(item => item !== value);
        if (state.filters[name].length === 0) {
          delete state.filters[name];
        }
      }
    },
    removeAllFilters(state) {
      state.filters = {};
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCharacters.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCharacters.fulfilled, (state, action) => {
        state.loading = false;
        state.characters = action.payload.results;
      })
      .addCase(fetchCharacters.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const {
  setCharacters,
  setLoading,
  setError,
  setFilters,
  removeFilter,
  removeAllFilters,
  setSearchQuery,
  setSortOrder,
  setCurrentPage
} = characterSlice.actions;

export default characterSlice.reducer;
