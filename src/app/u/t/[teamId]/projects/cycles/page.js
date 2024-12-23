import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import CycleList from "./cycleList";
import createClient from "@/utils/supabase/server";



export default async function Cycles({params}) {
    const teamId = (await params).teamId;
    const supabase = await createClient();

    // const {data: cycles, error} = await supabase
    //     .from('change_packages')
    //     .select(`
    //         *,
    //         change_ideas (
    //             *,
    //             pdsa_cycles (*)
    //         )
    //     `);

    const {data: cycles, error} = await supabase
        .from('pdsa_cycles')
        .select(`
            *,
            change_ideas (
                *,
                change_packages (*)
            )
        `);

    console.log(cycles);

    return (
        <> 
            <CycleList teamId={teamId} cycles={cycles} />
        </>
    )
}
