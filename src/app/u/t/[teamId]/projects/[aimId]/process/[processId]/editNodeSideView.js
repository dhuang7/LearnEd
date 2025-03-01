'use client'

import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import CircularProgress from "@mui/material/CircularProgress";
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import Button from "@mui/material/Button";
import Drawer from "@mui/material/Drawer";
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';


import LastPageRoundedIcon from '@mui/icons-material/LastPageRounded';
import EditRoundedIcon from '@mui/icons-material/EditRounded';


import { useRouter } from 'next/navigation';
import { useState, useTransition, useEffect } from 'react';
import createClient from '@/utils/supabase/client';
import { useTeamContext } from '@/app/u/layout';
import ButtonTextfield from '@/components/buttonTextfield';
 
 
export default function EditNodeSideView({nodeInfo}) {
    const [_, __, ___, setAimInfo] = useTeamContext();
    const supabase = createClient();
    const router = useRouter();
    const [isPending, startTransition] = useTransition();
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const [nameText, setNameText] = useState('');
    const [descriptionText, setDescriptionText] = useState('');
    const [typeText, setTypeText] = useState('');

    // initialize values
    useEffect(() => {
        setNameText(nodeInfo.name);
        setDescriptionText(nodeInfo.description);
        setTypeText(nodeInfo.type);
    }, [nodeInfo])

    // makes sure that the info is loaded before finishing.
    useEffect(() => {
        if (!isPending && loading) {
            handleCancel();
            setLoading(false);
        }
    }, [isPending])

    function handleOpen() {
        setOpen(true);
    }

    function handleClose() {
        setOpen(false);
    }

    function handleCancel() {
        handleClose();
        setNameText(nodeInfo.name);
        setDescriptionText(nodeInfo.description);
        setTypeText(nodeInfo.type);
    }

    function handleNameText({target}) {
        setNameText(target.value);
    }
    
    function handleDescriptionText({target}) {
        setDescriptionText(target.value);
    }

    function handleTypeText({target}) {
        setTypeText(target.value);
    }

    async function handleSubmit(e) {
        e.preventDefault();
        setLoading(true);

        // insert data
        const {data, error} = await supabase
            .from('process_nodes')
            .update({
                name: nameText,
                description: descriptionText,
                type: typeText,
            })
            .eq('id', nodeInfo.id);


        // reset everything
        startTransition(() => {
            router.refresh();
        })
    }

    async function handleDelete() {
        setLoading(true);
        
        const {error} = await supabase
            .from('process_nodes')
            .delete()
            .eq('id', nodeInfo.id);

        startTransition(() => {
            router.refresh();
        })
    }


    return (
        <>
            <IconButton 
                size='small'
                color='inherit'
                onClick={handleOpen}
                >
                    <EditRoundedIcon fontSize='small' />
            </IconButton>

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
                        <Typography variant="inherit">
                            Edit Node
                        </Typography>
                        <IconButton disabled={loading} size="small" onClick={handleDelete} sx={{ml:'auto'}}>
                            <DeleteRoundedIcon />
                        </IconButton>
                    </DialogTitle>
                    {/* content */}
                    <DialogContent sx={{pb:0, pl:0}}>
                        <Box sx={{pt:1, display:'flex', flexDirection:'column', height:'100%', boxSizing:'border-box',}}>
                            {/* name */}
                            <Box sx={{width:'100%', boxSizing:'border-box', pt:'.23rem'}}>
                                {/* title */}
                                <Typography variant="h6">Name:</Typography>
                                {/* writing box and button */}
                                <ButtonTextfield value={nameText} onChange={handleNameText} color='primary' />
                            </Box>
                            {/* description */}
                            <Box sx={{width:'100%', boxSizing:'border-box', pt:'.23rem'}}>
                                {/* title */}
                                <Typography variant="h6">Description:</Typography>
                                {/* writing box and button */}
                                <ButtonTextfield value={descriptionText} onChange={handleDescriptionText} color='primary' />
                            </Box>
                            {/* type */}
                            <TextField 
                                select
                                value={typeText}
                                onChange={handleTypeText}
                                label='Node Type'
                                sx={{
                                    mt:'1rem'
                                }}
                                >
                                {['Terminal', 'Process', 'Decision'].map((v, i) => (
                                    <MenuItem key={i} value={v.toLowerCase()}>{v}</MenuItem>
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
    );
}