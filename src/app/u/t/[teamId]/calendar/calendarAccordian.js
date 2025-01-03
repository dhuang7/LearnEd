'use client'

import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Typography from "@mui/material/Typography";
import AddCalendarModal from './addCalendarModal';

import CalendarMenuItem from './calendarMenuItem';



export default function CalendarAccordian({calendarData, user, teamId, teamMembers}) {

    return (
        <Accordion
            disableGutters
            defaultExpanded
            sx={{
                boxShadow:0,
                '&:before': {
                    display:'none',
                },
            }}
            >
            {/* title */}
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                sx={{
                    minHeight:0,
                    '& .MuiAccordionSummary-content': {
                        m:0,
                        alignItems:'center',
                    }
                }}
                >
                {/* text */}
                <Typography variant="body2" sx={{fontWeight:'bold', mr:'auto'}}>Team Calendars</Typography>
                {/* add calendar */}
                <AddCalendarModal defaultOpen={!calendarData.length} teamId={teamId} teamMembers={teamMembers} user={user} />
            </AccordionSummary>
            {/* expanded content */}
            <AccordionDetails sx={{py:0,}}>
                {calendarData.map((v, i) => (
                    <CalendarMenuItem key={i} user={user} defaultChecked={v.show_events} calendar={v.calendars} />
                ))}
            </AccordionDetails>
        </Accordion>
    );
}