'use client'

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
import { useState, useTransition, useEffect } from "react";
import { useRouter } from "next/navigation";
import createClient from '@/utils/supabase/client';



export default function AddProjectModal({component, modalOnly, teamId}) {
    const Component = component || Button;
    const supabase = createClient();
    const router = useRouter();
    const [isPending, startTransition] = useTransition();
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [projectNameText, setProjectNameText] = useState('');
    const [aimNameText, setAimNameText] = useState('');
    const [backgroundText, setBackgroundText] = useState('');
    const [problemText, setProblemText] = useState('');
    const [goalText, setGoalText] = useState('');
    const [outcomeMeasureText, setOutcomeMeasureText] = useState('');

    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

    useEffect(() => {
        if (!isPending && loading) {
            handleClose();
            setLoading(false);
        }
    }, [isPending])


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
        modalOnly && !loading && router.back();
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

    // stops propagation of the keydown for the textfields
    function handleCancelKeydownPropagation(e) {
        e.stopPropagation();
    }


    async function handleSubmit(e) {
        e.preventDefault();
        setLoading(true);

        const {data, error} = await supabase
            .from('projects')
            .insert({
                name: projectNameText,
                aim_name: aimNameText,
                team_id: teamId,
                // aim_outcome_measure: outcomeMeasureText,
                background: backgroundText,
                problem: problemText,
                goal: goalText,
            })
            .select();

        startTransition(() => {
            router.refresh();
        })
    }

    return (
        <>
            {modalOnly ||
                <Component onClick={handleOpen} >
                    <AddRoundedIcon color="info" sx={{mx:'.5rem'}} />
                    <Typography color="info">Project</Typography>
                </Component>
            }

            {/* open dialog */}
            <Dialog
                open={modalOnly||open}
                maxWidth='sm'
                onClose={handleClose}
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
                                onKeyDown={handleCancelKeydownPropagation}
                                sx={{mb:'.5rem'}}
                                />
                            <TextField
                                fullWidth
                                disabled={loading}
                                label='Aim Name'
                                value={aimNameText}
                                onChange={handleAimNameText}
                                onKeyDown={handleCancelKeydownPropagation}
                                sx={{mb:'.5rem'}}
                                />
                            <TextField
                                fullWidth
                                disabled={loading}
                                label='Background'
                                value={backgroundText}
                                onChange={handleBackgroundText}
                                onKeyDown={handleCancelKeydownPropagation}
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
                                onKeyDown={handleCancelKeydownPropagation}
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
                                onKeyDown={handleCancelKeydownPropagation}
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
                            {/* <TextField
                                fullWidth
                                disabled={loading}
                                label='Outcome Measure'
                                value={outcomeMeasureText}
                                onChange={handleOutcomeMeasureText}
                                onKeyDown={handleCancelKeydownPropagation}
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
                                /> */}
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