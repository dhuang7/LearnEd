import createClient from "@/utils/supabase/server";
import { Typography } from "@mui/material";
import Box from "@mui/material/Box";



export default async function Settings() {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    let { data: [profile], error } = await supabase
        .from('profiles')
        .select('*')
        .eq('email', user.email);
    
    return (
        <Box sx={{pt:'1rem', px:'1rem'}}>
            {/* title */}
            <Typography variant="h3">Settings</Typography>
            {/* content profile */}
            <Box sx={{pl:'1rem'}}>
                <Typography variant="body1"><b>First Name: </b>{profile.first_name}</Typography>
                <Typography variant="body1"><b>Last Name: </b>{profile.last_name}</Typography>
                <Typography variant="body1"><b>Email: </b>{profile.email}</Typography>
            </Box>
        </Box>
    )
}
