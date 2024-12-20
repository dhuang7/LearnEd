'use client'

import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import useMediaQuery from '@mui/material/useMediaQuery';
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import CircularProgress from "@mui/material/CircularProgress";
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import Button from "@mui/material/Button";


import EditRoundedIcon from '@mui/icons-material/EditRounded';
import { Handle, Position } from '@xyflow/react';
import { useRouter } from 'next/navigation';
import { useState, useTransition, useEffect } from 'react';
import theme from '@/app/theme';
import createClient from '@/utils/supabase/client';
import ButtonTextfield from '@/components/buttonTextfield';
 
 
export default function CustomNode({id, title, name, description, measure, measureType, table, aimId, columns, disableDelete, disableSource, disableTarget}) {
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
        const insertData = {aim_id: aimId};
        const valueList = [id, nameText, descriptionText, measureText];
        // create data for the insert or update depending on what values exist
        columns.forEach((v, i) => {
            if (valueList[i]) {
                insertData[v] = valueList[i];
            }
        })

        // update data
        const {data: p, error} = await supabase
            .from(table)
            .update(insertData)
            .eq('id', id)
            .select();

        console.log(error);

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
            {/* handles */}
            {disableTarget || <Handle type="target" position={Position.Left} />}
            {disableSource || <Handle type="source" position={Position.Right} />}
            {/* actual node */}
            <Paper 
                elevation={0} 
                sx={{
                    p:'1rem', py:'.5rem', width:'250px', height:'152px',
                    boxSizing:'border-box',
                    display:'flex', flexDirection:'column',
                    backgroundColor:'primary.main',
                    color:'common.white',
                }}
                >
                    <Box sx={{width:'100%', height:'100%', display:'flex', flexDirection:'column'}}>
                        {/* title */}
                        <Box sx={{display:'flex', alignItems:'center'}}>
                            <Typography variant="body1" align="left">{title}</Typography>
                            <IconButton 
                                size='small'
                                color='inherit'
                                onClick={handleOpen}
                                sx={{
                                    ml:'auto',
                                }}
                                >
                                    <EditRoundedIcon fontSize='small' />
                            </IconButton>
                        </Box>
                        {/* divider */}
                        <Divider sx={{borderColor:'inherit'}} />
                        {/* Name */}
                        <Typography noWrap variant="h5" align="left" fontWeight={'bold'}>{nameText||'Enter name...'}</Typography>
                        {/* description */}
                        <Box sx={{flexGrow:1, overflow:'hidden', boxSizing:'border-box', pl:'.5rem'}}>
                            <Typography 
                                variant="body1" align="left" 
                                sx={{
                                    whiteSpace: 'pre-wrap',
                                    wordBreak: 'break-word',
                                    overflow:'scroll',
                                    maxHeight:'100%',
                                    display: '-webkit-box',
                                    WebkitLineClamp: 3,
                                    lineClamp: 3,
                                    overflow: 'hidden',
                                    WebkitBoxOrient: 'vertical',
                                }}
                                >
                                    {descriptionText||'Enter description...'}
                            </Typography>
                        </Box>
                    </Box>
            </Paper>


            
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
        </>
    );
}

export function AimNode({data}) {
    return (
        <CustomNode 
            {...data}  
            title='Aim'
            measureType='Outcome'
            table='projects'
            columns={['id', 'aim_name', 'aim_description', 'aim_outcome_measure']}
            disableDelete
            disableTarget
            />
    );
}

export function PrimaryDriverNode({data}) {
    return (
        <CustomNode 
            {...data}  
            title='Primary Driver'
            measureType='Process'
            table='primary_drivers'
            columns={['id', 'name', 'description', 'process_measures']}
            />
    );
}

export function SecondaryDriverNode({data}) {
    return (
        <CustomNode 
            {...data}  
            title='Secondary Driver'
            measureType='Process'
            table='secondary_drivers'
            columns={['id', 'name', 'description', 'process_measures']}
            />
    );
}