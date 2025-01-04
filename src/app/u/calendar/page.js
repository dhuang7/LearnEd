import Box from "@mui/material/Box";


import createClient from "@/utils/supabase/server";
import PageContent from "./pageContent";




export default async function Calendar() {
    const supabase = await createClient();

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
                events(*)
            )
        `)
        .eq('user_id', user.id)
        .order('calendar_id');


    // sorts the data for the accordians of calendars based on ur calendar, shared calendars and team calendars
    const sortedCalendarData = {user:[], sharedCalendar: []};
    calendarData.forEach(v => {
        const teamId = v.calendars.team_id;
        if (v.calendars.teams) {
            sortedCalendarData[teamId] = (sortedCalendarData[teamId] || []).concat(v);
        } else {
            if (v.role === 'owner') {
                sortedCalendarData.user.push(v);
            } else {
                sortedCalendarData.sharedCalendar.push(v);
            }
        }
    });

    return (
        <Box sx={{width:'100%', height:'100%', display:'flex', flexDirection:'column'}}>
            <PageContent calendarData={calendarData} user={user} sortedCalendarData={sortedCalendarData} />
        </Box>
    )
}
