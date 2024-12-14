'use client'

import Box from "@mui/material/Box";
import List from "@mui/material/List";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import BookmarkAddRoundedIcon from '@mui/icons-material/BookmarkAddRounded';
import IconButton from "@mui/material/IconButton";
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';

import NormsListItem from "./normsListItem";
import { useState, useEffect } from "react";
import createClient from "@/utils/supabase/client";


export default function NormsList() {
    const [norms, setNorms] = useState([]);
    const [toggleDelete, setToggleDelete] = useState(false);
    const supabase = createClient();

    useEffect(() => {
        async function getNorms() {
            let { data: norms, error } = await supabase
                .from('norms')
                .select('*');

            setNorms(norms);
        }

        getNorms();
        
    }, []);

    function handleAddNorm() {
        setNorms(n => n.concat([n.length]));
    }

    function handleToggleDelete() {
        setToggleDelete(t=>!t);
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
                    onClick={handleAddNorm}
                    >
                    <BookmarkAddRoundedIcon />
                </IconButton>
                <IconButton onClick={handleToggleDelete} sx={{ml:'auto'}}><DeleteRoundedIcon /></IconButton>
            </Box>
            <Box sx={{flexGrow:1, overflow:'hidden', pt:'.5rem', boxSizing:'border-box'}}>
                <List disablePadding sx={{height:'100%', overflowY:'scroll'}}>
                    {norms.map((norm, i) => (
                        <NormsListItem key={i} norm={norm} toggleDelete={toggleDelete} orderNum={i} setNorms={setNorms} />
                    ))}
                    
                </List>
            </Box>
        </Paper>
    )
}
