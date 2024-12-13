import Paper from "@mui/material/Paper";
import Box from '@mui/material/Box';
import Typography from "@mui/material/Typography";

import { DataGrid } from '@mui/x-data-grid';

import createClient from "@/utils/supabase/server";
import AddMemberModal from "./addMemberModal";



export default async function MemberList({teamId}) {
    const supabase = await createClient();

    // get email of team members
    const { data, error } = await supabase.rpc('get_team_members_emails', { tid: teamId });

    // rows and columns
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
            elevation={0} 
            sx={{
                borderRadius:3, boxSizing:'border-box', border:'1px solid', borderColor: 'grey.300',
                p:'1rem', height:'100%', 
                display:'flex', flexDirection:'column'
            }}
            >
            {/* Title section */}
            <Box sx={{display:'flex', alignItems:'center'}}>
                {/* title */}
                <Typography variant="h6">Members:</Typography>
                {/* button */}
                <AddMemberModal profiles={data} teamId={teamId} />
            </Box>
            {/* data grid */}
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
                            },
                            '& .MuiDataGrid-withBorderColor': {
                                border:0
                            },
                            border:0
                        }}
                        />
                </Box>
            </Box>
            
        </Paper>
    )
}
