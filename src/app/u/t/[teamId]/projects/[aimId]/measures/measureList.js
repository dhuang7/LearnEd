'use client'

import createClient from "@/utils/supabase/client";
import Box from "@mui/material/Box";


import {
    DataGrid,
    GridToolbarContainer,
    GridToolbarColumnsButton,
    GridToolbarFilterButton,
    GridToolbarQuickFilter,
} from '@mui/x-data-grid';
import { useState } from "react";
import { useRouter } from "next/navigation";
import AddMeasureSideView from "./addMeasureSideView";
import EditMeasureSideView from "./editMeasureSideView";



export default function MeasureList({measureTypes, aimId}) {
    const supabase = createClient();
    const router = useRouter();
    const [open, setOpen] = useState(false);
    // const [currCycles, setCurrCycles] = useState(cycles);
    const [currMeasure, setCurrMeasure] = useState(measureTypes[0]);
    // const [cycle, setCycle] = useState(null);

    
    const columns = [
        // {field: 'id', headerName: 'id', flex:0 },
        { field: 'name', headerName: 'Measure Name', flex:1 },
        { field: 'description', headerName: 'Description', flex:2 },
        { 
            field: 'measure_type', 
            headerName: 'Measure Type', 
            valueGetter: value => capitalizeFirstLetter(value), 
            flex:1 
        },
        { field: 'aim_num', headerName: '# of Aims', flex:0 },
        { field: 'primary_driver_num', headerName: '# of Primary', flex:0 },
        { field: 'secondary_driver_num', headerName: '# of Secondary', flex:0 },
        { field: 'change_idea_num', headerName: '# of Change Ideas', flex:0 },
        { field: 'cycle_num', headerName: '# of Cycles', flex:0 },
        // { field: 'terminal', headerName: '# of Terminals', flex:1 },
        // { field: 'process', headerName: '# of Processes', flex:1 },
        // { field: 'decision', headerName: '# of Decisions', flex:1 },
        // {
        //     field: 'actions',
        //     type: 'actions',
        //     flex:0,
        //     getActions: (params) => [
        //         <GridActionsCellItem
        //             icon={<VisibilityRoundedIcon />}
        //             label="View map"
        //             onClick={() => handleGoToProcess(params)}
        //             />,
        //         <GridActionsCellItem
        //             icon={<EditRoundedIcon />}
        //             label="Edit"
        //             onClick={() => handleEditProcess(params.row)}
        //             />
        //     ],
        // },
    ]

    const rows = measureTypes?.map((mt) => ({
        id: mt.id,
        name: mt.name,
        description: mt.description,
        measure_type: mt.measure_type,
        aim_num: mt. aim_measures[0].count,
        primary_driver_num: mt. primary_driver_measures[0].count,
        secondary_driver_num: mt. secondary_driver_measures[0].count,
        change_idea_num: mt. change_idea_measures[0].count,
        cycle_num: mt. cycle_measures[0].count,
        // terminal: mt.process_nodes.filter(v => v.type === 'terminal')[0]?.count||0,
        // process: mt.process_nodes.filter(v => v.type === 'process')[0]?.count||0,
        // decision: mt.process_nodes.filter(v => v.type === 'decision')[0]?.count||0,
    }));


    function handleEditMeasure(measure) {
        setOpen(true);
        setCurrMeasure(measure);
    }
    
    return (
        <Box sx={{height:'100%', width:'100%'}}>
            <DataGrid 
                columns={columns} rows={rows} 
                // checkboxSelection
                autoPageSize
                onRowClick={(params) => handleEditMeasure(params.row)}
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
            <EditMeasureSideView measureType={currMeasure} open={open} setOpen={setOpen} />
        </Box>
    )
}


export function CustomToolbar({aimId}) {
    return (
        <GridToolbarContainer>
            <GridToolbarColumnsButton />
            <GridToolbarFilterButton sx={{mr:'auto'}} />
            <AddMeasureSideView aimId={aimId} />
            <GridToolbarQuickFilter variant="standard" sx={{p:0}}/>
        </GridToolbarContainer>
    );
}


function capitalizeFirstLetter(val) {
    return String(val).charAt(0).toUpperCase() + String(val).slice(1);
}