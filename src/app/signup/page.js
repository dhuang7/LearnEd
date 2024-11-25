"use client"

import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import NextLink from 'next/link';
import Link from '@mui/material/Link';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';


import { useState } from 'react';
import createClient from '@/utils/supabase/client';
import { useRouter } from 'next/navigation'; 




export default function Signup() {
    const router = useRouter(); // Initialize the router
    // state
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirm, setConfirm] = useState('');
    const [disabled, setDisabled] = useState(false);

    // Handlers
    function handleEmail({target}) {
        setEmail(target.value);
    }

    function handlePassword({target}) {
        setPassword(target.value);
    }

    function handleConfirm({target}) {
        setConfirm(target.value);
    }

    async function signUpNewUser(e) {
        e.preventDefault(); // Prevent default form submission
        // check if passwords match
        if (password !== confirm) return;

        setDisabled(true);
        
        const supabase = createClient();
        const { data, error } = await supabase.auth.signUp({
            email: email,
            password: password,
            // options: {
            //     emailRedirectTo: 'https://example.com/welcome',
            // },
        })

        router.push('/');
    }
      
    

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
                    <form onSubmit={signUpNewUser}>
                        <TextField 
                            required
                            label="Email" 
                            type='email'
                            onChange={handleEmail}
                            value={email}
                            sx={{mb:'1rem', width:'100%'}} 
                            />
                        <TextField 
                            required
                            label="Password"
                            type='password'
                            onChange={handlePassword}
                            value={password}
                            sx={{mb:'1rem', width:'100%'}} 
                            />
                        <TextField 
                            required
                            label="Confirm" 
                            type='password'
                            onChange={handleConfirm}
                            value={confirm}
                            error={password !== confirm}
                            helperText={(password !== confirm) && 'Password does not match'}
                            sx={{mb:'1rem', width:'100%'}} 
                            />
                        <Box sx={{mb:'1rem', width:'100%', display:'flex', justifyContent:'center'}}>
                            {(disabled)
                                ? <CircularProgress />
                                : <Button disabled={disabled} type='submit'>Signup</Button>
                            }
                        </Box>
                    </form>
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
