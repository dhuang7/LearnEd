'use client'

import Box from "@mui/material/Box";
import RunChartDash from "./runChartDash";
import RunChartGraph from "./runChartGraph";
import { useState } from "react";




export default function PageClient({aimId, measureTypes}) {
    const [category, setCategory] = useState('projects');
    const [process, setProcess] = useState('');
    const [measure, setMeasure] = useState(measureTypes[0].id);

    const measureTables = {
        'projects': 'aim_measures',
        'primary_drivers': 'primary_driver_measures',
        'secondary_drivers': 'secondary_driver_measures',
        'change_ideas': 'change_idea_measures',
        'pdsa_cycles': 'cycle_measures',
    }

    return (
        <>
            {/* norms */}
            <Box sx={{width:'100%',  height:'100%', overflow:'hidden'}}>
                <Box sx={{width:'100%', height:'100%', display:'flex'}}>
                    {/* side dash */}
                    <Box sx={{width:'16.5rem', height:'100%', pr:'.5rem', boxSizing:'border-box'}}>
                        {/* side */}
                        <RunChartDash 
                            aimId={aimId} measureTypes={measureTypes} 
                            category={category} process={process} measure={measure}
                            setCategory={setCategory} setProcess={setProcess} setMeasure={setMeasure} 
                            />
                    </Box>
                    {/* Main graph */}
                    <Box sx={{flexGrow:1, height:'100%', overflow:'hidden'}}>
                        <Box sx={{width:'100%', height:'100%', pl:'.5rem', boxSizing:'border-box'}}>
                            <RunChartGraph category={category} process={process} measure={measure} categoryMeasure={measureTables[category]} />
                        </Box>
                    </Box>
                </Box>
            </Box>
        </>
    )
}

