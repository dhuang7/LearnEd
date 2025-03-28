import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import CycleList from "./cycleList";
import createClient from "@/utils/supabase/server";



export default async function Cycles({params}) {
    const {teamId, aimId} = await params;
    const supabase = await createClient();

    // load projects
    // const {data: projects, error: selectError} = await supabase
    //     .from('projects')
    //     .select()
    //     .eq('id', aimId);

    // const {data: changeIdeas, error: changeIdeasError} = await supabase
    //     .from('change_ideas')
    //     .select(`
    //         *,
    //         projects(team_id),
    //         change_packages(*)    
    //     `)
    //     .eq('aim_id', aimId);


    // const {data: cycles, error: cyclesError} = await supabase
    //     .from('pdsa_cycles')
    //     .select(`
    //         *,
    //         pdsa_qprs(*),
    //         events(*, event_topics(*)),
    //         cycle_measures(*),
    //         change_ideas (
    //             *,
    //             projects(team_id),
    //             change_packages (*)
    //         )
    //     `)
    //     .not('change_ideas', 'is', null)
    //     .eq('change_ideas.aim_id', aimId); 

    const [changeIdeas, cycles] = await Promise.all([
        getChangeIdeas(supabase, aimId),
        getCycles(supabase, aimId),
    ])

    // console.log(cycles);

    return (
        <> 
            <CycleList cycles={cycles} changeIdeas={changeIdeas} aimId={aimId} />
        </>
    )
}


async function getProjects(supabase, aimId) {
    const {data: projects, error: selectError} = await supabase
        .from('projects')
        .select()
        .eq('id', aimId);

    return projects;
}

async function getChangeIdeas(supabase, aimId) {
    const {data: changeIdeas, error: changeIdeasError} = await supabase
        .from('change_ideas')
        .select(`
            *,
            projects(team_id),
            change_packages(*)    
        `)
        .eq('aim_id', aimId);

    return changeIdeas;
}

async function getCycles(supabase, aimId) {
    const {data: cycles, error: cyclesError} = await supabase
        .from('pdsa_cycles')
        .select(`
            *,
            pdsa_qprs(*),
            events(*, event_topics(*)),
            cycle_measures(*),
            change_ideas (
                *,
                projects(team_id),
                change_packages (*)
            )
        `)
        .not('change_ideas', 'is', null)
        .eq('change_ideas.aim_id', aimId); 

    return cycles;
}