import createClient from "@/utils/supabase/server";
import ChangeIdeaList from "./changeIdeaList";
// import MeasureList from "./measureList";



export default async function Process({params}) {
    const {teamId, aimId} = await params
    const supabase = await createClient();

    // get process map first
    const changeIdeas = await getChangeIdeas(supabase, aimId);

    return (
        <ChangeIdeaList changeIdeas={changeIdeas} aimId={aimId} teamId={teamId} />
    )
}

async function getChangeIdeas(supabase, aimId) {
    const {data, error} = await supabase
        .from('change_ideas')
        .select(`
            *,
            change_packages(*),
            change_idea_measures(*) 
        `)
        .eq('aim_id', aimId);

    console.log(error)

    return data;
}