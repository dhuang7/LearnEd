'use client'

import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import AddRoundedIcon from '@mui/icons-material/AddRounded';

import TaskItem from "./taskItem";




export default function Section({sectionTitle, tasks}) {
    return (
        <Box sx={{boxSizing:'border-box', px:'.5rem', width:'25%', height:'100%', display:'flex', flexDirection:'column',}}>
            {/* section title */}
            <Typography variant="h6" align="center" sx={{fontWeight:'bold'}}>{sectionTitle}</Typography>
            {/* tasks container */}
            <Box sx={{flexGrow:1, overflow:'hidden', width:'100%'}}>
                <Box sx={{width:'100%', height:'100%', display:'flex', flexDirection:'column'}}>
                    {/* tasks */}
                    <Box sx={{width:'100%', overflow:'hidden'}}>
                        <Box sx={{width:'100%', height:'100%', overflow:'scroll'}}>
                            {/* first task */}
                            {tasks.map((v, i) => (
                                <TaskItem key={i} task={v} />
                            ))}
                        </Box>
                    </Box>
                    {/* add button */}
                    <Button sx={{mt:'.5rem', borderRadius:3, textTransform:'none'}} startIcon={<AddRoundedIcon />}>
                        Add task
                    </Button>
                </Box>
            </Box>
        </Box>
    );
}