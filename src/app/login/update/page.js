"use client"

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';


import { useState } from 'react';
import createClient from '@/utils/supabase/client';
import { useRouter } from 'next/navigation'; 




export default function Update() {
    const router = useRouter(); // Initialize the router
    // state
    const [password, setPassword] = useState('');
    const [confirm, setConfirm] = useState('');
    const [disabled, setDisabled] = useState(false);

    // Handlers
    function handlePassword({target}) {
        setPassword(target.value);
    }

    function handleConfirm({target}) {
        setConfirm(target.value);
    }

    async function handleUpdatePassword(e) {
        e.preventDefault(); // Prevent default form submission
        // check if passwords match
        if (password !== confirm) return;

        setDisabled(true);
        
        const supabase = createClient();
        await supabase.auth.updateUser({ password: password });

        router.push('/u');
    }
      
    

    return (
        <>
            {/* title */}
            <Typography variant='h6' align='center' color='secondary' sx={{mb:'1rem', fontWeight:'bold'}}>
                Update Password
            </Typography>
            {/* normal */}
            <form onSubmit={handleUpdatePassword}>
                {/* password */}
                <TextField 
                    required
                    label="Password"
                    type='password'
                    onChange={handlePassword}
                    value={password}
                    sx={{mb:'1rem', width:'100%'}} 
                    />
                {/* confirm password */}
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
                {/* button update */}
                <Box sx={{mb:'1rem', width:'100%', display:'flex', justifyContent:'center'}}>
                    {(disabled)
                        ? <CircularProgress />
                        : <Button disabled={disabled} type='submit'>Update</Button>
                    }
                </Box>
            </form>
        </>
    );
}
