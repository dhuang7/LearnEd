'use client'

import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";

import { useState } from "react";
import createClient from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import { useTeamContext } from "@/app/u/layout";



export default function SettingsInfo({team}) {
    const supabase = createClient();
    const router = useRouter();
    const [teamInfo, setTeamInfo, aimInfo, setAimInfo] = useTeamContext();
    const [teamNameText, setTeamNameText] = useState(team.name);
    const [loading, setLoading] = useState(false);
    
    function handleTeamNameText({target}) {
        setTeamNameText(target.value);
    }

    function handleCancel() {
        setTeamNameText(team.name);
    }

    async function handleSave() {
        setLoading(true);

        const {data, error} = await supabase
            .from('teams')
            .update({
                name: teamNameText,
            })
            .eq('id', team.id)
            .select();
        
        setTeamInfo(data[0]);
        router.refresh();
        setLoading(false);
    }
    
    return (
        <Paper 
            elevation={0} 
            sx={{
                borderRadius:3, boxSizing:'border-box', border:'1px solid', borderColor: 'grey.300',
                p:'1rem', px:'1rem', width:'100%', height:'100%', overflow:'scroll',
                display:'flex', flexDirection:'column', position:'relative', boxSizing:'border-box',
            }}
            >
            <Typography variant="body1" sx={{fontWeight:'bold'}}>Team Name:</Typography>
            <TextField 
                disabled={loading}
                value={teamNameText}
                onChange={handleTeamNameText}
                slotProps={{
                    htmlInput: {
                        sx: {
                            py:'.5rem'
                        }
                    },
                }}
                sx={{width:'20rem'}}
                />
            <Box sx={{mt:'1rem', width:'20rem', display:'flex', justifyContent:'right'}}>
                <Button disabled={loading} onClick={handleCancel} sx={{mr:'.5rem'}}>Cancel</Button>
                <Button disabled={loading} disableElevation variant="contained" onClick={handleSave}>Save</Button>
            </Box>
        </Paper>
    )
}
