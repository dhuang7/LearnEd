'use client'

import Button from "@mui/material/Button";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";
import Drawer from "@mui/material/Drawer";
import LastPageRoundedIcon from '@mui/icons-material/LastPageRounded';
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';


import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { renderTimeViewClock } from '@mui/x-date-pickers/timeViewRenderers';
import dayjs from 'dayjs';



import { useEffect, useState, useTransition } from "react";
import createClient from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import TopicList from "./topicList";



export default function EditEventSideview({event, calendarData, open, setOpen, calendar}) {
    const supabase = createClient();
    const initTime = dayjs();
    const router = useRouter();
    const [isPending, startTransition] = useTransition();
    const [loading, setLoading] = useState(false);
    const [titleText, setTitleText] = useState('');
    const [endTimeText, setEndTimeText] = useState(initTime.add(1, 'h'));
    const [startTimeText, setStartTimeText] = useState(initTime);
    const [descriptionText, setDescriptionText] = useState('');
    const [calendarIdText, setCalendarIdText] = useState(calendarData?.[0]?.calendars.id);
    const [topics, setTopics] = useState([]);


    useEffect(() => {
        setTitleText(event?.title);
        setEndTimeText(dayjs(event?.end_time));
        setStartTimeText(dayjs(event?.start_time));
        setDescriptionText(event?.description);
        setCalendarIdText(event?.calendar_id);
        setTopics(event?.event_topics);
        console.log(event?.event_topics)
    }, [event]);

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
        calendar.unselect();
        setOpen(false);
    }

    function handleCancel() {
        handleClose();
        setCalendarIdText(calendarData?.[0]?.calendars.id);
        setTitleText('');
        const newTime = dayjs();
        setEndTimeText(newTime.add(1, 'h'));
        setStartTimeText(newTime);
        setDescriptionText('');
        setTopics([]);
    }

    function handleTitleText({target}) {
        setTitleText(target.value);
    }

    function handleDescriptionText({target}) {
        setDescriptionText(target.value);
    }

    function handleStartTimeText(newValue) {
        setStartTimeText(newValue);
        setEndTimeText(newValue.add(endTimeText.diff(startTimeText)||3600000, 'milliseconds'));
    }

    function handleEndTimeText(newValue) {
        setEndTimeText(newValue);
    }

    function handleCalendarIdText({target}) {
        // member text
        setCalendarIdText(target.value);
    }

    

    async function handleSubmit(e) {
        // handle submit
        e.preventDefault();
        setLoading(true);

        if (event.id) {
            const {data, error} = await supabase.rpc('update_event_with_topics', {
                event_id: event.id,
                title: titleText,
                description: descriptionText,
                start_time: startTimeText.toISOString(),
                end_time: endTimeText.toISOString(),
                calendar_id: calendarIdText,
                color: '',
                event_topics: topics,
            });
        } else {
            const {data, error} = await supabase.rpc('insert_event_with_topics', {
                title: titleText,
                description: descriptionText,
                start_time: startTimeText.toISOString(),
                end_time: endTimeText.toISOString(),
                calendar_id: calendarIdText,
                user_id: event.user_id, 
                color: '',
                event_topics: topics,
            });
        }

        // reset everything
        startTransition(() => {
            router.refresh();
        })
    }

    async function handleDelete() {
        if (event.id) {
            setLoading(true);
            const { error } = await supabase
                .from('events')
                .delete()
                .eq('id', event.id);
    
            startTransition(() => {
                router.refresh();
            })
        } else {
            handleCancel();
        }
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
                        <Typography variant='inherit'>Edit Event</Typography>
                        {/* delete button */}
                        <IconButton onClick={handleDelete} sx={{ml:'auto'}}><DeleteRoundedIcon /></IconButton>
                    </DialogTitle>
                    {/* content */}
                    <DialogContent sx={{pb:0, pl:0}}>
                        <Box sx={{pt:1, display:'flex', flexDirection:'column', height:'100%', boxSizing:'border-box',}}>
                            {/* title */}
                            <TextField 
                                label='Title'
                                fullWidth
                                value={titleText}
                                onChange={handleTitleText}
                                sx={{
                                    mb:'1rem'
                                }}
                                />
                            {/* Focus Area */}
                            <TextField 
                                label='Focus Area'
                                value={descriptionText}
                                onChange={handleDescriptionText}
                                multiline
                                rows={2}
                                fullWidth
                                sx={{
                                    mb:'1rem'
                                }}
                                />
                            {/* times */}
                            <Box sx={{display:'flex', mb:'1rem', width:'100%'}}>
                                <Box sx={{width:'50%', boxSizing:'border-box', pr:'.25rem'}}>
                                    <DateTimePicker
                                        label="Start Time"
                                        disabled={loading}
                                        value={startTimeText}
                                        onChange={handleStartTimeText}
                                        viewRenderers={{
                                            hours: renderTimeViewClock,
                                            minutes: renderTimeViewClock,
                                            seconds: renderTimeViewClock,
                                        }}
                                        slotProps={{
                                            actionBar: {
                                                actions:['today']
                                            },
                                        }}
                                        sx={{width:'100%'}}
                                        />
                                </Box>
                                {/* add end time */}
                                <Box sx={{width:'50%', boxSizing:'border-box', pl:'.25rem'}}>
                                    <DateTimePicker
                                        label="End Time"
                                        disabled={loading}
                                        fullWidth
                                        value={endTimeText}
                                        onChange={handleEndTimeText}
                                        viewRenderers={{
                                            hours: renderTimeViewClock,
                                            minutes: renderTimeViewClock,
                                            seconds: renderTimeViewClock,
                                        }}
                                        slotProps={{
                                            actionBar: {
                                                actions:['today']
                                            },
                                        }}
                                        sx={{width:'100%'}}
                                        />
                                </Box>
                            </Box>
                            {/* Content */}
                            <TopicList topics={topics} setTopics={setTopics} />
                        </Box>
                    </DialogContent>
                    {/* buttons */}
                    <DialogActions>
                        {/* choose calendar */}
                        <Box sx={{mr:'auto', width:'10rem'}}>
                            <TextField
                                label='Calendar'
                                select
                                required
                                fullWidth
                                value={calendarIdText}
                                onChange={handleCalendarIdText}
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
                                {calendarData.map((v, i) => (
                                    <MenuItem key={i} value={v.calendars.id}>{v.calendars.name}</MenuItem>
                                ))}
                            </TextField>
                        </Box>
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