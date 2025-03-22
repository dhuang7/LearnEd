import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";




export default function Audience({title, description, icon}) {
    return (
        <Box sx={{width:'20rem', boxSizing:'border-box', px:'1rem', mb:'2rem', display:'flex', flexDirection:'column', alignItems:'center'}}>
            <Box>
                {icon}
            </Box>
            <Typography variant="h4" color="secondary" align="center" sx={{mb:'.5rem'}}>{title}</Typography>
            <Typography variant="h6" color="textSecondary" align="center">{description}</Typography>
        </Box>
    );
}