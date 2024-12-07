'use server'

import createClient from "@/utils/supabase/server";


export async function createTeam(team) {
    const supabase = await createClient();
    const { data, error } = await supabase.rpc('create_team', { team_name: team.name, member_ids: team.memberIds });
    console.log(data);
    console.log(error);
    // const { data: { user } } = await supabase.auth.getUser();
    // const {data: profiles , error} = await supabase.from('profiles').select('*').eq('user_id', user.id);

    // // create team
    // const responseTeam = await supabase
    //     .from('teams')
    //     .insert([
    //         { name: team.name },
    //     ])
    //     .select();
        
    // if (responseTeam.error) {
    //     console.log(responseTeam.error);
    //     return;
    // }

    // const newTeam = responseTeam.data[0];

    // // create team_memberships
    // const insertData = team.memberIds.map(member => ({
    //     team_id: newTeam.id,
    //     user_id: member,
    //     role: 'member',
    // }));
    // console.log(JSON.stringify(error))
    // const responseTeamMembership = await supabase
    //     .from('team_memberships')
    //     .insert([
    //         {team_id: newTeam.id, user_id: profiles[0].id, role: 'owner'},
    //         ...insertData,
    //     ])
    //     // .select();
        
    // if (responseTeamMembership.error) {
    //     console.log(responseTeamMembership.error);
    //     return;
    // }

    return;
}