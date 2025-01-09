'use client'

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Button from '@mui/material/Button';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import Typography from '@mui/material/Typography';
import ButtonTextfield from '@/components/buttonTextfield';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';


export default function MeasuresList({
    measuresList, setMeasuresList, 
}) {

    function handleAddMeasure() {
        setMeasuresList(l => [
            ...l,
            {
                order_num: l.length,
                description: '',
                data: '',
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
    function handleDescriptionText(e, value) {
        const {target} = e;
        setMeasuresList(ts => {
            ts[value] = {
                ...ts[value],
                description: target.value,
            }

            return [...ts];
        })
    }

    function handleDataText(e, value) {
        const {target} = e;
        if (isNaN(target.value)) return;
        setMeasuresList(ts => {
            ts[value] = {
                ...ts[value],
                data: target.value,
            }

            return [...ts];
        })
    }

    return (
        <List disablePadding dense>
            {measuresList.map((v, i) => (
                <ListItem key={i}>
                    <Box sx={{borderRadius:3, border:'1px solid', borderColor:'grey.300', boxSizing:'border-box', p:'.5rem', width:'100%', boxShadow:2}}>
                        <Box sx={{display:'flex', alignItems:'flex-start'}}>
                            {/* Content */}
                            <Box sx={{flexGrow:1}}>
                                {/* Measure Description */}
                                <Typography variant='body1' sx={{fontWeight:'bold'}}>Description:</Typography>
                                <ButtonTextfield value={measuresList[i].description} data-order={i} onChange={e=>handleDescriptionText(e, i)}></ButtonTextfield>
                                {/* Measure Results */}
                                <Typography variant='body1' sx={{fontWeight:'bold'}}>Data:</Typography>
                                <ButtonTextfield value={measuresList[i].data} data-order={i} onChange={e=>handleDataText(e, i)}></ButtonTextfield>
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
                    Measure
                </Button>
            </ListItem>
        </List>
    );
}