"use client"
import { Avatar, Box, IconButton, Menu, MenuItem, Tooltip, Typography } from '@mui/material';
import React from 'react';
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

const NavBar = () => {
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
      };
      const handleCloseUserMenu = () => {
        setAnchorElUser(null);
      };
    return (
        <Box
            display={'flex'} 
            justifyContent={"center"}
            alignItems={'center'}
            
        >
            <Box
            sx={{
               
                borderRadius:"1em",
                padding:".2em 1em",
                width:"80%",
                opacity:"0.8",
                boxShadow: 5,
            }}
           
            display={'flex'}  
            justifyContent={'center'} 
            alignItems={'center'}
            >
                <Box sx={{padding:"10px"}}>
                
                    <Typography>
                        Clock Line
                    </Typography>

                </Box>
            </Box>
        </Box>
    );
};

export default NavBar;