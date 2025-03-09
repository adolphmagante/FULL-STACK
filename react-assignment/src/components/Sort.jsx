import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSortOrder } from '../redux/character/slice';
import { FormControl, InputLabel, Select, MenuItem, Box } from '@mui/material';


const Sort = () => {
    const dispatch = useDispatch();
    const sortOrderState = useSelector((state) => state.characters.sortOrder);


    const handleSortOrderChange = (e) => {
        dispatch(setSortOrder(e.target.value));
    };

    return (
        <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth variant="outlined">
                <InputLabel id="sort-order-label">Sort Order</InputLabel>
                <Select
                    labelId="sort-order-label"
                    id="sort-order"
                    label="Sort Order"
                    onChange={handleSortOrderChange}
                    defaultValue="Sort Order"
                    value={sortOrderState}
                >
                    <MenuItem value="" disabled>
                        <em>Select</em>
                    </MenuItem>
                    <MenuItem value="asc">Ascending</MenuItem>
                    <MenuItem value="desc">Descending</MenuItem>
                </Select>
            </FormControl>
        </Box>
    );
};

export default Sort;