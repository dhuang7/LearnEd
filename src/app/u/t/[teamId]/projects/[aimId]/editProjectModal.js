'use client'

import Typography from "@mui/material/Typography";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import CircularProgress from "@mui/material/CircularProgress";
import useMediaQuery from "@mui/material/useMediaQuery";
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';

import theme from "@/app/theme";
import { useState, useTransition, useEffect } from "react";
import { useRouter } from "next/navigation";
import createClient from '@/utils/supabase/client';



export default function EditProjectModal({project, setAimInfo}) {
    const supabase = createClient();
    const router = useRouter();
    const [isPending, startTransition] = useTransition();
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [projectNameText, setProjectNameText] = useState(project.name);

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
        setProjectNameText(project.name);
    }

    // typing handlers
    function handleProjectNameText({target}) {
        setProjectNameText(target.value);
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
            .update({
                name: projectNameText,
            })
            .eq('id', project.id);

        startTransition(() => {
            router.refresh();
        })
    }

    async function handleDelete() {
        setLoading(true);

        const {error} = await supabase
            .from('projects')
            .delete()
            .eq('id', project.id);
        
        setAimInfo(null);
        router.push('../');
    }

    return (
        <>
            <IconButton onClick={handleOpen} sx={{mr:'.5rem'}} >
                <SettingsRoundedIcon />
            </IconButton>

            {/* open dialog */}
            <Dialog
                open={open}
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
                        <Box sx={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
                            <Typography variant='inherit'>Edit Project</Typography>
                            <IconButton size="small" onClick={handleDelete}><DeleteRoundedIcon /></IconButton>
                        </Box>
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
                        </Box>
                    </DialogContent>
                    {/* buttons */}
                    <DialogActions>
                        <Button disabled={loading} onClick={handleClose}>Cancel</Button>
                        <Button disabled={loading} type='submit'>
                            {(loading)
                                ? <CircularProgress size='1rem' />
                                : 'Save'
                            }
                        </Button>
                    </DialogActions>
                </form>
            </Dialog>
        </>
    );
}