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





import { useEffect, useState } from "react";
import createClient from "@/utils/supabase/client";
import PDSAPages from "./pdsaPages";
import { MenuItem } from "@mui/material";



export default function EditCycleModal({cycle, changeIdeas, aimId, setCurrCycles, open, setOpen}) {
    const supabase = createClient();
    // const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [pageNum, setPageNum] = useState(0);
    const [changeIdeaObject, setChangeIdeaObject] = useState(null);
    const [stageText, setStageText] = useState('plan');
    const [objectiveText, setObjectiveText] = useState('');
    const [logisticsText, setLogisticsText] = useState('');
    const [measureText, setMeasureText] = useState('');
    const [dueDateText, setDueDateText] = useState('');
    const [observationText, setObservationText] = useState('');
    const [dataText, setDataText] = useState('');
    const [summaryText, setSummaryText] = useState('');
    const [nextStepsText, setNextStepsText] = useState('');
    const [choiceText, setChoiceText] = useState('');
    const [qprsList, setQPRsList] = useState([{ // this is passed all the way down without handlers
        question:'',
        predictions:'',
        results:'',
    }]);

    useEffect(() => {
        const pageStage = {
            'plan': 0,
            'do': 1,
            'study': 2,
            'act': 3,
        }

        setPageNum(pageStage[cycle?.stage]);
        setChangeIdeaObject(cycle?.change_ideas);
        setStageText(cycle?.stage);
        setObjectiveText(cycle?.objective);
        setLogisticsText(cycle?.plan_logistics);
        setMeasureText(cycle?.plan_measure);
        setDueDateText(cycle?.plan_due_date ? formatDateField(cycle.plan_due_date) : '');
        setObservationText(cycle?.do_observations);
        setDataText(cycle?.do_data);
        setSummaryText(cycle?.study_summary);
        setNextStepsText(cycle?.act_next_steps);
        setChoiceText(cycle?.act_choice);
        setQPRsList(cycle?.pdsa_qprs);
    }, [cycle]);

    // handlers
    function handleOpen() {
        // open modal
        setOpen(true);
    }

    function handleClose(e) {
        // close modal
        setOpen(false);
    }

    function handleCancel(e) {
        // handle remove everything
        handleClose();
        setChangeIdeaObject(null);
        setStageText('plan');
        setObjectiveText('');
        setLogisticsText('');
        setMeasureText('');
        setDueDateText('');
        setSummaryText('');
        setChoiceText('');
        setNextStepsText('');
        setPageNum(0);
        setQPRsList([{
            question:'',
            predictions:'',
            results:'',
        }]);
    }

    function handlePageNumChange(newValue) {
        setPageNum(newValue);
    }

    // typing handlers
    function handleChangeIdeaObject(event, newValue) {
        setChangeIdeaObject(newValue);
    }

    function handleStageText({target}) {
        setStageText(target.value);
    }

    function handleObjectiveText({target}) {
        setObjectiveText(target.value);
    }

    function handleLogisticsText({target}) {
        setLogisticsText(target.value);
    }

    function handleMeasureText({target}) {
        setMeasureText(target.value);
    }

    function handleDueDateText({target}) {
        setDueDateText(target.value);
    }

    function handleObservationText(event) {
        setObservationText(event.target.value);
    }

    function handleDataText(event) {
        setDataText(event.target.value);
    }

    function handleSummaryText(event) {
        setSummaryText(event.target.value);
    }

    function handleNextStepsText(event) {
        setNextStepsText(event.target.value);
    }

    function handleChoiceText(event) {
        setChoiceText(event.target.value);
    }

    // handle submit
    async function handleSubmit(e) {
        // handle submit
        e.preventDefault();
        setLoading(true);

        // load to database
        // const {data, error} = await supabase.rpc('insert_pdsa_cycle_with_qprs', {
        //     objective: objectiveText,
        //     plan_logistics: logisticsText,
        //     plan_due_date: dueDateText ? (new Date(dueDateText).toISOString()) : null,
        //     plan_measure: measureText,
        //     do_observations: observationText,
        //     do_data: dataText,
        //     study_summary: summaryText,
        //     act_next_steps: nextStepsText,
        //     act_choice: choiceText || null,
        //     change_idea_id: changeIdeaObject.id,
        //     stage: stageText,
        //     qprs: qprsList,
        // });

        const {data: newCycles, error: newCyclesError} = await supabase
            .from('pdsa_cycles')
            .select(`
                *,
                pdsa_qprs(*),
                change_ideas (
                    *,
                    change_packages (*)
                )
            `)
            .not('change_ideas', 'is', null)
            .eq('change_ideas.aim_id', aimId); 

        setLoading(false);
        handleCancel();
        // delay so animation of modal closing can finish
        setTimeout(() => {
            setCurrCycles(newCycles);
        }, 100);
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
                            {/* change idea and stage */}
                            <Box sx={{mb:'1rem', display:'flex', width:'100%'}}>
                                {/* Change Idea */}
                                <Box sx={{width:'66%', boxSizing:'border-box', pr:'.5rem'}}>
                                    <Autocomplete
                                        disablePortal
                                        options={changeIdeas}
                                        getOptionLabel={(option) => `${option.change_packages.name||'-----'} (${option.rating})`}
                                        value={changeIdeaObject}
                                        onChange={handleChangeIdeaObject}
                                        fullWidth
                                        renderInput={
                                            (params) => 
                                                <TextField {...params} 
                                                    label="Change Idea" 
                                                    required
                                                    />
                                        }
                                        />
                                </Box>
                                {/* Stage */}
                                <TextField
                                    select
                                    value={stageText}
                                    onChange={handleStageText}
                                    sx={{
                                        flexGrow:1
                                    }}
                                    >
                                    <MenuItem value={'plan'}>
                                        Plan
                                    </MenuItem>
                                    <MenuItem value={'do'}>
                                        Do
                                    </MenuItem>
                                    <MenuItem value={'study'}>
                                        Study
                                    </MenuItem>
                                    <MenuItem value={'act'}>
                                        Act
                                    </MenuItem>
                                    <MenuItem value={'completed'}>
                                        Completed
                                    </MenuItem>
                                </TextField>
                            </Box>
                            {/* objective */}
                            <TextField 
                                disabled={loading}
                                label='Objective'
                                value={objectiveText}
                                onChange={handleObjectiveText}
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
                                <PDSAPages 
                                    page={pageNum}
                                    onPageChange={handlePageNumChange}
                                    qprsList={qprsList}
                                    setQPRsList={setQPRsList}
                                    logistics={logisticsText}
                                    measure={measureText}
                                    dueDate={dueDateText}
                                    observation={observationText}
                                    data={dataText}
                                    summary={summaryText}
                                    nextSteps={nextStepsText}
                                    choice={choiceText}
                                    onLogisticsChange={handleLogisticsText}
                                    onMeasureChange={handleMeasureText}
                                    onDueDateChange={handleDueDateText}
                                    onObservationChange={handleObservationText}
                                    onDataChange={handleDataText}
                                    onSummaryChange={handleSummaryText}
                                    onNextStepsChange={handleNextStepsText}
                                    onChoiceChange={handleChoiceText}
                                    />
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


// format date correctly
function formatDateField(timestampz) {
    // Convert the timestamp to a Date object
    const date = new Date(timestampz);

    // Get components in the user's local timezone
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based
    const day = String(date.getDate()).padStart(2, '0');

    // Construct the formatted string
    return `${year}-${month}-${day}`;
}