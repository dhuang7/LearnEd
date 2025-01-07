'use client'

import createClient from "@/utils/supabase/client";
import Button from "@mui/material/Button";
import { useRouter } from "next/navigation";



export default function DeleteTeam({teamId}) {
    const supabase = createClient();
    const router = useRouter();

    async function handleDelete() {
        const {error} = await supabase
            .from('teams')
            .delete()
            .eq('id', teamId);

        console.log(error);
        router.push('/u/teams');
    }

    return (
        <Button variant="outlined" color='error' onClick={handleDelete}>Delete Team</Button>
    );
}