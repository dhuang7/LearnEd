import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import MemberList from "./memberList";
import NormsList from "./normsList";

import createClient from "@/utils/supabase/server";
import CyclesTasks from "./cyclesTasks";




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

    console.log(cycles);

    return (
        <Box sx={{width:'100%', height:'100%', display:'flex', flexDirection:'column'}}>
            {/* title */}
            <Box sx={{width:'100%', p:'1rem', pb:0, boxSizing:'border-box'}}>
                <Box sx={{width:'100%', display:'flex', justifyContent:'space-between', alignItems:'center'}}>
                    <Typography variant='h4'>Dashboard (Work in progress)</Typography>
                    {/* <AddAgendaModal teamId={teamId} /> */}
                </Box>
            </Box>
            {/* norms */}
            <Box sx={{width:'100%',  flexGrow:1, overflow:'hidden'}}>
                <Box sx={{width:'100%', height:'100%'}}>
                    {/* top dash */}
                    <Box sx={{width:'100%', display:'flex', height:'20rem', boxSizing:'border-box', px:'.5rem'}}>
                        <Box sx={{width:'33%', boxSizing:'border-box', px:'.5rem'}}>
                            <MemberList teamId={teamId} />
                        </Box>
                        <Box sx={{width:'33%', boxSizing:'border-box', px:'.5rem'}}>
                            <NormsList teamId={teamId} normsList={normsList} />
                        </Box>
                        <Box sx={{width:'33%', boxSizing:'border-box', px:'.5rem'}}>
                            <CyclesTasks cycles={cycles} />
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}
