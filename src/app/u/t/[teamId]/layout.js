'use client'

import { useRouter } from 'next/navigation';

import {useTeamContext} from '@/app/u/layout.js';
import createClient from "@/utils/supabase/client";
import { useEffect } from 'react';

export default function LayoutRedirect({params, children}) {
    // checks if valid team url, otherwise, route back to teams
    const [teamInfo, setTeamInfo] = useTeamContext();
    const supabase = createClient();
    const router = useRouter();

    useEffect(() => {
        async function getTeamId() {
            // get team info if team exists
            const teamId = (await params).teamId;
            const {data: teams, error} = await supabase
                .from('teams')
                .select()
                .eq('id', teamId);
            
            if (!teams) {
                router.push('/u/teams');
                return;
            }
            setTeamInfo(teams[0]);
        }

        getTeamId();

    }, [])

    return children;
}
