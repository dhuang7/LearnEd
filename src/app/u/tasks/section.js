'use client'

import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import AddRoundedIcon from '@mui/icons-material/AddRounded';

import TaskItem from "./taskItem";
import AddTaskSideview from "./addTaskSideview";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { useDroppable } from "@dnd-kit/core";




export default function Section({sectionTitle, tasks, teamMembers, user, activeTask, color, teamId, filteredTasks, teams}) {
    const sectionTasks = filteredTasks.filter(v => v.status === sectionTitle.toLowerCase());
    const {setNodeRef} = useDroppable({id:'droppable-' + sectionTitle.toLowerCase()})

    return (
        <Box 
            ref={Boolean(sectionTasks.length) ? null : setNodeRef} 
            sx={{width:'33.33%', height:'100%'}}
            >
            <SortableContext
                items={sectionTasks}
                strategy={verticalListSortingStrategy}
                >
                <Box 
                    sx={{boxSizing:'border-box', px:'.5rem', width:'100%', height:'100%', display:'flex', flexDirection:'column'}}
                    >
                    {/* section title */}
                    <Typography variant="h6" align="center" sx={{fontWeight:'bold', color:color}}>{sectionTitle}</Typography>
                    {/* section container */}
                    <Box sx={{flexGrow:1, overflow:'hidden', width:'100%'}}>
                        <Box sx={{width:'100%', height:'100%', display:'flex', flexDirection:'column'}}>
                            {/* tasks container */}
                            <Box sx={{width:'100%', maxHeight:'100%', overflow:'hidden'}}>
                                <Box sx={{width:'100%', maxHeight:'100%', overflow:'scroll'}}>
                                    {/* tasks */}
                                    {sectionTasks.map((v, i) => (
                                        <TaskItem key={i} task={v} teamMembers={teamMembers} user={user} tasks={tasks} activeTask={activeTask} teamId={teamId} teams={teams} />
                                    ))}
                                </Box>
                            </Box>
                            {/* add button */}
                            <AddTaskSideview 
                                user={user}
                                teamMembers={teamMembers}
                                tasks={tasks.filter(v => v.status === sectionTitle.toLowerCase())}
                                sectionStatus={sectionTitle.toLowerCase()}
                                teams={teams}
                                customButton={(props) => (
                                    <Button {...props} color="info" sx={{mt:'.5rem', borderRadius:3, textTransform:'none'}} startIcon={<AddRoundedIcon />}>
                                        Add task
                                    </Button>
                                )}
                                teamId={teamId}
                                />
                        </Box>
                    </Box>
                </Box>
            </SortableContext>
        </Box>
    );
}