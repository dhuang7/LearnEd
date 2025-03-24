'use client'

import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import CircularProgress from "@mui/material/CircularProgress";
import Button from "@mui/material/Button";
import Drawer from "@mui/material/Drawer";
import Rating from "@mui/material/Rating";
import StarRoundedIcon from '@mui/icons-material/StarRounded';
import StarOutlineRoundedIcon from '@mui/icons-material/StarOutlineRounded';


import LastPageRoundedIcon from '@mui/icons-material/LastPageRounded';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';

import { useRouter } from 'next/navigation';
import { useState, useTransition, useEffect } from 'react';
import createClient from '@/utils/supabase/client';
import ButtonTextfield from '@/components/buttonTextfield';
import MeasuresList from '../drivers/measuresList';
 
 
export default function EditChangeIdeaSideView({changeIdea, open, setOpen}) {
    const supabase = createClient();
    const router = useRouter();
    const [isPending, startTransition] = useTransition();
    const [loading, setLoading] = useState(false);
    const [nameText, setNameText] = useState('');
    const [descriptionText, setDescriptionText] = useState('');
    const [ratingText, setRatingText] = useState(0);
    const [conclusionsText, setConclusionsText] = useState('');
    const [measuresList, setMeasuresList] = useState([]);
    const [error, setError] = useState(false);

    // initialize values
    useEffect(() => {
        setNameText(changeIdea?.change_packages.name);
        setDescriptionText(changeIdea?.change_packages.description);
        setRatingText(changeIdea?.rating);
        setConclusionsText(changeIdea?.conclusions);
        setMeasuresList(changeIdea?.change_idea_measures);
    }, [changeIdea])

    // makes sure that the info is loaded before finishing.
    useEffect(() => {
        if (!isPending && loading) {
            handleCancel();
            setLoading(false);
        }
    }, [isPending])

    function handleClose() {
        setOpen(false);
    }

    function handleCancel() {
        handleClose();
        setNameText(changeIdea?.change_packages.name);
        setDescriptionText(changeIdea?.change_packages.description);
        setRatingText(changeIdea?.rating);
        setConclusionsText(changeIdea?.conclusions);
        setMeasuresList(changeIdea?.change_idea_measures);
    }

    function handleNameText({target}) {
        setNameText(target.value);
        if (error) setError(false);
    }
    
    function handleDescriptionText({target}) {
        setDescriptionText(target.value);
    }

    function handleConclusionsText({target}) {
        setConclusionsText(target.value);
    }

    function handleRatingText({target}) {
        setRatingText(target.value);
    }

    async function handleSubmit(e) {
        e.preventDefault();
        if (!nameText) {
            setError(true);
            return;
        }
        setLoading(true);

        const {data: p, error: normal} = await supabase.rpc('update_change_ideas_with_measures', {
            id: changeIdea.id,
            conclusions: conclusionsText,
            rating: ratingText,
            aim_id: changeIdea.aim_id,
            measures_list: measuresList,
        });

        const {data: u, error: abnormal} = await supabase
            .from('change_packages')
            .update({name: nameText, description: descriptionText})
            .eq('id', changeIdea.change_packages.id)
            .select();

        // reset everything
        startTransition(() => {
            router.refresh();
        })
    }

    async function handleDelete() {
        setLoading(true);
        const {error: normal} = await supabase.from('change_ideas').delete().eq('id', changeIdea.id);

        // reset everything
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
                            Edit Change Idea
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
                                <Typography variant="h6">Package Name:</Typography>
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
                            {/* ratings */}
                            <Box sx={{width:'100%', boxSizing:'border-box', pt:'.23rem'}}>
                                {/* title */}
                                <Typography variant="h6">Impact Rating:</Typography>
                                {/* writing box and button */}
                                <Rating
                                    value={ratingText}
                                    onChange={handleRatingText}
                                    precision={.5}
                                    icon={<StarRoundedIcon fontSize='inherit' />}
                                    emptyIcon={<StarOutlineRoundedIcon fontSize='inherit' />}
                                    />
                            </Box>
                            {/* conclusions */}
                            <Box sx={{width:'100%', boxSizing:'border-box', pt:'.23rem'}}>
                                {/* title */}
                                <Typography variant="h6">Conclusions:</Typography>
                                {/* writing box and button */}
                                <ButtonTextfield value={conclusionsText} onChange={handleConclusionsText} color='primary' />
                            </Box>
                            {/* Measure list */}
                            <Box sx={{width:'100%', boxSizing:'border-box', pt:'.23rem'}}>
                                {/* title */}
                                <Typography variant="h6">Process Measure:</Typography>
                                {/* writing box and button */}
                                <MeasuresList measuresList={measuresList} setMeasuresList={setMeasuresList} aimId={changeIdea.aim_id} />
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