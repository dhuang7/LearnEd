'use client'

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Button from '@mui/material/Button';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import InfoRoundedIcon from '@mui/icons-material/InfoRounded';

import { useEffect, useState } from 'react';
import createClient from '@/utils/supabase/client';
import AddMeasureTypeModal from './addMeasureTypeModal';
import dayjs from 'dayjs';


export default function MeasuresList({
    measuresList, setMeasuresList, aimId,
}) {
    const supabase = createClient();

    const [measureTypes, setMeasureTypes] = useState([]);

    // get measure types
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
                date: dayjs(),
                date_list: [dayjs()],
                data_list: [''],
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
    function handleDataText(e, value, index) {
        const {target} = e;
        // if (isNaN(target.value)) return;
        setMeasuresList(ts => {
            ts[value] = {
                ...ts[value],
                // data: target.value,
            }

            ts[value].data_list[index] = target.value;

            return [...ts];
        })
    }

    function handleDateText(e, value, index) {
        const {target} = e;
        // if (isNaN(target.value)) return;
        setMeasuresList(ts => {
            ts[value] = {
                ...ts[value],
                // date: target.value && dayjs(target.value).toISOString(),
            }

            ts[value].date_list[index] = target.value ? dayjs(target.value).toISOString() : null;

            return [...ts];
        })
    }

    function handleAddData(e, value, index) {
        setMeasuresList(ts => {
            ts[value] = {
                ...ts[value],
                date_list: [
                    ...(ts[value].date_list || []),
                    dayjs(),
                ],
                data_list: [
                    ...(ts[value].data_list || []),
                    '',
                ],
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
                                <MenuItem 
                                    disabled 
                                    sx={{
                                        '&.Mui-disabled': {
                                            opacity:1,
                                            color:'info.main',
                                        }
                                    }}
                                    >
                                    <InfoRoundedIcon fontSize='small' sx={{mr:'.5rem'}} />
                                    Create or edit new measures in the measure tab.
                                </MenuItem>
                                {/* <AddMeasureTypeModal aimId={aimId} measureTypes={measureTypes} setMeasureTypes={setMeasureTypes} component={(props) => <MenuItem disableGutters value={'button'} {...props}/>} /> */}
                            </TextField>
                            {/* trash */}
                            <IconButton size='small' data-order={i} onClick={handleDeleteMeasure} sx={{ml:'.5rem'}}>
                                <DeleteRoundedIcon fontSize='small' />
                            </IconButton>
                        </Box>

                        {/* Data list */}
                        {v.date_list?.map((date, data_i) => (
                            <Box key={data_i} sx={{display:'flex', alignItems:'center', mt:'1rem'}}>
                                <Typography align='center' fontWeight={'bold'} sx={{mr:'.5rem', minWidth:'2rem', }}>{data_i}</Typography>
                                {/* date */}
                                <TextField
                                    label='Date'
                                    type='date'
                                    value={dayjs(date).format('YYYY-MM-DD')}
                                    onChange={e => handleDateText(e, i, data_i)}
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
                                    // sx={{mt:'.5rem'}}
                                    />
                                {/* Measure Results */}
                                <TextField
                                    label='Data'
                                    type='number'
                                    value={v.data_list[data_i]||''} data-order={i} onChange={e=>handleDataText(e, i, data_i)}
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
                                    sx={{ml:'.5rem'}}
                                    />
                            </Box>
                        ))}
                        
                        <Box sx={{display:'flex', alignItems:'center', mt:'.5rem'}}>
                            <Typography fontWeight={'bold'} sx={{mr:'.5rem', minWidth:'2rem'}}>&nbsp;</Typography>
                            <Button 
                                color='info' 
                                // variant='contained' disableElevation 
                                sx={{borderRadius:3, textTransform:'none'}} 
                                startIcon={<AddRoundedIcon />}
                                onClick={e => handleAddData(e, i)}
                                // disabled={loading}
                                >
                                Data
                            </Button>
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