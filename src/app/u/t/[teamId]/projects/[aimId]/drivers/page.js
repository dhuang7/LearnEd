import Paper from "@mui/material/Paper";
import createClient from "@/utils/supabase/server";
import GraphFlow from "./graphFlow";



export default async function Drivers({params}) {
    const {teamId, aimId} = await params
    const supabase = await createClient();

    // load projects
    const {data: projects, error: selectError} = await supabase
        .from('projects')
        .select()
        .eq('id', aimId);

    // load primary drivers
    const {data: primaryDrivers, error: primaryDriversErrors} = await supabase
        .from('primary_drivers')
        .select()
        .eq('aim_id', aimId);

    // load primary secondary edges
    const {data: primarySecondaryEdges, error: primarySecondaryEdgesError} = await supabase
        .from('primary_secondary_edges')
        .select()
        .eq('aim_id', aimId);

    // load primary change edges
    const {data: primaryChangeEdges, error: primaryChangeEdgesError} = await supabase
        .from('primary_change_edges')
        .select()
        .eq('aim_id', aimId);

    // load secondary drivers
    const {data: secondaryDrivers, error: secondaryDriversErrors} = await supabase
        .from('secondary_drivers')
        .select()
        .eq('aim_id', aimId);

    // load secondary change edges
    const {data: secondaryChangeEdges, error: secondaryChangeEdgesError} = await supabase
        .from('secondary_change_edges')
        .select()
        .eq('aim_id', aimId);
        
    // load change ideas with join
    const {data: changeIdeas, error: changeIdeasErrors} = await supabase
        .from('change_ideas')
        .select('*, change_packages (*)')
        .eq('aim_id', aimId);

    return (
        <Paper 
            elevation={0} 
            sx={{
                borderRadius:3, boxSizing:'border-box', border:'1px solid', borderColor: 'grey.300',
                p:'1rem', height:'100%', width:'100%', overflow:'hidden',
                display:'flex', flexDirection:'column', position:'relative'
            }}
            >
                <GraphFlow 
                    teamId={teamId} 
                    aim={projects[0]} 
                    primaryDrivers={primaryDrivers} 
                    primarySecondaryEdges={primarySecondaryEdges}
                    primaryChangeEdges={primaryChangeEdges}
                    secondaryDrivers={secondaryDrivers}
                    secondaryChangeEdges={secondaryChangeEdges}
                    changeIdeas={changeIdeas}
                    />
        </Paper>
    )
}