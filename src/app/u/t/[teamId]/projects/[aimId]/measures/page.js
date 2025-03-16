import Paper from "@mui/material/Paper";
import createClient from "@/utils/supabase/server";
import MeasureList from "./measureList";



export default async function Process({params}) {
    const {teamId, aimId} = await params
    const supabase = await createClient();

    // get process map first
    const measureTypes = await getMeasureTypes(supabase, aimId);

    return (
        <MeasureList measureTypes={measureTypes} aimId={aimId} />
    )
}

async function getMeasureTypes(supabase, aimId) {
    const {data, error} = await supabase
        .from('measure_types')
        .select(`
            *,
            aim_measures(id.count()),
            primary_driver_measures(id.count()),
            secondary_driver_measures(id.count()),
            change_idea_measures(id.count()),
            cycle_measures(id.count())
        `)
        .eq('aim_id', aimId);

    console.log(error)
    console.log(data);

    return data;
}