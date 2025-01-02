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
import interactionPlugin from '@fullcalendar/interaction';


import './calendar.css';
import dayjs from 'dayjs';
import { forwardRef, useEffect, useState } from "react";
import EditEventSideview from "./editEventSideview";
import createClient from "@/utils/supabase/client";
import { useRouter } from "next/navigation";




const CalendarPage = forwardRef(({calendar, user, calendarData, handleRerender}, ref) => {
    const supabase = createClient();
    const router = useRouter();
    const [event, setEvent] = useState();
    const [open, setOpen] = useState(false);


    let calendarEvents = [];
    calendarData.forEach(v => {
        if (v.show_events) {
            calendarEvents = calendarEvents.concat(v.calendars.events.map(v => ({
                id: v.id,
                start: v.start_time,
                end: v.end_time,
                title: v.title,
                editable: true,
                eventObj: v,
            })))
        }
    });

    function handleEventClicked(info) {
        setEvent(info.event.extendedProps.eventObj);
        setOpen(true);
    }

    async function handleEventTimeChanged(info) {
        const {data, error} = await supabase
            .from('events')
            .update({
                start_time: info.event.start.toISOString(),
                end_time: info.event.end.toISOString(),
            })
            .eq('id', info.event.extendedProps.eventObj.id);

        router.refresh();
    }

    async function handleCreateEvent(info) {
        setEvent({
            title:'',
            description: '',
            start_time: info.start.toISOString(),
            end_time: info.end.toISOString(),
            user_id: user.id,
            calendar_id: calendarData[0].calendar_id,
        })
        setOpen(true);
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
            <CustomToolbar calendar={calendar} handleRerender={handleRerender} />
            <FullCalendar
                ref={ref}
                plugins={[ dayGridPlugin, timeGridPlugin, interactionPlugin ]}
                slotDuration={'00:60:00'}
                expandRows
                selectable
                selectMirror
                select={handleCreateEvent}
                editable
                unselectAuto={false}
                eventDrop={handleEventTimeChanged}
                eventResize={handleEventTimeChanged}
                snapDuration={'00:15:00'}
                fixedWeekCount={false}
                initialView="timeGridWeek"
                nowIndicator
                dayMaxEvents
                eventClick={handleEventClicked}
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
                    ...calendarEvents,
                ]}
                />
            <EditEventSideview calendar={calendar} event={event} calendarData={calendarData} open={open} setOpen={setOpen} />
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

function CustomToolbar({calendar, handleRerender}) {
    const [currentView, setCurrentView] = useState("timeGridWeek");

    function handlePref() {
        handleRerender();
        calendar?.prev();
    }

    function handleNext() {
        handleRerender();
        calendar?.next();
    }

    function handleViewChange({target}) {
        setCurrentView(target.value);
        calendar?.changeView(target.value);
    }

    function handleToday() {
        handleRerender();
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