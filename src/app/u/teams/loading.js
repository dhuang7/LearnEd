import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import NextLink from 'next/link';
import Button from "@mui/material/Button";
import Skeleton from "@mui/material/Skeleton";



export default function Loading() {
    // custom team card
    const TeamCard = () => {
        return (
            <Paper elevation={0} sx={{m:'1rem', width:'20rem', p:'1rem', borderRadius:3, textDecoration:'none'}} component={NextLink} href='#'>
                <Box sx={{width:'100%', justifyContent:'center', display:'flex'}}>
                    <Box sx={{p:'1rem'}}>
                        <Skeleton variant="rounded" width={300} height={100} />
                    </Box>
                </Box>
                <Box>
                    <Typography variant="h4" align="center">
                        <Skeleton />
                        <Skeleton />
                        <Skeleton />
                    </Typography>
                </Box>
            </Paper>
        )
    }
    
    return (
        <Box sx={{p:'1rem'}}>
            {/* title */}
            <Box sx={{width:'100%', display:'flex'}}>
                {/* title */}
                <Typography variant="h4">Select a team</Typography>
                {/* button create */}
                <Button variant="outlined" sx={{mx:'1rem', textTransform:'none'}}>
                    Create Team
                </Button>
            </Box>
            {/* team cards */}
            <Box sx={{display:'flex', justifyContent:'center', flexWrap:'wrap'}}>
                {[0,0,0].map((team, i) => (
                    <TeamCard key={i} />
                ))}
            </Box>
        </Box>
    )
}
