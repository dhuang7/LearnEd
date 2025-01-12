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
import MenuItem from '@mui/material/MenuItem';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import { useEffect, useState } from 'react';
import createClient from '@/utils/supabase/client';
import AddMeasureTypeModal from './addMeasureTypeModal';
import dayjs from 'dayjs';


export default function MeasuresList({
    measuresList, setMeasuresList, aimId,
}) {
    const supabase = createClient();

    const [measureTypes, setMeasureTypes] = useState([]);

    useEffect(() => {
        async function getMeasureTypes() {
            const {data, error} = await supabase
                .from('measure_types')
                .select()
                .eq('aim_id', aimId);

            console.log(error);
            setMeasureTypes(data);
        }

        getMeasureTypes();
    }, []);

    function handleMeasureTypes({target}, value) {
        if (target.value === 'button') return true;
        setMeasuresList(ts => {
            ts[value] = {
                ...ts[value],
                measure_types_id: target.value,
            }

            return [...ts];
        })
    }

    function handleAddMeasure() {
        setMeasuresList(l => [
            ...l,
            {
                order_num: l.length,
                description: '',
                data: '',
                date: '',
            }
        ])
    }

    function handleDeleteMeasure({currentTarget}) {
        const value = Number(currentTarget.dataset.order);
        setMeasuresList(ts => {
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
    function handleDataText(e, value) {
        const {target} = e;
        // if (isNaN(target.value)) return;
        setMeasuresList(ts => {
            ts[value] = {
                ...ts[value],
                data: target.value,
            }

            return [...ts];
        })
    }

    function handleDateText(e, value) {
        const {target} = e;
        // if (isNaN(target.value)) return;
        setMeasuresList(ts => {
            ts[value] = {
                ...ts[value],
                date: dayjs(target.value).toISOString(),
            }

            return [...ts];
        })
    }

    // handlers various
    function handleShowPicker({target}) {
        target.showPicker?.();
    }

    return (
        <List disablePadding dense>
            {measuresList.map((v, i) => (
                <ListItem key={i}>
                    <Box sx={{borderRadius:3, border:'1px solid', borderColor:'grey.300', boxSizing:'border-box', p:'.5rem', width:'100%', boxShadow:2}}>
                        <Box sx={{display:'flex', alignItems:'flex-start'}}>
                            {/* Content */}
                            <Box sx={{flexGrow:1}}>
                                {/* Choose Measure */}
                                <Box sx={{width:'100%', display:'flex', alignItems:'center'}}>
                                    <TextField
                                        select
                                        label='Measure'
                                        value={v.measure_types_id||''}
                                        onChange={e => handleMeasureTypes(e, i)}
                                        fullWidth
                                        slotProps={{
                                            // select: {
                                            //     renderValue:(v) => v.name,
                                            // },
                                            htmlInput: {
                                                sx: {
                                                    py:'.5rem'
                                                }
                                            },
                                            inputLabel: {
                                                shrink: true,
                                            }
                                        }}
                                        >
                                        {measureTypes.map((m, i) => (
                                            <MenuItem key={i} value={m.id}>
                                                {m.name}
                                            </MenuItem>
                                        ))}
                                        {/* Add new project */}
                                        <AddMeasureTypeModal aimId={aimId} measureTypes={measureTypes} setMeasureTypes={setMeasureTypes} component={(props) => <MenuItem disableGutters value={'button'} {...props}/>} />
                                    </TextField>
                                    {/* trash */}
                                    <IconButton size='small' data-order={i} onClick={handleDeleteMeasure} sx={{ml:'.5rem'}}>
                                        <DeleteRoundedIcon fontSize='small' />
                                    </IconButton>
                                </Box>
                                {/* date */}
                                <TextField
                                    label='Date'
                                    type='date'
                                    value={dayjs(v.date).format('YYYY-MM-DD')}
                                    onChange={e => handleDateText(e, i)}
                                    onFocus={handleShowPicker}
                                    fullWidth
                                    slotProps={{
                                        htmlInput: {
                                            sx: {
                                                py:'.5rem'
                                            }
                                        },
                                        inputLabel: {
                                            shrink: true,
                                        }
                                    }}
                                    sx={{mt:'.5rem'}}
                                    />
                                {/* Measure Results */}
                                <Box sx={{display:'flex', alignItems:'center', mt:'.5rem'}}>
                                    <Typography variant='body1' sx={{fontWeight:'bold'}}>Data:</Typography>
                                    <TextField
                                        type='number'
                                        value={v.data||''} data-order={i} onChange={e=>handleDataText(e, i)}
                                        slotProps={{
                                            htmlInput: {
                                                sx: {
                                                    py:'.5rem'
                                                }
                                            },
                                        }}
                                        sx={{ml:'.5rem'}}
                                        />
                                </Box>
                            </Box>
                            {/* trash */}
                            {/* <IconButton size='small' data-order={i} onClick={handleDeleteMeasure}>
                                <DeleteRoundedIcon fontSize='small' />
                            </IconButton> */}
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
                    Measure
                </Button>
            </ListItem>
        </List>
    );
}