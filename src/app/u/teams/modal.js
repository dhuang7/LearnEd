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
import CircularProgress from "@mui/material/CircularProgress";
import PersonRemoveRoundedIcon from '@mui/icons-material/PersonRemoveRounded';




import theme from "@/app/theme";
import { useState } from "react";
import {createTeam} from './createTeamAction';
import createClient from "@/utils/supabase/client";
import { useRouter } from "next/navigation";



export default function Modal() {
    const [name, setName] = useState('');
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [memberText, setMemberText] = useState('');
    const [errorText, setErrorText] = useState('');
    const [memberEmails, setMemberEmails] = useState([]);
    const [memberIds, setMemberIds] = useState([]);
    const [disableType, setDisableType] = useState(false);
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
    const router = useRouter();
    

    // handlers
    function handleOpen() {
        // open modal
        setOpen(true);
    }

    function handleClose(e) {
        // close modal
        setOpen(false);
    }

    function handleName({target}) {
        // team name
        setName(target.value);
    }

    function handleMemberText({target}) {
        // member text
        setMemberText(target.value);
        if (errorText.length > 0) setErrorText('');
    }

    function handleKeyDown(e) {
        // remove form enter for handling adding members
        if (e.key === "Enter") {
            e.preventDefault(); // Prevent form submission
            handleAddMember();
        }
      
    }

    function handleRemoveMember({currentTarget}) {
        // removes a member
        const value = Number(currentTarget.dataset.value);
        setMemberEmails(m => [
            ...m.slice(0, value),
            ...m.slice(value+1),
        ]);
        setMemberIds(m => [
            ...m.slice(0, value),
            ...m.slice(value+1),
        ]);
    }

    async function handleAddMember() {
        // check if member exist then adds it to the list
        setDisableType(true);

        if (memberEmails.includes(memberText)) {
            setErrorText('User is already added');
        } else {
            const supabase = createClient();
            const {data: {user}} = await supabase.auth.getUser();
            if (user.email === memberText) {
                setErrorText('This is your email');
            } else {
                // let { data: profiles, error } = await supabase
                //     .from('profiles')
                //     .select('*')
                //     .eq('email', memberText);
                const { data, error } = await supabase.rpc('email_exists', { checked_email: memberText })
                if (data[0]) {
                    setMemberEmails(m=>m.concat([memberText]));
                    setMemberIds(m=>m.concat([data[0].id]));
                } else {
                    setErrorText('User does not exist');
                }
            }            
        }

        setDisableType(false);
        setMemberText('');
    }

    async function handleSubmit(e) {
        // handle submit
        e.preventDefault();
        setLoading(true);
        // add yourself
        await createTeam({name, memberEmails, memberIds});
        // reset everything
        router.refresh();
        handleClose();
        setLoading(false);
        setName('');
        setMemberText('');
        setMemberEmails([]);
        setMemberIds([]);
    }

    return (
        <>
            {/* create team button to open dialog */}
            <Button variant="outlined" sx={{mx:'1rem', textTransform:'none'}} onClick={handleOpen}>
                Create Team
            </Button>
            {/* open dialog */}
            <Dialog
                open={open}
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
                        Create Team
                    </DialogTitle>
                    {/* content */}
                    <DialogContent>
                        <Box sx={{pt:1}}>
                            {/* team name */}
                            <TextField 
                                required
                                label='Name'
                                value={name}
                                onChange={handleName}
                                sx={{width:'100%', mb:'1rem'}}
                                />
                            {/* add users */}
                            <TextField 
                                disabled={disableType}
                                label='Add Member'
                                value={memberText}
                                onChange={handleMemberText}
                                onKeyDown={handleKeyDown}
                                sx={{width:'100%', mb:'1rem'}}
                                error={errorText}
                                helperText={errorText}
                                slotProps={{
                                    input:{
                                        endAdornment:(
                                            <InputAdornment position='end'>
                                                <IconButton size='large' edge="end" onClick={handleAddMember}>
                                                    <PersonAddRoundedIcon />
                                                </IconButton>
                                            </InputAdornment>
                                        )
                                    }
                                }}
                                />
                            {/* list of users */}
                            <Typography variant="h6">Members:</Typography>
                            <List>
                                {memberEmails.map((m, i) => (
                                    <ListItem key={i}>
                                        <AccountCircleRoundedIcon fontSize='large' sx={{mr:'1rem'}} />
                                        <Typography>{m}</Typography>
                                        {/* remove user */}
                                        <IconButton data-value={i} sx={{ml:'auto'}} onClick={handleRemoveMember}>
                                            <PersonRemoveRoundedIcon fontSize="medium" />
                                        </IconButton>
                                    </ListItem>
                                ))}
                            </List>
                            
                        </Box>
                    </DialogContent>
                    {/* buttons */}
                    <DialogActions>
                        <Button disabled={loading} onClick={handleClose}>Cancel</Button>
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