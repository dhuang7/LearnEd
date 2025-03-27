'use client'

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import ExpandMoreRoundedIcon from '@mui/icons-material/ExpandMoreRounded';
import Menu from "@mui/material/Menu";



import { usePathname, useRouter } from "next/navigation";
import NextLink from 'next/link';
import { useEffect, useState } from "react";
import AddProjectModal from "./addProjectModal";
import { useTeamContext } from "@/app/u/layout";
import EditProjectModal from "./editProjectModal";


export default function ClientPage({children, aimId, projects, teamId}) {
    const [_,__, aimInfo, setAimInfo] = useTeamContext();
    const pathname = usePathname();
    const router = useRouter();
    const pathIndex = {
        'drivers':0,
        'process':0,
        'run-chart':1,
        'measures':1,
        'change-ideas':2,
        'cycles':3,
    }
    const currentPath = pathname.split('/');
    const currentRelativePath = currentPath.filter(v => pathIndex[v] !== undefined)[0];
    // const currentRelativePath = currentPath[currentPath.length-1];

    const [project, setProject] = useState(projects.filter(v=>v.id===aimId)[0]);
    const [aimEl, setAimEl] = useState(null);
    const [measureEl, setMeasureEl] = useState(null);

    useEffect(() => {
        setAimInfo(aimId);
        setProject(projects.filter(v=>v.id===aimId)[0]);
    }, [projects]);

    function handleSelectProject({target}) {
        if (target.value === 'button') return true;
        setProject(target.value);
        router.push(`${currentPath.length === 7 ? '..' : '../..'}/${target.value.id}/${currentRelativePath}`);
    }

    function handleOpenAim(event) {
        if (!event.currentTarget) return;
        setAimEl(event.currentTarget);
    }

    function handleCloseAim(event) {
        setAimEl(null);
    }

    function handleOpenMeasure(event) {
        if (!event.currentTarget) return;
        setMeasureEl(event.currentTarget);
    }

    function handleCloseMeasure(event) {
        setMeasureEl(null);
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
                        {/* edit project */}
                        <EditProjectModal project={project} setAimInfo={setAimInfo} />
                        {/* select project */}
                        <Box sx={{width:'10rem', boxSizing:'border-box', pr:'.5rem'}}>
                            <TextField
                                select
                                value={project}
                                label='Projects'
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
                                <AddProjectModal teamId={teamId} component={(props) => <MenuItem disableGutters value={'button'} {...props}/>} />
                            </TextField>
                        </Box>
                        
                        {/* nav tabs */}
                        <Tabs 
                            value={pathIndex[currentRelativePath]||0} 
                            aria-label="basic tabs example"
                            >
                            <Tab 
                                label='Aim' 
                                onClick={handleOpenAim} 
                                icon={<ExpandMoreRoundedIcon fontSize="small" />} iconPosition="end" 
                                sx={{
                                    '&.MuiButtonBase-root': {
                                        minHeight:0,
                                    }
                                }}
                                />
                            <Tab 
                                label='Measure' 
                                onClick={handleOpenMeasure} 
                                icon={<ExpandMoreRoundedIcon fontSize="small" />} iconPosition="end" 
                                sx={{
                                    '&.MuiButtonBase-root': {
                                        minHeight:0,
                                    }
                                }}
                                />
                            <Tab label="Changes"  component={NextLink} href={currentPath.length === 7 ? 'change-ideas' : '../change-ideas'} />
                            <Tab label="Cycles"  component={NextLink} href={currentPath.length === 7 ? 'cycles' : '../cycles'} />
                        </Tabs>


                        {/* Menu items */}
                        {/* aim menu */}
                        <Menu
                            anchorEl={aimEl}
                            open={Boolean(aimEl)}
                            onClose={handleCloseAim}
                            >
                            <MenuItem 
                                onClick={handleCloseAim}
                                selected={currentRelativePath==='drivers'} 
                                component={NextLink} href={currentPath.length === 7 ? 'drivers' : '../drivers'}
                                >
                                Driver Diagram
                            </MenuItem>
                            <MenuItem 
                                onClick={handleCloseAim}
                                selected={currentRelativePath==='process'} 
                                component={NextLink} href={currentPath.length === 7 ? 'process' : '../process'}
                                >
                                Process Maps
                            </MenuItem>
                        </Menu>
                        {/* Measure menu */}
                        <Menu
                            anchorEl={measureEl}
                            open={Boolean(measureEl)}
                            onClose={handleCloseMeasure}
                            >
                            <MenuItem 
                                onClick={handleCloseMeasure}
                                selected={currentRelativePath==='measures'} 
                                component={NextLink} href={currentPath.length === 7 ? 'measures' : '../measures'}
                                >
                                Measures
                            </MenuItem>
                            <MenuItem 
                                onClick={handleCloseMeasure}
                                selected={currentRelativePath==='run-chart'} 
                                component={NextLink} href={currentPath.length === 7 ? 'run-chart' : '../run-chart'}
                                >
                                Run Chart
                            </MenuItem>
                        </Menu>


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
