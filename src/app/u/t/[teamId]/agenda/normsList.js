'use client'

import Box from "@mui/material/Box";
import List from "@mui/material/List";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import BookmarkAddRoundedIcon from '@mui/icons-material/BookmarkAddRounded';
import IconButton from "@mui/material/IconButton";
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import SaveRoundedIcon from '@mui/icons-material/SaveRounded';

import NormsListItem from "./normsListItem";
import { useState } from "react";
import createClient from "@/utils/supabase/client";


export default function NormsList({teamId, normsList}) {
    const [norms, setNorms] = useState(normsList.sort((a, b) => a.order_num-b.order_num));
    const [toggleDelete, setToggleDelete] = useState(false);
    const [saving, setSaving] = useState('');
    const supabase = createClient();

    function handleAddNorm() {
        setNorms(n => n.concat([{team_id: teamId, order_num: n.length}]));
    }

    function handleToggleDelete() {
        setToggleDelete(t=>!t);
    }

    async function handleSave() {
        setSaving('Saving...');
        setToggleDelete(false);
        console.log(norms);
        // const { data, error } = await supabase
        //     .from('norms')
        //     .upsert(norms, { onConflict: ['id'], defaultToNull: false });
        const { data, error } = await supabase.rpc('batch_upsert_norms', {norms_list:norms});

        console.log(error);

        setSaving('Saved!');
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
                    disabled={saving==='Saving...'}
                    >
                    <BookmarkAddRoundedIcon />
                </IconButton>
                {/* Save text */}
                <Typography variant='caption'>{saving}</Typography>
                {/* delete */}
                <IconButton disabled={saving==='Saving...'} onClick={handleToggleDelete} size='small' sx={{ml:'auto'}}><DeleteRoundedIcon /></IconButton>
                {/* save */}
                <IconButton disabled={saving==='Saving...'} onClick={handleSave} size='small'><SaveRoundedIcon /></IconButton>
            </Box>
            <Box sx={{flexGrow:1, overflow:'hidden', pt:'.5rem', boxSizing:'border-box'}}>
                <List disablePadding sx={{height:'100%', overflowY:'scroll'}}>
                    {norms.sort((a,b) => a.order_num - b.order_num).map((norm, i) => (
                        <NormsListItem 
                            key={i} 
                            norm={norm} 
                            toggleDelete={toggleDelete} 
                            orderNum={i} 
                            setNorms={setNorms} 
                            setSaving={setSaving}
                            saving={saving}
                            />
                    ))}
                    
                </List>
            </Box>
        </Paper>
    )
}
