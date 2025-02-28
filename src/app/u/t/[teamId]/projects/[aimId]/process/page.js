import Paper from "@mui/material/Paper";
import createClient from "@/utils/supabase/server";
import ProcessMap from "./processMap";



export default async function Drivers({params}) {
    const {teamId, aimId} = await params
    const supabase = await createClient();

    // get process map first
    const processMap = await getProcessMap(supabase, aimId);

    // get nodes and edges
    const [nodes, edges] = await Promise.all([
        getNodes(supabase, processMap),
        getEdges(supabase, processMap),
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
            <ProcessMap processMap={processMap} processNodes={nodes} processEdges={edges} />
        </Paper>
    )
}

async function getProcessMap(supabase, aimId) {
    const {data, error} = await supabase
        .from('process_maps')
        .select()
        .eq('aim_id', aimId)
        .is('change_idea_id', null);

    if (!data[0]) {
        const {data: newData, error: newError} = await supabase
    }

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