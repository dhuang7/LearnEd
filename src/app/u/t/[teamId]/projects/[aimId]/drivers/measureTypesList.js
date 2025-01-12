'use client'

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Button from '@mui/material/Button';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import Typography from '@mui/material/Typography';
import ButtonTextfield from '@/components/buttonTextfield';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import dayjs from 'dayjs';


export default function MeasureTypesList({
    measureTypes, setMeasureTypes, 
}) {

    function handleAddMeasure() {
        setMeasureTypes(l => [
            ...l,
            {
                name: '',
                description: '',
            }
        ])
    }

    function handleDeleteMeasure({currentTarget}) {
        const value = Number(currentTarget.dataset.order);
        setMeasureTypes(ts => {
            const newTs = [];
            let adjust = 0;
            ts.forEach((v, i) => {
                const newV = {...v}
                if (i === value) {
                    adjust = 1;
                    return;
                }
                newV.order_num = newV.order_num-adjust;
                newTs.push(newV);
            })

            return newTs;
        })
    }

    // handle typing
    function handleDescriptionText(e, value) {
        const {target} = e;
        setMeasureTypes(ts => {
            ts[value] = {
                ...ts[value],
                description: target.value,
            }

            return [...ts];
        })
    }

    function handleNameText(e, value) {
        const {target} = e;
        setMeasureTypes(ts => {
            ts[value] = {
                ...ts[value],
                name: target.value,
            }

            return [...ts];
        })
    }

    // function handleDateText(e, value) {
    //     const {target} = e;
    //     console.log(target.value)
    //     setMeasureTypes(ts => {
    //         ts[value] = {
    //             ...ts[value],
    //             date: target.value,
    //         }

    //         return [...ts];
    //     })
    // }

    // handlers various
    function handleShowPicker({target}) {
        target.showPicker?.();
    }

    return (
        <List disablePadding dense>
            {measureTypes.map((v, i) => (
                <ListItem key={i}>
                    <Box sx={{borderRadius:3, border:'1px solid', borderColor:'grey.300', boxSizing:'border-box', p:'.5rem', width:'100%', boxShadow:2}}>
                        <Box sx={{display:'flex', alignItems:'flex-start'}}>
                            {/* Content */}
                            <Box sx={{flexGrow:1}}>
                                {/* Measure Name */}
                                <Typography variant='body1' sx={{fontWeight:'bold'}}>Name:</Typography>
                                <ButtonTextfield value={v.name} data-order={i} onChange={e=>handleNameText(e, i)}></ButtonTextfield>
                                {/* Measure Description */}
                                <Typography variant='body1' sx={{fontWeight:'bold'}}>Description:</Typography>
                                <ButtonTextfield value={v.description} data-order={i} onChange={e=>handleDescriptionText(e, i)}></ButtonTextfield>
                                {/* Date */}
                                {/* <Typography variant='body1' sx={{fontWeight:'bold'}}>Date:</Typography>
                                <TextField 
                                    // label='Due Date'
                                    type='date'
                                    value={dayjs(v.date).format('YYYY-MM-DD')}
                                    onChange={e=>handleDateText(e, i)}
                                    onFocus={handleShowPicker}
                                    fullWidth
                                    slotProps={{
                                        htmlInput: {
                                            sx: {
                                                py:'.5rem'
                                            }
                                        },
                                    }}
                                    /> */}
                            </Box>
                            {/* trash */}
                            <IconButton size='small' data-order={i} onClick={handleDeleteMeasure}>
                                <DeleteRoundedIcon fontSize='small' />
                            </IconButton>
                        </Box>
                        
                    </Box>
                </ListItem>
            ))}
            {/* add new question/prediction */}
            <ListItem>
                <Button 
                    color='info' 
                    // variant='contained' disableElevation 
                    sx={{borderRadius:3, textTransform:'none'}} 
                    startIcon={<AddRoundedIcon />}
                    onClick={handleAddMeasure}
                    // disabled={loading}
                    >
                    Measure Type
                </Button>
            </ListItem>
        </List>
    );
}