'use client'

import createClient from "@/utils/supabase/client";
import Box from "@mui/material/Box";


import { DataGrid } from '@mui/x-data-grid';
import { useEffect, useState } from "react";



export default function AgendaList({teamId}) {
    const supabase = createClient();
    const [agendas, setAgendas] = useState();

    // get agendas
    useEffect(() => {
        async function getAgendas() {
            const {data: a, error} = await supabase
                .from('agendas')
                .select()
                .eq('team_id', teamId);

            setAgendas(a);
        }

        getAgendas();
    }, []);

    
    
    const columns = [
        // {field: 'id', headerName: 'id', flex:0 },
        { field: 'focus', headerName: 'Focus', flex:2 },
        { field: 'date', headerName: 'Date', flex:1 },
        { field: 'start_time', headerName: 'Start', valueFormatter: readableTime, flex:1 },
        { field: 'end_time', headerName: 'End', valueFormatter: readableTime, flex:1 },
    ]

    const rows = agendas?.map(({date, start_time, end_time, focus}, i) => ({
        id:i,
        date,
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

    return (
        <Box sx={{height:'100%', width:'100%'}}>
            <DataGrid 
                columns={columns} rows={rows} 
                checkboxSelection
                autoPageSize
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
        </Box>
    )
}
