import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

import AddTaskSideview from "./addTaskSideview";
import createClient from "@/utils/supabase/server";
import PageClient from "./pageClient";



export default async function Tasks({teamId, users}) {
    const supabase = await createClient();
    let data;
    let {data: teams} = await supabase
        .from('teams')
        .select();

    
    if (teamId) {
        data = (await supabase
            .from('tasks')
            .select()
            .order('status')
            .order('order_num')
            .eq('team_id', teamId)).data;
    } else {
        data = (await supabase
            .from('tasks')
            .select(`
                *,
                teams(*)
            `)
            .order('status')
            .order('order_num')).data;
    }

    const {data: [user], error: userError} = await supabase
        .from('profiles')
        .select();

    const teamMembers = users || (await supabase.rpc('get_users_on_same_team')).data;

    return (
        <Box sx={{width:'100%', height:'100%', display:'flex', flexDirection:'column'}}>
            {/* title */}
            <Box sx={{width:'100%', p:'1rem', pb:0, boxSizing:'border-box'}}>
                <Box sx={{width:'100%', display:'flex', justifyContent:'space-between', alignItems:'center'}}>
                    <Typography variant='h4'>Tasks</Typography>
                    {/* Add task button */}
                    <AddTaskSideview teamMembers={teamMembers} user={user} tasks={data} teamId={teamId} teams={teams} />
                </Box>
            </Box>
            {/* paper */}
            <Box sx={{width:'100%',  flexGrow:1, overflow:'hidden'}}>
                <Box sx={{width:'100%', height:'100%', display:'flex'}}>
                    <PageClient tasks={data} teamId={teamId} teamMembers={teamMembers} user={user} teams={teams} />
                </Box>
            </Box>
            
        </Box>
    )
}
