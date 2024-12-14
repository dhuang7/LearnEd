import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import MemberList from "./memberList";
import NormsList from "./normsList";
import AgendaList from "./agendaList";

import AddAgendaModal from "./addAgendaModal";
import createClient from "@/utils/supabase/server";




export default async function Agenda({params}) {
    const teamId = (await params).teamId;

    const supabase = await createClient();

    const {data: agendas, error: agendasError} = await supabase
        .from('agendas')
        .select();
        // .eq('team_id', teamId);

    let { data: normsList, error: normsError } = await supabase
        .from('norms')
        .select('*');

    return (
        <Box sx={{width:'100%', height:'100%', display:'flex', flexDirection:'column'}}>
            {/* title */}
            <Box sx={{width:'100%', p:'1rem', pb:0, boxSizing:'border-box'}}>
                <Box sx={{width:'100%', display:'flex', justifyContent:'space-between', alignItems:'center'}}>
                    <Typography variant='h4'>Agenda</Typography>
                    <AddAgendaModal teamId={teamId} />
                </Box>
            </Box>
            {/* norms */}
            <Box sx={{width:'100%',  flexGrow:1, overflow:'hidden'}}>
                <Box sx={{width:'100%', height:'100%', display:'flex'}}>
                    {/* side dash */}
                    <Box sx={{width:'33%', height:'100%', display:'flex', flexDirection:'column', pt:'.5rem', boxSizing:'border-box'}}>
                        {/* member content */}
                        <Box sx={{pb:'1rem', boxSizing:'border-box', width:'100%', height:'17.5rem', pl:'1rem', pr:'.5rem'}}>
                            <MemberList teamId={teamId} />
                        </Box>
                        {/* Norms */}
                        <Box sx={{boxSizing:'border-box', width:'100%', flexGrow:1, overflow:'hidden'}}>
                            <Box sx={{width:'100%', height:'100%', pl:'1rem', pr:'.5rem', boxSizing:'border-box', pb:'1rem'}}>
                                <NormsList teamId={teamId} normsList={normsList} />
                            </Box>
                        </Box>
                    </Box>
                    {/* Agenda list */}
                    <Box sx={{flexGrow:1, height:'100%', overflow:'hidden'}}>
                        <Box sx={{width:'100%', height:'100%', pt:'.5rem', pr:'1rem', pl:'.5rem', boxSizing:'border-box', pb:'1rem'}}>
                            <AgendaList teamId={teamId} agendas={agendas} />
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}
