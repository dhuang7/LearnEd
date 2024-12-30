'use client'

import Button from "@mui/material/Button";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import Drawer from "@mui/material/Drawer";
import LastPageRoundedIcon from '@mui/icons-material/LastPageRounded';
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';

import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { renderTimeViewClock } from '@mui/x-date-pickers/timeViewRenderers';
import dayjs from 'dayjs';



import { useState, useTransition, useEffect } from "react";
import createClient from "@/utils/supabase/client";
import TopicList from "./topicList";
import { useRouter } from "next/navigation";



export default function AddAgendaModal({teamId}) {
    const supabase = createClient();
    const router = useRouter();
    const initTime = dayjs();
    const [isPending, startTransition] = useTransition();
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [focusText, setFocusText] = useState('');
    const [endTimeText, setEndTimeText] = useState(initTime.add(1, 'h'));
    const [startTimeText, setStartTimeText] = useState(initTime);
    const [openStartTime, setOpenStartTime] = useState(false);
    const [openEndTime, setOpenEndTime] = useState(false);
    const [topics, setTopics] = useState([]);
    const [errorText, setErrorText] = useState('');

    // makes sure that the info is loaded before finishing.
    useEffect(() => {
        if (!isPending && loading) {
            handleCancel();
            setLoading(false);
        }
    }, [isPending])

    // handlers
    function handleOpen() {
        // open modal
        setOpen(true);
    }

    function handleClose(e) {
        // close modal
        setOpen(false);
        setErrorText('');
    }

    function handleCancel(e) {
        // handle remove everything
        handleClose();
        setFocusText('');
        setEndTimeText(initTime.add(1, 'h'));
        setStartTimeText(initTime);
        setTopics([]);
    }

    // typing handlers
    function handleFocusText({target}) {
        setFocusText(target.value);
    }

    function handleStartTimeText(newValue) {
        setStartTimeText(newValue);
        setEndTimeText(newValue.add(endTimeText.diff(startTimeText)||3600000, 'milliseconds'));
    }

    function handleEndTimeText(newValue) {
        setEndTimeText(newValue);
    }

    // handle submit
    async function handleSubmit(e) {
        // handle submit
        e.preventDefault();
        setLoading(true);
        
        // load to database
        const {data, error} = await supabase.rpc('insert_agenda_with_topics', {
            focus: focusText,
            team_id: teamId,
            start_time: startTimeText.toISOString(),
            end_time: endTimeText.toISOString(),
            topics: topics,
        });

        console.log(error);
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
                        <Typography variant='inherit'>Add Agenda</Typography>
                        {/* delete button */}
                        <IconButton onClick={handleCancel} sx={{ml:'auto'}}><CloseRoundedIcon /></IconButton>
                    </DialogTitle>
                    {/* content */}
                    <DialogContent sx={{pb:0, pl:0}}>
                        <Box sx={{pt:1, display:'flex', flexDirection:'column', height:'100%', boxSizing:'border-box',}}>
                            {/* add focus */}
                            <TextField 
                                disabled={loading}
                                label='Focus Area'
                                value={focusText}
                                onChange={handleFocusText}
                                fullWidth
                                error={errorText}
                                helperText={errorText}
                                multiline
                                rows={2}
                                required
                                slotProps={{
                                    htmlInput: {
                                        style:{
                                            resize:'vertical'
                                        }
                                    }
                                }}
                                sx={{
                                    mb:'1rem'
                                }}
                                />
                            {/* add start time */}
                            <Box sx={{display:'flex', mb:'1rem'}}>
                                <Box sx={{width:'50%', boxSizing:'border-box', pr:'.25rem'}}>
                                    <DateTimePicker
                                        label="Start Time"
                                        disabled={loading}
                                        value={startTimeText}
                                        onChange={handleStartTimeText}
                                        onAccept={() => setOpenStartTime(false)}
                                        open={openStartTime}
                                        viewRenderers={{
                                            hours: renderTimeViewClock,
                                            minutes: renderTimeViewClock,
                                            seconds: renderTimeViewClock,
                                        }}
                                        slotProps={{
                                            actionBar: {
                                                actions:['today']
                                            },
                                            textField: {
                                                onClick: () => setOpenStartTime(true),
                                            },
                                            openPickerButton: {
                                                onClick: (e) => e.stopPropagation() || setOpenStartTime(t=>!t),
                                            },
                                        }}
                                        />
                                </Box>
                                {/* add end time */}
                                <Box sx={{width:'50%', boxSizing:'border-box', pl:'.25rem'}}>
                                    <DateTimePicker
                                        label="End Time"
                                        disabled={loading}
                                        value={endTimeText}
                                        onChange={handleEndTimeText}
                                        onAccept={() => setOpenEndTime(false)}
                                        open={openEndTime}
                                        viewRenderers={{
                                            hours: renderTimeViewClock,
                                            minutes: renderTimeViewClock,
                                            seconds: renderTimeViewClock,
                                        }}
                                        slotProps={{
                                            actionBar: {
                                                actions:['today']
                                            },
                                            textField: {
                                                onClick: () => setOpenEndTime(true),
                                            },
                                            openPickerButton: {
                                                onClick: (e) => e.stopPropagation() || setOpenEndTime(t=>!t),
                                            },
                                        }}
                                        />
                                </Box>
                            </Box>
                            {/* Content */}
                            <TopicList topics={topics} setTopics={setTopics} />                            
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