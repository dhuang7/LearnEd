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
import PersonRemoveRoundedIcon from '@mui/icons-material/PersonRemoveRounded';




import theme from "@/app/theme";
import { useEffect, useState, useTransition } from "react";
import createClient from "@/utils/supabase/client";
import { CircularProgress } from "@mui/material";
import { useRouter } from "next/navigation";



export default function AddMemberModal({profiles, teamId}) {
    const supabase = createClient();
    const router = useRouter();
    const [isPending, startTransition] = useTransition();
    const originalEmails = profiles.map(p => p.email);
    const originalIds = profiles.map(p => p.id);
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [notAdmin, setNotAdmin] = useState('');
    const [memberText, setMemberText] = useState('');
    const [errorText, setErrorText] = useState('');
    const [memberEmails, setMemberEmails] = useState(originalEmails);
    const [memberIds, setMemberIds] = useState(originalIds);
    const [disableType, setDisableType] = useState(false);
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

    // get all member emails and member ids
    useEffect(() => {
        setMemberEmails(profiles.map(p => p.email));
        setMemberIds(profiles.map(p => p.id))
    }, [profiles]);

    // makes sure that the info is loaded before finishing.
    useEffect(() => {
        if (!isPending) {
            handleClose();
            setLoading(false);
        }
    }, [isPending]);

    // handlers
    async function handleOpen() {
        // checks if user is an admin then disables if not
        const {data: profile, error: profileError} = await supabase
            .from('profiles')
            .select('*');

        const {data: admin, error: adminError} = await supabase
            .from('team_memberships')
            .select('*')
            .eq('team_id', teamId)
            .eq('user_id', profile[0].id)
            .in('role', ['admin', 'owner']);

        setNotAdmin(admin.length ? '' : 'You do not have permission to manage users.')

        // open modal
        setOpen(true);
    }

    function handleClose(e) {
        // close modal
        setOpen(false);
        setMemberText('');
        setMemberEmails(originalEmails);
        setMemberIds(originalIds);
        setErrorText('');
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

    async function handleRemoveMember({currentTarget}) {
        // removes a member
        const value = Number(currentTarget.dataset.value);
        const {data: {user}} = await supabase.auth.getUser();
        const {data: team_memberships, error} = await supabase
            .from('team_memberships')
            .select()
            .eq('team_id', teamId)
            .eq('user_id', )

        if (memberEmails[value] === user.email) {
            // check if you are removing self
            setErrorText("You can't remove yourself");
        } else {
            // remove
            setMemberEmails(m => [
                ...m.slice(0, value),
                ...m.slice(value+1),
            ]);
            setMemberIds(m => [
                ...m.slice(0, value),
                ...m.slice(value+1),
            ]);
        }
        
    }

    async function handleAddMember() {
        // check if member exist then adds it to the list
        setDisableType(true);

        if (memberEmails.includes(memberText)) {
            // checks if user is already added
            setErrorText('User is already added');
        } else {
            const {data: {user}} = await supabase.auth.getUser();
            if (user.email === memberText) {
                // checks if this is your email
                setErrorText('This is your email');
            } else {
                const { data, error } = await supabase.rpc('email_exists', { checked_email: memberText })
                if (data[0]) {
                    // checks if user exists
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
        const {data, error} = await supabase.rpc('manage_team_memberships', {tid: teamId, member_ids: memberIds});
        // reset everything
        startTransition(() => {
            router.refresh();
        })
    }

    console.log(notAdmin);

    return (
        <>
            {/* add member button to open dialog */}
            <IconButton color='primary' onClick={handleOpen} disabled={loading}><PersonAddRoundedIcon /></IconButton>
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
                        Add Member
                    </DialogTitle>
                    {/* content */}
                    <DialogContent>
                        <Box sx={{pt:1}}>
                            {/* add users */}
                            <TextField 
                                disabled={disableType}
                                label='Add Member'
                                value={memberText}
                                onChange={handleMemberText}
                                onKeyDown={handleKeyDown}
                                sx={{width:'100%', mb:'1rem'}}
                                error={errorText||notAdmin}
                                helperText={errorText||notAdmin}
                                slotProps={{
                                    input:{
                                        endAdornment:(
                                            <InputAdornment position='end'>
                                                <IconButton disabled={notAdmin} size='large' edge="end" onClick={handleAddMember}>
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
                                        <IconButton data-value={i} sx={{ml:'auto'}} disabled={notAdmin} onClick={handleRemoveMember}>
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
                        <Button disabled={loading||notAdmin} type='submit'>
                            {(loading)
                                ? <CircularProgress />
                                : 'Add'
                            }
                        </Button>
                    </DialogActions>
                </form>
            </Dialog>
        </>
        
    )
}