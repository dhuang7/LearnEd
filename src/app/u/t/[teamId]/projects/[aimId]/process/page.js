import Paper from "@mui/material/Paper";
import createClient from "@/utils/supabase/server";
import ProcessList from "./processList";



export default async function Process({params}) {
    const {teamId, aimId} = await params
    const supabase = await createClient();

    // get process map first
    const processMaps = await getProcessMaps(supabase, aimId);

    return (
        <ProcessList processMaps={processMaps} aimId={aimId} />
    )
}

async function getProcessMaps(supabase, aimId) {
    const {data, error} = await supabase
        .from('process_maps')
        .select(`
            *,
            process_nodes!process_node_map_id_fkey(
                type,
                id.count()
            )
        `)
        .eq('aim_id', aimId);

        console.log(error)

    return data;
}