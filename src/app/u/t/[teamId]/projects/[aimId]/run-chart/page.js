import Paper from "@mui/material/Paper";
// import createClient from "@/utils/supabase/server";
import PageClient from "./pageClient";



export default async function RunChartPage({params}) {
    const {teamId, aimId} = await params
    // const supabase = await createClient();

    return (
        <PageClient aimId={aimId} />
    )
}

