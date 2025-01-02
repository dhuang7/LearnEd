'use client'

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import useMediaQuery from "@mui/material/useMediaQuery";
import CircularProgress from "@mui/material/CircularProgress";
import IconButton from "@mui/material/IconButton";
import MoreVertRoundedIcon from '@mui/icons-material/MoreVertRounded';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';




import theme from "@/app/theme";
import { useEffect, useState, useTransition } from "react";
import createClient from "@/utils/supabase/client";
import { useRouter } from "next/navigation";



export default function EditCalendarModal({calendar}) {
    const supabase = createClient();
    const router = useRouter();
    const [isPending, startTransition] = useTransition();
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [nameText, setNameText] = useState(calendar.name);
    const [descriptionText, setDescriptionText] = useState(calendar.description);
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

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
        setNameText(calendar.name);
        setDescriptionText(calendar.description);
    }

    function handleNameText({target}) {
        // member text
        setNameText(target.value);
    }
    function handleDescriptionText({target}) {
        // member text
        setDescriptionText(target.value);
    }

    async function handleSubmit(e) {
        // handle submit
        e.preventDefault();
        setLoading(true);
        const {data, error} = await supabase
            .from('calendars')
            .update({
                name: nameText,
                description: descriptionText,
            })
            .eq('id', calendar.id)

        console.log(data);
        console.log(error);
        // reset everything
        startTransition(() => {
            router.refresh();
        })
    }

    async function handleDelete() {
        setLoading(true);
        const {data, error} = await supabase
            .from('calendars')
            .delete()
            .eq('id', calendar.id);

        startTransition(() => {
            router.refresh();
        })
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
                <form onSubmit={handleSubmit}>
                    {/* title */}
                    <DialogTitle id="alert-dialog-title" sx={{display:'flex', alignItems: 'center'}}>
                        <Typography variant="inherit">Edit Calendar</Typography>
                        <IconButton disabled={loading} onClick={handleDelete} size="small" sx={{ml:'auto'}}><DeleteRoundedIcon fontSize="small" /></IconButton>
                    </DialogTitle>
                    {/* content */}
                    <DialogContent>
                        <Box sx={{pt:1, flexDirection:'column'}}>
                            <TextField 
                                label='Name'
                                required
                                disabled={loading}
                                fullWidth
                                value={nameText}
                                onChange={handleNameText}
                                sx={{
                                    mb:'1rem'
                                }}
                                />
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



