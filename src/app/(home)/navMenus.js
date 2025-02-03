'use client'

import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ExpandMoreRoundedIcon from '@mui/icons-material/ExpandMoreRounded';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import ArticleRoundedIcon from '@mui/icons-material/ArticleRounded';
import PeopleRoundedIcon from '@mui/icons-material/PeopleRounded';
import HelpOutlineRoundedIcon from '@mui/icons-material/HelpOutlineRounded';

import { useState } from "react";
import NextLink from 'next/link';


export default function NavMenus() {
    const [anchorResources, setAnchorResources] = useState(null);

    function handleCloseResources() {
        setAnchorResources(null)
    }

    function handleOpenResources({currentTarget}) {
        setAnchorResources(currentTarget)
    }

    return (
        <>
            {/* resources */}
            <Button onClick={handleOpenResources} sx={{textTransform:'none', mr:'.25rem'}} endIcon={<ExpandMoreRoundedIcon sx={{color:'text.secondary'}} />}>
                <Typography variant="body1" color="textSecondary">Resources</Typography>
            </Button>
            <Menu
                anchorEl={anchorResources}
                open={Boolean(anchorResources)}
                onClose={handleCloseResources}
                >
                <MenuItem onClick={handleCloseResources} component={NextLink} href='/blog'>
                    <ListItemIcon><ArticleRoundedIcon fontSize="small" /></ListItemIcon>
                    <ListItemText>Blog</ListItemText>
                </MenuItem>
                <MenuItem onClick={handleCloseResources} component={NextLink} href='/experts'>
                    <ListItemIcon><PeopleRoundedIcon fontSize="small" /></ListItemIcon>
                    <ListItemText>Experts</ListItemText>
                </MenuItem>
                <MenuItem onClick={handleCloseResources} component={NextLink} href='/help'>
                    <ListItemIcon><HelpOutlineRoundedIcon fontSize="small" /></ListItemIcon>
                    <ListItemText>Help Center</ListItemText>
                </MenuItem>
            </Menu>
            {/* pricing */}
            <Button sx={{textTransform:'none', mr:'.25rem'}} component={NextLink} href='/pricing' >
                <Typography variant="body1" color="textSecondary">Pricing</Typography>
            </Button>
        </>
    );
}