'use client'

import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";

import IconButton from "@mui/material/IconButton";
import { useEffect, useState, useTransition } from "react";
import theme from "@/app/theme";
import useMediaQuery from "@mui/material/useMediaQuery";
import ButtonTextfield from "@/components/buttonTextfield";
import { useRouter } from "next/navigation";
import createClient from "@/utils/supabase/client";



export default function GraphNode({id, name, description, measure, measureType, table, teamId, columns, disableDelete}) {
    const supabase = createClient();
    const router = useRouter();
    const [isPending, startTransition] = useTransition();
    const [open, setOpen] = useState(false);
    const [nameText, setNameText] = useState('');
    const [descriptionText, setDescriptionText] = useState('');
    const [measureText, setMeasureText] = useState('');
    const [loading, setLoading] = useState(false);
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

    // initialize values
    useEffect(() => {
        setNameText(name);
        setDescriptionText(description);
        setMeasureText(measure);
    }, [name, description])

    // makes sure that the info is loaded before finishing.
    useEffect(() => {
        if (!isPending) {
            handleClose();
            setLoading(false);
        }
    }, [isPending])

    // handlers
    function handleOpen() {
        setOpen(true);
    }

    function handleClose() {
        setOpen(false);
        setNameText(name);
        setDescriptionText(description);
        setMeasureText(measure);
    }

    function handleNameText({target}) {
        setNameText(target.value);
    }

    function handleDescriptionText({target}) {
        setDescriptionText(target.value);
    }

    function handleMeasureText({target}) {
        setMeasureText(target.value);
    }

    async function handleSubmit(e) {
        e.preventDefault();
        setLoading(true);

        // insert data
        const insertData = {team_id: teamId};
        const valueList = [id, nameText, descriptionText, measureText];
        // create data for the insert or update depending on what values exist
        columns.forEach((v, i) => {
            if (valueList[i]) {
                insertData[v] = valueList[i];
            }
        })
        // upsert data
        const {data: p, error} = await supabase
            .from(table)
            .upsert(
                [
                    insertData,
                ],
                { onConflict: ['id'] }
            )
            .select();

        // reset everything
        startTransition(() => {
            router.refresh();
        })
    }

    async function handleDelete() {
        setLoading(true);
        await supabase.from(table).delete().eq('id', id);
        setLoading(false);
        // reset everything
        startTransition(() => {
            router.refresh();
        })
    }
    
    return (
        <>
            <Box sx={{width:'75%', height:'100px', boxSizing:'border-box', px:'1rem', my:'.5rem'}}>
                {/* graph node button */}
                <Button 
                    variant="contained" disableElevation 
                    onClick={handleOpen}
                    sx={{
                        width:'100%', height:'100%', 
                        textTransform:'none',
                        boxSizing:'border-box',
                    }}
                    >
                        <Box sx={{width:'100%', height:'100%', display:'flex', flexDirection:'column'}}>
                            {/* title */}
                            <Typography variant="h6" align="left">{name||'Enter Text...'}</Typography>
                            {/* description */}
                            <Box sx={{flexGrow:1, overflow:'hidden', boxSizing:'border-box', pl:'.5rem'}}>
                                <Typography 
                                    variant="body1" align="left" noWrap 
                                    sx={{
                                        whiteSpace: 'pre-wrap',
                                        overflow:'scroll',
                                        maxHeight:'100%',
                                    }}
                                    >
                                        {description||'Enter Text...'}
                                </Typography>
                            </Box>
                        </Box>
                </Button>


                {/* open dialog */}
                <Dialog
                    open={open}
                    maxWidth='sm'
                    fullWidth
                    fullScreen={fullScreen}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                    onClose={handleClose}
                    >
                    {/* form */}
                    <form onSubmit={handleSubmit}>
                        {/* title */}
                        <DialogTitle id="alert-dialog-title" sx={{pb:0, display:'flex', justifyContent:'space-between', alignItems:'center'}}>
                            <Typography variant="inherit">
                                Edit Node
                            </Typography>
                            {(disableDelete) ||
                                <IconButton disabled={loading} size="small" onClick={handleDelete}>
                                    <DeleteRoundedIcon />
                                </IconButton>
                            }
                            
                        </DialogTitle>
                        {/* content */}
                        <DialogContent>
                            <Box sx={{pt:1, px:'1rem', boxSizing:'border-box'}}>
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
                                {/* measure */}
                                {(measureType) && (
                                    <Box sx={{width:'100%', boxSizing:'border-box', pt:'.23rem'}}>
                                        {/* title */}
                                        <Typography variant="h6">{measureType} Measure:</Typography>
                                        {/* writing box and button */}
                                        <ButtonTextfield value={measureText} onChange={handleMeasureText} color='primary' />
                                    </Box>
                                )}
                            </Box>
                        </DialogContent>
                        {/* buttons */}
                        <DialogActions>
                            <Button disabled={loading} onClick={handleClose}>Cancel</Button>
                            <Button disabled={loading} type='submit'>
                                {(loading)
                                    ? <CircularProgress />
                                    : 'Save'
                                }
                            </Button>
                        </DialogActions>
                    </form>
                </Dialog>
            </Box>
        </>
    )
}
