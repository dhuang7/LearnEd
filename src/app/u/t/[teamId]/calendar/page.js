import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";


import createClient from "@/utils/supabase/server";
import CalendarPage from "./calendarPage";




export default async function Calendar({params}) {
    const teamId = (await params).teamId;

    const supabase = await createClient();

    const {data: agendas, error: agendasError} = await supabase
        .from('agendas')
        .select()
        .eq('team_id', teamId);

    return (
        <Box sx={{width:'100%', height:'100%', display:'flex', flexDirection:'column'}}>
            {/* title */}
            <Box sx={{width:'100%', p:'1rem', pb:0, boxSizing:'border-box'}}>
                <Box sx={{width:'100%', display:'flex', justifyContent:'space-between', alignItems:'center'}}>
                    <Typography variant='h4'>Calendar</Typography>
                </Box>
            </Box>
            {/* norms */}
            <Box sx={{width:'100%',  flexGrow:1, overflow:'hidden'}}>
                <Box sx={{width:'100%', height:'100%', display:'flex'}}>
                    {/* side dash */}
                    <Box sx={{width:'20%', height:'100%', pt:'.5rem', pb:'1rem', pl:'1rem', pr:'.5rem', boxSizing:'border-box'}}>
                        {/* side calendar */}
                        <Paper 
                            elevation={0} 
                            sx={{
                                borderRadius:3, boxSizing:'border-box', border:'1px solid', borderColor: 'grey.300',
                                p:'1rem', height:'100%', 
                                display:'flex', flexDirection:'column'
                            }}
                            >
                                (Work in progress)
                        </Paper>
                    </Box>
                    {/* Main calendar */}
                    <Box sx={{flexGrow:1, height:'100%', overflow:'hidden'}}>
                        <Box sx={{width:'100%', height:'100%', pt:'.5rem', pr:'1rem', pl:'.5rem', boxSizing:'border-box', pb:'1rem'}}>
                            <CalendarPage agendas={agendas} />
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}
