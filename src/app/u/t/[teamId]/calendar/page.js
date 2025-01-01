import Box from "@mui/material/Box";


import createClient from "@/utils/supabase/server";
import PageContent from "./pageContent";




export default async function Calendar({params}) {
    const teamId = (await params).teamId;

    const supabase = await createClient();

    const {data: agendas, error: agendasError} = await supabase
        .from('agendas')
        .select()
        .eq('team_id', teamId);

    return (
        <Box sx={{width:'100%', height:'100%', display:'flex', flexDirection:'column'}}>
            <PageContent agendas={agendas} />
        </Box>
    )
}
