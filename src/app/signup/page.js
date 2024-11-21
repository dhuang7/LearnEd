import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import NextLink from 'next/link';
import Link from '@mui/material/Link';
import Button from '@mui/material/Button';



export default async function Signup() {

    

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
                    LearnEd
                </Typography>
                {/* login paper */}
                <Paper elevation={3} sx={{width:'20rem', p:'1rem', borderRadius:'1rem', display:'flex', flexDirection:'column'}}>
                    {/* title */}
                    <Typography variant='h6' align='center' color='secondary' sx={{mb:'1rem', fontWeight:'bold'}}>
                        Create account
                    </Typography>
                    {/* normal */}
                    <TextField label="Email" sx={{mb:'1rem'}} />
                    <TextField label="Password" sx={{mb:'1rem'}} />
                    <TextField label="Confirm" sx={{mb:'1rem'}} />
                    <Box sx={{mb:'1rem', width:'100%', display:'flex', justifyContent:'center'}}>
                        <Button>Signup</Button>
                    </Box>
                    <Box sx={{width:'100%', display:'flex', justifyContent:'right', mb:'1rem'}}>
                        <Link href='../' component={NextLink}>
                            <Typography variant='caption'>
                                Login
                            </Typography>
                        </Link>
                    </Box>
                </Paper>
            </Box>
        </Box>
    );
}
