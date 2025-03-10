'use client'

import Paper from "@mui/material/Paper";
import { LineChart } from "@mui/x-charts";
import dayjs from "dayjs";



export default function RunChartGraph({measure}) {
    const measureObjList = measure?.date_list.map((v, i) => ({
        date: dayjs(v).valueOf(),
        data: measure.data_list[i]
    })).sort((a, b) => a.date - b.date) || [];


    
    ///////////////// USE DATA SET. LOOK AT THE DATA SET IN MUI LINE GRAPH
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
                xAxis={[{ 
                    dataKey:'date',
                    tickMinStep:86400000,
                    valueFormatter: v => dayjs(v).format('M/D/YY')
                }]}
                series={[
                  {
                    dataKey:'data',
                    curve:'linear',
                    connectNulls: true,
                    // data: measure?.data_list || [],
                  },
                ]}
                dataset={measureObjList}
                grid={{ vertical: true, horizontal: true }}
                />
        </Paper>
    )
}

