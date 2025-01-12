import createClient from "@/utils/supabase/server";
import { redirect } from 'next/navigation'
import AddProjectModal from "./[aimId]/addProjectModal";



export default async function RedirectToFirstProject({params}) {
    const teamId = (await params).teamId;
    const supabase = await createClient();
    let projects;

    // load projects
    const {data: p, error: selectError} = await supabase
        .from('projects')
        .select()
        .eq('team_id', teamId);

    projects = p;

    console.log('cool')

    // create project if project doesn't exist
    if (projects.length === 0) {
        return <AddProjectModal modalOnly teamId={teamId}/>
    }

    redirect(`projects/${projects[0].id}/drivers`);
}