'use client'


import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import InboxRoundedIcon from '@mui/icons-material/InboxRounded';
import TodayRoundedIcon from '@mui/icons-material/TodayRounded';
import { useEffect, useState } from "react";
import dayjs from "dayjs";



export default function TaskFilters({tasks, setFilteredTasks}) {
    const [selectedButton, setSelectedButton] = useState('All tasks');

    useEffect(() => {
        if (selectedButton === 'All tasks') {
            setFilteredTasks(handleAllTasks());
        } else if (selectedButton === 'Upcoming') {
            setFilteredTasks(handleUpcoming());
        }
    }, [tasks]);

    function handleSelectedButton({currentTarget}) {
        setSelectedButton(currentTarget.textContent);
    }

    function handleAllTasks(event) {
        event && handleSelectedButton(event);

        setFilteredTasks(tasks);
        return tasks
    }

    function handleUpcoming(event) {
        event && handleSelectedButton(event);
        const filtered = tasks.filter(v => v.due_date && dayjs(v.due_date).diff(dayjs(), 'day') >= 0);

        setFilteredTasks(filtered);
        return filtered
    }

    return (
        <Paper 
            elevation={0} 
            sx={{
                borderRadius:3, boxSizing:'border-box', border:'1px solid', borderColor: 'grey.300',
                p:'1rem', height:'100%', 
                display:'flex', flexDirection:'column'
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
                onClick={handleUpcoming}
                variant={selectedButton === 'Upcoming' ? 'contained' : 'text'}
                disableElevation
                startIcon={<TodayRoundedIcon />}
                sx={{textTransform:'none', justifyContent:'left', borderRadius:2, mt:'.5rem', py:'.3rem', px:'.5rem'}}
                >
                Upcoming
            </Button>
        </Paper>
    );
}