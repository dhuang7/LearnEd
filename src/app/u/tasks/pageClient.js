'use client'

import Box from "@mui/material/Box";

import Kanban from "./kanban";
import TaskData from "./taskData";
import TaskFilters from "./taskFilters";
import { useEffect, useState } from "react";



export default function PageClient({tasks, teamMembers, user, teamId, teams}) {
    const [filteredTasks, setFilteredTasks] = useState(tasks);
    const [stateTasks, setStateTasks] = useState(tasks);

    useEffect(() => {
        setStateTasks(tasks);
    }, [tasks]);

    return (
        <>
            {/* side dash */}
            <Box sx={{width:'17.5rem', minWidth:'17.5rem', height:'100%', pt:'.5rem', pb:'1rem', pl:'1rem', pr:'.5rem', boxSizing:'border-box', display:'flex', flexDirection:'column'}}>
                <Box sx={{aspectRatio:1, width:'100%', mb:'1rem'}}>
                    <TaskData tasks={tasks} />
                </Box>
                <Box sx={{flexGrow:1, overflow:'hidden'}}>
                    <Box sx={{width:'100%', height:'100%'}}>
                        <TaskFilters tasks={stateTasks} setFilteredTasks={setFilteredTasks} teamMembers={teamMembers} teams={teams} teamId={teamId} />
                    </Box>
                </Box>
            </Box>
            {/* Main calendar */}
            <Box sx={{flexGrow:1, height:'100%', overflow:'hidden'}}>
                <Box sx={{width:'100%', height:'100%', pt:'.5rem', boxSizing:'border-box', pb:'1rem'}}>
                    <Kanban tasks={stateTasks} setTasks={setStateTasks} teamMembers={teamMembers} user={user} teamId={teamId} filteredTasks={filteredTasks} teams={teams} />
                </Box>
            </Box>
        </>
    );
}