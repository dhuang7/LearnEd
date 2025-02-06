'use client'

import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";


import Section from "./section";
import { useState } from "react";
import { closestCenter, DndContext, KeyboardSensor, PointerSensor, useSensor, useSensors } from "@dnd-kit/core";
import { SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy } from "@dnd-kit/sortable";

export default function Kanban({tasks, teamMembers, user}) {
    const [activeId, setActiveId] = useState(null);

    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    function handleDragStart(event) {
        const {active} = event;
        
        setActiveId(active.id);
    }
    
    function handleDragEnd(event) {
        const {active, over} = event;
        
        if (active.id !== over.id) {
            setItems((items) => {
                const oldIndex = items.indexOf(active.id);
                const newIndex = items.indexOf(over.id);
                
                return arrayMove(items, oldIndex, newIndex);
            });
        }
        
        setActiveId(null);
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
                    onDragEnd={handleDragEnd}
                    >
                    {/* section */}
                    <SortableContext
                        items={tasks.filter(v => v.status === 'to do')}
                        strategy={verticalListSortingStrategy}
                        >
                        <Section 
                            user={user} teamMembers={teamMembers} sectionTitle={'To do'} 
                            tasks={tasks.filter(v => v.status === 'to do')} 
                            />
                    </SortableContext>
                    <Section 
                        user={user} teamMembers={teamMembers} sectionTitle={'In progress'} 
                        tasks={tasks.filter(v => v.status === 'in progress')} 
                        />
                    <Section 
                        user={user} teamMembers={teamMembers} sectionTitle={'Review'} 
                        tasks={tasks.filter(v => v.status === 'review')} 
                        />
                    <Section 
                        user={user} teamMembers={teamMembers} sectionTitle={'Done'} 
                        tasks={tasks.filter(v => v.status === 'done')} 
                        />
                </DndContext>
            </Paper>
        </Box>
        
    )
}




