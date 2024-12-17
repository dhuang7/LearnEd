import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";



export default function CycleList() {

    

    return (
        <Paper 
            elevation={0} 
            sx={{
                borderRadius:3, boxSizing:'border-box', border:'1px solid', borderColor: 'grey.300',
                p:'1rem', height:'100%', 
                display:'flex', flexDirection:'column'
            }}
            >
                cycle list
        </Paper>
    )
}
