import createClient from "@/utils/supabase/server";
import { Typography } from "@mui/material";
import Box from "@mui/material/Box";
import DeleteTeam from "./deleteTeam";



export default async function Profile({params}) {
    const teamId = (await params).teamId;
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    let { data: [team], error } = await supabase
        .from('teams')
        .select('*')
        .eq('id', teamId);
    
    return (
        <Box sx={{pt:'1rem', px:'1rem'}}>
            {/* title */}
            <Typography variant="h3">Team Settings</Typography>
            {/* content profile */}
            <Box sx={{pl:'1rem'}}>
                <Typography variant="body1"><b>Team Name: </b>{team.name}</Typography>
                <DeleteTeam teamId={teamId} />
            </Box>
        </Box>
    )
}
