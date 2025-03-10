import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCharacters } from '../../redux/character/actions';
import CharacterCard from './CharacterCard';
import { Alert, Box, Grid2, Pagination } from '@mui/material';
import { getFilteredCharacters } from '../../redux/character/selector';
import FilterItems from '../FilterItems';
import Search from '../Search';
import Sort from '../Sort';


const CharacterList = () => {
  const dispatch = useDispatch();
  const filteredCharacters = useSelector(getFilteredCharacters);
  const [page, setPage] = useState(1);
  const itemsPerPage = 4;

  useEffect(() => {
    dispatch(fetchCharacters());
  }, [dispatch]);

  useEffect(() => {
    setPage(1);
  }, [filteredCharacters]);

  const handleChangePage = (event, value) => {
    setPage(value);
  };

  const isLoading = useSelector(state => state.characters.isLoading);

  if (isLoading) {
    return <div>Loading...</div>;
  }


  const paginatedCharacters = filteredCharacters.slice((page - 1) * itemsPerPage, page * itemsPerPage);

  return (
    <Box p={2} sx={{ boxShadow: 3 }}>
      <Box display="flex" justifyContent="space-between" marginBottom={2} direction={{ md: "column" }}>
        <Search />
        <Sort />
      </Box>
      <Box justifyContent="flex-start">
        <FilterItems />
      </Box>
      <Box justifyContent="flex-start">
        <Grid2 container
          direction="row"
          sx={{
            justifyContent: "flex-start",
            alignItems: "flex-start",
          }} spacing={1}>
          {paginatedCharacters.length ? (
            paginatedCharacters.map(character => (
              <Grid2 size={{ xs: 12, sm: 6, lg: 3 }} key={character.id}>
                <CharacterCard character={character} />
              </Grid2>
            ))
          ) : (
            <Box width="100%">
              <Alert severity="info">No characters found.</Alert>
            </Box>
          )}
        </Grid2>
      </Box>

      <Box display="flex" justifyContent="center" margin={2}>
        <Pagination
          count={Math.ceil(filteredCharacters.length / itemsPerPage)}
          page={page}
          onChange={handleChangePage}
          color="primary"
          sx={{
            '& .Mui-selected': {
              backgroundColor: '#61dafb',
              color: '#fff',
            },
            '& .MuiPaginationItem-root': {
              '&:hover': {
                backgroundColor: '#61dafb',
                color: '#fff',
              },
            },
          }}
        />
      </Box>
    </Box>
  );
};

export default CharacterList;
