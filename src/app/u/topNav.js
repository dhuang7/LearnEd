'use client'

import Box from "@mui/material/Box";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Typography from "@mui/material/Typography";
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import createClient from "@/utils/supabase/client";
import NextLink from 'next/link';
import HelpButton from "./helpButton";

export default function TopNav({handleOpen}) {
    const router = useRouter(); // Initialize the router

    // state for menu
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    // state for user info
    const [user, setUser] = useState(null);
    const supabase = createClient();

    // get user info
    useEffect(() => {
        const getUser = async () => {
            const u = (await supabase.auth.getSession()).data.session?.user;
            if (!u) {
                router.push('/login');
            } else {
                setUser(u);
            }
        }

        getUser();
    }, [])

    // handlers for account menu
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    // handle logout
    async function handleLogout() {
        handleClose();
        const { error } = await supabase.auth.signOut();
        router.push('/login');
    }
    

    return (
        <AppBar color='inherit' position="relative" elevation={0} sx={{borderBottom: '1px solid', borderColor:'grey.300', boxSizing:'border-box'}}>
            <Toolbar variant="dense" disableGutters sx={{px:'.5rem'}}>
                <Box sx={{display:'flex', width:'100%'}}>
                    {/* start */}
                    <Box sx={{alignContent:'center'}}>
                        <IconButton color="inherit" size="small" onClick={handleOpen}>
                            <MenuRoundedIcon />
                        </IconButton>
                        
                    </Box>
                    {/* middle */}
                    <Box flexGrow={1} />
                    {/* end */}
                    <Box sx={{alignItems:'center', display:'flex'}}>
                        {/* display user email */}
                        <Typography variant="body2" sx={{alignContent:'center', px:'.5rem'}}>
                            {user?.email}
                        </Typography>
                        {/* help */}
                        {/* <IconButton target="_blank" component={NextLink} href='/help' sx={{mr:'.1rem'}}><HelpOutlineRoundedIcon /></IconButton> */}
                        <HelpButton />
                        {/* account button */}
                        <IconButton color="inherit" size="small" onClick={handleClick}>
                            <AccountCircleRoundedIcon fontSize="large" />
                        </IconButton>
                        {/* menu */}
                        <Menu
                            anchorEl={anchorEl}
                            open={open}
                            onClose={handleClose}
                            >
                            <MenuItem onClick={handleClose} href='/u/settings' component={NextLink}>
                                <ListItemIcon><SettingsRoundedIcon fontSize="small" /></ListItemIcon>
                                <ListItemText>Settings</ListItemText>
                            </MenuItem>
                            {/* <MenuItem onClick={handleClose} href='/u/settings' component={NextLink}>Settings</MenuItem> */}
                            {/* <MenuItem onClick={handleClose}>My account</MenuItem> */}
                            <MenuItem onClick={handleLogout}>
                                <ListItemIcon><LogoutRoundedIcon fontSize="small" /></ListItemIcon>
                                <ListItemText>Logout</ListItemText>
                            </MenuItem>
                        </Menu>
                    </Box>
                </Box>
            </Toolbar>
        </AppBar>
    )
}
