import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton"
import Box from "@mui/material/Box";
import AppBar from "@mui/material/AppBar";
import SpaceDashboardRoundedIcon from '@mui/icons-material/SpaceDashboardRounded';
import CalendarMonthRoundedIcon from '@mui/icons-material/CalendarMonthRounded';
import FormatListBulletedRoundedIcon from '@mui/icons-material/FormatListBulletedRounded';
import PublishedWithChangesRoundedIcon from '@mui/icons-material/PublishedWithChangesRounded';
import GroupsRoundedIcon from '@mui/icons-material/GroupsRounded';
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';
import Tooltip from "@mui/material/Tooltip";

import NextLink from 'next/link';
import { usePathname } from "next/navigation";
import { Typography } from "@mui/material";

export default function SideNav({open, teamInfo}) {
    const pathname = usePathname();

    // custom navbar button for the lists below
    const CustomNavButton = (props) => {
        return (
            <Tooltip title={!open && props.tip} placement="right" arrow>
                <ListItemButton 
                    disableGutters 
                    disableRipple
                    component={NextLink} 
                    href={props.path} 
                    selected={pathname===props.path}
                    {...props}
                    >
                    {props.children}
                </ListItemButton>
            </Tooltip>
        )
    }

    return (
        <Box sx={{height:'100%'}}>
            <AppBar 
                color='inherit' 
                position="relative" 
                elevation={0} 
                sx={{
                    height:'100%', width:open ? '10rem' : '2.75rem', overflow: 'hidden',
                    borderRight: '1px solid', borderColor:'grey.300', boxSizing:'border-box',
                    transition: 'width 0.3s ease',
                }}
                >
                {/* navigation */}
                <List>
                    <CustomNavButton path='/u/dashboard' tip='Dashboard'>
                        <SpaceDashboardRoundedIcon sx={{px:'.5rem', pr:'.75rem'}} />
                        Dashboard
                    </CustomNavButton>
                    <CustomNavButton path='/u/calendar' tip='Calendar'>
                        <CalendarMonthRoundedIcon sx={{px:'.5rem', pr:'.75rem'}} />
                        Calendar
                    </CustomNavButton>
                    <CustomNavButton path='/u/tasks' tip='Tasks'>
                        <FormatListBulletedRoundedIcon sx={{px:'.5rem', pr:'.75rem'}} />
                        Tasks
                    </CustomNavButton>
                    <CustomNavButton path='/u/cycles' divider tip='Cycles'>
                        <PublishedWithChangesRoundedIcon sx={{px:'.5rem', pr:'.75rem'}} />
                        Cycles
                    </CustomNavButton>
                    <CustomNavButton path='/u/teams' divider tip='Teams'>
                        <GroupsRoundedIcon sx={{px:'.5rem', pr:'.75rem'}} />
                        <Typography noWrap>
                            Teams
                        </Typography>
                        <ChevronRightRoundedIcon sx={{ml:'auto'}} />
                    </CustomNavButton>
                    <CustomNavButton path='/u/tasks' tip='Tasks'>
                        <FormatListBulletedRoundedIcon sx={{px:'.5rem', pr:'.75rem'}} />
                        {JSON.stringify(teamInfo)}
                    </CustomNavButton>
                </List>
            </AppBar>
        </Box>
        
    )
}
