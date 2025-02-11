import createClient from "@/utils/supabase/server";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import DeleteTeam from "./deleteTeam";
import SettingsInfo from "./settingsInfo";



export default async function Settings({params}) {
    const teamId = (await params).teamId;
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    let { data: [team], error } = await supabase
        .from('teams')
        .select('*')
        .eq('id', teamId);
    
    return (
        <Box sx={{display:'flex', flexDirection:'column', width:'100%', height:'100%', boxSizing:'border-box'}}>
            {/* title */}
            <Box sx={{width:'100%', p:'1rem', pb:0, boxSizing:'border-box'}}>
                <Box sx={{width:'100%', display:'flex', justifyContent:'space-between', alignItems:'center'}}>
                    <Typography variant='h4'>Team Settings</Typography>
                    <DeleteTeam teamId={teamId} />
                </Box>
            </Box>
            {/* content profile */}
            <Box sx={{flexGrow:1, width:'100%', overflow:'hidden'}}>
                <Box sx={{width:'100%', height:'100%', boxSizing:'border-box', p:'1rem', pt:'.5rem'}}>
                    <SettingsInfo team={team} />
                </Box>
            </Box>
        </Box>
    )
}
