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


import { useRouter } from 'next/navigation';
import { useState, useTransition, useEffect } from 'react';
import createClient from '@/utils/supabase/client';
import ButtonTextfield from '@/components/buttonTextfield';
 
 
export default function EditMeasureSideView({measureType, setOpen, open}) {
    const supabase = createClient();
    const router = useRouter();
    const [isPending, startTransition] = useTransition();
    const [loading, setLoading] = useState(false);
    // const [open, setOpen] = useState(false);
    const [nameText, setNameText] = useState('');
    const [descriptionText, setDescriptionText] = useState('');
    const [measureTypeText, setMeasureTypeText] = useState('');
    const [error, setError] = useState(false);

    // initialize values
    useEffect(() => {
        setNameText(measureType?.name);
        setDescriptionText(measureType?.description);
        setMeasureTypeText(measureType?.measure_type);
    }, [measureType])

    // console.log(nameText)

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
        setNameText(measureType?.name);
        setDescriptionText(measureType?.description);
        setMeasureTypeText(measureType?.measure_type);
    }

    function handleNameText({target}) {
        setNameText(target.value);
        if (error) setError(false);
    }
    
    function handleDescriptionText({target}) {
        setDescriptionText(target.value);
    }

    function handleMeasureTypeText({target}) {
        setMeasureTypeText(target.value);
    }

    async function handleSubmit(e) {
        e.preventDefault();
        if (!nameText) {
            setError(true);
            return;
        }
        setLoading(true);


        // insert data
        const {data, error} = await supabase
            .from('measure_types')
            .update({
                name: nameText,
                description: descriptionText,
                measure_type: measureTypeText === '' ? null : measureTypeText,
            })
            .eq('id', measureType?.id);


        // reset everything
        startTransition(() => {
            router.refresh();
        })
    }

    async function handleDelete() {
        setLoading(true);
        
        const {error} = await supabase
            .from('measure_types')
            .delete()
            .eq('id', measureType?.id);

        startTransition(() => {
            router.refresh();
        })
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
                            Edit Measure
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
                                <ButtonTextfield value={nameText} onChange={handleNameText} color={error ? 'error' : 'primary'} />
                            </Box>
                            {/* description */}
                            <Box sx={{width:'100%', boxSizing:'border-box', pt:'.23rem'}}>
                                {/* title */}
                                <Typography variant="h6">Description:</Typography>
                                {/* writing box and button */}
                                <ButtonTextfield value={descriptionText} onChange={handleDescriptionText} color='primary' />
                            </Box>
                            {/* measure */}
                            <Box sx={{width:'100%', boxSizing:'border-box', pt:'.5rem'}}>
                                {/* Stage */}
                                <TextField
                                    select
                                    label='Measure Type'
                                    value={measureTypeText||''}
                                    onChange={handleMeasureTypeText}
                                    fullWidth
                                    >
                                    <MenuItem value={''}>
                                        None
                                    </MenuItem>
                                    <MenuItem value={'leading'}>
                                        Leading
                                    </MenuItem>
                                    <MenuItem value={'lagging'}>
                                        Lagging
                                    </MenuItem>
                                </TextField>
                            </Box>
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