'use server'

import createClient from "@/utils/supabase/server";


export async function createTeam(team) {
    const supabase = await createClient();
    const { data, error } = await supabase.rpc('create_team', { team_name: team.name, member_ids: team.memberIds });
    if (error) {
        console.log(error);
    }

    return;
}