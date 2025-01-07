'use client'

import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton"
import Box from "@mui/material/Box";
import AppBar from "@mui/material/AppBar";
import SpaceDashboardRoundedIcon from '@mui/icons-material/SpaceDashboardRounded';
import CalendarMonthRoundedIcon from '@mui/icons-material/CalendarMonthRounded';
import FormatListBulletedRoundedIcon from '@mui/icons-material/FormatListBulletedRounded';
import LightbulbRoundedIcon from '@mui/icons-material/LightbulbRounded';
import PublishedWithChangesRoundedIcon from '@mui/icons-material/PublishedWithChangesRounded';
import GroupsRoundedIcon from '@mui/icons-material/GroupsRounded';
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';
import Tooltip from "@mui/material/Tooltip";
import Icon from '@mui/material/Icon';
import HandshakeRoundedIcon from '@mui/icons-material/HandshakeRounded';

import NextLink from 'next/link';
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Typography } from "@mui/material";
import { useTeamContext } from "./layout";

export default function SideNav({open, teamInfo, aimInfo}) {
    const pathname = usePathname();

    // custom navbar button for the lists below
    const CustomNavButton = (props) => {
        return (
            <Tooltip title={!open && props.tip} placement="right" arrow>
                <ListItemButton 
                    disableGutters 
                    disableRipple
                    component={NextLink} 
                    href={props.path.concat(props.addpath||'')} 
                    selected={pathname.includes(props.path)}
                    {...props}
                    sx={{
                        whiteSpace:'nowrap'
                    }}
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
                    {/* <CustomNavButton path='/u/dashboard' tip='Dashboard'>
                        <SpaceDashboardRoundedIcon sx={{px:'.5rem', pr:'.75rem'}} />
                        Dashboard
                    </CustomNavButton> */}
                    <CustomNavButton path='/u/calendar' tip='Calendar'>
                        <CalendarMonthRoundedIcon sx={{px:'.5rem', pr:'.75rem'}} />
                        My Calendar
                    </CustomNavButton>
                    {/* <CustomNavButton path='/u/tasks' tip='Tasks'>
                        <FormatListBulletedRoundedIcon sx={{px:'.5rem', pr:'.75rem'}} />
                        Tasks
                    </CustomNavButton> */}
                    <CustomNavButton path='/u/change-ideas' divider tip='Search Ideas'>
                        <LightbulbRoundedIcon sx={{px:'.5rem', pr:'.75rem'}} />
                        Search Ideas
                    </CustomNavButton>
                    <CustomNavButton path='/u/teams' divider tip='Teams'>
                        {/* renames the Teams to a Team name when a team is selected */}
                        {(teamInfo)
                            ? <>
                                <Icon sx={{px:'.5rem', pr:'.75rem'}}>
                                    <Image src={'/icon.svg'} alt={'icon'} width={1} height={1} style={{width:'100%', height:'100%'}} />
                                </Icon>
                                <Typography noWrap>
                                    {teamInfo.name}
                                </Typography>
                            </>
                            : <>
                                <GroupsRoundedIcon sx={{px:'.5rem', pr:'.75rem'}} />
                                <Typography noWrap>
                                    Teams
                                </Typography>
                            </>
                        }
                        <ChevronRightRoundedIcon sx={{ml:'auto'}} />
                    </CustomNavButton>
                    {/* Team side navigation */}
                    {(teamInfo)
                        ? <>
                            <CustomNavButton path={`/u/t/${teamInfo.id}/dashboard`} tip='Dashboard'>
                                <SpaceDashboardRoundedIcon sx={{px:'.5rem', pr:'.75rem'}} />
                                <Typography noWrap>
                                    Dashboard
                                </Typography>
                            </CustomNavButton>
                            {/* <CustomNavButton path={`/u/t/${teamInfo.id}/agenda`} tip='Agenda'>
                                <HandshakeRoundedIcon sx={{px:'.5rem', pr:'.75rem'}} />
                                <Typography noWrap>
                                    Agenda
                                </Typography>
                            </CustomNavButton> */}
                            <CustomNavButton path={`/u/t/${teamInfo.id}/calendar`} tip='Calendar'>
                                <CalendarMonthRoundedIcon sx={{px:'.5rem', pr:'.75rem'}} />
                                <Typography noWrap>
                                    Calendar
                                </Typography>
                            </CustomNavButton>
                            {/* <CustomNavButton path={`/u/t/${teamInfo.id}/tasks`} tip='Tasks'>
                                <FormatListBulletedRoundedIcon sx={{px:'.5rem', pr:'.75rem'}} />
                                <Typography noWrap>
                                    Tasks
                                </Typography>
                            </CustomNavButton> */}
                            <CustomNavButton 
                                path={`/u/t/${teamInfo.id}/projects`} 
                                addpath={aimInfo ? `/${aimInfo}/drivers` : ''} 
                                tip='Projects'>
                                <PublishedWithChangesRoundedIcon sx={{px:'.5rem', pr:'.75rem'}} />
                                <Typography noWrap>
                                    Projects
                                </Typography>
                            </CustomNavButton>
                        </>
                        : <Box sx={{width:'100%', justifyContent:'center', display:'flex', mt:'.5rem'}}>
                            {/* text if no team is selected */}
                            {!open || <Typography color="textSecondary">Select a team.</Typography>}
                        </Box>
                    }
                </List>
            </AppBar>
        </Box>
        
    )
}
