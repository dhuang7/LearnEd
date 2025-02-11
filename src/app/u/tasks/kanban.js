'use client'

import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";


import Section from "./section";
import { useState } from "react";
import { closestCenter, DndContext, DragOverlay, PointerSensor, useSensor, useSensors } from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import createClient from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import TaskItem from "./taskItem";
import { snapCenterToCursor } from "@dnd-kit/modifiers";
import dayjs from "dayjs";

export default function Kanban({tasks, setTasks, teamMembers, user, teamId, filteredTasks, teams}) {
    const supabase = createClient();
    const router = useRouter();
    const [activeTask, setActiveTask] = useState(null);

    // drag sensors
    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                distance:2.5,
            }
        }),
    );

    // handlers
    function handleDragStart(event) {
        const {active} = event;
        
        setActiveTask(tasks.filter(v => v.id === active.id)[0]);
    }

    function handleDragOver(event) {
        const {active, over} = event;
        let newStatus;

        if (!over) return;

        // check if it is a droppable container
        if (over.id.includes('droppable-')) {
            newStatus = over.id.slice(10);
        } else {
            const overTask = tasks.filter(v => v.id === over.id)[0];
            newStatus = overTask.status;
        }

        // set tasks
        if (newStatus !== activeTask.status) {
            setTimeout(() => {
                setActiveTask(t => {
                    t.status = newStatus;
                    t.date_completed = newStatus === 'done' ? dayjs() : null;
                    return {...t};
                });
            }, 0);

            setTasks(t => {
                t.forEach(v => {
                    if (v.id === activeTask.id) {
                        v.status = newStatus;
                        t.date_completed = newStatus === 'done' ? dayjs() : null;
                    }
                })

                return [...t];
            })
        }
    }
    
    async function handleDragEnd(event) {
        let {active, over} = event;
        const newStatus = over.id.slice(10);

        if (over.id.includes('droppable-')) {
            over = active;
        }

        // create new order of the filter task
        const oldIndex = tasks.map(v => v.id).indexOf(active.id);
        const newIndex = tasks.map(v => v.id).indexOf(over.id);
        const newOrderTasks = arrayMove(tasks, oldIndex, newIndex);

        const statuses = {
            'to do': 0,
            'in progress': 0,
            'done': 0,
        }

        newOrderTasks.forEach((v, i) => {
            v.order_num = statuses[v.status];
            statuses[v.status]++;
        })

        const saveOld = tasks;

        // update on front end
        setTasks(newOrderTasks)

        setActiveTask(null);

        const newTasks = newOrderTasks.map(v => {
            const newObj = {...v};
            delete newObj.teams;
            return newObj
        })

        // update on backend
        const {data, error} = await supabase
            .from('tasks')
            .upsert(newTasks);


        // make sure front end is up to date
        if (error) setTasks(saveOld);
        router.refresh();
        
        
    }

    return (
        <Box sx={{width:'100%', height:'100%', display:'flex', boxSizing:'border-box', px:'1rem', pl:'.5rem'}}>
            <Paper 
                elevation={0} 
                sx={{
                    borderRadius:3, boxSizing:'border-box', border:'1px solid', borderColor: 'grey.300',
                    p:'1rem', px:'.5rem', width:'100%', height:'100%', overflow:'scroll',
                    display:'flex', flexDirection:'row', position:'relative', boxSizing:'border-box',
                }}
                >
                <DndContext
                    sensors={sensors}
                    collisionDetection={closestCenter}
                    onDragStart={handleDragStart}
                    onDragOver={handleDragOver}
                    onDragEnd={handleDragEnd}
                    >
                    {/* section */}
                    <Section 
                        user={user} teamMembers={teamMembers} sectionTitle={'To do'} 
                        tasks={tasks} activeTask={activeTask}
                        color={'chocolate'} teamId={teamId}
                        filteredTasks={filteredTasks} teams={teams}
                        />
                    <Section 
                        user={user} teamMembers={teamMembers} sectionTitle={'In progress'} 
                        tasks={tasks} activeTask={activeTask}
                        color={'royalblue'} teamId={teamId}
                        filteredTasks={filteredTasks} teams={teams}
                        />
                    {/* <Section 
                        user={user} teamMembers={teamMembers} sectionTitle={'Review'} 
                        tasks={tasks} activeTask={activeTask}
                        /> */}
                    <Section 
                        user={user} teamMembers={teamMembers} sectionTitle={'Done'} 
                        tasks={tasks} activeTask={activeTask}
                        color={'forestgreen'} teamId={teamId}
                        filteredTasks={filteredTasks} teams={teams}
                        />
                    {/* overlay to drag */}
                    <DragOverlay modifiers={[snapCenterToCursor]}>
                        <TaskItem task={activeTask} teamMembers={teamMembers} tasks={tasks}  />
                    </DragOverlay>
                </DndContext>
            </Paper>
        </Box>
        
    )
}




