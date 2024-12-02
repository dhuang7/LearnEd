'use client'

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Box from "@mui/material/Box";
import { useState } from "react";
import TextField from "@mui/material/TextField";
import useMediaQuery from "@mui/material/useMediaQuery";

import theme from "@/app/theme";
import {createTeam} from './createTeamAction';


export default function Modal() {
    const [name, setName] = useState('');
    const [open, setOpen] = useState(false);
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

    function handleSubmit(e) {
        e.preventDefault();
        handleClose();
        createTeam(name);
        setName('');
    }

    return (
        <>
            <Button variant="outlined" sx={{mx:'1rem', textTransform:'none'}} onClick={handleOpen}>
                Create Team
            </Button>
            <Dialog
                open={open}
                maxWidth='sm'
                fullWidth
                fullScreen={fullScreen}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                >
                <form onSubmit={handleSubmit}>
                    <DialogTitle id="alert-dialog-title">
                        Create Team
                    </DialogTitle>
                    <DialogContent>
                        <Box sx={{pt:1}}>
                            <TextField 
                                required
                                label='Name'
                                value={name}
                                onChange={handleName}
                                sx={{width:'100%'}}
                                />
                        </Box>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>Cancel</Button>
                        <Button type='submit' autoFocus>
                            Create
                        </Button>
                    </DialogActions>
                </form>
            </Dialog>
        </>
        
    )
}