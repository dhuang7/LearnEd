'use client'

import Box from "@mui/material/Box";
import ListItem from "@mui/material/ListItem";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import SubdirectoryArrowRightRoundedIcon from '@mui/icons-material/SubdirectoryArrowRightRounded';
import TextField from "@mui/material/TextField";


import { useState } from "react";




export default function NormsListItem({norm}) {
    const [edit, setEdit] = useState(false);


    function handleEdit() {
        setEdit(e=>!e)
    }

    return (
        <ListItem>
            <SubdirectoryArrowRightRoundedIcon sx={{position:'relative', top:-3.5}} />
            {(edit)
                ? <Box sx={{boxSizing:'border-box', pr:'.5rem', flexGrow:1}}>
                    {/* text */}
                    <TextField 
                        size='small'
                        fullWidth
                        autoFocus
                        // value={topic.outcomes}
                        // onChange={handleOutcomes}
                        onBlur={handleEdit}
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
                : <Button onClick={handleEdit} sx={{width:'100%', textTransform:'none', whiteSpace:'pre-wrap',}}>
                    <Box sx={{width:'100%', overflow:'hidden'}}>
                        <Typography align='left' color='inherit' sx={{wordWrap: 'break-word'}}>
                            {norm}
                        </Typography>
                    </Box>
                </Button>
            }
            
        </ListItem>
    )
}
