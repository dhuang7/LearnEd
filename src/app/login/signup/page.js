"use client"

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import NextLink from 'next/link';
import Link from '@mui/material/Link';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import VisibilityRounded from '@mui/icons-material/VisibilityRounded';
import VisibilityOffRounded from '@mui/icons-material/VisibilityOffRounded';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';

import { useState } from 'react';
import createClient from '@/utils/supabase/client';
import { useRouter } from 'next/navigation'; 
import OneTapComponent from '../googleOneTap';
import MicrosoftLoginComponent from '../microsoftLogin';




export default function Signup() {
    const router = useRouter(); // Initialize the router
    // state
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirm, setConfirm] = useState('');
    const [showPassword, setShowPassword] = useState(false);
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

    function handleShowPassword() {
        setShowPassword(s=>!s);
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
            options: {
                emailRedirectTo: 'http://localhost:3000/login',
            },
        })

        router.push('./signup/confirm');
    }
      
    

    return (
        <>
            {/* title */}
            <Typography variant='h6' align='center' color='secondary' sx={{mb:'1rem', fontWeight:'bold'}}>
                Create account
            </Typography>
            {/* normal */}
            <form onSubmit={signUpNewUser}>
                {/* email */}
                <TextField 
                    required
                    label="Email" 
                    type='email'
                    onChange={handleEmail}
                    value={email}
                    sx={{mb:'1rem', width:'100%'}} 
                    />
                {/* password */}
                <TextField 
                    required
                    label="Password"
                    type={showPassword ? 'text' : 'password'}
                    onChange={handlePassword}
                    value={password}
                    sx={{mb:'1rem', width:'100%'}} 
                    slotProps={{
                        input: {
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                        onClick={handleShowPassword}
                                        // onMouseDown={handleMouseDownPassword}
                                        // onMouseUp={handleMouseUpPassword}
                                        edge="end"
                                        >
                                        {showPassword ? <VisibilityOffRounded /> : <VisibilityRounded />}
                                    </IconButton>
                                </InputAdornment>
                            )
                        }
                    }}
                    />
                {/* confirm */}
                <TextField 
                    required
                    label="Confirm" 
                    type={showPassword ? 'text' : 'password'}
                    onChange={handleConfirm}
                    value={confirm}
                    error={password !== confirm}
                    helperText={(password !== confirm) && 'Password does not match'}
                    sx={{mb:'1rem', width:'100%'}} 
                    slotProps={{
                        input: {
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                        onClick={handleShowPassword}
                                        // onMouseDown={handleMouseDownPassword}
                                        // onMouseUp={handleMouseUpPassword}
                                        edge="end"
                                        >
                                        {showPassword ? <VisibilityOffRounded /> : <VisibilityRounded />}
                                    </IconButton>
                                </InputAdornment>
                            )
                        }
                    }}
                    />
                {/* button signup */}
                <Box sx={{mb:'1rem', width:'100%', display:'flex', justifyContent:'center'}}>
                    {(disabled)
                        ? <CircularProgress />
                        : <Button disabled={disabled} type='submit'>Signup</Button>
                    }
                </Box>
            </form>
            {/* link to login */}
            <Box sx={{width:'100%', display:'flex', justifyContent:'right', mb:'1rem'}}>
                <Link href='.' component={NextLink}>
                    <Typography variant='caption'>
                        Back to login
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
