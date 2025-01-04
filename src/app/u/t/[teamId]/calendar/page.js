import Box from "@mui/material/Box";


import createClient from "@/utils/supabase/server";
import PageContent from "@/app/u/calendar/pageContent";




export default async function Calendar({params}) {
    const teamId = (await params).teamId;
    const supabase = await createClient();

    // get user profile
    const { data: [user] } = await supabase
        .from('profiles')
        .select();

    // get calendars
    const {data: calendarData, error: calendarDataErrors} = await supabase
        .from('calendar_memberships')
        .select(`
            *,
            calendars(
                *,
                teams(name),
                events(*)
            )
        `)
        .eq('user_id', user.id)
        .eq('calendars.team_id', teamId)
        .not('calendars', 'is', null)
        .order('calendar_id');
    
    // this is just so that i can use the pagecontent info from u/calendar
    const sortedCalendarData = {[teamId]: calendarData}

    return (
        <Box sx={{width:'100%', height:'100%', display:'flex', flexDirection:'column'}}>
            <PageContent calendarData={calendarData} user={user} sortedCalendarData={sortedCalendarData} />
        </Box>
    )
}
