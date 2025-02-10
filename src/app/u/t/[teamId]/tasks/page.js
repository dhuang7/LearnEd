import Tasks from "@/app/u/tasks/page";
import createClient from "@/utils/supabase/server";



export default async function Page({params}) {
    const supabase = await createClient();
    const teamId = (await params).teamId;
    
    const {data, error} = await supabase.rpc('get_team_members_emails', {tid: teamId});

    return (
        <Tasks users={data} teamId={teamId} />
    )
}
