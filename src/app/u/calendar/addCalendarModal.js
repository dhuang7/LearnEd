'use client'

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import TextField from "@mui/material/TextField";
import useMediaQuery from "@mui/material/useMediaQuery";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import CircleRoundedIcon from '@mui/icons-material/CircleRounded';
import PersonAddRoundedIcon from '@mui/icons-material/PersonAddRounded';
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import PersonRemoveRoundedIcon from '@mui/icons-material/PersonRemoveRounded';




import theme from "@/app/theme";
import { useEffect, useState, useTransition } from "react";
import createClient from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import CalendarMemnberPermission from "./calendarMemberPermission";



export default function AddCalendarModal({defaultOpen, teamId, teamMembers, user}) {
    const supabase = createClient();
    const router = useRouter();
    const [teamMemberObj, setTeamMemberObj] = useState(teamMembers?.filter(v => v.id !== user.id) || []);
    const [isPending, startTransition] = useTransition();
    const [open, setOpen] = useState(defaultOpen||false);
    const [loading, setLoading] = useState(false);
    const [nameText, setNameText] = useState('');
    const [colorText, setColorText] = useState('Chocolate');
    const [descriptionText, setDescriptionText] = useState('');
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
    const [disableType, setDisableType] = useState(false);
    const [memberText, setMemberText] = useState('');
    const [errorText, setErrorText] = useState('');
    const [memberEmails, setMemberEmails] = useState(teamMemberObj.map(v=>v.email));
    const [memberRoles, setMemberRoles] = useState(teamMemberObj.map(v=>'editor'));
    const [memberIds, setMemberIds] = useState(teamMemberObj.map(v=>v.id));

    useEffect(() => {
        const tmo = teamMembers?.filter(v => v.id !== user.id) || [];
        setTeamMemberObj(tmo);
        setMemberEmails(tmo.map(v=>v.email));
        setMemberRoles(tmo.map(v=>'editor'));
        setMemberIds(tmo.map(v=>v.id));
    }, [teamMembers]);



    // makes sure that the info is loaded before finishing.
    useEffect(() => {
        if (!isPending && loading) {
            handleClose();
            setLoading(false);
        }
    }, [isPending]);

    // handlers
    async function handleOpen(e) {
        e.stopPropagation();
        // open modal
        setOpen(true);
    }

    function handleClose(e) {
        e?.stopPropagation();
        // close modal
        setOpen(false);
        setNameText('');
        setDescriptionText('');
        setMemberText('');
        setMemberEmails(teamMemberObj.map(v=>v.email));
        setMemberRoles(teamMemberObj.map(v=>'editor'));
        setMemberIds(teamMemberObj.map(v=>v.id));
        setErrorText('');
        if (defaultOpen) router.back();
    }

    function handleNameText({target}) {
        // member text
        setNameText(target.value);
    }

    function handleColorText({target}) {
        setColorText(target.value);
    }
    
    function handleDescriptionText({target}) {
        // member text
        setDescriptionText(target.value);
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

    async function handleAddMember() {
        // check if member exist then adds it to the list
        setDisableType(true);

        if (memberEmails.includes(memberText)) {
            // checks if user is already added
            setErrorText('User is already added');
        } else {
            if (user.email === memberText) {
                // checks if this is your email
                setErrorText('This is your email');
            } else {
                const { data, error } = await supabase.rpc('email_exists', { checked_email: memberText })
                if (data[0]) {
                    // checks if user exists
                    setMemberEmails(m=>m.concat([memberText]));
                    setMemberRoles(m=>m.concat(['viewer']))
                    setMemberIds(m=>m.concat([data[0].id]));
                } else {
                    setErrorText('User does not exist');
                }
            }            
        }

        setDisableType(false);
        setMemberText('');
    }

    async function handleRemoveMember({currentTarget}) {
        // removes a member
        const value = Number(currentTarget.dataset.value);

        if (memberEmails[value] === user.email) {
            // check if you are removing self
            setErrorText("You can't remove yourself");
        } else if (teamMemberObj.map(v=>v.id).includes(memberIds[value])) {
            setErrorText("You can't remove a team member from a team calendar.")
        } else {
            // remove
            setMemberEmails(m => [
                ...m.slice(0, value),
                ...m.slice(value+1),
            ]);
            setMemberRoles(m => [
                ...m.slice(0, value),
                ...m.slice(value+1),
            ]);
            setMemberIds(m => [
                ...m.slice(0, value),
                ...m.slice(value+1),
            ]);
        }
        
    }

    async function handleSubmit(e) {
        // handle submit
        e.preventDefault();
        setLoading(true);
        const {data, error} = await supabase.rpc('create_calendar', {
            calendar_name: nameText, 
            calendar_description: descriptionText,
            calendar_default_color: colorText,
            user_ids: [
                ...memberIds.map((v, i) => ({user_id: v, role: memberRoles[i]})),
            ],
            team_id: teamId||null,
            is_cycles: false,
        });

        console.log(error);
        // reset everything
        startTransition(() => {
            router.refresh();
        })
    }

    return (
        <>
            {/* add member button to open dialog */}
            <IconButton size="small" onClick={handleOpen} disabled={loading}><AddRoundedIcon fontSize="small" /></IconButton>
            {/* open dialog */}
            <Dialog
                open={open}
                maxWidth='sm'
                fullWidth
                fullScreen={fullScreen}
                onClose={handleClose}
                onClick={e => e.stopPropagation()}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                >
                {/* form */}
                <form onSubmit={handleSubmit} sx={{overflow:'hidden'}}>
                    {/* title */}
                    <DialogTitle id="alert-dialog-title">
                        Add Calendar
                    </DialogTitle>
                    {/* content */}
                    <DialogContent>
                        <Box sx={{pt:1, flexDirection:'column'}}>
                        <Box sx={{display: 'flex', mb:'1rem'}}>
                                {/* name */}
                                <Box sx={{boxSizing: 'border-box', pr:'.25rem', width:'85%'}}>
                                    <TextField 
                                        label='Name'
                                        required
                                        disabled={loading}
                                        fullWidth
                                        value={nameText}
                                        onChange={handleNameText}
                                        />
                                </Box>
                                {/* color */}
                                <Box sx={{boxSizing: 'border-box', pl:'.25rem', width:'15%'}}>
                                    <TextField 
                                        label='Color'
                                        disabled={loading}
                                        fullWidth
                                        select
                                        value={colorText}
                                        onChange={handleColorText}
                                        slotProps={{
                                            select: {
                                                renderValue:(v) => <CircleRoundedIcon fontSize="small" sx={{color:v}} />,
                                            },
                                            htmlInput: {
                                                sx: {
                                                    display:'flex'
                                                }
                                            },
                                        }}
                                        >
                                        {['Chocolate', 'RoyalBlue', 'ForestGreen', 'Crimson'].map((v,i) => (
                                            <MenuItem key={i} value={v}>
                                                <CircleRoundedIcon sx={{color:v, mr:'.5rem'}} />
                                                <Typography>{v}</Typography>
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                </Box>
                            </Box>
                            <TextField 
                                label='Description'
                                value={descriptionText}
                                onChange={handleDescriptionText}
                                multiline
                                rows={4}
                                fullWidth
                                sx={{
                                    mb:'1rem'
                                }}
                                />
                            {/* add users */}
                            <TextField 
                                disabled={disableType}
                                label='Add User'
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
                                                <IconButton 
                                                    // disabled={notAdmin} 
                                                    size='large' edge="end" 
                                                    onClick={handleAddMember}
                                                    >
                                                    <PersonAddRoundedIcon />
                                                </IconButton>
                                            </InputAdornment>
                                        )
                                    }
                                }}
                                />
                            {/* list of users */}
                            <Typography variant="h6">Users:</Typography>
                            <List sx={{maxHeight:'10rem', overflow:'scroll'}}>
                                {memberEmails.map((m, i) => (
                                    <CalendarMemnberPermission 
                                        m={m} 
                                        i={i} 
                                        key={i} 
                                        memberRoles={memberRoles} setMemberRoles={setMemberRoles} 
                                        handleRemoveMember={handleRemoveMember} 
                                        teamMemberObj={teamMemberObj}
                                        memberIds={memberIds}
                                        setErrorText={setErrorText}
                                        />
                                ))}
                            </List>
                        </Box>
                    </DialogContent>
                    {/* buttons */}
                    <DialogActions>
                        <Button disabled={loading} onClick={handleClose}>Cancel</Button>
                        <Button disabled={loading} type='submit' >
                            {(loading)
                                ? <CircularProgress size='1rem' />
                                : 'Add'
                            }
                        </Button>
                    </DialogActions>
                </form>
            </Dialog>
        </>
        
    )
}



