'use client'

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import useMediaQuery from "@mui/material/useMediaQuery";
import CircularProgress from "@mui/material/CircularProgress";
import IconButton from "@mui/material/IconButton";
import MoreVertRoundedIcon from '@mui/icons-material/MoreVertRounded';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import CircleRoundedIcon from '@mui/icons-material/CircleRounded';
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import InputAdornment from "@mui/material/InputAdornment";
import PersonAddRoundedIcon from '@mui/icons-material/PersonAddRounded';
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import PersonRemoveRoundedIcon from '@mui/icons-material/PersonRemoveRounded';



import theme from "@/app/theme";
import { useEffect, useState, useTransition } from "react";
import createClient from "@/utils/supabase/client";
import { useRouter } from "next/navigation";



export default function EditCalendarModal({calendarData, teamMembers, user}) {
    const supabase = createClient();
    const router = useRouter();
    const [teamMemberObj, setTeamMemberObj] = useState(teamMembers?.filter(v => v.id !== user.id) || []);
    const [isPending, startTransition] = useTransition();
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [nameText, setNameText] = useState(calendarData.calendars.name);
    const [colorText, setColorText] = useState(calendarData.calendars.default_color);
    const [descriptionText, setDescriptionText] = useState(calendarData.calendars.description);
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
    const [disableType, setDisableType] = useState(false);
    const [memberText, setMemberText] = useState('');
    const [errorText, setErrorText] = useState('');
    const [memberEmails, setMemberEmails] = useState([]);
    const [memberIds, setMemberIds] = useState([]);

    useEffect(() => {
        setTeamMemberObj(teamMembers?.filter(v => v.id !== user.id) || []);
    }, [teamMembers]);


    // makes sure that the info is loaded before finishing.
    useEffect(() => {
        if (!isPending && loading) {
            handleClose();
            setLoading(false);
        }
    }, [isPending]);

    // get all member emails and member ids
    useEffect(() => {
        async function getProfile() {
            const {data: profiles, error} = await supabase.rpc('get_calendar_emails', {cid: calendarData.calendars.id})
            setMemberEmails(profiles.map(p => p.email));
            setMemberIds(profiles.map(p => p.id))
        }

        getProfile();
    }, [calendarData, open]);

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
        setNameText(calendarData.calendars.name);
        setDescriptionText(calendarData.calendars.description);
        setMemberText('');
        setErrorText('');
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
        } else if (calendarData.role !== 'owner') {
            setErrorText("Only owners can remove members");
        } else if (teamMemberObj.map(v=>v.id).includes(memberIds[value])) {
            setErrorText("You can't remove a team member from a team calendar.")
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

    async function handleSubmit(e) {
        // handle submit
        e.preventDefault();
        setLoading(true);
        const {data, error} = await supabase.rpc('update_calendar', {
            cid: calendarData.calendars.id,
            new_name: nameText,
            new_description: descriptionText,
            new_default_color: colorText,
            user_ids: [
                ...memberIds.map(v => ({user_id: v, role: 'editor'})),
            ]
        })

        console.log(data);
        console.log(error);
        // reset everything
        startTransition(() => {
            router.refresh();
        })
    }

    async function handleDelete() {
        setLoading(true);
        if (calendarData.role === 'owner') {
            const {data, error} = await supabase
                .from('calendars')
                .delete()
                .eq('id', calendarData.calendars.id);
            
            startTransition(() => {
                router.refresh();
            })
        } else {
            setErrorText('Only owners can delete');
            setLoading(false);
        }

        
    }

    return (
        <>
            {/* add member button to open dialog */}
            <IconButton size="small" onClick={handleOpen} disabled={loading} sx={{ml:'auto', mr:'.5rem'}}><MoreVertRoundedIcon fontSize="small" /></IconButton>
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
                    <DialogTitle id="alert-dialog-title" sx={{display:'flex', alignItems: 'center'}}>
                        <Typography variant="inherit">Edit Calendar</Typography>
                        <IconButton disabled={loading} onClick={handleDelete} size="small" sx={{ml:'auto'}}><DeleteRoundedIcon fontSize="small" /></IconButton>
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
                            {/* description */}
                            <TextField 
                                label='Description'
                                value={descriptionText}
                                onChange={handleDescriptionText}
                                disabled={loading}
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
                        <Button disabled={loading} type='submit' >
                            {(loading)
                                ? <CircularProgress size='1rem' />
                                : 'Save'
                            }
                        </Button>
                    </DialogActions>
                </form>
            </Dialog>
        </>
        
    )
}



