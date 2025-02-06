import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";


import MemberList from "./memberList";
import NormsList from "./normsList";

import createClient from "@/utils/supabase/server";
import CyclesTasks from "./cyclesTasks";
import CalendarList from "./calendarList";




export default async function Agenda({params}) {
    const teamId = (await params).teamId;

    const supabase = await createClient();

    let { data: normsList, error: normsError } = await supabase
        .from('norms')
        .select('*')
        .eq('team_id', teamId);

    const {data: cycles, error: cyclesError} = await supabase
        .from('pdsa_cycles')
        .select(`
            id.count(),
            stage,
            change_ideas(
                projects(
                    team_id
                )
            )
        `)
        .eq('change_ideas.projects.team_id', teamId)
        .not('change_ideas.projects', 'is', null)
        .not('change_ideas', 'is', null)
        .order('stage');

    // get user profile
    const { data: [user] } = await supabase
        .from('profiles')
        .select();

    // get all calendars
    const {data: calendarData, error: calendarDataErrors} = await supabase
        .from('calendar_memberships')
        .select(`
            *,
            calendars(
                *,
                teams(name),
                events(
                    *,
                    event_topics(*)
                )
            )
        `)
        .eq('user_id', user.id)
        .eq('calendars.team_id', teamId)
        .not('calendars', 'is', null)
        .order('calendar_id');

    console.log(calendarData);

    return (
        <Box sx={{width:'100%', height:'100%', display:'flex', flexDirection:'column'}}>
            {/* title */}
            <Box sx={{width:'100%', p:'1rem', pb:0, boxSizing:'border-box'}}>
                <Box sx={{width:'100%', display:'flex', justifyContent:'space-between', alignItems:'center'}}>
                    <Typography variant='h4'>Dashboard</Typography>
                    {/* <AddAgendaModal teamId={teamId} /> */}
                </Box>
            </Box>
            {/* norms */}
            <Box sx={{width:'100%',  flexGrow:1, overflow:'hidden'}}>
                <Box sx={{width:'100%', height:'100%', overflow:'scroll'}}>
                    {/* top dash */}
                    <Box sx={{width:'100%', display:'flex', height:'20rem', boxSizing:'border-box', px:'.5rem'}}>
                        <Box sx={{width:'33.33%', boxSizing:'border-box', px:'.5rem'}}>
                            <CyclesTasks cycles={cycles} />
                        </Box>
                        <Box sx={{width:'33.33%', boxSizing:'border-box', px:'.5rem'}}>
                            <MemberList teamId={teamId} />
                        </Box>
                        <Box sx={{width:'33.33%', boxSizing:'border-box', px:'.5rem'}}>
                            <NormsList teamId={teamId} normsList={normsList} />
                        </Box>
                    </Box>
                    <Box sx={{width:'100%', height:'100%', display:'flex', boxSizing:'border-box', px:'.5rem', py:'1rem'}}>
                        <Box sx={{width:'50%', boxSizing:'border-box', px:'.5rem'}}>
                            <CalendarList calendarData={calendarData} user={user} />
                        </Box>
                        <Box sx={{width:'50%', height:'100%', boxSizing:'border-box', px:'.5rem'}}>
                            <Paper
                                elevation={0} 
                                sx={{
                                    borderRadius:3, boxSizing:'border-box', border:'1px solid', borderColor: 'grey.300',
                                    p:'1rem', height:'100%', 
                                    display:'flex', flexDirection:'column'
                                }}
                                >
                                (Under construction)
                            </Paper>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}
