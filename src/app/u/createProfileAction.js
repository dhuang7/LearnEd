'use server'

import createClient from "@/utils/supabase/server";


export async function createProfile(profile) {
    const supabase = await createClient();
    const { data: { session }, error: sessionError } = await supabase.auth.getSession();
    const { data, error } = await supabase
        .from('profiles')
        .insert([
            { id: session.user.id, first_name: profile.firstName, last_name: profile.lastName },
        ])
        .select();

    console.log(data);
    
    return;
}