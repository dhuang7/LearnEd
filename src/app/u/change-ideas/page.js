import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import ChangeIdeaList from "./changeIdeaList";
import createClient from "@/utils/supabase/server";




export default async function Page() {
    const supabase = await createClient();

    // the below is effective for just general avg of all change ideas and count
    // const {data: changePackages, error: aggChangeError} = await supabase
    //     .from('pdsa_cycles')
    //     .select(`
    //         ...change_ideas(
    //             ...change_packages(
    //                 id, 
    //                 name, 
    //                 description,
    //                 rating:change_ideas(
    //                     rating.avg()
    //                 )
    //             )
    //         ),
    //         num_cycles:id.count()
    //     `)

    // the below is avg of all the change ideas weighted by the number of completed pdsa cycles that are ran
    // const {data: changePackages, error: changePackagesError} = await supabase
    //     .from('pdsa_cycles')
    //     .select(`
    //         ...change_ideas(
    //             rating:rating.avg(),
    //             ...change_packages(
    //                 id, 
    //                 name, 
    //                 description,
    //                 change_ideas(
    //                     primary_drivers(name),
    //                     secondary_drivers(name)
    //                 )
    //             )
    //         ),
    //         num_cycles:id.count()
    //     `)
    //     .eq('stage', 'completed');

    const {data: changePackages, error: changePackagesError} = await supabase.rpc('get_completed_change_packages');

    const {data: projects, error: projectsError} = await supabase
        .from('projects')
        .select(`
            *,
            teams (name)
        `)
        .not('teams', 'is', null);
    

    return (
        <Box sx={{width:'100%', height:'100%', display:'flex', flexDirection:'column'}}>
            {/* title */}
            <Box sx={{width:'100%', p:'1rem', pb:0, boxSizing:'border-box'}}>
                <Box sx={{width:'100%', display:'flex', justifyContent:'left', alignItems:'center'}}>
                    <Typography variant='h4'>Change Ideas</Typography>
                </Box>
            </Box>

            {/* change list */}
            <Box sx={{flexGrow:1, overflow:'hidden'}}>
                <Box sx={{width:'100%', height:'100%', boxSizing:'border-box', p:'1rem', pt:'.5rem'}}>
                    <ChangeIdeaList changePackages={changePackages} projects={projects} />
                </Box>
            </Box>
        </Box>
    )
}
