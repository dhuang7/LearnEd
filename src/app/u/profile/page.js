import createClient from "@/utils/supabase/server";
import { Typography } from "@mui/material";
import Box from "@mui/material/Box";



export default async function Profile() {
    const supabase = await createClient();
    const { data: { session }, error: sessionError } = await supabase.auth.getSession();
    let { data: [profile], error } = await supabase
        .from('profiles')
        .select('*')
    
    return (
        <Box sx={{pt:'1rem', px:'1rem'}}>
            <Typography variant="h3">Profile</Typography>
            <Box sx={{pl:'1rem'}}>
                <Typography variant="body1"><b>First Name: </b>{profile.first_name}</Typography>
                <Typography variant="body1"><b>Last Name: </b>{profile.last_name}</Typography>
                <Typography variant="body1"><b>Email: </b>{session.user.email}</Typography>
            </Box>
        </Box>
    )
}
