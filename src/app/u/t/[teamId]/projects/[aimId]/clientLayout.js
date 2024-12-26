'use client'

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";




import { usePathname, useRouter } from "next/navigation";
import NextLink from 'next/link';
import { useState } from "react";
import AddProjectModal from "./addProjectModal";


export default function ClientPage({children, aimId, projects}) {
    const pathname = usePathname();
    const router = useRouter();
    const pathIndex = {
        'drivers':0,
        'cycles':1,
    }
    const currentPath = pathname.split('/');
    const currentRelativePath = currentPath[currentPath.length-1];

    const [project, setProject] = useState(projects.filter(v=>v.id===aimId)[0]);

    function handleSelectProject({target}) {
        if (target.value === 'button') {
            setProject(p=>({...p}));
            return;
        }
        setProject(target.value);
        router.push(`${target.value.id}/${currentRelativePath}`);
    }
    

    return (
        <Box sx={{width:'100%', height:'100%', display:'flex', flexDirection:'column'}}>
            {/* header */}
            <Box sx={{width:'100%', p:'1rem', pb:0, boxSizing:'border-box'}}>
                <Box sx={{width:'100%', display:'flex', alignItems:'center', boxSizing:'border-box', pr:'1rem'}}>
                    {/* title */}
                    <Typography variant='h4'>Projects</Typography>
                    {/* tabs and select */}
                    <Box sx={{ml:'auto', display:'flex', alignItems:'center'}}>
                        {/* select project */}
                        <Box sx={{width:'7.5rem', boxSizing:'border-box', pr:'.5rem'}}>
                            <TextField
                                select
                                value={project}
                                onChange={handleSelectProject}
                                fullWidth
                                slotProps={{
                                    select: {
                                        renderValue:(v) => v.name,
                                    },
                                    htmlInput: {
                                        sx: {
                                            py:'.5rem'
                                        }
                                    },
                                    inputLabel: {
                                        shrink: true,
                                    }
                                }}
                                
                                >
                                {/* projects */}
                                {projects.map((project, i) => (
                                    <MenuItem key={i} value={project}>
                                        {project.name}
                                    </MenuItem>
                                ))}
                                {/* Add new project */}
                                <AddProjectModal value='button' />
                            </TextField>
                        </Box>
                        {/* nav tabs */}
                        <Tabs 
                            value={pathIndex[currentRelativePath]} 
                            aria-label="basic tabs example"
                            >
                            <Tab label="Drivers" component={NextLink} href='drivers' />
                            <Tab label="Cycles"  component={NextLink} href='cycles' />
                        </Tabs>
                    </Box>
                </Box>
            </Box>
            {/* Content */}
            <Box sx={{width:'100%',  flexGrow:1, overflow:'hidden'}}>
                <Box sx={{width:'100%', height:'100%', boxSizing:'border-box', p:'1rem', pt:0}}>
                    {children}
                </Box>
            </Box>
        </Box>
    )
}
