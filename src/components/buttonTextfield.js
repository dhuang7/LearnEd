'use client'

import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

import { useEffect, useState } from "react";



export default function ButtonTextfield(params) {
    const {value, onChange, color} = params;
    
    const [valueText, setValueText] = useState('');
    const [editValue, setEditValue] = useState(false);

    useEffect(() => {
        setValueText(value||'');
    }, [value])

    function handleEditValue() {
        setEditValue(e=>!e);
    }

    function handleChange(event) {
        if (onChange) {
            onChange(event);
        } else {
            setValueText(event.target.value);
        }
    }

    
    return (
        <>
            <Box sx={{width:'100%'}}>
                {(editValue)
                    ? <Box sx={{boxSizing:'border-box', pr:'.5rem', flexGrow:1}}>
                        {/* text */}
                        <TextField 
                            size='small'
                            fullWidth
                            autoFocus
                            value={valueText}
                            onChange={handleChange}
                            onBlur={handleEditValue}
                            multiline
                            slotProps={{
                                input: {
                                    sx: {
                                        p:'6px 8px',
                                        lineHeight:'1.5',
                                    }
                                },
                            }}
                            {...params}
                            />
                    </Box>
                    : <Button onClick={handleEditValue} sx={{width:'100%', textTransform:'none', whiteSpace:'pre-wrap',}}>
                        <Box sx={{width:'100%', overflow:'hidden'}}>
                            <Typography align='left' color={color||'textSecondary'} sx={{wordWrap: 'break-word'}}>
                                {valueText || 'Enter text...'}
                            </Typography>
                        </Box>
                    </Button>
                }
            </Box>
        </>
    )
}
