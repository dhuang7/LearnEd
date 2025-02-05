'use client'

import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";

export default function Kanban() {
    
    // const backgroundColor = {
    //     'Aim': 'Chocolate',
    //     'Primary Driver': 'RoyalBlue',
    //     'Secondary Driver': 'ForestGreen',
    //     'Change Idea': 'Crimson'
    // }

    return (
        <Box sx={{width:'100%', height:'100%', display:'flex', boxSizing:'border-box', px:'.5rem'}}>
            <Box sx={{width:'25%', height:'100%', boxSizing:'border-box', px:'.5rem'}}>
                <Paper 
                    elevation={0} 
                    sx={{
                        borderRadius:3, boxSizing:'border-box', //border:'1px solid', borderColor: 'grey.300',
                        p:'1rem', py:'.5rem', width:'100%', overflow:'scroll',
                        display:'flex', flexDirection:'column', position:'relative', 
                        backgroundColor:'chocolate', color:'common.white',
                    }}
                    >
                    To do
                </Paper>
            </Box>
            <Box sx={{width:'25%', height:'100%', boxSizing:'border-box', px:'.5rem'}}>
                <Paper 
                    elevation={0} 
                    sx={{
                        borderRadius:3, boxSizing:'border-box', //border:'1px solid', borderColor: 'grey.300',
                        p:'1rem', py:'.5rem', width:'100%', overflow:'scroll',
                        display:'flex', flexDirection:'column', position:'relative',
                        backgroundColor:'royalblue', color:'common.white',
                    }}
                    >
                    In progress
                </Paper>
            </Box>
            <Box sx={{width:'25%', height:'100%', boxSizing:'border-box', px:'.5rem'}}>
                <Paper 
                    elevation={0} 
                    sx={{
                        borderRadius:3, boxSizing:'border-box', //border:'1px solid', borderColor: 'grey.300',
                        p:'1rem', py:'.5rem', width:'100%', overflow:'scroll',
                        display:'flex', flexDirection:'column', position:'relative',
                        backgroundColor:'forestgreen', color:'common.white',
                    }}
                    >
                    Review
                </Paper>
            </Box>
            <Box sx={{width:'25%', height:'100%', boxSizing:'border-box', px:'.5rem'}}>
                <Paper 
                    elevation={0} 
                    sx={{
                        borderRadius:3, boxSizing:'border-box', //border:'1px solid', borderColor: 'grey.300',
                        p:'1rem', py:'.5rem', width:'100%', overflow:'scroll',
                        display:'flex', flexDirection:'column', position:'relative',
                        backgroundColor:'crimson', color:'common.white',
                    }}
                    >
                    Done
                </Paper>
            </Box>
        </Box>
        
    )
}




