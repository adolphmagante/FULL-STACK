import { createSelector } from "@reduxjs/toolkit";

const selectCharacter = (state) => state.characters;

export const getFilteredCharacters = createSelector(
  [selectCharacter],
  ({ characters, filters, searchQuery, sortOrder }) => {
    let filteredCharacters = [...characters];

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filteredCharacters = filteredCharacters.filter(({ name }) =>
        name.toLowerCase().includes(query)
      );
    }

    if (sortOrder) {
      filteredCharacters = filteredCharacters.sort((a, b) =>
        sortOrder === 'asc' ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name)
      );
    }

    if (filters) {
      filteredCharacters = filteredCharacters.filter((character) =>
        Object.entries(filters).every(([key, value]) =>
          Array.isArray(value)
            ? value.some((filterValue) => character[key] === filterValue || (key === 'origin' && character.origin.name === filterValue))
            : character[key] === value || (key === 'origin' && character.origin.name === value)
        )
      );
    }

    

    return filteredCharacters;
  }
);

export const getFilterOptions = createSelector(
  [selectCharacter],
  (charactersState) => {
    const { characters } = charactersState;

    const speciesOptions = Array.from(new Set(characters.map((character) => character.species))).map((species) => ({
      name: "species",
      value: species,
      id: `species-${species}`,
      for: `species-${species}`
    }));

    const genderOptions = Array.from(new Set(characters.map((character) => character.gender))).map((gender) => ({
      name: "gender",
      value: gender,
      id: `gender-${gender}`,
      for: `gender-${gender}`
    }));

    const originOptions = Array.from(new Set(characters.map((character) => character.origin.name))).map((origin) => ({
      name: "origin",
      value: origin,
      id: `origin-${origin.replace(/\s+/g, '')}`,
      for: `origin-${origin.replace(/\s+/g, '')}`
    }));

    const statusOptions = Array.from(new Set(characters.map((character) => character.status))).map((status) => ({
      name: "status",
      value: status,
      id: `status-${status.replace(/\s+/g, '')}`,
      for: `status-${status.replace(/\s+/g, '')}`
    }));

    return [
      {
        category: 'Species',
        options: speciesOptions
      },
      {
        category: 'Gender',
        options: genderOptions
      },
      {
        category: 'Origin',
        options: originOptions
      },
      {
        category: 'Status',
        options: statusOptions
      }
    ];
  }
);