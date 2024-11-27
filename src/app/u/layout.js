'use client'

import Box from "@mui/material/Box";

import TopNav from './topNav';
import SideNav from './sideNav';

export default function Navbars({children}) {

    

    return (
        <Box sx={{width:'100%', height:'100%', display:'flex', flexDirection:'column', overflow:'hidden'}}>
            {/* top navbar */}
            <Box sx={{width:'100%'}}>
                <TopNav />
            </Box>
            <Box flexGrow={1}>
                <Box sx={{width:'100%', height:'100%', display:'flex'}}>
                    {/* side drawer */}
                    <Box sx={{height:'100%'}}>
                        <SideNav />
                    </Box>
                    <Box flexGrow={1}>
                        {/* content */}
                        <Box sx={{width:'100%', height:'100%'}}>
                            {children}
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}
