'use client'

import Paper from "@mui/material/Paper";



import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'



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
                initialView="timeGridWeek"
                height='100%'
                events={[
                    ...agendaEvents,
                ]}
                />
        </Paper>
    );
}