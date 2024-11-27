import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton"
import Box from "@mui/material/Box";
import AppBar from "@mui/material/AppBar";
import SpaceDashboardRoundedIcon from '@mui/icons-material/SpaceDashboardRounded';
import CalendarMonthRoundedIcon from '@mui/icons-material/CalendarMonthRounded';
import FormatListBulletedRoundedIcon from '@mui/icons-material/FormatListBulletedRounded';
import PublishedWithChangesRoundedIcon from '@mui/icons-material/PublishedWithChangesRounded';

import NextLink from 'next/link';
import { usePathname } from "next/navigation";

export default function SideNav({children}) {

    return (
        <Box sx={{height:'100%', borderTop: '1px solid', borderColor:'primary.light', boxSizing:'border-box'}}>
            <AppBar color='primary' position="relative" elevation={0} sx={{height:'100%'}}>
                <List>
                    <ListItemButton disableGutters sx={{pr:'1rem'}} component={NextLink} href='/u/dashboard'>
                        <SpaceDashboardRoundedIcon sx={{px:'.5rem', pr:'.75rem'}} />
                        Dashboard
                    </ListItemButton>
                    <ListItemButton disableGutters sx={{pr:'1rem'}} component={NextLink} href='/u/calendar'>
                        <CalendarMonthRoundedIcon sx={{px:'.5rem', pr:'.75rem'}} />
                        Calendar
                    </ListItemButton>
                    <ListItemButton disableGutters sx={{pr:'1rem'}} component={NextLink} href='/u/tasks'>
                        <FormatListBulletedRoundedIcon sx={{px:'.5rem', pr:'.75rem'}} />
                        Tasks
                    </ListItemButton>
                    <ListItemButton disableGutters sx={{pr:'1rem'}} component={NextLink} href='/u/cycles'>
                        <PublishedWithChangesRoundedIcon sx={{px:'.5rem', pr:'.75rem'}} />
                        Cycles
                    </ListItemButton>
                </List>
            </AppBar>
        </Box>
        
    )
}
