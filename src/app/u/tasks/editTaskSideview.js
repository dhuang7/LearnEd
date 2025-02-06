'use client'

import Button from "@mui/material/Button";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Drawer from "@mui/material/Drawer";
import LastPageRoundedIcon from '@mui/icons-material/LastPageRounded';
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';



import { useState, useTransition, useEffect } from "react";
import createClient from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import ButtonTextfield from "@/components/buttonTextfield";



export default function EditTaskSideview({teamMembers, task, open, setOpen, user}) {
    const supabase = createClient();
    const router = useRouter();
    const [isPending, startTransition] = useTransition();
    const [loading, setLoading] = useState(false);
    const [titleText, setTitleText] = useState(task.title);
    const [descriptionText, setDescriptionText] = useState(task.description);
    const [assignedText, setAssignedText] = useState(task.assigned_id||'');
    const [statusText, setStatusText] = useState(task.status);

    // makes sure that the info is loaded before finishing.
    useEffect(() => {
        if (!isPending && loading) {
            handleCancel();
            setLoading(false);
        }
    }, [isPending]);

    useEffect(() => {
        setTitleText(task.title);
        setDescriptionText(task.description);
        setAssignedText(task.assigned_id||'');
        setStatusText(task.status);
    }, [task]);

    function handleClose(e) {
        // close modal
        setOpen(false);
    }

    function handleCancel() {
        handleClose();
        setTitleText(task.title);
        setDescriptionText(task.description);
        setAssignedText(task.assigned_id||'');
        setStatusText(task.status);
    }

    function handleTitleText({target}) {
        setTitleText(target.value);
    }

    function handleDescriptionText({target}) {
        setDescriptionText(target.value);
    }

    function handleAssignedText({target}) {
        setAssignedText(target.value);
    }

    function handleStatusText({target}) {
        setStatusText(target.value);
    }

    async function handleSubmit(e) {
        // handle submit
        e.preventDefault();
        setLoading(true);
       
        const {data, error} = await supabase
            .from('tasks')
            .update({
                title: titleText,
                description: descriptionText,
                priority: 4,
                user_id: user.id,
                assigned_id: assignedText||null,
                status: statusText,
            })
            .eq('id', task.id)

        console.log(error);
        // reset everything
        startTransition(() => {
            router.refresh();
        })
    }

    async function handleDelete() {
        setLoading(true);
        const { error } = await supabase
            .from('tasks')
            .delete()
            .eq('id', task.id);

        startTransition(() => {
            router.refresh();
        })
    }


    return (
        <>
            
            {/* open dialog */}
            <Drawer
                open={open}
                anchor='right'
                // hideBackdrop
                ModalProps={{
                    slotProps: {
                        backdrop: {
                            onClick:handleClose,
                            sx:{
                                backgroundColor: 'rgba(0, 0, 0, 0)',
                            }
                        }
                    },
                }}
                onClose={handleClose}
                elevation={5}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                PaperProps={{
                    sx: {
                        width:{xs:'100%', md:'35rem'},
                        display:'flex',
                        flexDirection:'row',
                        alignItems:'flex-start',
                        overflow:'hidden'
                    }
                }}
                >
                {/* close arrow button */}
                <Box sx={{px:'.25rem', boxSizing:'border-box'}}>
                    <IconButton size='small' onClick={handleClose} sx={{mt:'1.1rem', borderRadius:1}}><LastPageRoundedIcon /></IconButton>
                </Box>
                {/* form */}
                <form onSubmit={handleSubmit} style={{height:'100%', width:'100%', display:'flex', flexDirection:'column', overflow:'hidden'}}>
                    {/* title */}
                    <DialogTitle id="alert-dialog-title" sx={{pl:0, display:'flex', alignItems:'center'}}>
                        {/* title */}
                        <Typography variant='inherit'>Edit Task</Typography>
                        {/* delete button */}
                        <IconButton onClick={handleDelete} sx={{ml:'auto'}}><DeleteRoundedIcon /></IconButton>
                    </DialogTitle>
                    {/* content */}
                    <DialogContent sx={{pb:0, pl:0}}>
                        <Box sx={{pt:1, display:'flex', flexDirection:'column', height:'100%', boxSizing:'border-box',}}>
                            {/* title */}
                            <Typography variant="h6">Title:</Typography>
                            <ButtonTextfield 
                                value={titleText}
                                onChange={handleTitleText}
                                // typeVariant={'h6'}
                                />
                            {/* Description */}
                            <Typography variant="h6" sx={{mt:'.5rem'}}>Description:</Typography>
                            <ButtonTextfield 
                                value={descriptionText}
                                onChange={handleDescriptionText}
                                />
                            {/* select assigned */}
                            <TextField
                                select
                                label='Assigned'
                                value={assignedText}
                                onChange={handleAssignedText}
                                sx={{mt:'1rem'}}
                                >
                                <MenuItem value={''}>
                                    None
                                </MenuItem>
                                {teamMembers.map((v, i) => (
                                    <MenuItem key={i} value={v.id}>
                                        {v.email}
                                    </MenuItem>
                                ))}
                            </TextField>
                            {/* Status */}
                            <TextField
                                disabled
                                select
                                label='Status'
                                value={statusText}
                                onChange={handleStatusText}
                                sx={{mt:'1rem'}}
                                >
                                {['To do', 'In progress', 'Review', 'Done'].map((v, i) => (
                                    <MenuItem key={i} value={v.toLowerCase()}>
                                        {v}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </Box>
                    </DialogContent>
                    {/* buttons */}
                    <DialogActions>
                        <Button disabled={loading} onClick={handleCancel}>Cancel</Button>
                        <Button disabled={loading} type='submit'>
                            {(loading)
                                ? <CircularProgress size='1rem' />
                                : 'Save'
                            }
                        </Button>
                    </DialogActions>
                </form>
            </Drawer>
        </>
        
    )
}