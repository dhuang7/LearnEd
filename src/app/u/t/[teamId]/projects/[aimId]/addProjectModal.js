'use client'

import MenuItem from "@mui/material/MenuItem";
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import Typography from "@mui/material/Typography";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import CircularProgress from "@mui/material/CircularProgress";
import useMediaQuery from "@mui/material/useMediaQuery";

import theme from "@/app/theme";
import { useState } from "react";



export default function AddProjectModal({value}) {
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [projectNameText, setProjectNameText] = useState('');
    const [aimNameText, setAimNameText] = useState('');
    const [backgroundText, setBackgroundText] = useState('');
    const [problemText, setProblemText] = useState('');
    const [goalText, setGoalText] = useState('');
    const [outcomeMeasureText, setOutcomeMeasureText] = useState('');

    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));


    // handlers
    function handleOpen() {
        setOpen(true);
    }

    function handleClose() {
        setOpen(false);
        setProjectNameText('');
        setAimNameText('');
        setBackgroundText('');
        setProblemText('');
        setGoalText('');
        setOutcomeMeasureText('');
    }

    // typing handlers
    function handleProjectNameText({target}) {
        setProjectNameText(target.value);
    }

    function handleAimNameText({target}) {
        setAimNameText(target.value);
    }
    function handleBackgroundText({target}) {
        setBackgroundText(target.value);
    }
    function handleProblemText({target}) {
        setProblemText(target.value);
    }
    function handleGoalText({target}) {
        setGoalText(target.value);
    }
    function handleOutcomeMeasureText({target}) {
        setOutcomeMeasureText(target.value);
    }

    function handleErrorBlur(event) {
        console.log(event)
    }

    function handleSubmit(e) {
        e.preventDefault();

        handleClose();
    }

    return (
        <>
            <MenuItem disableGutters value={value} onClick={handleOpen}>
                <AddRoundedIcon color="info" sx={{mx:'.5rem'}} />
                <Typography color="info">Project</Typography>
            </MenuItem>

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
                        Create Project
                    </DialogTitle>
                    {/* content */}
                    <DialogContent>
                        <Box sx={{pt:1}}>
                            <TextField
                                fullWidth
                                required
                                disabled={loading}
                                label='Project Name'
                                value={projectNameText}
                                onChange={handleProjectNameText}
                                onBlur={handleErrorBlur}
                                sx={{mb:'.5rem'}}
                                />
                            <TextField
                                fullWidth
                                disabled={loading}
                                label='Aim Name'
                                value={aimNameText}
                                onChange={handleAimNameText}
                                sx={{mb:'.5rem'}}
                                />
                            <TextField
                                fullWidth
                                disabled={loading}
                                label='Background'
                                value={backgroundText}
                                onChange={handleBackgroundText}
                                multiline
                                rows={2}
                                slotProps={{
                                    htmlInput: {
                                        style:{
                                            resize:'vertical'
                                        }
                                    }
                                }}
                                sx={{mb:'.5rem'}}
                                />
                            <TextField
                                fullWidth
                                disabled={loading}
                                label='Problem'
                                value={problemText}
                                onChange={handleProblemText}
                                multiline
                                rows={2}
                                slotProps={{
                                    htmlInput: {
                                        style:{
                                            resize:'vertical'
                                        }
                                    }
                                }}
                                sx={{mb:'.5rem'}}
                                />
                            <TextField
                                fullWidth
                                disabled={loading}
                                label='Goal'
                                value={goalText}
                                onChange={handleGoalText}
                                multiline
                                rows={2}
                                slotProps={{
                                    htmlInput: {
                                        style:{
                                            resize:'vertical'
                                        }
                                    }
                                }}
                                sx={{mb:'.5rem'}}
                                sx={{mb:'.5rem'}}
                                />
                            <TextField
                                fullWidth
                                disabled={loading}
                                label='Outcome Measure'
                                value={outcomeMeasureText}
                                onChange={handleOutcomeMeasureText}
                                multiline
                                rows={2}
                                slotProps={{
                                    htmlInput: {
                                        style:{
                                            resize:'vertical'
                                        }
                                    }
                                }}
                                sx={{mb:'.5rem'}}
                                sx={{mb:'.5rem'}}
                                />
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
    );
}