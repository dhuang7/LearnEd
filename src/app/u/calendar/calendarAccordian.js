'use client'

import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import AddRoundedIcon from '@mui/icons-material/AddRounded';



export default function CalendarAccordian() {

    function handleAddCalendar(e) {
        e.stopPropagation();
    }

    return (
        <Accordion
            disableGutters
            defaultExpanded
            sx={{
                boxShadow:0,
            }}
            >
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
                <Typography variant="body2" sx={{fontWeight:'bold', mr:'auto'}}>My Calendars</Typography>
                <IconButton size="small" onClick={handleAddCalendar}><AddRoundedIcon fontSize="small" /></IconButton>
            </AccordionSummary>
            <AccordionDetails sx={{py:0}}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                malesuada lacus ex, sit amet blandit leo lobortis eget.
            </AccordionDetails>
        </Accordion>
    );
}