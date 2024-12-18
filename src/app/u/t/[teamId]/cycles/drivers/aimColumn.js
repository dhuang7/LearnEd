'use client'

import Box from "@mui/material/Box";

import createClient from "@/utils/supabase/client";
import DriverNode from "./driverNode";
import { useEffect, useState } from "react";



export default function AimColumn({teamId}) {
    const supabase = createClient();
    const [team, setTeam] = useState();

    useEffect(() => {
        async function getTeam() {
            const {data: teams, error} = await supabase
                .from('teams')
                .select()
                .eq('id', teamId);

            setTeam(teams[0]);
        }

        getTeam();
    }, [])

    function handleSave() {
        
    }
    
    


    return (
        <Box sx={{width:'100%', display:'flex', flexDirection:'column', alignItems:'center'}}>
            <DriverNode name={team?.aim_name} description={team?.aim_description} onSave={()=>null}/>
        </Box>
    )
}
