"use client"

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




export default function Reset() {
    const router = useRouter(); // Initialize the router
    // state
    const [email, setEmail] = useState('');
    const [disabled, setDisabled] = useState(false);

    // Handlers
    function handleEmail({target}) {
        setEmail(target.value);
    }

    async function handleReset(e) {
        e.preventDefault(); // Prevent default form submission

        setDisabled(true);
        
        const supabase = createClient();
        const { data, error } = await supabase.auth.resetPasswordForEmail(email);

        router.push('./reset/confirm');
    }
      
    

    return (
        <>
            {/* title */}
            <Typography variant='h6' align='center' color='secondary' sx={{mb:'1rem', fontWeight:'bold'}}>
                Reset Password
            </Typography>
            {/* normal */}
            <form onSubmit={handleReset}>
                {/* email */}
                <TextField 
                    required
                    label="Email" 
                    type='email'
                    onChange={handleEmail}
                    value={email}
                    sx={{mb:'1rem', width:'100%'}} 
                    />
                {/* button submit */}
                <Box sx={{mb:'1rem', width:'100%', display:'flex', justifyContent:'center'}}>
                    {(disabled)
                        ? <CircularProgress />
                        : <Button disabled={disabled} type='submit'>Submit</Button>
                    }
                </Box>
            </form>
            {/* back to login */}
            <Box sx={{width:'100%', display:'flex', justifyContent:'right', mb:'1rem'}}>
                <Link href='.' component={NextLink}>
                    <Typography variant='caption'>
                        Back to login
                    </Typography>
                </Link>
            </Box>
        </>
    );
}
