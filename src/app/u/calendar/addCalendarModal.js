'use client'

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import useMediaQuery from "@mui/material/useMediaQuery";
import CircularProgress from "@mui/material/CircularProgress";
import IconButton from "@mui/material/IconButton";
import AddRoundedIcon from '@mui/icons-material/AddRounded';




import theme from "@/app/theme";
import { useEffect, useState, useTransition } from "react";
import createClient from "@/utils/supabase/client";
import { useRouter } from "next/navigation";



export default function AddCalendarModal({defaultOpen}) {
    const supabase = createClient();
    const router = useRouter();
    const [isPending, startTransition] = useTransition();
    const [open, setOpen] = useState(defaultOpen||false);
    const [loading, setLoading] = useState(false);
    const [nameText, setNameText] = useState('');
    const [descriptionText, setDescriptionText] = useState('');
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
        setNameText('');
        setDescriptionText('');
        if (defaultOpen) router.back();
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
        const {data, error} = await supabase.rpc('create_calendar', {
            calendar_name: nameText, 
            calendar_description: descriptionText,
            calendar_default_color: '',
            user_ids: [],
        });

        console.log(data);
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
                <form onSubmit={handleSubmit}>
                    {/* title */}
                    <DialogTitle id="alert-dialog-title">
                        Add Calendar
                    </DialogTitle>
                    {/* content */}
                    <DialogContent>
                        <Box sx={{pt:1, flexDirection:'column'}}>
                            <TextField 
                                label='Name'
                                required
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
                                : 'Add'
                            }
                        </Button>
                    </DialogActions>
                </form>
            </Dialog>
        </>
        
    )
}



