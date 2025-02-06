'use client'

import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

import { useEffect, useState } from "react";



export default function ButtonTextfield({value, onChange, color, inputPadding, inputLineHeight, typeVariant, disabled, ...params}) {
    // const {value, onChange, color, inputPadding, inputLineHeight, typeVariant, disabled} = params;
    
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
                            value={value||valueText}
                            onChange={handleChange}
                            onBlur={handleEditValue}
                            disabled={disabled}
                            multiline
                            slotProps={{
                                input: {
                                    sx: theme => ({
                                        p:inputPadding||'6px 8px',
                                        lineHeight:inputLineHeight||'1.5',
                                        fontSize: theme.typography[typeVariant],
                                    })
                                },
                            }}
                            {...params}
                            />
                    </Box>
                    : <Button disabled={disabled} onClick={handleEditValue} sx={{width:'100%', textTransform:'none', whiteSpace:'pre-wrap',}}>
                        <Box 
                            sx={{
                                width:'100%', 
                                overflow:'hidden', 
                                height:params.rows ? `${1.5*(params.rows)}rem` : 'auto'}}
                            >
                            <Typography 
                                variant={typeVariant||'body1'} 
                                align='left' 
                                color={color||'textSecondary'} 
                                sx={{
                                    whiteSpace: 'pre-wrap',
                                    wordBreak: 'break-word',
                                    overflow:'scroll',
                                    maxHeight:'100%',
                                    display: '-webkit-box',
                                    WebkitLineClamp: params.rows||null,
                                    lineClamp: params.rows||null,
                                    overflow: 'hidden',
                                    WebkitBoxOrient: 'vertical',
                                }}
                                >
                                {valueText || 'Enter text...'}
                            </Typography>
                        </Box>
                    </Button>
                }
            </Box>
        </>
    )
}
