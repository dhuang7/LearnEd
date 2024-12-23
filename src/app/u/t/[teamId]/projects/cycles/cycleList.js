'use client'

import createClient from "@/utils/supabase/client";
import Box from "@mui/material/Box";


import { DataGrid } from '@mui/x-data-grid';
import { useState } from "react";



export default function CycleList({teamId, cycles}) {
    const supabase = createClient();
    const [open, setOpen] = useState(false);
    const [cycle, setCycle] = useState(null);

    // handlers
    function handleOpenCycle(params, event, details) {
        setOpen(true);
        setCycle(params.row)
    } 
    
    const columns = [
        // {field: 'id', headerName: 'id', flex:0 },
        { field: 'focus', headerName: 'Aim', flex:2 },
        { field: 'date', headerName: 'Date', valueFormatter: readableDate, flex:1 },
        { field: 'start_time', headerName: 'Start', valueFormatter: readableTime, flex:1 },
        { field: 'end_time', headerName: 'End', valueFormatter: readableTime, flex:1 },
    ]

    const rows = cycles?.map(({id, date, start_time, end_time, focus}) => ({
        id,
        date: start_time,
        start_time,
        end_time,
        focus,
    }));

    // converts time to readable time
    function readableTime(timestampz) {
        // Convert to a Date object
        const date = new Date(timestampz);

        // Format the time to a readable format with AM/PM
        const options = { hour: 'numeric', minute: 'numeric', hour12: true };
        return date.toLocaleTimeString('en-US', options);
    }

    // converts time to readable date
    function readableDate(timestampz) {
        // Convert to a Date object
        const date = new Date(timestampz);
    
        // Get month, day, and year
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based
        const day = String(date.getDate()).padStart(2, '0');
        const year = date.getFullYear();
    
        // Return formatted date
        return `${month}-${day}-${year}`;
    }

    



    return (
        <Box sx={{height:'100%', width:'100%'}}>
            <DataGrid 
                columns={columns} rows={rows} 
                // checkboxSelection
                autoPageSize
                onRowClick={handleOpenCycle}
                sx={{
                    '& .MuiDataGrid-cell:hover': {
                        color: 'primary.main',
                    },
                    '& .MuiDataGrid-container--top [role=row]': {
                        borderTopRadius:3,
                    },
                    border:'1px solid', borderColor: 'grey.300',
                    borderRadius:3,
                    backgroundColor:'common.white',
                }}
                />
            {/* <EditAgendaModal teamId={teamId} open={open} setOpen={setOpen} agenda={agenda} /> */}
        </Box>
    )
}
