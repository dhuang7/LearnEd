'use client'

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import CalendarPage from "./calendarPage";
import { useEffect, useRef, useState } from "react";
import SideMenuCalendar from "./sideMenuCalendar";
import AddEventSideview from "./addEventSideview";




export default function PageContent({calendarData, user, teamId}) {
    const calendarRef = useRef();
    const [calendar, setCalendar] = useState();
    const [rerender, setRerender] = useState();

    useEffect(() => {
        setCalendar(calendarRef.current?.getApi());
    }, [calendarRef.current])

    function handleRerender() {
        setRerender(r=>!r);
    }

    return (
        <>
            {/* title */}
            <Box sx={{width:'100%', p:'1rem', pb:0, boxSizing:'border-box'}}>
                <Box sx={{width:'100%', display:'flex', justifyContent:'space-between', alignItems:'center'}}>
                    <Typography variant='h4'>Calendar</Typography>
                    <AddEventSideview calendarData={calendarData} user={user} />
                </Box>
            </Box>
            {/* norms */}
            <Box sx={{width:'100%',  flexGrow:1, overflow:'hidden'}}>
                <Box sx={{width:'100%', height:'100%', display:'flex'}}>
                    {/* side dash */}
                    <Box sx={{width:'17.5rem', height:'100%', pt:'.5rem', pb:'1rem', pl:'1rem', pr:'.5rem', boxSizing:'border-box'}}>
                        {/* side calendar */}
                        <SideMenuCalendar 
                            calendar={calendar} 
                            rerender={rerender} handleRerender={handleRerender} 
                            calendarData={calendarData} 
                            user={user}
                            teamId={teamId}
                            />
                    </Box>
                    {/* Main calendar */}
                    <Box sx={{flexGrow:1, height:'100%', overflow:'hidden'}}>
                        <Box sx={{width:'100%', height:'100%', pt:'.5rem', pr:'1rem', pl:'.5rem', boxSizing:'border-box', pb:'1rem'}}>
                            <CalendarPage ref={calendarRef} user={user} calendar={calendar} calendarData={calendarData} handleRerender={handleRerender} />
                        </Box>
                    </Box>
                </Box>
            </Box>
        </>
    );
}