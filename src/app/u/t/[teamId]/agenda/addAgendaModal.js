'use client'

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";
import useMediaQuery from "@mui/material/useMediaQuery";
import PersonAddRoundedIcon from '@mui/icons-material/PersonAddRounded';
import InputAdornment from "@mui/material/InputAdornment";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import Typography from "@mui/material/Typography";
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import Drawer from "@mui/material/Drawer";
import TodayRoundedIcon from '@mui/icons-material/TodayRounded';
import AccessTimeRoundedIcon from '@mui/icons-material/AccessTimeRounded';
import AccessTimeFilledRoundedIcon from '@mui/icons-material/AccessTimeFilledRounded';




import theme from "@/app/theme";
import { useEffect, useState } from "react";
import createClient from "@/utils/supabase/client";
import { Autocomplete, CircularProgress, InputLabel, ListItemText } from "@mui/material";
import { useRouter } from "next/navigation";
import TopicList from "./topicList";



export default function AddAgendaModal({teamId}) {
    const supabase = createClient();
    const router = useRouter();
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    // const [memberText, setMemberText] = useState('');
    const [errorText, setErrorText] = useState('');
    const [disableType, setDisableType] = useState(false);

    // handlers
    function handleOpen() {
        // open modal
        setOpen(true);
    }

    function handleClose(e) {
        // close modal
        setOpen(false);
        setErrorText('');
    }

    // function handleMemberText({target}) {
    //     // member text
    //     setMemberText(target.value);
    //     if (errorText.length > 0) setErrorText('');
    // }

    // function handleKeyDown(e) {
    //     // remove form enter for handling adding members
    //     if (e.key === "Enter") {
    //         e.preventDefault(); // Prevent form submission
    //         handleAddMember();
    //     }
      
    // }

    // async function handleRemoveMember({currentTarget}) {
    //     // removes a member
    //     const value = Number(currentTarget.dataset.value);
    //     const {data: {user}} = await supabase.auth.getUser();
    //     const {data: team_memberships, error} = await supabase
    //         .from('team_memberships')
    //         .select()
    //         .eq('team_id', teamId)
    //         .eq('user_id', )

    //     if (memberEmails[value] === user.email) {
    //         // check if you are removing self
    //         setErrorText("You can't remove yourself");
    //     } else {
    //         // remove
    //         setMemberEmails(m => [
    //             ...m.slice(0, value),
    //             ...m.slice(value+1),
    //         ]);
    //         setMemberIds(m => [
    //             ...m.slice(0, value),
    //             ...m.slice(value+1),
    //         ]);
    //     }
        
    // }

    // async function handleAddMember() {
    //     // check if member exist then adds it to the list
    //     setDisableType(true);

    //     if (memberEmails.includes(memberText)) {
    //         // checks if user is already added
    //         setErrorText('User is already added');
    //     } else {
    //         const {data: {user}} = await supabase.auth.getUser();
    //         if (user.email === memberText) {
    //             // checks if this is your email
    //             setErrorText('This is your email');
    //         } else {
    //             const { data, error } = await supabase.rpc('email_exists', { checked_email: memberText })
    //             if (data[0]) {
    //                 // checks if user exists
    //                 setMemberEmails(m=>m.concat([memberText]));
    //                 setMemberIds(m=>m.concat([data[0].id]));
    //             } else {
    //                 setErrorText('User does not exist');
    //             }
    //         }            
    //     }

    //     setDisableType(false);
    //     setMemberText('');
    // }

    async function handleSubmit(e) {
        // handle submit
        e.preventDefault();
        setLoading(true);
        // const {data, error} = await supabase.rpc('manage_team_memberships', {tid: teamId, member_ids: memberIds});
        // reset everything
        router.refresh();
        handleClose();
        setLoading(false);
    }


    return (
        <>
            {/* add member button to open dialog */}
            <Button 
                color='info' 
                variant='contained' disableElevation 
                sx={{borderRadius:3, textTransform:'none'}} 
                startIcon={<AddRoundedIcon />}
                onClick={handleOpen}
                disabled={loading}
                >
                New
            </Button>
            {/* open dialog */}
            <Drawer
                open={open}
                anchor='right'
                hideBackdrop
                ModalProps={{
                    sx: {
                        width:0,
                    }
                }}
                elevation={5}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                PaperProps={{
                    sx: {
                        width:'40%'
                    }
                }}
                >
                {/* form */}
                <form onSubmit={handleSubmit} style={{height:'100%', display:'flex', flexDirection:'column'}}>
                    {/* title */}
                    <DialogTitle id="alert-dialog-title">
                        Add Agenda
                    </DialogTitle>
                    {/* content */}
                    <DialogContent>
                        <Box sx={{pt:1, display:'flex', flexDirection:'column', height:'100%', boxSizing:'border-box',}}>
                            {/* add focus */}
                            <TextField 
                                disabled={disableType}
                                label='Focus Area'
                                // value={memberText}
                                // onChange={handleMemberText}
                                // onKeyDown={handleKeyDown}
                                fullWidth
                                error={errorText}
                                helperText={errorText}
                                multiline
                                rows={2}
                                slotProps={{
                                    htmlInput: {
                                        style:{
                                            resize:'vertical'
                                        }
                                    }
                                }}
                                sx={{
                                    mb:'1rem'
                                }}
                                />
                            {/* add date */}
                            <Box sx={{display:'flex', mb:'1rem'}}>
                                <Box sx={{width:'50%', boxSizing:'border-box', pr:'.5rem'}}>
                                    <TextField 
                                        disabled={disableType}
                                        label='Date'
                                        type='date'
                                        // value={memberText}
                                        // onChange={handleMemberText}
                                        // onKeyDown={handleKeyDown}
                                        fullWidth
                                        error={errorText}
                                        helperText={errorText}
                                        slotProps={{
                                            inputLabel: {
                                                shrink:true,
                                            }
                                        }}
                                        
                                        />
                                </Box>
                                {/* add start time */}
                                <Box sx={{width:'25%', boxSizing:'border-box', pr:'.25rem'}}>
                                    <TextField 
                                        disabled={disableType}
                                        label='Start Time'
                                        type='time'
                                        // value={memberText}
                                        // onChange={handleMemberText}
                                        // onKeyDown={handleKeyDown}
                                        fullWidth
                                        error={errorText}
                                        helperText={errorText}
                                        slotProps={{
                                            inputLabel: {
                                                shrink:true,
                                            }
                                        }}
                                        />
                                </Box>
                                {/* add end time */}
                                <Box sx={{width:'25%', boxSizing:'border-box', pl:'.25rem'}}>
                                    <TextField 
                                        disabled={disableType}
                                        label='End Time'
                                        type='time'
                                        // value={memberText}
                                        // onChange={handleMemberText}
                                        // onKeyDown={handleKeyDown}
                                        fullWidth
                                        error={errorText}
                                        helperText={errorText}
                                        slotProps={{
                                            inputLabel: {
                                                shrink:true,
                                            }
                                        }}
                                        />
                                </Box>
                            </Box>
                            {/* Content */}
                            <TopicList />                            
                        </Box>
                    </DialogContent>
                    {/* buttons */}
                    <DialogActions>
                        <Button disabled={loading} onClick={handleClose}>Cancel</Button>
                        <Button disabled={loading} type='submit'>
                            {(loading)
                                ? <CircularProgress />
                                : 'Add'
                            }
                        </Button>
                    </DialogActions>
                </form>
            </Drawer>
        </>
        
    )
}