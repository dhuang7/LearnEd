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
        'drivers':0,
        'cycles':1,
    }
    const currentPath = pathname.split('/');
    const currentRelativePath = currentPath[currentPath.length-1];

    return (
        <Box sx={{width:'100%', height:'100%', display:'flex', flexDirection:'column'}}>
            {/* header */}
            <Box sx={{width:'100%', p:'1rem', pb:0, boxSizing:'border-box'}}>
                <Box sx={{width:'100%', display:'flex', alignItems:'center', boxSizing:'border-box', pr:'1rem'}}>
                    {/* title */}
                    <Typography variant='h4'>Projects</Typography>
                    {/* tabs */}
                    <Box sx={{ml:'auto'}}>
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
