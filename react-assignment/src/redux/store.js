import { configureStore } from '@reduxjs/toolkit';
import characterReducer from './character/slice';


export const store = configureStore({
  reducer: {
    characters: characterReducer,
  },
});

export default store;
