import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import AimColumn from "./aimColumn";
import createClient from "@/utils/supabase/server";
import GraphFlow from "./graphFlow";



export default async function Drivers({params}) {
    const teamId = (await params).teamId;
    const supabase = await createClient();

    const {data: projects, error} = await supabase
        .from('projects')
        .select()
        .eq('team_id', teamId);

    return (
        <Paper 
            elevation={0} 
            sx={{
                borderRadius:3, boxSizing:'border-box', border:'1px solid', borderColor: 'grey.300',
                p:'1rem', height:'100%',
                display:'flex', flexDirection:'column'
            }}
            >
                <GraphFlow />
                {/* column titles */}
                {/* <Box sx={{width:'100%', display:'flex'}}>
                    {['Aim', 'Primary Drivers', 'Secondary Drivers', 'Change Ideas'].map((title, i) => (
                        <Typography key={i} variant="h6" color='textSecondary' align="center" sx={{width:'25%'}}>
                            {title}
                        </Typography>
                    ))}
                </Box> */}
                {/* containers for the columns of the graph */}
                {/* <Box sx={{flexGrow:1, overflow:'hidden'}}>
                    <Box sx={{height:'100%', width:'100%', overflow:'scroll'}}>
                        <Box sx={{display:'flex', alignItems:'center', minHeight:'100%'}}>
                            <Box sx={{width:'25%'}}>
                                <AimColumn teamId={teamId} project={projects[0]} />
                            </Box>
                            <Box sx={{width:'25%'}}>
                                {2}
                            </Box>
                            <Box sx={{width:'25%'}}>
                                {3}
                            </Box>
                            <Box sx={{width:'25%'}}>
                                {4}
                            </Box>
                        </Box>
                    </Box>
                    
                </Box> */}
        </Paper>
    )
}
