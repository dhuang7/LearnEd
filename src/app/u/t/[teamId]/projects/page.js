import createClient from "@/utils/supabase/server";
import { redirect } from 'next/navigation'



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

    // create project if project doesn't exist
    if (projects.length === 0) {
        const {data: pi, error: insertError} = await supabase
            .from('projects')
            .insert({team_id: teamId, name:'temp'})// you need to open a modal for the user to be able to create the project first
            .select();
        
        projects = pi;
    }

    redirect(`projects/${projects[0].id}/drivers`);
}