'use client'

import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';



import { useState } from 'react';
import ButtonTextfield from '@/components/buttonTextfield';


export default function PDSAPages({
    page, onPageChange,
    logistics, measure, dueDate, observation, data, summary, nextSteps, choice,
    onLogisticsChange, onMeasureChange, onDueDateChange, onObservationChange, onDataChange, onSummaryChange, onNextStepsChange, onChoiceChange
}) {
    const [pageNum, setPageNum] = useState(page||0);
    const [logisticsText, setLogisticsText] = useState(logistics||'');
    const [measureText, setMeasureText] = useState(measure||'');
    const [dueDateText, setDueDateText] = useState(dueDate||'');
    const [observationText, setObservationText] = useState(observation||'');
    const [dataText, setDataText] = useState(data||'');
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

    function handleMeasureText(event) {
        setMeasureText(event.target.value);
        onMeasureChange && onMeasureChange(event);
    }

    function handleDueDateText(event) {
        setDueDateText(event.target.value);
        onDueDateChange && onDueDateChange(event);
    }

    function handleObservationText(event) {
        setObservationText(event.target.value);
        onObservationChange && onObservationChange(event);
    }

    function handleDataText(event) {
        setDataText(event.target.value);
        onDataChange && onDataChange(event);
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
    // console.log(color[pageNum])

    

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
                        {/* due date */}
                        <Box sx={{py:'1rem', width:'50%'}}>
                            <TextField 
                                // disabled={loading}
                                label='Due Date'
                                type='date'
                                value={dueDateText}
                                required
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
                        {/* logistics */}
                        <Box sx={{pb:'.5rem'}}>
                            <Typography variant='h6'>Logistics:</Typography>
                            <ButtonTextfield 
                                value={logisticsText} 
                                onChange={handleLogisticsText} 
                                color='primary' 
                                />
                        </Box>
                        {/* measure */}
                        <Box sx={{pb:'.5rem'}}>
                            <Typography variant='h6'>Measure:</Typography>
                            <ButtonTextfield value={measureText} onChange={handleMeasureText} color='primary' />
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
                        {/* data */}
                        <Box sx={{pb:'.5rem'}}>
                            <Typography variant='h6'>Data:</Typography>
                            <ButtonTextfield value={dataText} onChange={handleDataText} color='primary' />
                        </Box>
                    </CustomTabPanel>
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
                    </CustomTabPanel>
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
                                <MenuItem value={'plan'}>
                                    Adapt
                                </MenuItem>
                                <MenuItem value={'do'}>
                                    Adopt
                                </MenuItem>
                                <MenuItem value={'study'}>
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