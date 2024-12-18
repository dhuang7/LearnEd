'use client'

import Box from "@mui/material/Box";

import DriverNode from "./driverNode";
import GraphNode from "./graphNode";



export default function AimColumn({teamId, project}) {

    function handleSave() {
        
    }
    
    


    return (
        <Box sx={{width:'100%', display:'flex', flexDirection:'column', alignItems:'center'}}>
            <GraphNode name={project?.aim_name} description={project?.aim_description} onSave={()=>null}/>
        </Box>
    )
}
