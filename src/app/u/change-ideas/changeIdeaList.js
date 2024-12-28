'use client'

import createClient from "@/utils/supabase/client";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import StarRoundedIcon from '@mui/icons-material/StarRounded';
import StarOutlineRoundedIcon from '@mui/icons-material/StarOutlineRounded';
import Chip from '@mui/material/Chip';




import {
    DataGrid,
    GridToolbarContainer,
    GridToolbarColumnsButton,
    GridToolbarFilterButton,
    GridToolbarQuickFilter
} from '@mui/x-data-grid';
import { useState } from "react";
import ViewPackageModal from "./viewPackageModal";



export default function ChangeIdeaList({changePackages, projects}) {
    const supabase = createClient();
    const [open, setOpen] = useState(false);
    const [changePackage, setChangePackage] = useState(null);
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
        setChangePackage(params.row)
    } 
    
    const columns = [
        // {field: 'id', headerName: 'id', flex:0 },
        { field: 'name', headerName: 'Change Name', flex:1 },
        { field: 'description', headerName: 'Description', flex:2 },
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
        { field: 'num_cycles', headerName: '# of Cycles', flex:1 },
        { 
            field: 'tags', 
            headerName: 'Tags', 
            valueGetter: (value, row) => [...(value.p||[]), ...(value.s||[])].join(' '),
            renderCell: (params) => (
                <Box sx={{width:'100%', overflow:'scroll'}}>
                    <Box sx={{display:'flex', flexWrap:'wrap'}}>
                        {params.row.tags.p?.map((v,i) => (
                            <Box key={i} sx={{boxSizing:'border-box', display:'flex', p:'.125rem'}}>
                                <Chip 
                                    label={v} size="small" 
                                    sx={{
                                        backgroundColor:'royalBlue', color:'common.white',
                                    }} 
                                    />
                            </Box>
                        ))}
                        {params.row.tags.s?.map((v,i) => (
                            <Box key={i} sx={{boxSizing:'border-box', display:'flex', p:'.125rem'}}>
                                <Chip 
                                    label={v} size="small" 
                                    sx={{
                                        backgroundColor:'forestGreen', color:'common.white',
                                    }} 
                                    />
                            </Box>
                        ))}
                    </Box>
                </Box>
            ),
            flex:1 
        },
    ]

    const rows = changePackages?.map((cp,i) => ({
        id: cp.id,
        name: cp.name,
        description: cp.description,
        rating: cp.rating,
        num_cycles: cp.num_cycles,
        tags: {p: cp.primary_drivers, s: cp.secondary_drivers},
    }));

    

    

    return (
        <Box sx={{height:'100%', width:'100%'}}>
            <DataGrid 
                columns={columns} rows={rows} 
                // checkboxSelection
                autoPageSize
                onRowClick={handleOpenCycle}
                slots={{ toolbar: () => <CustomToolbar /> }}
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
            <ViewPackageModal open={open} setOpen={setOpen} changePackage={changePackage} projects={projects} />
        </Box>
    )
}


export function CustomToolbar() {
    return (
        <GridToolbarContainer>
            <GridToolbarColumnsButton />
            <GridToolbarFilterButton />
            <GridToolbarQuickFilter variant="standard" sx={{p:0, ml:'auto'}}/>
        </GridToolbarContainer>
    );
}