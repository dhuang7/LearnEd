'use client'

import Button from "@mui/material/Button";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import Drawer from "@mui/material/Drawer";
import LastPageRoundedIcon from '@mui/icons-material/LastPageRounded';
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';


import { useState, useTransition, useEffect } from "react";
import createClient from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import ButtonTextfield from "@/components/buttonTextfield";



export default function AddTaskSideview({customButton, teamMembers, sectionStatus, user, tasks}) {
    const supabase = createClient();
    const router = useRouter();
    const [isPending, startTransition] = useTransition();
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [titleText, setTitleText] = useState('');
    const [descriptionText, setDescriptionText] = useState('');
    const [assignedText, setAssignedText] = useState('');
    const [statusText, setStatusText] = useState(sectionStatus||'to do');
    // const [calendarIdText, setCalendarIdText] = useState(calendarData?.[0]?.calendars.id);
    // const [topics, setTopics] = useState([]);
    const CustomButton = customButton;

    // makes sure that the info is loaded before finishing.
    useEffect(() => {
        if (!isPending && loading) {
            handleCancel();
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
    }

    function handleCancel() {
        handleClose();
        setTitleText('');
        setDescriptionText('');
        setAssignedText('');
        setStatusText(sectionStatus||'to do');
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
            .insert({
                title: titleText,
                description: descriptionText,
                priority: 4,
                user_id: user.id,
                assigned_id: assignedText||null,
                status: statusText,
                order_num: tasks.filter(v => v.status === statusText).length,
            })

        console.log(error);
        // reset everything
        startTransition(() => {
            router.refresh();
        })
    }


    return (
        <>
            {/* add member button to open dialog */}
            {customButton
                ? <CustomButton onClick={handleOpen} disabled={loading} />
                : <Button 
                    color='info' 
                    variant='contained' disableElevation 
                    sx={{borderRadius:3, textTransform:'none'}} 
                    startIcon={<AddRoundedIcon />}
                    onClick={handleOpen}
                    disabled={loading}
                    >
                    New
                </Button>
            }
            
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
                        <Typography variant='inherit'>Add Task</Typography>
                        {/* delete button */}
                        <IconButton onClick={handleCancel} sx={{ml:'auto'}}><CloseRoundedIcon /></IconButton>
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
                                : 'Add'
                            }
                        </Button>
                    </DialogActions>
                </form>
            </Drawer>
        </>
        
    )
}