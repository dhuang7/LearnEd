'use client'

import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";



import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'

import './calendar.css';
import dayjs from 'dayjs';



export default function CalendarPage({agendas}) {

    const agendaEvents = agendas.map(v => ({
        title: v.focus,
        start: v.start_time,
        end: v.end_time,
    }));

    return (
        <Paper 
            elevation={0} 
            sx={{
                borderRadius:3, boxSizing:'border-box', border:'1px solid', borderColor: 'grey.300',
                p:'1rem', height:'100%', 
                display:'flex', flexDirection:'column'
            }}
            >
            <FullCalendar
                plugins={[ dayGridPlugin, timeGridPlugin ]}
                slotDuration={'00:60:00'}
                expandRows
                initialView="timeGridWeek"
                height='100%'
                dayHeaderContent={(args) => {
                    // Custom rendering for day headers
                    const today = dayjs().format('YYYY-MM-DD');
                    const dayName = dayjs(args.date).format('dddd'); // Format as day of the week
                    const date = dayjs(args.date).format('D'); // Format as 'Month Day'
                    const isToday = dayjs(args.date).isSame(today, 'day'); // Check if the date matches today
            
                    return (
                    <Box style={{ textAlign: 'center' }}>
                        <Typography variant="body2" color={isToday ? "primary" : "textSecondary"} sx={{fontWeight:'bold'}}>{dayName}</Typography>
                        <Typography variant="h6" color={isToday ? "primary" : "textSecondary"}>{date}</Typography>
                    </Box>
                    );
                }}
                slotLabelContent={(args) => {
                    // args.date contains the date object for the time slot
                    const formattedTime = args.text; // FullCalendar provides preformatted time text
                    if (formattedTime === '12am') return; 

                    return (
                        <Typography variant="body2" color="textSecondary" sx={{fontWeight:'bold'}}>
                            {formattedTime}
                        </Typography>
                    );
                }}
                allDayContent={(args) => {
                    const now = dayjs();
                    const gmtOffset = now.utcOffset() / 60; // Get offset in hours
                    const gmtText = `GMT${gmtOffset >= 0 ? '+' : ''}${gmtOffset}`;
                    return (
                        <Typography variant="body2" color="textSecondary">
                            {gmtText}
                        </Typography>
                    );
                }}
                events={[
                    ...agendaEvents,
                ]}
                />
        </Paper>
    );
}