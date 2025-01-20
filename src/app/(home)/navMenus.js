'use client'

import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ExpandMoreRoundedIcon from '@mui/icons-material/ExpandMoreRounded';

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
            <Button onClick={handleOpenResources} sx={{textTransform:'none'}} endIcon={<ExpandMoreRoundedIcon sx={{color:'text.secondary'}} />}>
                <Typography variant="body1" color="textSecondary">Resources</Typography>
            </Button>
            <Menu
                anchorEl={anchorResources}
                open={Boolean(anchorResources)}
                onClose={handleCloseResources}
                >
                <MenuItem onClick={handleCloseResources} component={NextLink} href='/'>Blog</MenuItem>
                <MenuItem onClick={handleCloseResources} component={NextLink} href='/help'>Help Center</MenuItem>
            </Menu>
        </>
    );
}