'use client'

import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import AddRoundedIcon from '@mui/icons-material/AddRounded';

import TaskItem from "./taskItem";
import AddTaskSideview from "./addTaskSideview";




export default function Section({sectionTitle, tasks, teamMembers, user}) {
    return (
        <Box sx={{boxSizing:'border-box', px:'.5rem', width:'25%', height:'100%', display:'flex', flexDirection:'column',}}>
            {/* section title */}
            <Typography variant="h6" align="center" sx={{fontWeight:'bold'}}>{sectionTitle}</Typography>
            {/* section container */}
            <Box sx={{flexGrow:1, overflow:'hidden', width:'100%'}}>
                <Box sx={{width:'100%', height:'100%', display:'flex', flexDirection:'column'}}>
                    {/* tasks container */}
                    <Box sx={{width:'100%', overflow:'hidden'}}>
                        <Box sx={{width:'100%', height:'100%', overflow:'scroll'}}>
                            {/* tasks */}
                            {tasks.map((v, i) => (
                                <TaskItem key={i} task={v} teamMembers={teamMembers} user={user} />
                            ))}
                        </Box>
                    </Box>
                    {/* add button */}
                    <AddTaskSideview 
                        user={user}
                        teamMembers={teamMembers}
                        tasks={tasks}
                        sectionStatus={sectionTitle.toLowerCase()}
                        customButton={(props) => (
                            <Button {...props} color="info" sx={{mt:'.5rem', borderRadius:3, textTransform:'none'}} startIcon={<AddRoundedIcon />}>
                                Add task
                            </Button>
                        )}
                        />
                </Box>
            </Box>
        </Box>
    );
}