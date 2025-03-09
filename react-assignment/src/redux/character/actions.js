import { createAsyncThunk } from "@reduxjs/toolkit";

// Fetch API character data
export const fetchCharacters = createAsyncThunk("characters/fetchCharacters", async () => {
  const response = await fetch("https://rickandmortyapi.com/api/character/");
  return await response.json();
});