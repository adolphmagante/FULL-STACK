import './App.css';
import React from 'react';
import { Box, Grid2 } from '@mui/material';
import Filter from './components/Filter';
import CharacterList from './components/character/CharacterList';
import Header from './components/Header';

function App() {
  return (
    <div className="App">
      <Header />
      <Box p={2}>
        <Grid2 container spacing={2} direction={'row'} justifyContent={'space-between'}>
          <Grid2  size={{xs:12, xl: 2, md: 3}}>
            <Filter />
          </Grid2>

          <Grid2 size={{xs:12, xl: 10, md: 9}}>
              <CharacterList />
          </Grid2>
        </Grid2>
      </Box>

    </div>
  );
}

export default App;
