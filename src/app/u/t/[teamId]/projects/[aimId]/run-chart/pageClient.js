'use client'

import Box from "@mui/material/Box";
import RunChartDash from "./runChartDash";
import RunChartGraph from "./runChartGraph";




export default function PageClient({aimId, measureTypes}) {
    

    return (
        <>
            {/* norms */}
            <Box sx={{width:'100%',  height:'100%', overflow:'hidden'}}>
                <Box sx={{width:'100%', height:'100%', display:'flex'}}>
                    {/* side dash */}
                    <Box sx={{width:'16.5rem', height:'100%', pr:'.5rem', boxSizing:'border-box'}}>
                        {/* side */}
                        <RunChartDash aimId={aimId} measureTypes={measureTypes} />
                    </Box>
                    {/* Main graph */}
                    <Box sx={{flexGrow:1, height:'100%', overflow:'hidden'}}>
                        <Box sx={{width:'100%', height:'100%', pl:'.5rem', boxSizing:'border-box'}}>
                            <RunChartGraph />
                        </Box>
                    </Box>
                </Box>
            </Box>
        </>
    )
}

