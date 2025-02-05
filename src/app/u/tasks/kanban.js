'use client'

import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";


import Section from "./section";

export default function Kanban({tasks}) {

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
                {/* section */}
                <Section sectionTitle={'To do'} tasks={tasks.filter(v => v.status === 'to_do')} />
                <Section sectionTitle={'In progress'} tasks={tasks.filter(v => v.status === 'in_progress')} />
                <Section sectionTitle={'Review'} tasks={tasks.filter(v => v.status === 'review')} />
                <Section sectionTitle={'Done'} tasks={tasks.filter(v => v.status === 'done')} />
            </Paper>
        </Box>
        
    )
}




