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
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';



import { useState, useTransition, useEffect } from "react";
import createClient from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import ButtonTextfield from "@/components/buttonTextfield";
import { DateTimePicker, renderTimeViewClock } from "@mui/x-date-pickers";
import dayjs from "dayjs";



export default function EditTaskSideview({teamMembers, task, open, setOpen, user, tasks, teams}) {
    const supabase = createClient();
    const router = useRouter();
    const filteredTasks = tasks.filter(v => v.status === task.status);
    const [isPending, startTransition] = useTransition();
    const [loading, setLoading] = useState(false);
    const [titleText, setTitleText] = useState(task.title);
    const [descriptionText, setDescriptionText] = useState(task.description);
    const [assignedText, setAssignedText] = useState(task.assigned_id||'');
    const [statusText, setStatusText] = useState(task.status);
    const [dueDateText, setDueDateText] = useState(task.due_date && dayjs(task.due_date));
    const [selectedTeam, setSelectedTeam] = useState(task.team_id);

    // makes sure that the info is loaded before finishing.
    useEffect(() => {
        if (!isPending && loading) {
            handleCancel();
            setLoading(false);
        }
    }, [isPending]);

    useEffect(() => {
        handleCancel();
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
        setDueDateText(task.due_date && dayjs(task.due_date));
        setSelectedTeam(task.team_id)
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
    }

    async function handleSubmit(e) {
        // handle submit
        e.preventDefault();
        setLoading(true);

        const statuses = {
            'to do': 0,
            'in progress': 0,
            'done': 0,
        }

        // reorder order nums
        const newTasks = tasks.map((v, i) => {
            const newObj = {...v};
            let currStatus = newObj.status;
            if (newObj.id === task.id) {
                currStatus = statusText;
                newObj.title = titleText;
                newObj.description = descriptionText;
                newObj.priority = 4;
                newObj.user_id = user.id;
                newObj.assigned_id = assignedText||null;
                newObj.due_date = dueDateText;
                newObj.team_id = selectedTeam;
                if (statusText === 'done') {
                    newObj.date_completed = dayjs();
                } else {
                    newObj.date_completed = null;
                }
            }

            newObj.order_num = statuses[currStatus];
            newObj.status = currStatus;
            delete newObj.teams;
            statuses[currStatus]++;
            return newObj;
        })

        const {data, error} = await supabase
            .from('tasks')
            .upsert(newTasks);

        console.log(error);
        // reset everything
        startTransition(() => {
            router.refresh();
        })
    }

    async function handleDelete() {
        setLoading(true);

        await supabase.rpc('delete_task_and_update_order', {
            task_id: task.id,
            task_ids: filteredTasks.map(v => v.id).filter(v => v !== task.id),
        })

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
                                    teams?.filter(t => t.id === selectedTeam)[0]?.team_memberships.filter(tm => tm.user_id === u.id)[0]
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
                        {task.teams && (
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
                                : 'Save'
                            }
                        </Button>
                    </DialogActions>
                </form>
            </Drawer>
        </>
        
    )
}