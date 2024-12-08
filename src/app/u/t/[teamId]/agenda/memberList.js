import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import PersonAddRoundedIcon from '@mui/icons-material/PersonAddRounded';
import Box from '@mui/material/Box';
import Typography from "@mui/material/Typography";

import { DataGrid } from '@mui/x-data-grid';

import createClient from "@/utils/supabase/server";



export default async function MemberList({teamId}) {
    const supabase = await createClient();

    const { data, error } = await supabase.rpc('get_team_members_emails', { tid: teamId });

    const columns = [
        { field: 'name', headerName: 'Name', flex:0, minWidth:150 },
        { field: 'email', headerName: 'Email', flex:1, minWidth:150 },
    ];

    const rows = data?.map(({first_name, last_name, email}, i) => ({
        id:i,
        name: `${first_name} ${last_name}`,
        email
    }));
    

    return (
        <Paper 
            elevation={3} 
            sx={{
                borderRadius:3, boxSizing:'border-box', 
                p:'1rem', height:'100%', 
                display:'flex', flexDirection:'column'
            }}
            >
            <Box sx={{display:'flex', alignItems:'center'}}>
                <Typography variant="h6">Members:</Typography>
                <IconButton color='primary'><PersonAddRoundedIcon /></IconButton>
            </Box>
            <Box sx={{flexGrow:1, overflow:'hidden'}}>
                <Box sx={{height:'100%'}}>
                    <DataGrid 
                        columns={columns} rows={rows} 
                        density="compact" 
                        autoPageSize
                        sx={{
                            '& .MuiTablePagination-root': {
                                height:'39px'
                            },
                            '& .MuiDataGrid-footerContainer': {
                                height:'39px',
                                minHeight:0,
                            },
                            '& .MuiToolbar-root': {
                                minHeight:0,
                            },
                            '& .MuiTablePagination-selectLabel': {
                                m:0,
                            },
                            '& .MuiTablePagination-displayedRows': {
                                m:0
                            }
                        }}
                        />
                </Box>
            </Box>
            
        </Paper>
    )
}
