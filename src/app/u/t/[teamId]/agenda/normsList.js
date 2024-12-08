import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";





export default function NormsList() {

    

    return (
        <Paper 
            elevation={3} 
            sx={{
                borderRadius:3, boxSizing:'border-box', 
                p:'1rem', height:'100%', 
                display:'flex', flexDirection:'column'
            }}
            >
            <Typography variant="h6">Norms:</Typography>
        </Paper>
    )
}
