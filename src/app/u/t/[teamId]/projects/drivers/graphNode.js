'use client'

import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import CircularProgress from "@mui/material/CircularProgress";
import TextField from "@mui/material/TextField";
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import Button from "@mui/material/Button";

import SaveRoundedIcon from '@mui/icons-material/SaveRounded';
import IconButton from "@mui/material/IconButton";
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import { useEffect, useState } from "react";
import createClient from "@/utils/supabase/client";



export default function GraphNode({name, description, onSave}) {
    const supabase = createClient();
    const [edit, setEdit] = useState(false);
    const [titleText, setTitleText] = useState('');
    const [descriptionText, setDescriptionText] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setTitleText(name);
        setDescriptionText(description);
    }, [name, description])

    function handleEdit() {
        setEdit(e=>!e);
    }

    function handleTitleText({target}) {
        setTitleText(target.value);
    }

    function handleDescriptionText({target}) {
        setDescriptionText(target.value);
    }

    async function handleSave() {
        setLoading(true);
        await onSave();
        setLoading(false);
        handleEdit();
    }
    
    return (
        <>
            <Box sx={{width:'75%', height:'100px', boxSizing:'border-box', px:'1rem', my:'.5rem'}}>
                <Button 
                    variant="contained" disableElevation 
                    sx={{
                        width:'100%', height:'100%', 
                        textTransform:'none',
                        boxSizing:'border-box',
                    }}
                    >
                        <Box sx={{width:'100%', height:'100%', display:'flex', flexDirection:'column'}}>
                            <Typography variant="h6" align="left">{name}</Typography>
                            <Box sx={{flexGrow:1, overflow:'hidden'}}>
                                <Typography 
                                    variant="body1" align="left" noWrap 
                                    sx={{
                                        whiteSpace: 'pre-wrap',
                                        overflow:'scroll',
                                        maxHeight:'100%',
                                    }}
                                    >
                                        {description}
                                </Typography>
                            </Box>
                        </Box>
                        
                </Button>
            </Box>
        </>
    )
}
