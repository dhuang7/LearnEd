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
import Typography from "@mui/material/Typography";
import AddRoundedIcon from '@mui/icons-material/AddRounded';




import theme from "@/app/theme";
import { useEffect, useState, useTransition } from "react";
import createClient from "@/utils/supabase/client";
import { useRouter } from "next/navigation";



export default function AddEventModal() {
    const supabase = createClient();
    const router = useRouter();
    const [isPending, startTransition] = useTransition();
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    // const [memberText, setMemberText] = useState('');
    const [errorText, setErrorText] = useState('');
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

    // makes sure that the info is loaded before finishing.
    useEffect(() => {
        if (!isPending && loading) {
            handleClose();
            setLoading(false);
        }
    }, [isPending]);

    // handlers
    async function handleOpen() {
        // open modal
        setOpen(true);
    }

    function handleClose(e) {
        // close modal
        setOpen(false);
        // setMemberText('');
        setErrorText('');
    }

    // function handleMemberText({target}) {
    //     // member text
    //     setMemberText(target.value);
    //     if (errorText.length > 0) setErrorText('');
    // }

    async function handleSubmit(e) {
        // handle submit
        e.preventDefault();
        setLoading(true);
        // const {data, error} = await supabase.rpc('manage_team_memberships', {tid: teamId, member_ids: memberIds});
        // reset everything
        startTransition(() => {
            router.refresh();
        })
    }

    return (
        <>
            {/* add member button to open dialog */}
            <Button 
                color='info' 
                variant='contained' disableElevation 
                sx={{borderRadius:3, textTransform:'none'}} 
                startIcon={<AddRoundedIcon />}
                onClick={handleOpen}
                disabled={loading}
                >
                New
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
                        Add Event
                    </DialogTitle>
                    {/* content */}
                    <DialogContent>
                        <Box sx={{pt:1}}>
                            
                        </Box>
                    </DialogContent>
                    {/* buttons */}
                    <DialogActions>
                        <Button disabled={loading} onClick={handleClose}>Cancel</Button>
                        <Button disabled={loading} type='submit'>
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



