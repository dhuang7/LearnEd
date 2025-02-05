'use client'

import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import Checkbox from '@mui/material/Checkbox';
import RadioButtonUncheckedRoundedIcon from '@mui/icons-material/RadioButtonUncheckedRounded';
import RadioButtonCheckedRoundedIcon from '@mui/icons-material/RadioButtonCheckedRounded';

export default function TaskItem({task}) {
    return (
        <Box
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
            <Box sx={{boxSizing:'border-box'}}>
                <Checkbox size="small" icon={<RadioButtonUncheckedRoundedIcon />} checkedIcon={<RadioButtonCheckedRoundedIcon />} />
            </Box>
            <Box sx={{pt:'.15rem', boxSizing:'border-box'}}>
                <Typography variant="h6" noWrap>{task.title}</Typography>
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
                    }}
                    >
                    {task.description}
                </Typography>
                {task.assigned && (
                    <Typography noWrap color='textSecondary' sx={{display:'flex', alignItems:'center', mt:'.5rem'}}>
                        <AccountCircleRoundedIcon color="info" sx={{mx:'.5rem'}} />
                        <Typography noWrap color="textPrimary" component={'span'}>{task.assigned}</Typography>
                    </Typography>
                )}
            </Box>
        </Box>
    );
}