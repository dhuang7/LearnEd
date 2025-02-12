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
import { DateTimePicker, renderTimeViewClock } from "@mui/x-date-pickers";
import dayjs from "dayjs";



export default function AddTaskSideview({customButton, teamMembers, sectionStatus, user, tasks, teamId, teams}) {
    const supabase = createClient();
    const router = useRouter();
    const [isPending, startTransition] = useTransition();
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [titleText, setTitleText] = useState('');
    const [descriptionText, setDescriptionText] = useState('');
    const [assignedText, setAssignedText] = useState('');
    const [statusText, setStatusText] = useState(sectionStatus||'to do');
    const [dueDateText, setDueDateText] = useState(null);
    const [selectedTeam, setSelectedTeam] = useState(teamId);
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
        setDueDateText(null);
        setSelectedTeam('');
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

    function handleDueDateText(newValue) {
        setDueDateText(newValue);
    }

    function handleSelectedTeam({target}) {
        setSelectedTeam(target.value);
        setAssignedText('');
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
                due_date: dueDateText && dueDateText.toISOString(),
                date_completed: statusText === 'done' ? dayjs() : null,
                team_id: selectedTeam||null,
            })

        console.log(error);
        // reset everything
        startTransition(() => {
            router.refresh();
        })
    }

    const statusColors = {
        'to do': 'chocolate',
        'in progress': 'royalblue',
        'done': 'forestgreen'
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
                            {/* Status */}
                            <TextField
                                // disabled
                                select
                                label='Status'
                                value={statusText}
                                onChange={handleStatusText}
                                sx={{mt:'1rem'}}
                                slotProps={{
                                    htmlInput: {
                                        sx: {
                                            color:statusColors[statusText]
                                        }
                                    }
                                }}
                                >
                                {['To do', 'In progress', 'Done'].map((v, i) => (
                                    <MenuItem key={i} value={v.toLowerCase()} sx={{color:statusColors[v.toLowerCase()]}}>
                                        {v}
                                    </MenuItem>
                                ))}
                            </TextField>
                            {/* due date */}
                            <DateTimePicker
                                label="Due Date"
                                disabled={loading}
                                value={dueDateText}
                                onChange={handleDueDateText}
                                viewRenderers={{
                                    hours: renderTimeViewClock,
                                    minutes: renderTimeViewClock,
                                    seconds: renderTimeViewClock,
                                }}
                                slotProps={{
                                    actionBar: {
                                        actions:['clear', 'today']
                                    },
                                }}
                                sx={{width:'100%', mt:'1rem'}}
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
                                {teamMembers.filter(u => (
                                    teams.filter(t => t.id === selectedTeam)[0]?.team_memberships.filter(tm => tm.user_id === u.id)[0]
                                )).map((v, i) => (
                                    <MenuItem key={i} value={v.id}>
                                        {v.email}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </Box>
                    </DialogContent>
                    {/* buttons */}
                    <DialogActions>
                        {/* choose team */}
                        {!teamId && (
                            <Box sx={{mr:'auto', width:'10rem'}}>
                                <TextField
                                    label='Team'
                                    select
                                    fullWidth
                                    value={selectedTeam||''}
                                    onChange={handleSelectedTeam}
                                    slotProps={{
                                        // select: {
                                        //     renderValue:(v) => v.name,
                                        // },
                                        htmlInput: {
                                            sx: {
                                                py:'.5rem'
                                            }
                                        },
                                        inputLabel: {
                                            shrink: true,
                                        }
                                    }}
                                    >
                                    <MenuItem value={null}>None</MenuItem>
                                    {teams?.map((v, i) => (
                                        <MenuItem key={i} value={v.id}>{v.name}</MenuItem>
                                    ))}
                                </TextField>
                            </Box>
                        )}
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