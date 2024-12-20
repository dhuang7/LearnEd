import Paper from "@mui/material/Paper";
import createClient from "@/utils/supabase/server";
import GraphFlow from "./graphFlow";



export default async function Drivers({params}) {
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

    // load primary drivers
    const {data: primaryDrivers, error: primaryDriverErrors} = await supabase
        .from('primary_drivers')
        .select()
        .eq('aim_id', projects[0].id);

    // load secondary drivers

    // load change ideas


    return (
        <Paper 
            elevation={0} 
            sx={{
                borderRadius:3, boxSizing:'border-box', border:'1px solid', borderColor: 'grey.300',
                p:'1rem', height:'100%',
                display:'flex', flexDirection:'column'
            }}
            >
                <GraphFlow teamId={teamId} aim={projects[0]} primaryDrivers={primaryDrivers} />
        </Paper>
    )
}
