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





import { useState } from "react";
import createClient from "@/utils/supabase/client";
import TopicList from "./topicList";
import { useRouter } from "next/navigation";



export default function AddAgendaModal({teamId}) {
    const supabase = createClient();
    const router = useRouter();
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [focusText, setFocusText] = useState('');
    const [endTimeText, setEndTimeText] = useState('');
    const [startTimeText, setStartTimeText] = useState('');
    const [topics, setTopics] = useState([]);
    const [errorText, setErrorText] = useState('');

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
        setEndTimeText('');
        setStartTimeText('');
        setTopics([]);
    }

    // typing handlers
    function handleFocusText({target}) {
        setFocusText(target.value);
    }

    function handleStartTimeText({target}) {
        setStartTimeText(target.value);
    }

    function handleEndTimeText({target}) {
        setEndTimeText(target.value);
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
            start_time: (new Date(startTimeText).toISOString()),
            end_time: (new Date(endTimeText).toISOString()),
            topics: topics,
        });

        // console.log(error);
        // reset everything
        router.refresh();
        setLoading(false);
        handleCancel();
    }

    function handleShowPicker({target}) {
        target.showPicker?.();
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
                hideBackdrop
                ModalProps={{
                    sx: {
                        width:0,
                    }
                }}
                elevation={5}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                PaperProps={{
                    sx: {
                        width:'40%',
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
                                    <TextField 
                                        disabled={loading}
                                        label='Start Time'
                                        type='datetime-local'
                                        value={startTimeText}
                                        required
                                        onChange={handleStartTimeText}
                                        onFocus={handleShowPicker}
                                        fullWidth
                                        error={errorText}
                                        helperText={errorText}
                                        slotProps={{
                                            inputLabel: {
                                                shrink:true,
                                            }
                                        }}
                                        
                                        />
                                </Box>
                                {/* add end time */}
                                <Box sx={{width:'50%', boxSizing:'border-box', pl:'.25rem'}}>
                                    <TextField 
                                        disabled={loading}
                                        label='End Time'
                                        type='datetime-local'
                                        value={endTimeText}
                                        onChange={handleEndTimeText}
                                        onFocus={handleShowPicker}
                                        fullWidth
                                        required
                                        error={errorText}
                                        helperText={errorText}
                                        slotProps={{
                                            inputLabel: {
                                                shrink:true,
                                            }
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
                                ? <CircularProgress />
                                : 'Add'
                            }
                        </Button>
                    </DialogActions>
                </form>
            </Drawer>
        </>
        
    )
}