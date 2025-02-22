import Paper from "@mui/material/Paper";
import createClient from "@/utils/supabase/server";



export default async function Drivers({params}) {
    const {teamId, aimId} = await params
    const supabase = await createClient();


    return (
        <Paper 
            elevation={0} 
            sx={{
                borderRadius:3, boxSizing:'border-box', border:'1px solid', borderColor: 'grey.300',
                p:'1rem', height:'100%', width:'100%', overflow:'hidden',
                display:'flex', flexDirection:'column', position:'relative'
            }}
            >
                
        </Paper>
    )
}

