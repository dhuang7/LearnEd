'use client'

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

    


    return (
        <>
            <DriverNode name={team?.aim_name} description={team?.aim_description} onSave={()=>null}/>
            <DriverNode name={team?.aim_name} description={team?.aim_description} onSave={()=>null}/>
        </>
    )
}
