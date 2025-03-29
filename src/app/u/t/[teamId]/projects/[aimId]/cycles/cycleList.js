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
import EditCycleModal from "./editCycleModal";
import dayjs from "dayjs";



export default function CycleList({cycles, changeIdeas, aimId}) {
    const supabase = createClient();
    const [open, setOpen] = useState(false);
    const [currCycles, setCurrCycles] = useState(cycles);
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
        setCycle(params.row.cycle)
    } 
    
    const columns = [
        // {field: 'id', headerName: 'id', flex:0 },
        { field: 'name', headerName: 'Change Name', flex:1 },
        { 
            field: 'user', 
            headerName: 'User', 
            renderCell: (params) => (
                <Chip size='small' label={params.formattedValue} sx={{backgroundColor:'grey.500', color:'common.white'}} />
            ),
            flex:1
        },
        { field: 'description', headerName: 'Description', flex:1 },
        { 
            field: 'stage', 
            headerName: 'Stage', 
            valueFormatter: (str) => str.charAt(0).toUpperCase() + str.slice(1),
            renderCell: (params) => (
                <Chip size="small" label={params.formattedValue} sx={{backgroundColor:color[params.formattedValue], color:'common.white'}} />
            ),
            flex:1
        },
        { field: 'objective', headerName: 'Cycle Objective', flex:2 },
        { field: 'plan_due_date', headerName: 'Due Date', valueFormatter: v => v ? dayjs(v).format('MM-DD-YYYY') : 'No date', flex:1 },
        { field: 'act_choice', headerName: 'Next Step', flex:1 },
    ]

    const rows = currCycles?.map((cycle) => ({
        id: cycle.id,
        name: cycle.change_ideas.change_packages.name,
        user: cycle.user_email,
        description: cycle.change_ideas.change_packages.description,
        stage: cycle.stage,
        objective: cycle.objective,
        plan_due_date: cycle.events?.start_time||null,
        act_choice: cycle.act_choice,
        cycle,
    }));
    
    return (
        <Box sx={{height:'100%', width:'100%'}}>
            <DataGrid 
                columns={columns} rows={rows} 
                // checkboxSelection
                // autoPageSize
                pageSizeOptions={[100]}
                onRowClick={handleOpenCycle}
                slots={{ toolbar: () => <CustomToolbar setCurrCycles={setCurrCycles} aimId={aimId} changeIdeas={changeIdeas}/> }}
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
            <EditCycleModal cycle={cycle} setCurrCycles={setCurrCycles} aimId={aimId} changeIdeas={changeIdeas} open={open} setOpen={setOpen}  />
        </Box>
    )
}


export function CustomToolbar({setCurrCycles, aimId, changeIdeas}) {
    return (
        <GridToolbarContainer>
            <GridToolbarColumnsButton />
            <GridToolbarFilterButton />
            <AddCycleModal setCurrCycles={setCurrCycles} aimId={aimId} changeIdeas={changeIdeas} />
            <GridToolbarQuickFilter variant="standard" sx={{p:0}}/>
        </GridToolbarContainer>
    );
}