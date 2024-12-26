import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import CycleList from "./cycleList";
import createClient from "@/utils/supabase/server";



export default async function Cycles({params}) {
    const {teamId, aimId} = await params;
    const supabase = await createClient();

    // load projects
    const {data: projects, error: selectError} = await supabase
        .from('projects')
        .select()
        .eq('id', aimId);

    const {data: changeIdeas, error: changeIdeasError} = await supabase
        .from('change_ideas')
        .select(`
            *,
            change_packages(*)    
        `)
        .eq('aim_id', aimId);


    const {data: cycles, error: cyclesError} = await supabase
        .from('pdsa_cycles')
        .select(`
            *,
            pdsa_qprs(*),
            change_ideas (
                *,
                change_packages (*)
            )
        `)
        .not('change_ideas', 'is', null)
        .eq('change_ideas.aim_id', aimId); 

    return (
        <> 
            <CycleList cycles={cycles} changeIdeas={changeIdeas} aimId={aimId} />
        </>
    )
}
