'use client'

import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";

import dayjs from "dayjs";
import { DateCalendar } from "@mui/x-date-pickers";



export default function SideMenuCalendar() {
    

    return (
        <Paper 
            elevation={0} 
            sx={{
                borderRadius:3, boxSizing:'border-box', border:'1px solid', borderColor: 'grey.300',
                p:'.5rem', height:'100%', 
                display:'flex', flexDirection:'column'
            }}
            >
            {/* small calendar */}
            <Box sx={{width:'100%'}}>
                <DateCalendar 
                    sx={{
                        width:'100%',
                        height:'auto',
                    }}
                    />
                (work in progress)
            </Box>
        </Paper>
    );
}