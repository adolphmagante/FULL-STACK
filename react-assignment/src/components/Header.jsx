import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';


const Header = () => {
    return (
        <AppBar position="sticky" style={{ backgroundColor: '#1c1c1c' }}>
            <Toolbar>
                <Typography variant="h6" style={{ color: '#61dafb', fontFamily: 'Arial, sans-serif' }}>
                    Rick and Morty
                </Typography>
            </Toolbar>
        </AppBar>
    );
};

export default Header;