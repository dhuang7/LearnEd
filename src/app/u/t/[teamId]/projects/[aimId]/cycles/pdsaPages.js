'use client'

import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';






import { useState } from 'react';
import ButtonTextfield from '@/components/buttonTextfield';
import QPRList from './qprList';
import MeasuresList from '../drivers/measuresList';


export default function PDSAPages({
    page, onPageChange,
    qprsList, setQPRsList,
    logistics, measure, dueDate, observation, data, summary, nextSteps, choice,
    onLogisticsChange, onMeasureChange, onDueDateChange, onObservationChange, onDataChange, onSummaryChange, onNextStepsChange, onChoiceChange,
    measuresList, setMeasuresList, aimId,
}) {
    const [pageNum, setPageNum] = useState(page||0);
    const [logisticsText, setLogisticsText] = useState(logistics||'');
    const [dueDateText, setDueDateText] = useState(dueDate||'');
    const [observationText, setObservationText] = useState(observation||'');
    const [summaryText, setSummaryText] = useState(summary||'');
    const [nextStepsText, setNextStepsText] = useState(nextSteps||'');
    const [choiceText, setChoiceText] = useState(choice||'');

    // handle tab change
    function handleChange(event, newValue) {
        setPageNum(newValue);
        onPageChange && onPageChange(newValue);
    }

    // typing handlers
    function handleLogisticsText(event) {
        setLogisticsText(event.target.value);
        onLogisticsChange && onLogisticsChange(event);
    }

    function handleDueDateText(event) {
        setDueDateText(event.target.value);
        onDueDateChange && onDueDateChange(event);
    }

    function handleObservationText(event) {
        setObservationText(event.target.value);
        onObservationChange && onObservationChange(event);
    }

    function handleSummaryText(event) {
        setSummaryText(event.target.value);
        onSummaryChange && onSummaryChange(event);
    }

    function handleNextStepsText(event) {
        setNextStepsText(event.target.value);
        onNextStepsChange && onNextStepsChange(event);
    }

    function handleChoiceText(event) {
        setChoiceText(event.target.value);
        onChoiceChange && onChoiceChange(event);
    }

    // handlers various
    function handleShowPicker({target}) {
        target.showPicker?.();
    }

    // pdsa colors
    const color = [ 'Chocolate', 'RoyalBlue', 'ForestGreen', 'Crimson']

    return (
        <Box sx={{height:'100%', width:'100%', display:'flex', flexDirection:'column'}}>
            {/* tabs */}
            <Box sx={{ borderBottom: 1, borderColor: 'grey.300', width:'100%', display:'flex', justifyContent:'right' }}>
                <Tabs 
                    value={pageNum} 
                    onChange={handleChange} 
                    TabIndicatorProps={{
                        sx:{
                            backgroundColor: color[pageNum]
                        }
                    }}
                    sx={{
                        '& .MuiTab-root': {
                            p: 0,
                        },
                        '& .MuiTab-root.Mui-selected': {
                            color: color[pageNum]
                        },
                        justifyContent:'right', display:'flex',
                    }}
                    >
                    <Tab label="Plan" />
                    <Tab label="Do"  />
                    <Tab label="Study"  />
                    <Tab label="Act"  />
                </Tabs>
            </Box>
            {/* Content */}
            <Box sx={{flexGrow:1, overflow: 'hidden'}}>
                <Box sx={{width:'100%', height:'100%', overflow:'scroll'}}>
                    {/* Plan */}
                    <CustomTabPanel value={pageNum} index={0}>
                        {/* logistics */}
                        <Box sx={{pb:'.5rem'}}>
                            <Typography variant='h6'>Logistics:</Typography>
                            <ButtonTextfield 
                                value={logisticsText} 
                                onChange={handleLogisticsText} 
                                color='primary' 
                                />
                        </Box>
                        {/* due date */}
                        <Box sx={{py:'1rem', width:'50%'}}>
                            <TextField 
                                // disabled={loading}
                                label='Due Date'
                                type='date'
                                value={dueDateText}
                                // required
                                onChange={handleDueDateText}
                                onFocus={handleShowPicker}
                                fullWidth
                                // error={errorText}
                                // helperText={errorText}
                                slotProps={{
                                    inputLabel: {
                                        shrink:true,
                                    }
                                }}
                                />
                        </Box>
                        {/* Questions */}
                        <Box sx={{pb:'.5rem'}}>
                            <Typography variant='h6'>Questions/Predictions:</Typography>
                            <QPRList qprsList={qprsList} setQPRsList={setQPRsList} hideResults />
                        </Box>
                        {/* Measure list */}
                        <Box sx={{width:'100%', boxSizing:'border-box', pt:'.23rem'}}>
                            {/* title */}
                            <Typography variant="h6">Measures:</Typography>
                            {/* writing box and button */}
                            <MeasuresList measuresList={measuresList} setMeasuresList={setMeasuresList} aimId={aimId} />
                        </Box>
                    </CustomTabPanel>
                    {/* Do */}
                    <CustomTabPanel value={pageNum} index={1}>
                        {/* observations */}
                        <Box sx={{pb:'.5rem'}}>
                            <Typography variant='h6'>Observations:</Typography>
                            <ButtonTextfield 
                                value={observationText} 
                                onChange={handleObservationText} 
                                color='primary' 
                                />
                        </Box>
                        {/* Measure list */}
                        <Box sx={{width:'100%', boxSizing:'border-box', pt:'.23rem'}}>
                            {/* title */}
                            <Typography variant="h6">Measures:</Typography>
                            {/* writing box and button */}
                            <MeasuresList measuresList={measuresList} setMeasuresList={setMeasuresList} aimId={aimId} />
                        </Box>
                    </CustomTabPanel>
                    {/* Study */}
                    <CustomTabPanel value={pageNum} index={2}>
                        {/* Summary */}
                        <Box sx={{pb:'.5rem'}}>
                            <Typography variant='h6'>Summary:</Typography>
                            <ButtonTextfield 
                                value={summaryText} 
                                onChange={handleSummaryText} 
                                color='primary' 
                                />
                        </Box>
                        {/* Questions */}
                        <Box sx={{pb:'.5rem'}}>
                            <Typography variant='h6'>Results:</Typography>
                            <QPRList qprsList={qprsList} setQPRsList={setQPRsList} hideAddQuestion />
                        </Box>
                    </CustomTabPanel>
                    {/* Act */}
                    <CustomTabPanel value={pageNum} index={3}>
                        {/* Stage */}
                        <Box sx={{py:'1rem'}}>
                            <TextField
                                select
                                label='Next Steps'
                                value={choiceText}
                                onChange={handleChoiceText}
                                fullWidth
                                >
                                <MenuItem value={''}>
                                    Select
                                </MenuItem>
                                <MenuItem value={'adapt'}>
                                    Adapt
                                </MenuItem>
                                <MenuItem value={'adopt'}>
                                    Adopt
                                </MenuItem>
                                <MenuItem value={'abandon'}>
                                    Abandon
                                </MenuItem>
                            </TextField>
                        </Box>
                        {/* Summary */}
                        <Box sx={{pb:'.5rem'}}>
                            <Typography variant='h6'>Notes:</Typography>
                            <ButtonTextfield 
                                value={nextStepsText} 
                                onChange={handleNextStepsText} 
                                color='primary' 
                                />
                        </Box>
                        
                        
                    </CustomTabPanel>
                </Box>
            </Box>
        </Box>
    )
}

function CustomTabPanel(props) {
    const { children, value, index} = props;

    return (
    <Box
        hidden={value !== index}
        sx={{
            pt:'.5rem'
        }}
        >
        {value === index && children}
    </Box>
    );
}