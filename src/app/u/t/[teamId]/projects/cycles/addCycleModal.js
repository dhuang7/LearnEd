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
import Autocomplete from "@mui/material/Autocomplete";

import CloseRoundedIcon from '@mui/icons-material/CloseRounded';





import { useState, useTransition, useEffect } from "react";
import createClient from "@/utils/supabase/client";
// import TopicList from "./topicList";
import { useRouter } from "next/navigation";
import PDSAPages from "./pdsaPages";



export default function AddCycleModal({teamId, cycles}) {
    const supabase = createClient();
    const router = useRouter();
    const [isPending, startTransition] = useTransition();
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [focusText, setFocusText] = useState('');
    const [topics, setTopics] = useState([]);
    const [errorText, setErrorText] = useState('');

    const changeIdeas = removeDuplicates(cycles, ['change_ideas', 'id']).map(c=>c.change_ideas);
    const changeIdeasAutoCompleteOptions = changeIdeas.map(ci=>ci.change_packages.name);

    

    // makes sure that the info is loaded before finishing.
    useEffect(() => {
        if (!isPending) {
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
        setTopics([]);
    }

    // typing handlers
    function handleFocusText({target}) {
        setFocusText(target.value);
    }

    // handle submit
    async function handleSubmit(e) {
        // handle submit
        e.preventDefault();
        setLoading(true);
        
        // load to database
        // const {data, error} = await supabase.rpc('insert_agenda_with_topics', {
        //     focus: focusText,
        //     team_id: teamId,
        //     start_time: (new Date(startTimeText).toISOString()),
        //     end_time: (new Date(endTimeText).toISOString()),
        //     topics: topics,
        // });

        // console.log(error);
        // reset everything
        startTransition(() => {
            router.refresh();
        })
    }

    // function handleShowPicker({target}) {
    //     target.showPicker?.();
    // }


    return (
        <>
            {/* add member button to open dialog */}
            <Button 
                color='info' 
                variant='contained' disableElevation 
                sx={{borderRadius:3, textTransform:'none', ml:'auto'}} 
                startIcon={<AddRoundedIcon />}
                size='small'
                onClick={handleOpen}
                disabled={loading}
                >
                Cycle
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
                        <Typography variant='inherit'>Add Cycle</Typography>
                        {/* delete button */}
                        <IconButton onClick={handleCancel} sx={{ml:'auto'}}><CloseRoundedIcon /></IconButton>
                    </DialogTitle>
                    {/* content */}
                    <DialogContent sx={{pb:0, pl:0}}>
                        <Box sx={{pt:1, display:'flex', flexDirection:'column', height:'100%', boxSizing:'border-box',}}>
                            {/* change idea */}
                            <Autocomplete
                                disablePortal
                                options={changeIdeasAutoCompleteOptions}
                                fullWidth
                                renderInput={(params) => <TextField {...params} label="Change Idea" />}
                                sx={{mb:'1rem'}}
                                />
                            {/* objective */}
                            <TextField 
                                disabled={loading}
                                label='Objective'
                                // value={focusText}
                                // onChange={handleFocusText}
                                fullWidth
                                // error={errorText}
                                // helperText={errorText}
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
                                    mb:'.5rem'
                                }}
                                />
                            {/* pdsa cycles */}
                            <Box 
                                sx={{
                                    flexGrow:1, overflow:'hidden', 
                                    // borderTop:'1px solid', borderColor:'grey.300', 
                                    // boxSizing:'border-box', pt:'1rem', px:'1rem'
                                    }}
                                    >
                                <PDSAPages />
                            </Box>
                        </Box>
                    </DialogContent>
                    {/* buttons */}
                    <DialogActions>
                        {/* cancel */}
                        <Button disabled={loading} onClick={handleCancel}>Cancel</Button>
                        {/* submit */}
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





function removeDuplicates(array, keys) {
    const seen = new Set();
    return array.filter(obj => {
        let value = obj;
        keys.forEach(k => {
            value = value[k];
        })

        if (seen.has(value)) {
            return false;
        }
        seen.add(value);
        return true;
    });
}