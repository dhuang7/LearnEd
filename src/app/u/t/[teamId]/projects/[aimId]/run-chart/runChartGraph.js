'use client'

import Paper from "@mui/material/Paper";
import { LineChart } from "@mui/x-charts";



export default function RunChartGraph() {
    

    return (
        <Paper 
            elevation={0} 
            sx={{
                borderRadius:3, boxSizing:'border-box', border:'1px solid', borderColor: 'grey.300',
                height:'100%', width:'100%', overflow:'hidden',
                display:'flex', flexDirection:'column', position:'relative'
            }}
            >
            <LineChart 
                xAxis={[{ data: [1, 2, 3, 5, 8, 10] }]}
                series={[
                  {
                    // curve:'linear',
                    data: [2, 5.5, 2, 8.5, 1.5, 5],
                  },
                ]}
                grid={{ vertical: true, horizontal: true }}
                />
        </Paper>
    )
}

