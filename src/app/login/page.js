"use client"

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import NextLink from 'next/link';
import Link from '@mui/material/Link';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Stack from '@mui/material/Stack';

import { useRouter } from 'next/navigation'; 
import { useState } from 'react';
import createClient from '@/utils/supabase/client';
import OneTapComponent from './googleOneTap';
import MicrosoftLoginComponent from './microsoftLogin';


export default function Login() {
    const router = useRouter(); // Initialize the router
    // state
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [disabled, setDisabled] = useState(false);
    const [helperText, setHelperText] = useState('');

    // Handlers
    function handleEmail({target}) {
        setEmail(target.value);
    }

    function handlePassword({target}) {
        setPassword(target.value);
    }

    async function signInWithEmail(e) {
        e.preventDefault(); // Prevent default form submission

        setDisabled(true);

        const supabase = createClient();
        const { data, error } = await supabase.auth.signInWithPassword({
            email: email,
            password: password,
        })

        if (error) {
            setDisabled(false);
            setHelperText(error.code);
            return;
        }

        router.push('/u/dashboard');
    }
    

    return (
        <>
            {/* title */}
            <Typography variant='h6' align='center' color='secondary' sx={{mb:'1rem', fontWeight:'bold'}}>
                Login
            </Typography>
            {/* normal */}
            <form onSubmit={signInWithEmail}>
                <TextField 
                    required
                    label="Email" 
                    type='email'
                    onChange={handleEmail}
                    value={email}
                    error={helperText !== ''}
                    sx={{mb:'1rem', width:'100%'}} 
                    />
                <TextField 
                    required
                    label="Password"
                    type='password'
                    onChange={handlePassword}
                    value={password}
                    error={helperText !== ''}
                    helperText={helperText}
                    sx={{mb:'1rem', width:'100%'}} 
                    />
                <Box sx={{mb:'1rem', width:'100%', display:'flex', justifyContent:'center'}}>
                    {(disabled)
                        ? <CircularProgress />
                        : <Button disabled={disabled} type='submit'>Login</Button>
                    }
                </Box>
            </form>
            {/* links */}
            <Box sx={{width:'100%', display:'flex', justifyContent:'space-between', mb:'1rem'}}>
                <Link href='./login/reset' component={NextLink}>
                    <Typography variant='caption'>
                        Forgot password
                    </Typography>
                </Link>
                <Link href='./login/signup' component={NextLink}>
                    <Typography variant='caption'>
                        Create account
                    </Typography>
                </Link>
            </Box>
            {/* or */}
            <Divider sx={{mb:'1rem'}}>
                <Typography variant='caption'>
                    or
                </Typography>
            </Divider>
            {/* other logins */}
            <Stack sx={{alignItems:'center'}} direction='column' spacing={1}>
                <OneTapComponent />
                <MicrosoftLoginComponent />
            </Stack>
        </>
    );
}
