import Box from "@mui/material/Box";
import createClient from "@/utils/supabase/server";



export default async function Teams() {
    const supabase = await createClient();
    let { data: teams, error } = await supabase
        .from('teams')
        .select('name');
    
    return (
        <Box>
            {JSON.stringify(teams)}
        </Box>
    )
}
