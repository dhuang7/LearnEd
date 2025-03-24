'use client'

import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import TextField from "@mui/material/TextField";
import useMediaQuery from "@mui/material/useMediaQuery";
import CircularProgress from "@mui/material/CircularProgress";

import theme from "@/app/theme";
import { useState } from "react";
import { MenuItem } from "@mui/material";
import createClient from "@/utils/supabase/client";




export default function ContactUs() {
    const supabase = createClient();
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [firstNameText, setFirstNameText] = useState('');
    const [lastNameText, setLastNameText] = useState('');
    const [emailText, setEmailText] = useState('');
    const [purposeText, setPurposeText] = useState('');
    const [messageText, setMessageText] = useState('');

    function handleOpen() {
        setOpen(true);
    }

    function handleClose() {
        setOpen(false);
    }

    function handleCancel() {
        handleClose();
        setFirstNameText('');
        setLastNameText('');
        setEmailText('');
        setPurposeText('');
        setMessageText('');
    }

    function handleFirstNameText({target}) {
        setFirstNameText(target.value)
    }

    function handleLastNameText({target}) {
        setLastNameText(target.value)
    }

    function handleEmailText({target}) {
        setEmailText(target.value)
    }

    function handlePurposeText({target}) {
        setPurposeText(target.value)
    }

    function handleMessageText({target}) {
        setMessageText(target.value)
    }

    async function handleSubmit(e) {
        e.preventDefault();

        setLoading(true);

        const {data, error} = await supabase
            .from('contact_us')
            .insert({
                first_name: firstNameText,
                last_name: lastNameText,
                email: emailText,
                subject: purposeText,
                message: messageText,
            })

        // reset everything
        handleCancel();
        setLoading(false);
    }
    


    return (
        <>

            {/* button */}
            <Button 
                variant="contained" disableElevation fullWidth
                sx={{
                    textTransform:'none', backgroundColor:'crimson', borderRadius:3, minWidth:0,
                    '&:hover': {
                        backgroundColor: 'crimson',
                        filter: 'brightness(1.1)',
                    }
                }}
                onClick={handleOpen}
                // component={customButton || NextLink}
                // href={href}
                >
                <Typography noWrap variant="h5">Contact us</Typography>
            </Button>

            {/* open dialog */}
            <Dialog
                open={open}
                maxWidth='sm'
                fullWidth
                fullScreen={fullScreen}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                >
                {/* form */}
                <form onSubmit={handleSubmit}>
                    {/* title */}
                    <DialogTitle id="alert-dialog-title">
                        Learn More
                    </DialogTitle>
                    {/* content */}
                    <DialogContent>
                        <Box sx={{display:'flex', mb:'1rem', mt:'.5rem'}}>
                            {/* first name */}
                            <TextField 
                                required
                                label='First Name'
                                fullWidth
                                value={firstNameText}
                                onChange={handleFirstNameText}
                                sx={{mr:'1rem'}}
                                />
                            {/* last name */}
                            <TextField 
                                required
                                fullWidth
                                label='Last Name'
                                value={lastNameText}
                                onChange={handleLastNameText}
                                />
                        </Box>
                        {/* Email */}
                        <TextField 
                            required
                            fullWidth
                            label='Email'
                            type='email'
                            value={emailText}
                            onChange={handleEmailText}
                            sx={{mb:'1rem'}}
                            />
                        {/* Purpose */}
                        <TextField 
                            required
                            fullWidth
                            label='Purpose'
                            select
                            value={purposeText}
                            onChange={handlePurposeText}
                            sx={{mb:'1rem'}}
                            >
                            {['Beta Testing', 'Let\'s talk', 'Pricing'].map((v, i) => (
                                <MenuItem key={i} value={v}>{v}</MenuItem>
                            ))}
                        </TextField>
                        {/* Message */}
                        <TextField 
                            fullWidth
                            label='Message'
                            multiline
                            rows={5}
                            value={messageText}
                            onChange={handleMessageText}
                            />
                    </DialogContent>
                    {/* buttons */}
                    <DialogActions>
                        <Button disabled={loading} onClick={handleCancel}>Cancel</Button>
                        <Button disabled={loading} type='submit'>
                            {(loading)
                                ? <CircularProgress size='1rem' />
                                : 'Create'
                            }
                        </Button>
                    </DialogActions>
                </form>
            </Dialog>
        </>
    )
}