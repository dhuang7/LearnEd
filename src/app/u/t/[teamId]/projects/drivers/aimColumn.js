'use client'

import Box from "@mui/material/Box";

import GraphNode from "./graphNode";
import createClient from "@/utils/supabase/client";



export default function AimColumn({teamId, project}) {
    const supabase = createClient();

    async function handleSave(id, name, description, measure) {
        const insertData = {team_id: teamId};
        const valueList = [id, name, description, measure];
        // create data for the insert or update depending on what values exist
        ['id', 'aim_name', 'aim_description', 'aim_outcome_measure'].forEach((v, i) => {
            if (valueList[i]) {
                insertData[v] = valueList[i];
            }
        })
        // upsert data
        const {data: p, error} = await supabase
            .from('projects')
            .upsert(
                [
                    insertData,
                ],
                { onConflict: ['id'] }
            )
            .select();

    }
    
    


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
