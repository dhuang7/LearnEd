import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import NextLink from 'next/link';
import { redirect } from 'next/navigation';
import createClient from '@/utils/supabase/server';



export default async function Login({children}) {
    const supabase = await createClient();

    const { data: { session } } = await supabase.auth.getSession();
    if (session) redirect('/u/teams');

    return (
        <Box 
            sx={{
                width:'100%', height:'100%', 
                display:'flex', justifyContent:'center', alignItems:'center', 
                flexDirection:'column',
            }}
            >
            <Box>
                {/* title */}
                <Typography variant='h2' align='center' color='primary' sx={{mb:'1rem', fontWeight:'bold'}}>
                    <NextLink href='/' style={{ textDecoration: 'none', color:'inherit' }}>Praxly</NextLink>
                </Typography>
                {/* login paper */}
                <Paper elevation={3} sx={{width:'20rem', p:'1rem', borderRadius:'1rem', display:'flex', flexDirection:'column'}}>
                    {/* normal */}
                    {children}
                </Paper>
            </Box>
        </Box>
    );
}
