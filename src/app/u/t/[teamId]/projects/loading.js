import Paper from "@mui/material/Paper";
import Skeleton from "@mui/material/Skeleton";



export default async function LoadingPage() {

    return (
        <Paper 
            elevation={0} 
            sx={{
                borderRadius:3, boxSizing:'border-box', border:'1px solid', borderColor: 'grey.300',
                p:'1rem', height:'100%',
                // display:'flex', flexDirection:'column'
            }}
            >
                {Array(5).fill(0).map((v, i) => <Skeleton key={i} height='20%' />)}
        </Paper>
    )
}
