'use client'

import Box from "@mui/material/Box";
import List from "@mui/material/List";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import BookmarkAddRoundedIcon from '@mui/icons-material/BookmarkAddRounded';
import IconButton from "@mui/material/IconButton";

import NormsListItem from "./normsListItem";
import { useState } from "react";


export default function NormsList() {
    const [norms, setNorms] = useState([1,2,3,4]);

    function handleAddNorm() {
        // setNorms()
    }

    return (
        <Paper 
            elevation={0} 
            sx={{
                borderRadius:3, boxSizing:'border-box', border:'1px solid', borderColor: 'grey.300',
                p:'1rem', height:'100%', 
                display:'flex', flexDirection:'column'
            }}
            >
            <Box sx={{display:'flex', alignItems:'center'}}>
                <Typography variant="h6">Norms:</Typography>
                {/* add new norm */}
                <IconButton
                    color='info' 
                    // onClick={handleAddTopic}
                    >
                    <BookmarkAddRoundedIcon />
                </IconButton>
            </Box>
            <Box sx={{flexGrow:1, overflow:'hidden', pt:'.5rem', boxSizing:'border-box'}}>
                <List disablePadding sx={{height:'100%', overflowY:'scroll'}}>
                    {norms.map((norm, i) => (
                        <NormsListItem key={i} norm={norm} />
                    ))}
                    
                </List>
            </Box>
        </Paper>
    )
}
