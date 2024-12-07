import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

export default function TeamId() {
    // if no team menu is selected
    return (
        <Box sx={{width:'100%', justifyContent:'center', display:'flex', mt:'2rem'}}>
            <Typography color="textSecondary">Please select a menu option.</Typography>
        </Box>
    )
}
