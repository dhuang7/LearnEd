import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import CycleList from "./cycleList";
import createClient from "@/utils/supabase/server";



export default async function Cycles({params}) {
    const teamId = (await params).teamId;
    const supabase = await createClient();
    let projects;

    // load projects
    const {data: p, error: selectError} = await supabase
        .from('projects')
        .select()
        .eq('team_id', teamId);

    projects = p;

    // temp until people get the option to create more projects
    if (projects.length === 0) {
        const {data: pi, error: insertError} = await supabase
            .from('projects')
            .insert({team_id: teamId})
            .select();
        
        projects = pi;
    }

    const {data: changeIdeas, error: changeIdeasError} = await supabase
        .from('change_ideas')
        .select(`
            *,
            change_packages(*)    
        `)
        .eq('aim_id', projects[0].id);


    const {data: cycles, error: cyclesError} = await supabase
        .from('pdsa_cycles')
        .select(`
            *,
            change_ideas (
                *,
                change_packages (*)
            )
        `)
        .not('change_ideas', 'is', null)
        .eq('change_ideas.aim_id', projects[0].id); 

    return (
        <> 
            <CycleList teamId={teamId} cycles={cycles} changeIdeas={changeIdeas} />
        </>
    )
}
