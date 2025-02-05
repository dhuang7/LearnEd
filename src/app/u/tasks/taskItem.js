'use client'

import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";


export default function TaskItem({task}) {
    return (
        <Box
            sx={{
                width:'100%',
                p:'.5rem', px:'1rem', boxSizing:'border-box', 
                border:'1px solid', borderColor:'grey.300', borderRadius:3,
                my:'.5rem'
            }}
            >
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
        </Box>
    );
}