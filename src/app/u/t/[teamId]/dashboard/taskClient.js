'use client'


import Kanban from "@/app/u/tasks/kanban";
import { useEffect, useState } from "react";



export default function TaskClient({tasks, teamMembers, user, teamId, teams}) {
    const [stateTasks, setStateTasks] = useState(tasks);

    useEffect(() => {
        setStateTasks(tasks);
    }, [tasks]);

    return (
        <Kanban hideDone tasks={stateTasks} setTasks={setStateTasks} teamMembers={teamMembers} user={user} teamId={teamId} filteredTasks={stateTasks} teams={teams} />
    );
}