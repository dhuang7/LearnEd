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
import MenuItem from "@mui/material/MenuItem";
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';

import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { renderTimeViewClock } from '@mui/x-date-pickers/timeViewRenderers';
import dayjs from 'dayjs';



import { useState, useTransition, useEffect } from "react";
import createClient from "@/utils/supabase/client";
import { useRouter } from "next/navigation";



export default function AddEventSideview({calendarData, user}) {
    const supabase = createClient();
    const initTime = dayjs();
    const router = useRouter();
    const [isPending, startTransition] = useTransition();
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [titleText, setTitleText] = useState('');
    const [endTimeText, setEndTimeText] = useState(initTime.add(1, 'h'));
    const [startTimeText, setStartTimeText] = useState(initTime);
    const [descriptionText, setDescriptionText] = useState('');
    const [calendarIdText, setCalendarIdText] = useState(calendarData?.[0].calendars.id);

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
        setCalendarIdText(calendarData?.[0].calendars.id);
        setTitleText('');
        const newTime = dayjs();
        setEndTimeText(newTime.add(1, 'h'));
        setStartTimeText(newTime);
        setDescriptionText('');
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
        const {data, error} = await supabase
            .from('events')
            .insert({
                title: titleText,
                description: descriptionText,
                start_time: startTimeText.toISOString(),
                end_time: endTimeText.toISOString(),
                calendar_id: calendarIdText,
                user_id: user.id,
            })

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
                        <Typography variant='inherit'>Add Event</Typography>
                        {/* delete button */}
                        <IconButton onClick={handleCancel} sx={{ml:'auto'}}><CloseRoundedIcon /></IconButton>
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
                            <TextField 
                                label='Description'
                                value={descriptionText}
                                onChange={handleDescriptionText}
                                multiline
                                rows={4}
                                fullWidth
                                />
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
                                : 'Add'
                            }
                        </Button>
                    </DialogActions>
                </form>
            </Drawer>
        </>
        
    )
}