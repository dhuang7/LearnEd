import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";




export default function Page() {

    return (
        <Box sx={{width:'100%', height:'100%'}}>
            <Box sx={{width:'100%', display:'flex', justifyContent:'center', mt:'20%'}}>
                <Box>
                    <Typography variant="h2" color="primary" align="center" sx={{fontWeight:'bold'}}>
                        Empower educators to lead change.
                    </Typography>
                </Box>
            </Box>
        </Box>
    );
}