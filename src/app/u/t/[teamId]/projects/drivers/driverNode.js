'use client'

import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import CircularProgress from "@mui/material/CircularProgress";
import TextField from "@mui/material/TextField";
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';

import SaveRoundedIcon from '@mui/icons-material/SaveRounded';
import IconButton from "@mui/material/IconButton";
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import { useEffect, useState } from "react";
import createClient from "@/utils/supabase/client";



export default function DriverNode({name, description, onSave}) {
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
            <Box sx={{width:'100%', height:'150px', boxSizing:'border-box', px:'1rem', my:'.5rem'}}>
                <Paper 
                    elevation={0} 
                    sx={{
                        // borderRadius:3, boxSizing:'border-box', border:'1px solid', borderColor: 'grey.300',
                        p:'1rem', py:'.5rem', height:'100%', 
                        boxSizing:'border-box',
                        display:'flex', flexDirection:'column',
                        backgroundColor:'primary.main',
                        color:'common.white',
                    }}
                    >
                        {/* title */}
                        <Box sx={{width:'100%', boxSizing:'border-box', pb:'.25rem'}}>
                            {(edit)
                                ? <TextField 
                                    fullWidth
                                    value={titleText}
                                    onChange={handleTitleText}
                                    sx={{backgroundColor:'common.white', borderRadius:1}}
                                    slotProps={{
                                        htmlInput: {
                                            sx: theme => ({
                                                p:0,
                                                px:'.25rem',
                                                lineHeight:'1.6',
                                                height:'2rem',
                                                fontSize:theme.typography.h6
                                            })
                                        },
                                        
                                    }}
                                    />
                                : <Typography variant="h6" sx={{whiteSpace: 'pre-line', px:'.25rem'}}>
                                    {titleText}
                                </Typography>
                            }
                        </Box>
                        
                        {/* description */}
                        <Box sx={{flexGrow:1, overflow:'hidden', width:'100%'}}>
                            <Box sx={{height:'100%', overflowY:'scroll'}}>
                                {(edit)
                                    ? <TextField 
                                        fullWidth
                                        value={descriptionText}
                                        onChange={handleDescriptionText}
                                        sx={{backgroundColor:'common.white', borderRadius:1}}
                                        multiline
                                        rows={3}
                                        slotProps={{
                                            input: {
                                                sx: theme => ({
                                                    p:0,
                                                    px:'.25rem',
                                                    lineHeight:'1.43',
                                                    fontSize:theme.typography.body2
                                                })
                                            },
                                            
                                        }}
                                        />
                                    : <Typography variant="body2" sx={{whiteSpace: 'pre-line', px:'.25rem'}}>
                                        {descriptionText}
                                    </Typography>
                                }
                            </Box>
                        </Box>
                        {/* buttons */}
                        <Box sx={{display:'flex', justifyContent:'right'}}>
                            <IconButton color='inherit' size='small'>
                                <DeleteRoundedIcon />
                            </IconButton>
                            {(edit)
                                ? <IconButton color="inherit" size='small' onClick={handleSave} >
                                    {(loading)
                                        ? <CircularProgress size={'1.5rem'} />
                                        : <SaveRoundedIcon />

                                    }
                                </IconButton>
                                : <IconButton color="inherit" size='small' onClick={handleEdit}>
                                    <EditRoundedIcon />
                                </IconButton>
                            }
                            
                        </Box>
                </Paper>
            </Box>
        </>
    )
}
