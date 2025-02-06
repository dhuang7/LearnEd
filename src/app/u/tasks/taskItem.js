'use client'

import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import Checkbox from '@mui/material/Checkbox';
import RadioButtonUncheckedRoundedIcon from '@mui/icons-material/RadioButtonUncheckedRounded';
import RadioButtonCheckedRoundedIcon from '@mui/icons-material/RadioButtonCheckedRounded';
import { useState } from "react";
import EditTaskSideview from "./editTaskSideview";
import createClient from "@/utils/supabase/client";
import { useRouter } from "next/navigation";

export default function TaskItem({task, teamMembers, user}) {
    const supabase = createClient();
    const router = useRouter();
    const isDone = task.status==='done';
    const [open, setOpen] = useState(false);

    async function handleChecked(e) {
        e.stopPropagation();
        const {data, error} = await supabase
            .from('tasks')
            .update({status: isDone ? 'review' : 'done'})
            .eq('id', task.id);

        router.refresh();
    }

    return (
        <>
            <Box
                onClick={() => setOpen(true)}
                sx={{
                    display:'flex',
                    width:'100%',
                    pb:'.5rem', pt:'.2rem',pr:'1rem', boxSizing:'border-box', 
                    border:'1px solid', borderColor:'grey.300', borderRadius:3,
                    transition: 'border-color 0.25s',
                    '&:hover': {
                        borderColor: 'info.main', // Change the border color on hover
                        cursor:'pointer',
                    },
                    mt:'1rem'
                }}
                >
                {/* check box */}
                <Box sx={{boxSizing:'border-box'}}>
                    <Checkbox 
                        checked={isDone} 
                        onChange={handleChecked}
                        onClick={e => e.stopPropagation()}
                        size="small" 
                        icon={<RadioButtonUncheckedRoundedIcon sx={{color:'text.secondary'}} />} 
                        checkedIcon={<RadioButtonCheckedRoundedIcon sx={{color:'text.secondary'}} />} 
                        />
                </Box>
                <Box sx={{pt:'.15rem', boxSizing:'border-box', flexGrow:1, overflow:'hidden'}}>
                    <Box sx={{width:'100%'}}>
                        {/* title */}
                        <Typography 
                            variant="h6" 
                            noWrap 
                            color={isDone ? 'textSecondary' : 'info' }
                            sx={{
                                textDecoration: isDone && 'line-through'
                            }}
                            >
                            {task.title}
                        </Typography>
                        {/* description */}
                        <Typography 
                            variant="body2" 
                            color="textSecondary"
                            sx={{
                                whiteSpace: 'pre-wrap',
                                wordBreak: 'break-word',
                                maxHeight:'100%',
                                display: '-webkit-box',
                                WebkitLineClamp: 3,
                                lineClamp: 3,
                                overflow: 'hidden',
                                WebkitBoxOrient: 'vertical',
                                textDecoration: isDone && 'line-through'
                            }}
                            >
                            {task.description}
                        </Typography>
                        {/* person assigned */}
                        {task.assigned_id && (
                            <Typography noWrap color='textSecondary' sx={{display:'flex', alignItems:'center', mt:'.5rem'}}>
                                <AccountCircleRoundedIcon color="info" sx={{mx:'.5rem'}} />
                                <Typography noWrap color="textPrimary" component={'span'}>
                                    {teamMembers.filter(v => v.id === task.assigned_id)[0].email}
                                </Typography>
                            </Typography>
                        )}
                    </Box>
                </Box>
            </Box>


            {/* dialog */}
            <EditTaskSideview task={task} user={user} setOpen={setOpen} open={open} teamMembers={teamMembers} />
        </>
    );
}