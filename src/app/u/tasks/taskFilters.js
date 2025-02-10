'use client'


import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import InboxRoundedIcon from '@mui/icons-material/InboxRounded';
import TodayRoundedIcon from '@mui/icons-material/TodayRounded';
import ClearRoundedIcon from '@mui/icons-material/ClearRounded';
import CalendarMonthRoundedIcon from '@mui/icons-material/CalendarMonthRounded';

import { useEffect, useState } from "react";
import dayjs from "dayjs";



export default function TaskFilters({tasks, setFilteredTasks, teamMembers, teams, teamId}) {
    const [selectedButton, setSelectedButton] = useState('All tasks');
    const [searchText, setSearchText] = useState('');
    const [teamText, setTeamText] = useState('');
    const [teamMemberText, setTeamMemberText] = useState('');


    useEffect(() => {
        if (selectedButton === 'All tasks') {
            handleAllTasks();
        } else if (selectedButton === 'Upcoming') {
            handleUpcoming();
        } else if (selectedButton === 'Today') {
            handleToday();
        }
    }, [tasks, searchText, teamText, teamMemberText]);

    // text search
    function handleSearch(t) {
        const filtered = t.filter(vf => {
            if (searchText === '') return true;
            const searchString = (
                vf.title + ' ' + vf.description + ' ' + vf.priority  + ' ' + 
                vf.teams?.name + ' ' + vf.status + ' ' + 
                dayjs(vf.due_date).format('MM DD YYYY MMMM a M/D/YYYY M-D-YYYY dddd h:mma ha') + ' ' +
                teamMembers.filter(v => v.id === vf.assigned_id)[0]?.email
            );

            return search(searchString, searchText);
        })

        setFilteredTasks(filtered)
        // return filtered;
    }

    // handlers for general
    function handleSelectedButton({currentTarget}) {
        setSelectedButton(currentTarget.textContent);
    }

    function handleAllTasks(event) {
        event && handleSelectedButton(event);

        handleSearch(handleSearchByTeamMember(handleSearchByTeam(tasks)));
    }

    function handleUpcoming(event) {
        event && handleSelectedButton(event);
        const filtered = tasks.filter(v => dayjs(v.due_date).diff(dayjs()) >= 0);

        handleSearch(handleSearchByTeamMember(handleSearchByTeam(filtered)));
    }

    function handleToday(event) {
        event && handleSelectedButton(event);
        const filtered = tasks.filter(v => v.due_date && dayjs(v.due_date).diff(dayjs(dayjs().format('MM/DD/YYYY')), 'day') <= 0);

        handleSearch(handleSearchByTeamMember(handleSearchByTeam(filtered)));
    }

    function handleSearchText({target}) {
        setSearchText(target.value);
    }

    function handleClearText() {
        setSearchText('');
    }

    // handlers for specific
    function handleTeamText({target}) {
        setTeamText(target.value);
    }

    function handleTeamMemberText({target}) {
        setTeamMemberText(target.value)
    }

    function handleClearAll() {
        setSearchText('');
        setTeamMemberText('');
        setTeamText('');
    }

    // filter functions
    function handleSearchByTeam(t) {
        if (teamText === '') return t;
        return t.filter(v => v.team_id === teamText);
    }

    function handleSearchByTeamMember(t) {
        if (teamMemberText === '') return t;
        return t.filter(v => v.assigned_id === teamMemberText);
    }

    return (
        <Paper 
            elevation={0} 
            sx={{
                borderRadius:3, boxSizing:'border-box', border:'1px solid', borderColor: 'grey.300',
                p:'1rem', height:'100%', 
                display:'flex', flexDirection:'column', overflow:'scroll',
            }}
            >
            <Button 
                onClick={handleAllTasks}
                variant={selectedButton === 'All tasks' ? 'contained' : 'text'}
                disableElevation
                startIcon={<InboxRoundedIcon />}
                sx={{textTransform:'none', justifyContent:'left', borderRadius:2, py:'.3rem', px:'.5rem'}}
                >
                All tasks
            </Button>
            <Button 
                onClick={handleToday}
                variant={selectedButton === 'Today' ? 'contained' : 'text'}
                disableElevation
                startIcon={<TodayRoundedIcon />}
                sx={{textTransform:'none', justifyContent:'left', borderRadius:2, mt:'.5rem', py:'.3rem', px:'.5rem'}}
                >
                Today
            </Button>
            <Button 
                onClick={handleUpcoming}
                variant={selectedButton === 'Upcoming' ? 'contained' : 'text'}
                disableElevation
                startIcon={<CalendarMonthRoundedIcon />}
                sx={{textTransform:'none', justifyContent:'left', borderRadius:2, mt:'.5rem', py:'.3rem', px:'.5rem'}}
                >
                Upcoming
            </Button>

            {/* filters */}
            <Typography sx={{mt:'.5rem'}}>Filters:</Typography>
            <TextField 
                placeholder="Search tasks..."
                value={searchText}
                onChange={handleSearchText}
                slotProps={{
                    htmlInput: {
                        sx: {
                            py:'.5rem'
                        }
                    },
                    input:{
                        endAdornment:(
                            <InputAdornment position='end'>
                                <IconButton size='small' edge="end" onClick={handleClearText}>
                                    <ClearRoundedIcon fontSize="small" />
                                </IconButton>
                            </InputAdornment>
                        )
                    }
                }}
                // sx={{mt:'.5rem'}}
                />

            {/* search by team */}
            {!teamId && (
                <TextField
                    select
                    label="Search by team..."
                    value={teamText}
                    onChange={handleTeamText}
                    slotProps={{
                        htmlInput: {
                            sx: {
                                py:'.5rem'
                            }
                        },
                        inputLabel: {
                            shrink: true,
                        }
                    }}
                    sx={{mt:'1rem'}}
                    >
                    <MenuItem value={''}>Clear</MenuItem>
                    {teams.map((v, i) => (
                        <MenuItem key={i} value={v.id}>{v.name}</MenuItem>
                    ))}
                </TextField>
            )}

            {/* search by user */}
            <TextField
                select
                label="Search by user..."
                value={teamMemberText}
                onChange={handleTeamMemberText}
                slotProps={{
                    htmlInput: {
                        sx: {
                            py:'.5rem'
                        }
                    },
                    inputLabel: {
                        shrink: true,
                    }
                }}
                sx={{mt:'1rem'}}
                >
                <MenuItem value={''}>Clear</MenuItem>
                {teamMembers.map((v, i) => (
                    <MenuItem key={i} value={v.id}>{v.email}</MenuItem>
                ))}
            </TextField>
            {/* cancel */}
            <Box sx={{display:'flex', justifyContent:'right', width:'100%', mt:'.5rem'}}>
                <Button onClick={handleClearAll} sx={{textTransform:'none', borderRadius:2}}>Clear all</Button>
            </Box>
        </Paper>
    );
}


function search(text, searchString) {
    const searchValues = searchString.split(' ').map(value => value.trim().toLowerCase());
    const lowerText = text.toLowerCase();

    const allFound = searchValues.every(value => lowerText.includes(value));
    console.log(searchValues)
    return allFound;
}