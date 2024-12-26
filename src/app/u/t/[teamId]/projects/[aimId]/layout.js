import createClient from "@/utils/supabase/server";
import ClientPage from "./clientLayout";




export default async function Layout({children, params}) {
    const {teamId, aimId} = await params;
    const supabase = await createClient();

    // load projects
    const {data: projects, error: selectError} = await supabase
        .from('projects')
        .select()
        .eq('team_id', teamId);
    

    return (
        <ClientPage children={children} aimId={aimId} projects={projects} teamId={teamId} />
    )
}
