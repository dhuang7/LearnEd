'use client'

import createClient from "@/utils/supabase/client";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import StarRoundedIcon from '@mui/icons-material/StarRounded';
import StarOutlineRoundedIcon from '@mui/icons-material/StarOutlineRounded';


import {
    DataGrid,
    GridToolbarContainer,
    GridToolbarColumnsButton,
    GridToolbarFilterButton,
    GridToolbarQuickFilter,
} from '@mui/x-data-grid';
import { useState } from "react";
import { useRouter } from "next/navigation";
import AddChangeIdeaSideView from "./addChangeIdeaSideView";
import EditChangeIdeaSideView from "./editChangeIdeaSideView";
// import AddMeasureSideView from "./addMeasureSideView";
// import EditMeasureSideView from "./editMeasureSideView";



export default function ChangeIdeaList({changeIdeas, aimId, teamId}) {
    const [open, setOpen] = useState(false);
    const [currChangeIdea, setCurrChangeIdea] = useState(changeIdeas[0]);

    
    const columns = [
        // {field: 'id', headerName: 'id', flex:0 },
        { field: 'package_name', headerName: 'Package Name', flex:1 },
        { field: 'package_description', headerName: 'Description', flex:2 },
        { 
            field: 'rating', 
            headerName: 'Rating', 
            renderCell: (params) => (
                <Box sx={{height:'100%', display:'flex', alignItems:'center'}}>
                    <Rating 
                        value={params.formattedValue} 
                        readOnly 
                        icon={<StarRoundedIcon fontSize='inherit' />}
                        emptyIcon={<StarOutlineRoundedIcon fontSize='inherit'  />}
                        precision={.5}
                        />
                </Box>
            ),
            flex:1 
        },
        { field: 'conclusions', headerName: 'Conclusions', flex:2 },
    ]

    const rows = changeIdeas?.map((ci) => ({
        id: ci.id,
        package_name: ci.change_packages.name,
        package_description: ci.change_packages.description,
        rating: ci.rating,
        conclusions: ci.conclusions,
    }));


    function handleEditChangeIdea(row) {
        setOpen(true);
        setCurrChangeIdea(changeIdeas.filter(v => v.id === row.id)[0]);
    }
    
    return (
        <Box sx={{height:'100%', width:'100%'}}>
            <DataGrid 
                columns={columns} rows={rows} 
                // checkboxSelection
                autoPageSize
                onRowClick={(params) => handleEditChangeIdea(params.row)}
                slots={{ toolbar: () => <CustomToolbar aimId={aimId} teamId={teamId} /> }}
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
            <EditChangeIdeaSideView changeIdea={currChangeIdea} open={open} setOpen={setOpen} />
        </Box>
    )
}


export function CustomToolbar({aimId, teamId}) {
    return (
        <GridToolbarContainer>
            <GridToolbarColumnsButton />
            <GridToolbarFilterButton sx={{mr:'auto'}} />
            <AddChangeIdeaSideView aimId={aimId} teamId={teamId} />
            <GridToolbarQuickFilter variant="standard" sx={{p:0}}/>
        </GridToolbarContainer>
    );
}