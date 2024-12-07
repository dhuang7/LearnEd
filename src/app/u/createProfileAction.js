'use server'

import createClient from "@/utils/supabase/server";


export async function createProfile(profile) {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    const { data, error } = await supabase
        .from('profiles')
        .insert([
            { id: user.id, first_name: profile.firstName, last_name: profile.lastName, email: user.email },
        ])
        .select();

    if (error) console.log(error);
    
    return;
}