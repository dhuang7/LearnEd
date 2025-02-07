'use client'

import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';
import List from '@mui/material/List';
import ListItemIcon from '@mui/material/ListItemIcon';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import Collapse from '@mui/material/Collapse';


import { useState } from 'react';

export default function CollapsibleListItem({title, children, icon}) {
    const [open, setOpen] = useState(false);



    return (
        <>
            <ListItemButton onClick={() => setOpen(t=>!t)} >
                {icon && <ListItemIcon>{icon}</ListItemIcon>}
                <ListItemText primary={title} />
                {open ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={open} timeout="auto" unmountOnExit>
                {children}
            </Collapse>
        </>
    );
}