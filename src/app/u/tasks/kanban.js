'use client'

import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";


import Section from "./section";
import { useEffect, useState } from "react";
import { closestCenter, DndContext, DragOverlay, KeyboardSensor, PointerSensor, useSensor, useSensors } from "@dnd-kit/core";
import { arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy } from "@dnd-kit/sortable";
import createClient from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import TaskItem from "./taskItem";

export default function Kanban({originalTasks, teamMembers, user}) {
    const supabase = createClient();
    const router = useRouter();
    const [activeTask, setActiveTask] = useState(null);
    const [tasks, setTasks] = useState(originalTasks);

    useEffect(() => {
        setTasks(originalTasks);
    }, [originalTasks]);

    // drag sensors
    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                distance:2.5,
            }
        }),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    // handlers
    function handleDragStart(event) {
        const {active} = event;
        
        setActiveTask(tasks.filter(v => v.id === active.id)[0]);
    }

    function handleDragOver(event) {
        const {active, over} = event;
        const newStatus = over.id.slice(10);

        if (over.id.includes('droppable-')) {
            setActiveTask(t => {
                t.status = newStatus;
                return {...t};
            });

            setTasks(t => {
                t.forEach(v => {
                    if (v.id === activeTask.id) {
                        v.status = newStatus;
                    }
                })

                return [...t];
            })
        } else if (active.id !== over.id) {
            
            const overTask = tasks.filter(v => v.id === over.id)[0];
            
            if (overTask.status !== activeTask.status) {
                setActiveTask(t => {
                    t.status = overTask.status;
                    return {...t};
                });

                setTasks(t => {
                    t.forEach(v => {
                        if (v.id === activeTask.id) {
                            v.status = overTask.status;
                        }
                    })

                    return [...t];
                })
            }
        }
    }
    
    async function handleDragEnd(event) {
        const {active, over} = event;
        const newStatus = over.id.slice(10);

        console.log(over.id)

        if (over.id.includes('droppable-')) {
            const {data, error} = await supabase
                .from('tasks')
                .update({
                    order_num: 0,
                    status: newStatus,
                })
                .eq('id', activeTask.id);

            router.refresh();

            console.log(error);

        } else {
            // filter tasks
            const filteredTasks = tasks.filter(v => activeTask.status === v.status);

            // create new order of the filter task
            const oldIndex = filteredTasks.map(v => v.id).indexOf(active.id);
            const newIndex = filteredTasks.map(v => v.id).indexOf(over.id);
            const newOrderTasks = arrayMove(filteredTasks, oldIndex, newIndex);

            // change the order_num
            newOrderTasks.forEach((v, i) => {
                v.order_num = i;
            })

            const saveOld = tasks;

            

            // update on backend
            const {data, error} = await supabase
                .from('tasks')
                .upsert(newOrderTasks);

            // update on front end
            setTasks(t => {
                const unchangedTasks = t.filter(v => activeTask.status !== v.status);
                return [...unchangedTasks, ...newOrderTasks];
            });

            // make sure front end is up to date
            if (error) setTasks(saveOld);
            router.refresh();
        }
        
        setActiveTask(null);
    }

    return (
        <Box sx={{width:'100%', height:'100%', display:'flex', boxSizing:'border-box', px:'1rem'}}>
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
                        />
                    <Section 
                        user={user} teamMembers={teamMembers} sectionTitle={'In progress'} 
                        tasks={tasks} activeTask={activeTask}
                        />
                    <Section 
                        user={user} teamMembers={teamMembers} sectionTitle={'Review'} 
                        tasks={tasks} activeTask={activeTask}
                        />
                    <Section 
                        user={user} teamMembers={teamMembers} sectionTitle={'Done'} 
                        tasks={tasks} activeTask={activeTask}
                        />
                    {/* overlay to drag */}
                    <DragOverlay>
                        <TaskItem task={activeTask} teamMembers={teamMembers} tasks={tasks}  />
                    </DragOverlay>
                </DndContext>
            </Paper>
        </Box>
        
    )
}




