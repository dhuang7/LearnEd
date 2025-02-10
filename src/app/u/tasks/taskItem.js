'use client'

import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import Checkbox from '@mui/material/Checkbox';
import Icon from '@mui/material/Icon';
import RadioButtonUncheckedRoundedIcon from '@mui/icons-material/RadioButtonUncheckedRounded';
import RadioButtonCheckedRoundedIcon from '@mui/icons-material/RadioButtonCheckedRounded';
import TodayRoundedIcon from '@mui/icons-material/TodayRounded';

import { useState } from "react";
import EditTaskSideview from "./editTaskSideview";
import createClient from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import dayjs from "dayjs";
import Image from "next/image";

export default function TaskItem({task, teamMembers, user, tasks, activeTask, teamId, teams}) {
    const supabase = createClient();
    const router = useRouter();
    const isDone = task.status==='done';
    const [open, setOpen] = useState(false);

    // handles checking
    async function handleChecked(e) {
        e.stopPropagation();

        const statuses = {
            'to do': 0,
            'in progress': 0,
            'done': 0,
        }

        // reorder order nums
        tasks.forEach((v, i) => {
            let currStatus = v.status;
            if (v.id === task.id) {
                currStatus = isDone ? 'in progress' : 'done';
                v.date_completed = currStatus === 'done' ? dayjs() : null;
            }

            v.order_num = statuses[currStatus];
            v.status = currStatus;
            statuses[currStatus]++;
        })

        const {data, error} = await supabase
            .from('tasks')
            .upsert(tasks);

        router.refresh();
    }

    // node kit stuffs
    const {
        listeners,
        setNodeRef,
        transform,
    } = useSortable({
        id: task.id
    });
    
    const style = {
        transform: CSS.Transform.toString(transform),
        transition: (activeTask?.id === task.id ? '' : ', border-color 0.25s'),
    };

    return (
        <>
            <Box
                ref={setNodeRef}
                {...listeners}
                onClick={() => setOpen(true)}
                sx={{
                    display:'flex',
                    width:'100%',
                    pb:'.5rem', pt:'.2rem',pr:'1rem', boxSizing:'border-box', 
                    border:'1px solid', borderColor:'grey.300', borderRadius:3,
                    cursor:'pointer',
                    '&:hover': activeTask?.id === task.id || {
                        borderColor: 'info.main', // Change the border color on hover
                    },
                    mt:'1rem',
                    ...style,
                    '& *': { visibility: activeTask?.id === task.id && 'hidden' },
                    backgroundColor: activeTask?.id === task.id ? 'grey.300' : 'common.white'
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
                            color={isDone||!task.title ? 'textSecondary' : 'info' }
                            sx={{
                                textDecoration: isDone && 'line-through'
                            }}
                            >
                            {task.title||'(No title)'}
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
                        {/* due date */}
                        {task.due_date && (
                            <Typography 
                                noWrap 
                                color={dayjs(task.due_date).diff(dayjs()) >= 0 ? 'success' : 'error'} 
                                variant="body2" 
                                sx={{display:'flex', alignItems:'center', textDecoration: isDone && 'line-through'}}
                                >
                                <TodayRoundedIcon fontSize="inherit" sx={{mr:'.5rem'}} /> {dayjs(task.due_date).format('MM/DD/YYYY h:mma')}
                            </Typography>
                        )}
                        {/* team */}
                        {!teamId && task.teams && (
                            <Typography noWrap color='textSecondary' sx={{display:'flex', alignItems:'center', mt:'.5rem', textDecoration: isDone && 'line-through'}}>
                                <Icon fontSize="small" sx={{position:'relative', mr:'.5rem'}}>
                                    <Image src={'/icon.svg'} alt={'icon'} fill />
                                </Icon>
                                <Typography noWrap color="textPrimary" component={'span'}>
                                    {task.teams?.name}
                                </Typography>
                            </Typography>
                        )}
                        {/* person assigned */}
                        {task.assigned_id && (
                            <Typography noWrap color='textSecondary' sx={{display:'flex', alignItems:'center', mt:'.5rem', textDecoration: isDone && 'line-through'}}>
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
            <EditTaskSideview task={task} user={user} setOpen={setOpen} open={open} teamMembers={teamMembers} tasks={tasks} teams={teams} />
        </>
    );
}