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
import Rating from "@mui/material/Rating";
import StarRoundedIcon from '@mui/icons-material/StarRounded';
import StarOutlineRoundedIcon from '@mui/icons-material/StarOutlineRounded';


import EditRoundedIcon from '@mui/icons-material/EditRounded';
import { Handle, Position } from '@xyflow/react';
import { useRouter } from 'next/navigation';
import { useState, useTransition, useEffect } from 'react';
import theme from '@/app/theme';
import createClient from '@/utils/supabase/client';
import ButtonTextfield from '@/components/buttonTextfield';
 
 
export default function CustomNode({
    id, title, name, description, measure, measureType, 
    background, problem, goal, 
    teamId, conclusions, rating,
    table, aimId, columns, disableDelete, disableSource, disableTarget
}) {
    const supabase = createClient();
    const router = useRouter();
    const [isPending, startTransition] = useTransition();
    const [open, setOpen] = useState(false);
    const [nameText, setNameText] = useState('');
    const [descriptionText, setDescriptionText] = useState('');
    const [backgroundText, setBackgroundText] = useState('');
    const [problemText, setProblemText] = useState('');
    const [goalText, setGoalText] = useState('');
    const [measureText, setMeasureText] = useState('');
    const [conclusionsText, setConclusionsText] = useState('');
    const [ratingNum, setRatingNum] = useState(0);
    const [loading, setLoading] = useState(false);
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

    // initialize values
    useEffect(() => {
        setNameText(name);
        setDescriptionText(description);
        setMeasureText(measure);
        setBackgroundText(background);
        setProblemText(problem);
        setGoalText(goal);
        setConclusionsText(conclusions);
        setRatingNum(rating||0);
    }, [name, description, measure, background, problem, goal, conclusions, rating])

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

    function handleBackgroundText({target}) {
        setBackgroundText(target.value);
    }

    function handleProblemText({target}) {
        setProblemText(target.value);
    }

    function handleGoalText({target}) {
        setGoalText(target.value);
    }

    function handleMeasureText({target}) {
        setMeasureText(target.value);
    }

    function handleConclusionsText({target}) {
        setConclusionsText(target.value);
    }

    function handleRatingNum({target}) {
        setRatingNum(target.value);
    }

    async function handleSubmit(e) {
        e.preventDefault();
        setLoading(true);

        // insert data
        const insertData = (title === 'Change Idea')
            ? {team_id: teamId}
            : {aim_id: aimId};
        const valueList = (title === 'Aim')
            ? [id, nameText, backgroundText, problemText, goalText, measureText]
            : (title === 'Change Idea')
                ? [id, nameText, descriptionText]
                : [id, nameText, descriptionText, measureText];
        // create data for the insert or update depending on what values exist
        columns.forEach((v, i) => {
            if (valueList[i]) {
                insertData[v] = valueList[i];
            }
        })

        // update data
        const {data: p, error: normal} = await supabase
            .from(table)
            .update(insertData)
            .eq('id', id)
            .select();

        // if change idea conclusions
        if (conclusionsText.length||ratingNum) {
            const {data: r, error: cError} = await supabase
                .from('project_change_relationships')
                .update({conclusions: conclusionsText, rating: ratingNum})
                .eq('project_id', aimId)
                .eq('change_idea_id', id)
                .select();
        }


        // reset everything
        startTransition(() => {
            router.refresh();
        })
    }

    async function handleDelete() {
        setLoading(true);
        const {error} = await supabase.from(table).delete().eq('id', id);
        // reset everything
        startTransition(() => {
            router.refresh();
        })
    }

    const backgroundColor = {
        'Aim': 'Chocolate',
        'Primary Driver': 'RoyalBlue',
        'Secondary Driver': 'ForestGreen',
        'Change Idea': 'Crimson'
    }


    return (
        <>
            {/* handles */}
            {disableTarget || <Handle type="target" position={Position.Left} style={{width:'.5rem', height:'.5rem'}} />}
            {disableSource || <Handle type="source" position={Position.Right} style={{width:'.5rem', height:'.5rem'}} />}
            {/* actual node */}
            <Paper 
                elevation={0} 
                sx={{
                    p:'1rem', py:'.5rem', width:'250px', height:'152px',
                    boxSizing:'border-box',
                    borderRadius:3,
                    display:'flex', flexDirection:'column',
                    backgroundColor:backgroundColor[title],
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
                                    WebkitLineClamp: title==='Change Idea' ? 2 : 3,
                                    lineClamp: title==='Change Idea' ? 2 : 3,
                                    overflow: 'hidden',
                                    WebkitBoxOrient: 'vertical',
                                }}
                                >
                                    {goalText||descriptionText||'Enter description...'}
                            </Typography>
                            {title==='Change Idea' &&
                                <Box sx={{display:'flex', justifyContent:'right'}}>
                                    <Rating 
                                        value={ratingNum} 
                                        readOnly 
                                        icon={<StarRoundedIcon fontSize='inherit' />}
                                        emptyIcon={<StarOutlineRoundedIcon fontSize='inherit' sx={{color:'common.white'}} />}
                                        precision={.5}
                                        />
                                </Box>
                            }
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
                            {(title==='Aim')
                                ? <>
                                    <Box sx={{width:'100%', boxSizing:'border-box', pt:'.23rem'}}>
                                        {/* title */}
                                        <Typography variant="h6">Background:</Typography>
                                        {/* writing box and button */}
                                        <ButtonTextfield value={backgroundText} onChange={handleBackgroundText} color='primary' />
                                    </Box>
                                    <Box sx={{width:'100%', boxSizing:'border-box', pt:'.23rem'}}>
                                        {/* title */}
                                        <Typography variant="h6">Problem:</Typography>
                                        {/* writing box and button */}
                                        <ButtonTextfield value={problemText} onChange={handleProblemText} color='primary' />
                                    </Box>
                                    <Box sx={{width:'100%', boxSizing:'border-box', pt:'.23rem'}}>
                                        {/* title */}
                                        <Typography variant="h6">Goal:</Typography>
                                        {/* writing box and button */}
                                        <ButtonTextfield value={goalText} onChange={handleGoalText} color='primary' />
                                    </Box>
                                </>
                                : <Box sx={{width:'100%', boxSizing:'border-box', pt:'.23rem'}}>
                                    {/* title */}
                                    <Typography variant="h6">Description:</Typography>
                                    {/* writing box and button */}
                                    <ButtonTextfield value={descriptionText} onChange={handleDescriptionText} color='primary' />
                                </Box>
                            }
                            {/* measure */}
                            {(measureType) && (
                                <Box sx={{width:'100%', boxSizing:'border-box', pt:'.23rem'}}>
                                    {/* title */}
                                    <Typography variant="h6">{measureType} Measure:</Typography>
                                    {/* writing box and button */}
                                    <ButtonTextfield value={measureText} onChange={handleMeasureText} color='primary' />
                                </Box>
                            )}
                            {/* change idea specific */}
                            {(title==='Change Idea') && (
                                <>
                                    {/* conclusions */}
                                    <Box sx={{width:'100%', boxSizing:'border-box', pt:'.23rem'}}>
                                        {/* title */}
                                        <Typography variant="h6">Conclusions:</Typography>
                                        {/* writing box and button */}
                                        <ButtonTextfield value={conclusionsText} onChange={handleConclusionsText} color='primary' />
                                    </Box>
                                    {/* impact rating */}
                                    <Box sx={{width:'100%', boxSizing:'border-box', pt:'.23rem'}}>
                                        {/* title */}
                                        <Typography variant="h6">Impact Rating:</Typography>
                                        {/* writing box and button */}
                                        <Rating
                                            value={ratingNum}
                                            onChange={handleRatingNum}
                                            precision={.5}
                                            icon={<StarRoundedIcon fontSize='inherit' />}
                                            emptyIcon={<StarOutlineRoundedIcon fontSize='inherit' />}
                                            />
                                    </Box>
                                </>
                            )}
                        </Box>
                    </DialogContent>
                    {/* buttons */}
                    <DialogActions>
                        <Button disabled={loading} onClick={handleClose}>Cancel</Button>
                        <Button disabled={loading} type='submit'>
                            {(loading)
                                ? <CircularProgress size='1rem' />
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
            columns={['id', 'aim_name', 'background', 'problem', 'goal', 'aim_outcome_measure']}
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

export function ChangeIdeaNode({data}) {
    return (
        <CustomNode 
            {...data}  
            title='Change Idea'
            measure=''
            table='change_ideas'
            columns={['id', 'name', 'description', 'conclusions']}
            disableSource
            />
    );
}