import Paper from "@mui/material/Paper";
import createClient from "@/utils/supabase/server";
import ProcessMap from "./processMap";



export default async function Page({params, searchParams}) {
    const {teamId, aimId, processId} = await params
    const {bcNames, bcIds} = await searchParams;
    const supabase = await createClient();

    // format breadcrumbs
    const breadcrumbs = bcNames && [].concat(bcNames)?.map((v, i) => ({name: v, id: [].concat(bcIds)[i]})) || [];

    // get process map first
    const processMap = await getProcessMap(supabase, processId);

    // get nodes and edges
    const [nodes, edges, processMaps] = await Promise.all([
        getNodes(supabase, processMap),
        getEdges(supabase, processMap),
        getProcessMaps(supabase, aimId),
    ])

    return (
        <Paper 
            elevation={0} 
            sx={{
                borderRadius:3, boxSizing:'border-box', border:'1px solid', borderColor: 'grey.300',
                p:'1rem', height:'100%', width:'100%', overflow:'hidden',
                display:'flex', flexDirection:'column', position:'relative'
            }}
            >
            <ProcessMap processMap={processMap} processMaps={processMaps} processNodes={nodes} processEdges={edges} breadcrumbs={breadcrumbs} />
        </Paper>
    )
}

async function getProcessMap(supabase, processMapId) {
    const {data, error} = await supabase
        .from('process_maps')
        .select()
        .eq('id', processMapId)

    return data[0];
}

async function getNodes(supabase, process) {
    const {data, error} = await supabase
        .from('process_nodes')
        .select()
        .eq('map_id', process.id);

    return data;
}

async function getEdges(supabase, process) {
    const {data, error} = await supabase
        .from('process_edges')
        .select()
        .eq('map_id', process.id);

    return data;
}

async function getProcessMaps(supabase, aimId) {
    const {data, error} = await supabase
        .from('process_maps')
        .select()
        .eq('aim_id', aimId)

    return data;
}