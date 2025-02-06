import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

import Kanban from "./kanban";
import AddTaskSideview from "./addTaskSideview";
import createClient from "@/utils/supabase/server";



export default async function Tasks({users}) {
    const supabase = await createClient();

    const {data, error} = await supabase
        .from('tasks')
        .select()
        .order('status')
        .order('order_num');

    const {data: [user], error: userError} = await supabase
        .from('profiles')
        .select();
    

    const teamMembers = users || [user];

    return (
        <Box sx={{width:'100%', height:'100%', display:'flex', flexDirection:'column'}}>
            {/* title */}
            <Box sx={{width:'100%', p:'1rem', pb:0, boxSizing:'border-box'}}>
                <Box sx={{width:'100%', display:'flex', justifyContent:'space-between', alignItems:'center'}}>
                    <Typography variant='h4'>Tasks</Typography>
                    {/* Add task button */}
                    <AddTaskSideview teamMembers={teamMembers} user={user} tasks={data} />
                </Box>
            </Box>
            {/* paper */}
            <Box sx={{width:'100%',  flexGrow:1, overflow:'hidden'}}>
                <Box sx={{width:'100%', height:'100%', pb:'1rem', pt:'.5rem', boxSizing: 'border-box'}}>
                    <Kanban originalTasks={data} teamMembers={teamMembers} user={user} />
                </Box>
            </Box>
        </Box>
    )
}
