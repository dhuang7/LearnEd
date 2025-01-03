import Box from "@mui/material/Box";


import createClient from "@/utils/supabase/server";
import PageContent from "./pageContent";




export default async function Calendar() {

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
                teams(name),
                events(*)
            )
        `)
        .eq('user_id', user.id)
        // .is('calendars.team_id', null)
        // .not('calendars', 'is', null)
        .order('calendar_id');

    // sorts the data for the accordians of calendars
    const sortedCalendarData = {user:[]};
    calendarData.forEach(v => {
        const teamId = v.calendars.team_id;
        if (teamId) {
            sortedCalendarData[teamId] = (sortedCalendarData[teamId] || []).concat(v);
        } else {
            sortedCalendarData.user.push(v);
        }
    });

    return (
        <Box sx={{width:'100%', height:'100%', display:'flex', flexDirection:'column'}}>
            <PageContent calendarData={calendarData} user={user} sortedCalendarData={sortedCalendarData} />
        </Box>
    )
}
