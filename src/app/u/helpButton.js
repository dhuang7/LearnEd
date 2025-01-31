"use client"

import IconButton from "@mui/material/IconButton";
import HelpOutlineRoundedIcon from '@mui/icons-material/HelpOutlineRounded';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import CircularProgress from "@mui/material/CircularProgress";


import theme from "@/app/theme";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useState } from "react";
import NextLink from 'next/link';
import { usePathname } from "next/navigation";
import createClient from "@/utils/supabase/client";


export default function HelpButton() {
    const supabase = createClient();

    // for menu
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    // handlers for account menu
    const handleClickMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleCloseMenu = () => {
        setAnchorEl(null);
    };

    // for dialog
    const [openDialog, setOpenDialog] = useState(false); 
    const [loading, setLoading] = useState(false);
    const [topicText, setTopicText] = useState('');
    const [messageText, setMessageText] = useState('');
    const pathname = usePathname();
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

    function handleTopicText({target}) {
        setTopicText(target.value);
    }

    function handleMessageText({target}) {
        setMessageText(target.value);
    }

    function handleOpenDialog() {
        handleCloseMenu();
        setOpenDialog(true);
    }

    function handleCloseDialog() {
        setOpenDialog(false);
    }

    function handleCancelDialog() {
        handleCloseDialog();
        setTopicText('');
        setMessageText('');
    }

    async function handleSubmit(e) {
        e.preventDefault();

        setLoading(true);
        const {data: userData, error: userError} = await supabase
            .from('profiles')
            .select('id');

        const {data, error} = await supabase
            .from('feedback')
            .insert({
                topic: topicText,
                message: messageText,
                path: pathname,
                user_id: userData[0].id,
            })

        
        handleCancelDialog();
        setLoading(false);
    }

    return (
        <>
            <IconButton onClick={handleClickMenu} sx={{mr:'.1rem'}}><HelpOutlineRoundedIcon /></IconButton>

            {/* menu */}
            <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleCloseMenu}
                >
                <MenuItem onClick={handleCloseMenu} target="_blank" component={NextLink} href='/help'>Help Center</MenuItem>
                {/* <MenuItem onClick={handleClose}>My account</MenuItem> */}
                <MenuItem onClick={handleOpenDialog}>Give Feedback</MenuItem>
            </Menu>

            <Dialog
                open={openDialog}
                onClose={handleCloseDialog}
                maxWidth='sm'
                fullWidth
                fullScreen={fullScreen}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                >
                {/* form */}
                <form onSubmit={handleSubmit}>
                    {/* title */}
                    <DialogTitle id="alert-dialog-title">
                        Give Feedback
                    </DialogTitle>
                    {/* content */}
                    <DialogContent>
                        <Box sx={{width:'100%', display:'flex', flexDirection:'column'}}>
                            <TextField
                                select
                                fullWidth
                                onChange={handleTopicText}
                                value={topicText}
                                label='Topic'
                                sx={{mb:'1rem', mt:'.5rem'}}
                                >
                                <MenuItem value='error'>Error</MenuItem>
                                <MenuItem value='feedback'>General feedback</MenuItem>
                                <MenuItem value='feature'>Request a feature</MenuItem>
                                <MenuItem value='other'>Other</MenuItem>
                            </TextField>
                            <TextField
                                fullWidth
                                onChange={handleMessageText}
                                value={messageText}
                                label='Message'
                                multiline
                                rows={4}
                                helperText='If it is an error, please share what you did right before the error occured. Thank you!'
                                />
                        </Box>
                    </DialogContent>
                    {/* buttons */}
                    <DialogActions>
                        <Button disabled={loading} onClick={handleCancelDialog}>Cancel</Button>
                        <Button disabled={loading} type='submit'>
                            {(loading)
                                ? <CircularProgress size='1rem' />
                                : 'Submit'
                            }
                        </Button>
                    </DialogActions>
                </form>
            </Dialog>
        </>
    );
}
