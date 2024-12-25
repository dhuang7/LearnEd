import Paper from "@mui/material/Paper";
import Skeleton from "@mui/material/Skeleton";



export default function CycleList({teamId, cycles}) {

    return (
        <Paper 
            elevation={0} 
            sx={{
                borderRadius:3, boxSizing:'border-box', border:'1px solid', borderColor: 'grey.300',
                p:'1rem', height:'100%', width:'100%', overflow:'hidden',
                display:'flex', flexDirection:'column', position:'relative'
            }}
            >
            
            {Array(5).fill(0).map((v, i) => <Skeleton key={i} height='20%' />)}
        </Paper>
    )
}