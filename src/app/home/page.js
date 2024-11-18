import { createClient } from '@/utils/supabase/server';

export default async function Home() {

    const supabase = await createClient();
    const { data, error } = await supabase.from("test").select();

    return (
        <div>{JSON.stringify(data)}</div>
    )
}
