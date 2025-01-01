'use client'

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import CalendarPage from "./calendarPage";
import { useRef } from "react";
import AddEventModal from "./addEventModal";
import SideMenuCalendar from "./sideMenuCalendar";




export default function PageContent() {
    const calendarRef = useRef();

    return (
        <>
            {/* title */}
            <Box sx={{width:'100%', p:'1rem', pb:0, boxSizing:'border-box'}}>
                <Box sx={{width:'100%', display:'flex', justifyContent:'space-between', alignItems:'center'}}>
                    <Typography variant='h4'>Calendar</Typography>
                    <AddEventModal />
                </Box>
            </Box>
            {/* norms */}
            <Box sx={{width:'100%',  flexGrow:1, overflow:'hidden'}}>
                <Box sx={{width:'100%', height:'100%', display:'flex'}}>
                    {/* side dash */}
                    <Box sx={{width:'20%', height:'100%', pt:'.5rem', pb:'1rem', pl:'1rem', pr:'.5rem', boxSizing:'border-box'}}>
                        {/* side calendar */}
                        <SideMenuCalendar />
                    </Box>
                    {/* Main calendar */}
                    <Box sx={{flexGrow:1, height:'100%', overflow:'hidden'}}>
                        <Box sx={{width:'100%', height:'100%', pt:'.5rem', pr:'1rem', pl:'.5rem', boxSizing:'border-box', pb:'1rem'}}>
                            <CalendarPage ref={calendarRef} />
                        </Box>
                    </Box>
                </Box>
            </Box>
        </>
    );
}