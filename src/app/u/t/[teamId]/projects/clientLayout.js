'use client'

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

import { usePathname } from "next/navigation";
import NextLink from 'next/link';


export default function ClientPage({children}) {
    const pathname = usePathname();
    const pathIndex = {
        'cycles':0,
        'drivers':0,
        'cycle-list':1,
    }
    const currentPath = pathname.split('/');
    

    return (
        <Box sx={{width:'100%', height:'100%', display:'flex', flexDirection:'column'}}>
            {/* header */}
            <Box sx={{width:'100%', p:'1rem', pb:0, boxSizing:'border-box'}}>
                <Box sx={{width:'100%', display:'flex', justifyContent:'space-between', alignItems:'center', boxSizing:'border-box', pr:'1rem'}}>
                    {/* title */}
                    <Typography variant='h4'>Projects</Typography>
                    {/* tabs */}
                    <Tabs 
                        value={pathIndex[currentPath[currentPath.length-1]]} 
                        aria-label="basic tabs example"
                        >
                        <Tab label="Drivers" component={NextLink} href='drivers' />
                        <Tab label="Cycles"  component={NextLink} href='cycle-list' />
                    </Tabs>
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
