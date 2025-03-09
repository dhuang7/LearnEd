import Paper from "@mui/material/Paper";
import createClient from "@/utils/supabase/server";
import PageClient from "./pageClient";



export default async function RunChartPage({params}) {
    const {teamId, aimId} = await params
    const supabase = await createClient();

    const {data: measureTypes, error: measureTypesError} = await supabase
        .from('measure_types')
        .select()
        .eq('aim_id', aimId);

    return (
        <PageClient aimId={aimId} measureTypes={measureTypes} />
    )
}

