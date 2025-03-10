import { Box, Button, Chip, Stack } from '@mui/material';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeAllFilters, removeFilter } from '../redux/character/slice';

const FilterItems = () => {
    const dispatch = useDispatch();
    const filteredItems = useSelector((state) => state.characters.filters);

    const handleDelete = (itemKey, value) => {
        dispatch(removeFilter({ name: itemKey, value }));
    }

    const handleClearAll = () => {
        dispatch(removeAllFilters());
    }

    return (
        <>
            {filteredItems && Object.keys(filteredItems).length > 0 && (
                <Box p={1}>
                    <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                        {Object.keys(filteredItems).map((key) => (
                            Array.isArray(filteredItems[key]) ? filteredItems[key].map((value, i) => (
                                <Chip
                                    key={i}
                                    label={value}
                                    variant="outlined"
                                    size="small"
                                    onDelete={() => handleDelete(key, value)}
                                />
                            )) : (
                                <Chip
                                    key={key}
                                    label={filteredItems[key]}
                                    variant="outlined"
                                    size="small"
                                    onDelete={() => handleDelete(key, filteredItems[key])}
                                />
                            )
                        ))}
                        <Button variant="text" size="small" onClick={handleClearAll}>
                            Clear all
                        </Button>
                    </Stack>
                </Box>
            )}
        </>
    );
};

export default FilterItems;