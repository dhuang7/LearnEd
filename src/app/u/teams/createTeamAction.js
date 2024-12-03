'use server'

import createClient from "@/utils/supabase/server";


export async function createTeam(team) {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    const { data, error } = await supabase
        .from('teams')
        .insert([
            { owner: user.id, name: team.name },
        ])
        .select();

    console.log(data);


    return;
}