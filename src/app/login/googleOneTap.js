'use client'

import Script from 'next/script'
import createClient from '@/utils/supabase/client'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function OneTapComponent() {
    const supabase = createClient()
    const router = useRouter()

    // sign in callback
    async function handleSignInWithGoogle(response) {
        const { data, error } = await supabase.auth.signInWithIdToken({
            provider: 'google',
            token: response.credential,
        })

        if (error) {
            console.log(error);
            return;
        }

        router.push('/u/teams')
    }

    // Initializes the button itself
    function handleInitializeGoogle() {
        if (window.google) {
            window.google.accounts.id.initialize({
                client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
                callback: handleSignInWithGoogle, // Directly pass the callback function
                ux_mode: 'popup',
                use_fedcm_for_prompt: true,
            })

            // Render the Google Sign-In button
            window.google.accounts.id.renderButton(
                document.getElementById('google-signin-button'), // Target div ID
                {
                    theme: 'outline',
                    size: 'large',
                    text: 'signin_with',
                    shape: 'rectangular',
                    logo_alignment: 'center',
                }
            )
        }
    }

    // loads the button when component is rendered
    useEffect(() => {
        handleInitializeGoogle()
    }, [])
    

    return (
        <>
            <Script src="https://accounts.google.com/gsi/client" onLoad={handleInitializeGoogle} />
            <div id="google-signin-button" style={{width:'100%'}} />
        </>
    )
}

