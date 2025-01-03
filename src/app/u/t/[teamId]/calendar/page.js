import Box from "@mui/material/Box";


import createClient from "@/utils/supabase/server";
import PageContent from "./pageContent";




export default async function Calendar({params}) {
    const teamId = (await params).teamId;

    const supabase = await createClient();

    const { data: [user] } = await supabase
        .from('profiles')
        .select();

    const {data: calendarData, error: calendarDataErrors} = await supabase
        .from('calendar_memberships')
        .select(`
            *,
            calendars(
                *,
                events(*)
            )
        `)
        .eq('user_id', user.id)
        .eq('calendars.team_id', teamId)
        .not('calendars', 'is', null)
        .order('calendar_id');
    

    return (
        <Box sx={{width:'100%', height:'100%', display:'flex', flexDirection:'column'}}>
            <PageContent calendarData={calendarData} user={user} teamId={teamId} />
        </Box>
    )
}
