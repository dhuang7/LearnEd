import createClient from "@/utils/supabase/server";
import { NextResponse } from "next/server";
import { createEvents } from "ics";
import dayjs from "dayjs";


export async function GET(request) {
    const supabase = await createClient();
    const searchParams = request.nextUrl.searchParams
    const calendarId = searchParams.get('calendar_id');
    const icsToken = searchParams.get('ics_token');

    // check if it is a bad request
    if (!calendarId || !icsToken) {
        return NextResponse.json({ message:'Missing calendar ID or token', calendarId, icsToken }, {status:400});
    }

    // get the events
    const {data: events, error} = await supabase.rpc('get_ics_events', {
        ics_token: icsToken,
        calendar_id: calendarId,
    });

    // if there is an error retrieving like lack of permissions
    if (error) {
        return NextResponse.json({error}, {status:400});
    }

    // reformat the events for ics
    const formattedEvents = events.map(event => ({
        title: event.title,
        description: event.description,
        start: dayjs(event.start_time).valueOf(), /////////////// this time is off by an hour when imported into google calendar
        end: dayjs(event.end_time).valueOf(),
        calName:'LearnEd Calendar',
    }));

    // create ics
    const { error: icsError, value } = createEvents(formattedEvents);

    // if there is error with 
    if (icsError) {
        return NextResponse.json({ error: icsError.message }, { status: 500 });
    }

    // return ics response
    return new NextResponse(
        value, 
        {
            headers: {
                "Content-Type": "text/calendar",
                "Content-Disposition": `attachment; filename="calendar.ics"`,
            },
        }
    );
}