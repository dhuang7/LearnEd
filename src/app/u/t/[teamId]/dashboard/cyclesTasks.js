'use client'

import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";


import { PieChart, pieArcLabelClasses } from '@mui/x-charts/PieChart';
import theme from "@/app/theme";




export default function CyclesTasks({cycles}) {
    const color = {
        'plan': 'Chocolate',
        'do': 'RoyalBlue',
        'study': 'ForestGreen',
        'act': 'Crimson'
    }

    let completedCount;

    const data = cycles.filter(v => {
        if (v.stage !== 'completed') return true;
        completedCount = v.count;
        return false;
    }).map((v,i) => ({
        id: i,
        value: v.count,
        label: capitalizeFirstLetter(v.stage),
        color: color[v.stage],
    }));

    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
    

    return (
        <Paper 
            elevation={0} 
            sx={{
                borderRadius:3, boxSizing:'border-box', border:'1px solid', borderColor: 'grey.300',
                p:'1rem', height:'100%', 
                display:'flex', flexDirection:'column'
            }}
            >
            {/* Title section */}
            <Box sx={{display:'flex', alignItems:'center'}}>
                {/* title */}
                <Typography variant="h6">Cycles:</Typography>
            </Box>
            {/* pie chart */}
            <Box sx={{flexGrow:1, overflow:'hidden'}}>
                <Box sx={{height:'100%'}}>
                <PieChart
                    series={[
                        {
                            innerRadius: '60%',
                            cornerRadius:5,
                            paddingAngle:5,
                            arcLabel:'value',
                            highlightScope: { fade: 'global', highlight: 'item' },
                            data: data,
                        },
                    ]}
                    margin={{ top: 0, bottom: 75, left: 0, right: 0 }}
                    slotProps={{
                        legend: {
                            direction: 'row',
                            position: { vertical: 'bottom', horizontal: 'middle' },
                        },
                    }}
                    sx={{
                        [`& .${pieArcLabelClasses.root}`]: {
                            fill: 'white',
                        },
                    }}
                    >
                    {/* center label */}
                    <text
                        x={'50%'}
                        y={'32.5%'}
                        style={{
                            textAnchor: 'middle',
                            dominantBaseline: 'central',
                            dominantBaseline:"middle"
                        }}
                        >
                        <tspan x="50%" dy="0" fontSize={theme.typography.h4.fontSize}>{completedCount}</tspan>
                        <tspan x="50%" dy="1.75rem" style={{fill: theme.palette.text.secondary}}>Completed</tspan>
                    </text>
                </PieChart>
                </Box>
            </Box>
        </Paper>
    );
}