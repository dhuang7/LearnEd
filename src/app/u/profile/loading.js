import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Skeleton from "@mui/material/Skeleton";



export default async function Profile() {
    return (
        <Box sx={{pt:'1rem', px:'1rem'}}>
            {/* title */}
            <Typography variant="h3">Profile</Typography>
            {/* content profile */}
            <Box sx={{pl:'1rem'}}>
                <Skeleton />
                <Skeleton />
                <Skeleton />
            </Box>
        </Box>
    )
}