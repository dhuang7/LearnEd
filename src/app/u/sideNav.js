import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton"
import Box from "@mui/material/Box";
import AppBar from "@mui/material/AppBar";
import SpaceDashboardRoundedIcon from '@mui/icons-material/SpaceDashboardRounded';
import CalendarMonthRoundedIcon from '@mui/icons-material/CalendarMonthRounded';
import FormatListBulletedRoundedIcon from '@mui/icons-material/FormatListBulletedRounded';
import PublishedWithChangesRoundedIcon from '@mui/icons-material/PublishedWithChangesRounded';
import GroupsRoundedIcon from '@mui/icons-material/GroupsRounded';

import NextLink from 'next/link';

export default function SideNav({children}) {

    return (
        <Box sx={{height:'100%'}}>
            <AppBar color='primary' position="relative" elevation={0} sx={{height:'100%'}}>
                <List sx={{borderTop: '1px solid', borderColor:'primary.light', boxSizing:'border-box'}}>
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
                    <ListItemButton disableGutters sx={{pr:'1rem'}} component={NextLink} href='/u/teams'>
                        <GroupsRoundedIcon sx={{px:'.5rem', pr:'.75rem'}} />
                        Teams
                    </ListItemButton>
                </List>
            </AppBar>
        </Box>
        
    )
}
