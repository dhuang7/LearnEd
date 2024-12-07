'use client'

import createClient from "@/utils/supabase/client";
import Box from "@mui/material/Box";

import { useState, useEffect } from 'react';


export default function Team({params}) {
    const [team, setTeam] = useState();
    const supabase = createClient();


    useEffect(() => {
        async function getTeamId() {
            const teamId = (await params).teamId;
            const {data: teams, error} = await supabase
                .from('teams')
                .select()
                .eq('id', teamId);

            setTeam(teams[0]);
            // setTeamInfo(teams[0]);
        }

        getTeamId();
    }, []);

    return (
        <Box>
            Team {JSON.stringify(team)}
        </Box>
    )
}
