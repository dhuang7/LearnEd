import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";


import NextLink from 'next/link';
import Skeleton from "@mui/material/Skeleton";


export default function Page() {
    const imageWidth = 1000;
    const imageHeight = 0.53509933774 * imageWidth;

    return (
        <Box sx={{width:'100%', height:'100%', overflow:'scroll'}}>
            <Box sx={{width:'100%', display:'flex', justifyContent:'center', pt:'5%', boxSizing:'border-box', alignItems: 'center', flexDirection:'column'}}>
                <Typography variant="h2" color="primary" align="center" sx={{fontWeight:'bold', display:'flex'}}>
                    Empower&nbsp;
                    <Typography variant="inherit" color="secondary" sx={{fontWeight:'inherit'}}>Educators</Typography> 
                    &nbsp;to lead change.
                </Typography>
                <Typography variant="h5" color="textSecondary" align="center" sx={{width:'60%', mt:'2rem'}}>
                    LearnEd makes it easy to collaborate with educators to improve the teaching experience.
                </Typography>
                <Button 
                    variant="contained" disableElevation 
                    sx={{borderRadius:3, textTransform:'none', mt:'2rem', py:'.75rem', px:'2rem'}}
                    component={NextLink}
                    href='/login'
                    >
                    <Typography variant="h6">
                        Get started
                    </Typography>
                </Button>
            </Box>
            <Box sx={{width:'100%', height:'100%'}}>
                <Box sx={{width:'100%', height:'100%', alignItems:'center', display:'flex', justifyContent:'center'}}>
                    <Skeleton variant="rectangular" height={imageHeight} width={imageWidth} />
                </Box>
            </Box>
        </Box>
    );
}