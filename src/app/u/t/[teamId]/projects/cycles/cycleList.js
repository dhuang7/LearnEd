'use client'

import createClient from "@/utils/supabase/client";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";



import {
    DataGrid,
    GridToolbarContainer,
    GridToolbarColumnsButton,
    GridToolbarFilterButton,
    GridToolbarQuickFilter
} from '@mui/x-data-grid';
import { useState } from "react";
import AddCycleModal from "./addCycleModal";



export default function CycleList({teamId, cycles}) {
    const supabase = createClient();
    const [open, setOpen] = useState(false);
    const [cycle, setCycle] = useState(null);
    const color = {
        'Plan': 'Chocolate',
        'Do': 'RoyalBlue',
        'Study': 'ForestGreen',
        'Act': 'Crimson',
        'Completed': 'grey.700'
    }

    // handlers
    function handleOpenCycle(params, event, details) {
        setOpen(true);
        setCycle(params.row)
    } 
    
    const columns = [
        // {field: 'id', headerName: 'id', flex:0 },
        { field: 'name', headerName: 'Change Name', flex:1 },
        { field: 'description', headerName: 'Description', flex:1 },
        { 
            field: 'stage', 
            headerName: 'Stage', 
            valueFormatter: (str) => str.charAt(0).toUpperCase() + str.slice(1),
            renderCell: (params) => (
                <Chip label={params.formattedValue} sx={{backgroundColor:color[params.formattedValue], color:'common.white'}} />
            ),
            flex:1
        },
        { field: 'objective', headerName: 'Cycle Objective', flex:2 },
        { field: 'plan_due_date', headerName: 'Due Date', valueFormatter: readableDate, flex:1 },
        { field: 'act_choice', headerName: 'Next Step', flex:1 },
    ]

    const rows = cycles?.map(({id, objective, stage, plan_due_date, act_choice, change_ideas: {change_packages: {name, description}}}) => ({
        id,
        name,
        description,
        stage,
        objective,
        plan_due_date,
        act_choice,
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
                slots={{ toolbar: () => <CustomToolbar cycles={cycles} /> }}
                slotProps={{
                    toolbar: {
                        showQuickFilter: true,
                    },
                }}
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


export function CustomToolbar({cycles}) {
    return (
        <GridToolbarContainer>
            <GridToolbarColumnsButton />
            <GridToolbarFilterButton />
            <AddCycleModal cycles={cycles} />
            <GridToolbarQuickFilter variant="standard" sx={{p:0}}/>
        </GridToolbarContainer>
    );
}