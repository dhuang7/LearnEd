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
import { useState } from "react";
import {createTeam} from './createTeamAction';
import createClient from "@/utils/supabase/client";



export default function Modal() {
    const [name, setName] = useState('');
    const [open, setOpen] = useState(false);
    const [memberText, setMemberText] = useState('');
    const [errorText, setErrorText] = useState('');
    const [members, setMembers] = useState([]);
    const [disableType, setDisableType] = useState(false);
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
    

    function handleOpen() {
        setOpen(true);
    }

    function handleClose(e) {
        setOpen(false);
    }

    function handleName({target}) {
        setName(target.value);
    }

    function handleMemberText({target}) {
        setMemberText(target.value);
        if (errorText.length > 0) setErrorText('');
    }

    function handleKeyDown(e) {
        if (e.key === "Enter") {
            e.preventDefault(); // Prevent form submission
            handleAddMember();
        }
      
    }

    function handleRemoveMember({currentTarget}) {
        const value = currentTarget.dataset.value;
        console.log(value)
        console.log(members.slice(value+1))
        setMembers(m => [
            ...m.slice(0, value),
            ...m.slice(value+1),
        ]);
    }

    async function handleAddMember() {
        setDisableType(true);

        if (members.includes(memberText)) {
            setErrorText('User is already added');
        } else {
            const supabase = createClient();
            let { data: profiles, error } = await supabase
                .from('profiles')
                .select('*')
                .eq('email', memberText);

            if (profiles.length === 1) {
                setMembers(m=>m.concat([memberText]))
            } else {
                setErrorText('User does not exist');
            }
        }

        setDisableType(false);
        setMemberText('');
    }

    function handleSubmit(e) {
        e.preventDefault();
        handleClose();
        createTeam(name);
        setName('');
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
                                {members.map((m, i) => (
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
                        <Button onClick={handleClose}>Cancel</Button>
                        <Button type='submit'>
                            Create
                        </Button>
                    </DialogActions>
                </form>
            </Dialog>
        </>
        
    )
}