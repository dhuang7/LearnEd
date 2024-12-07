'use server'

import createClient from "@/utils/supabase/server";


export async function createTeam(team) {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    // create team
    const responseTeam = await supabase
        .from('teams')
        .insert([
            { name: team.name },
        ])
        .select();
        
    if (responseTeam.error) {
        console.log(responseTeam.error);
        return;
    }

    const newTeam = responseTeam.data[0];

    // create team_memberships
    const insertData = team.memberIds.map(member => ({
        team_id: newTeam.id,
        user_id: member,
        role: 'member',
    }));
    const responseTeamMembership = await supabase
        .from('team_memberships')
        .insert([
            {team_id: newTeam.id, user_id: user.id, role: 'owner'},
            ...insertData,
        ])
        // .select();

    if (responseTeamMembership.error) {
        console.log(responseTeamMembership.error);
        return;
    }

    return;
}