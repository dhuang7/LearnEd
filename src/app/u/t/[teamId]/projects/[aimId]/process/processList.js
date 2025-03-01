'use client'

import createClient from "@/utils/supabase/client";
import Box from "@mui/material/Box";
import EditRoundedIcon from '@mui/icons-material/EditRounded';


import {
    DataGrid,
    GridToolbarContainer,
    GridToolbarColumnsButton,
    GridToolbarFilterButton,
    GridToolbarQuickFilter,
    GridActionsCellItem
} from '@mui/x-data-grid';
import EditProcessSideView from "./editProcessSideView";
import { useState } from "react";
import AddProcessSideView from "./addProcessSideView";
import { useRouter } from "next/navigation";



export default function ProcessList({processMaps, aimId}) {
    const supabase = createClient();
    const router = useRouter();
    const [open, setOpen] = useState(false);
    // const [currCycles, setCurrCycles] = useState(cycles);
    const [currProcess, setCurrProcess] = useState(processMaps[0]);
    // const [cycle, setCycle] = useState(null);

    // handlers
    function handleGoToProcess(params, event, details) {
        router.push('process/' + params.row.id)
    } 

    
    const columns = [
        // {field: 'id', headerName: 'id', flex:0 },
        { field: 'name', headerName: 'Process Name', flex:1 },
        { field: 'description', headerName: 'Description', flex:2 },
        { field: 'terminal', headerName: '# of Terminals', flex:1 },
        { field: 'process', headerName: '# of Processes', flex:1 },
        { field: 'decision', headerName: '# of Decisions', flex:1 },
        {
            field: 'actions',
            type: 'actions',
            width:15,
            getActions: (params) => [
                <GridActionsCellItem
                    icon={<EditRoundedIcon />}
                    label="Edit"
                    onClick={() => handleEditProcess(params.row)}
                    />
            ],
        },
    ]

    const rows = processMaps?.map((pm) => ({
        id: pm.id,
        name: pm.name,
        description: pm.description,
        terminal: pm.process_nodes.filter(v => v.type === 'terminal')[0]?.count||0,
        process: pm.process_nodes.filter(v => v.type === 'process')[0]?.count||0,
        decision: pm.process_nodes.filter(v => v.type === 'decision')[0]?.count||0,
    }));


    function handleEditProcess(process) {
        setOpen(true);
        setCurrProcess(process);
    }
    
    return (
        <Box sx={{height:'100%', width:'100%'}}>
            <DataGrid 
                columns={columns} rows={rows} 
                // checkboxSelection
                autoPageSize
                onRowClick={handleGoToProcess}
                slots={{ toolbar: () => <CustomToolbar aimId={aimId} /> }}
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
            <EditProcessSideView processMap={currProcess} open={open} setOpen={setOpen} />
        </Box>
    )
}


export function CustomToolbar({aimId}) {
    return (
        <GridToolbarContainer>
            <GridToolbarColumnsButton />
            <GridToolbarFilterButton sx={{mr:'auto'}} />
            <AddProcessSideView aimId={aimId} />
            <GridToolbarQuickFilter variant="standard" sx={{p:0}}/>
        </GridToolbarContainer>
    );
}