'use client'

import createClient from '@/utils/supabase/client'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

export default function MicrosoftLoginComponent() {
    const supabase = createClient()

    // sign in callback
    async function handleSignInWithMicrosoft() {
        const { data, error } = await supabase.auth.signInWithOAuth({
            provider: 'azure',
            options: {
                scopes: 'email',
                redirectTo: process.env.NEXT_PUBLIC_REDIRECT_URL,
            },
        })

        if (error) {
            console.log(error);
            return;
        }
    }
    

    return (
        <>
            {/* Login button for microsoft */}
            <Button variant='outlined' onClick={handleSignInWithMicrosoft} sx={{ textTransform: 'none', borderColor:'grey.300', color:'#3c4043', py:'.5rem', width:'100%', fontFamily:'Google Sans, Arial, sans-serif' }}>
                <Box sx={{alignContent:'center', display:'flex'}}>
                    <img src="https://id-frontend.prod-east.frontend.public.atl-paas.net/assets/microsoft-logo.c73d8dca.svg" alt="" />
                </Box>
                <Typography sx={{ml:'.5rem', fontSize:'14px'}}>Sign in with Microsoft</Typography>
            </Button>
        </>
    )
}

