'use client'

import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";

import {
    closestCenter,
    DndContext, 
    DragOverlay,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors,
} from '@dnd-kit/core';
import {
    arrayMove,
    SortableContext,
    sortableKeyboardCoordinates,
    verticalListSortingStrategy,
    useSortable,
} from '@dnd-kit/sortable';
import {CSS} from '@dnd-kit/utilities';
import { useState, forwardRef } from "react";



export default function Kanban() {
    const [activeId, setActiveId] = useState(null);
    const [items, setItems] = useState(['batman', 'joker', 'superman', 'hellokeitty', 'cool', 'bat1man', 'jok1er', 'sup1erman', 'hellok1eitty', 'co1ol', 'batm3an', 'joker3', 'superma3n', 'hello3keitty', 'coo3l']);
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
        <Paper 
            elevation={0} 
            sx={{
                borderRadius:3, boxSizing:'border-box', border:'1px solid', borderColor: 'grey.300',
                p:'1rem', height:'100%', width:'100%', overflow:'scroll',
                display:'flex', flexDirection:'column', position:'relative'
            }}
            >
            <DndContext 
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragStart={handleDragStart}
                onDragEnd={handleDragEnd}
                >
                <SortableContext 
                    items={items}
                    strategy={verticalListSortingStrategy}
                    >
                    {items.map(id => <SortableItem activeId={activeId} key={id} id={id}>{id}</SortableItem>)}
                </SortableContext>
                <DragOverlay>
                    {activeId ? <Item id={activeId}>{activeId}</Item> : null}
                </DragOverlay>
            </DndContext>
        </Paper>
    )
}





export function SortableItem(props) {
    const {
        listeners,
        setNodeRef,
        transform,
        transition,
    } = useSortable({id: props.id});
    
    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    return (
        <Item ref={setNodeRef} style={style} sx={{backgroundColor:props.activeId === props.id && 'grey.300'}} {...listeners}>
            {props.activeId === props.id || props.children}
        </Item>
    );
}


export const Item = forwardRef(({id, ...props}, ref) => {
    return (
        <Box 
            {...props} 
            ref={ref} 
            sx={{
                my:'1rem', 
                boxShadow:3, border:'1px solid', borderColor:'grey.300', borderRadius:3,
                width:'100%', height:'5rem', minHeight:'5rem', 
                backgroundColor:'common.white',
                ...props.sx,
            }}
            >
            {props.children}
        </Box>
    )
});