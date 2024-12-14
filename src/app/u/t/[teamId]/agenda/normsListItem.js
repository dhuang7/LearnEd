'use client'

import Box from "@mui/material/Box";
import ListItem from "@mui/material/ListItem";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import SubdirectoryArrowRightRoundedIcon from '@mui/icons-material/SubdirectoryArrowRightRounded';
import TextField from "@mui/material/TextField";
import BookmarkRemoveRoundedIcon from '@mui/icons-material/BookmarkRemoveRounded';


import { useState } from "react";
import { IconButton } from "@mui/material";




export default function NormsListItem({norm, toggleDelete, orderNum, setNorms, setSaving, saving}) {
    const [edit, setEdit] = useState(false);


    function handleEdit() {
        setEdit(true);
    }

    function handleLeaveFocus() {
        setEdit(false);
    }

    function handleChange({target}) {
        setNorms(n => {
            const newNorms = [...n];
            newNorms[orderNum] = {
                ...newNorms[orderNum],
                description: target.value,
            }

            return newNorms;
        });

        setSaving('');
    }

    function handleDelete() {
        setNorms(n => [
            ...n.slice(0, orderNum),
            ...n.slice(orderNum + 1),
        ]);
    }

    return (
        <ListItem>
            {toggleDelete && 
                <IconButton 
                    size='small'
                    disabled={saving==='Saving...'}
                    onClick={handleDelete}
                    sx={{position:'relative', top:-3.5}} 
                    >
                    <BookmarkRemoveRoundedIcon fontSize="small" />
                </IconButton>
                }
            <SubdirectoryArrowRightRoundedIcon sx={{position:'relative', top:-3.5}} />
            {(edit)
                ? <Box sx={{boxSizing:'border-box', pr:'.5rem', flexGrow:1}}>
                    {/* text */}
                    <TextField 
                        size='small'
                        fullWidth
                        autoFocus
                        disabled={saving==='Saving...'}
                        value={norm.description}
                        onChange={handleChange}
                        onBlur={handleLeaveFocus}
                        multiline
                        slotProps={{
                            input: {
                                sx: {
                                    p:'6px 8px',
                                    lineHeight:'1.5',
                                }
                            },
                        }}
                        />
                </Box>
                : <Button disabled={toggleDelete} onClick={handleEdit} sx={{width:'100%', textTransform:'none', whiteSpace:'pre-wrap',}}>
                    <Box disabled={saving==='Saving...'} sx={{width:'100%', overflow:'hidden'}}>
                        <Typography 
                            align='left' 
                            color={norm.description ? 'inherit' : 'textSecondary'} 
                            sx={{wordWrap: 'break-word'}}>
                            {norm.description || 'Enter text...'}
                        </Typography>
                    </Box>
                </Button>
            }
            
        </ListItem>
    )
}
