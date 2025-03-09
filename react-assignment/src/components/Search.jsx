import React from 'react';
import { IconButton, TextField } from '@mui/material';
import { setSearchQuery } from '../redux/character/slice';
import { useDispatch } from 'react-redux';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';

const Search = () => {

    const dispatch = useDispatch();

    const handleSearchChange = (e) => {
        dispatch(setSearchQuery(e.target.value));
    };

    const [searchValue, setSearchValue] = React.useState('');

    const handleClearSearch = () => {
        setSearchValue('');
        dispatch(setSearchQuery(''));
    };

    return (
        <TextField
            variant="outlined"
            value={searchValue}
            onChange={(e) => {
                setSearchValue(e.target.value);
                handleSearchChange(e);
            }}
            placeholder="Search Character..."
            InputProps={{
                endAdornment: (
                    <>
                        {searchValue ? (
                            <IconButton onClick={handleClearSearch}>
                                <ClearIcon />
                            </IconButton>
                        ): <SearchIcon />}
                    </>
                ),
            }}
        />
    );
};

export default Search;