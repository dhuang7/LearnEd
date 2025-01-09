'use client'

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import createClient from "@/utils/supabase/client";
import { useState } from "react";



export default function ContactUs() {
    const supabase = createClient();
    const [message, setMessage] = useState({
        email: '',
        subject: '',
        message: '',
    });

    async function handleSubmit(e) {
        e.preventDefault();
        const {data, error} = await supabase
            .from('contact_us')
            .insert(message);

        setMessage({
            email: '',
            subject: '',
            message: '',
        })
    }

    return (
        <form style={{width:'100%'}} onSubmit={handleSubmit}>
            <Box sx={{boxSizing:'border-box', px:'20%', display:'flex', alignItems:'center', flexDirection:'column'}}>
                <Typography variant="h4" color="primary" sx={{mb:'1rem'}}>Contact us!</Typography>
                <TextField
                    label='Email'
                    type="email"
                    required
                    fullWidth
                    value={message.email}
                    onChange={({target}) => setMessage(m => ({...m, email: target.value}))}
                    sx={{mb:'1rem'}}
                    />
                <TextField
                    label='Subject'
                    fullWidth
                    required
                    value={message.subject}
                    onChange={({target}) => setMessage(m => ({...m, subject: target.value}))}
                    sx={{mb:'1rem'}}
                    />
                <TextField
                    label='Message'
                    fullWidth
                    multiline
                    required
                    value={message.message}
                    onChange={({target}) => setMessage(m => ({...m, message: target.value}))}
                    rows={4}
                    sx={{mb:'1rem'}}
                    />
                <Button variant="contained" disableElevation type='submit'>Send</Button>
            </Box>
        </form>
    );
}