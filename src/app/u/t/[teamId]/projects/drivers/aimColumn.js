'use client'

import Box from "@mui/material/Box";

import GraphNode from "./graphNode";



export default function AimColumn({teamId, project}) {
    
    
    


    return (
        <Box sx={{width:'100%', display:'flex', flexDirection:'column', alignItems:'center'}}>
            <GraphNode 
                id={project?.id}
                name={project?.aim_name} 
                description={project?.aim_description} 
                measure={project?.aim_outcome_measure} 
                measureType={'Outcome'}
                table={'projects'}
                teamId={teamId}
                columns={['id', 'aim_name', 'aim_description', 'aim_outcome_measure']}
                disableDelete={true}
                />
        </Box>
    )
}
