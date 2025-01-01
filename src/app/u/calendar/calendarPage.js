'use client'

import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";

import ArrowBackIosNewRoundedIcon from '@mui/icons-material/ArrowBackIosNewRounded';
import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded';


import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'

import './calendar.css';
import dayjs from 'dayjs';
import { forwardRef, useEffect, useState } from "react";




const CalendarPage = forwardRef((props, ref) => {

    return (
        <Paper 
            elevation={0} 
            sx={{
                borderRadius:3, boxSizing:'border-box', border:'1px solid', borderColor: 'grey.300',
                p:'1rem', height:'100%', 
                display:'flex', flexDirection:'column'
            }}
            >
            <CustomToolbar calendarRef={ref} />
            <FullCalendar
                ref={ref}
                plugins={[ dayGridPlugin, timeGridPlugin ]}
                slotDuration={'00:60:00'}
                expandRows
                fixedWeekCount={false}
                initialView="timeGridWeek"
                nowIndicator
                dayMaxEvents
                views={{
                    timeGrid: {
                        titleFormat: { year: 'numeric', month: 'short' }
                    }
                }}
                headerToolbar='false'
                height='100%'
                dayHeaderContent={dayHeaderContent}
                slotLabelContent={slotLabelContent}
                allDayContent={allDayContent}
                events={[

                ]}
                />
        </Paper>
    );
})

export default CalendarPage;


function dayHeaderContent(args) {
    // Custom rendering for day headers
    const today = dayjs().format('YYYY-MM-DD');
    const dayName = dayjs(args.date).format('dddd'); // Format as day of the week
    const date = dayjs(args.date).format('D'); // Format as 'Month Day'
    const isToday = dayjs(args.date).isSame(today, 'day'); // Check if the date matches today

    if (args.view.type === 'timeGridWeek') {
        return (
            <Box style={{ textAlign: 'center' }}>
                <Typography variant="body2" color={isToday ? "primary" : "textSecondary"} sx={{fontWeight:'bold'}}>{dayName}</Typography>
                <Typography variant="h6" color={isToday ? "primary" : "textSecondary"}>{date}</Typography>
            </Box>
        );
    } else if (args.view.type === 'dayGridMonth') {
        return (
            <Box style={{ textAlign: 'center' }}>
                <Typography variant="body2" color="textSecondary" sx={{fontWeight:'bold'}}>{args.text}</Typography>
            </Box>
        );
    } else {
        return args.text;
    }
}

function slotLabelContent(args) {
    // args.date contains the date object for the time slot
    const formattedTime = args.text; // FullCalendar provides preformatted time text
    if (formattedTime === '12am') return; 

    return (
        <Typography variant="body2" color="textSecondary" sx={{fontWeight:'bold'}}>
            {formattedTime}
        </Typography>
    );
}

function allDayContent(args) {
    const now = dayjs();
    const gmtOffset = now.utcOffset() / 60; // Get offset in hours
    const gmtText = `GMT${gmtOffset >= 0 ? '+' : ''}${gmtOffset}`;
    return (
        <Typography variant="body2" color="textSecondary">
            {gmtText}
        </Typography>
    );
}

function CustomToolbar({calendarRef}) {
    const [calendar, setCalendar] = useState();
    const [rerender, setRerender] = useState(false);
    const [currentView, setCurrentView] = useState("timeGridWeek");

    useEffect(() => {
        setCalendar(calendarRef.current?.getApi());
    }, [calendarRef, rerender]);

    function handlePref() {
        setRerender(r=>!r);
        calendar?.prev();
    }

    function handleNext() {
        setRerender(r=>!r);
        calendar?.next();
    }

    function handleViewChange({target}) {
        setCurrentView(target.value);
        calendar?.changeView(target.value);
    }

    function handleToday() {
        setRerender(r=>!r);
        calendar?.today();
    }

    return (
        <Box sx={{width:'100%', display:'flex', alignItems:'center'}}>
            <Typography variant="h5">{calendar?.view.title}</Typography>
            <Box sx={{mr:'auto'}} />
            <Button 
                sx={{
                    mr:'.5rem',
                    borderRadius:3,
                    textTransform: 'none',
                }} 
                onClick={handleToday}
                >
                Today
            </Button>
            <TextField
                select
                label='View'
                value={currentView}
                onChange={handleViewChange}
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
                sx={{width:'7.5rem', mr:'.5rem'}}
                >
                <MenuItem value='timeGridWeek'>Week</MenuItem>
                <MenuItem value='dayGridMonth'>Month</MenuItem>
            </TextField>
            <Box sx={{display:'flex', alignItems:'center'}}>
                <IconButton 
                    size="small" 
                    onClick={handlePref} 
                    sx={{mr:'.5rem'}}
                    >
                    <ArrowBackIosNewRoundedIcon fontSize="small" />
                </IconButton>
                <IconButton 
                    size="small"
                    onClick={handleNext} 
                    >
                    <ArrowForwardIosRoundedIcon fontSize="small" />
                </IconButton>
            </Box>
        </Box>
    );
}