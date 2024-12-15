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
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';






import { useEffect, useState, useTransition } from "react";
import createClient from "@/utils/supabase/client";
import TopicList from "./topicList";
import { useRouter } from "next/navigation";



export default function EditAgendaModal({teamId, agenda, open, setOpen}) {
    const supabase = createClient();
    const router = useRouter();
    const [isPending, startTransition] = useTransition();
    const [loading, setLoading] = useState(false);
    const [focusText, setFocusText] = useState();
    const [endTimeText, setEndTimeText] = useState();
    const [startTimeText, setStartTimeText] = useState();
    const [topics, setTopics] = useState([]);
    const [errorText, setErrorText] = useState('');

    useEffect(() => {
        setFocusText(agenda?.focus);
        setEndTimeText(formatDateField(agenda?.end_time));
        setStartTimeText(formatDateField(agenda?.start_time));

        async function getTopics() {
            const {data: t, error} = await supabase
                .from('topics')
                .select()
                .eq('agenda_id', agenda.id);

            setTopics(t);
        }
        if (agenda) getTopics();
    }, [agenda]);

    // makes sure that the info is loaded before finishing.
    useEffect(() => {
        if (!isPending) {
            handleCancel();
            setLoading(false);
        }
    }, [isPending])

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
        const {data, error} = await supabase.rpc('update_agenda_with_topics', {
            agenda_id: agenda.id,
            focus: focusText,
            team_id: teamId,
            start_time: (new Date(startTimeText).toISOString()),
            end_time: (new Date(endTimeText).toISOString()),
            topics: topics,
        });
        // reset everything
        startTransition(() => {
            router.refresh();
        })
    }

    async function handleDelete() {
        setLoading(true);
        const { error } = await supabase
            .from('agendas')
            .delete()
            .eq('id', agenda.id);

        startTransition(() => {
            router.refresh();
        })
    }

    // format date correctly
    function formatDateField(timestampz) {
        // Convert the timestamp to a Date object
        const date = new Date(timestampz);
    
        // Get components in the user's local timezone
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based
        const day = String(date.getDate()).padStart(2, '0');
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
    
        // Construct the formatted string
        return `${year}-${month}-${day}T${hours}:${minutes}`;
    }

    function handleShowPicker({target}) {
        target.showPicker?.();
    }


    return (
        <>
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
                            <Typography variant='inherit'>Edit Agenda</Typography>
                            {/* delete button */}
                            <IconButton onClick={handleDelete} sx={{ml:'auto'}}><DeleteRoundedIcon /></IconButton>
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
                                : 'Save'
                            }
                        </Button>
                    </DialogActions>
                </form>
            </Drawer>
        </>
        
    )
}