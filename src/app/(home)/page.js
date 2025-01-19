import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import EmailRoundedIcon from '@mui/icons-material/EmailRounded';

import NextLink from 'next/link';
import DemoCarousel from "./demoCarousel";
import Image from "next/image";
import ContactUs from "./contactUs";
import Footer from "./footer";


export default function Page() {
    const linkedInIconWidth = 25;
    const linkedInIconHeight = 0.85039370078 * linkedInIconWidth;

    return (
        <Box sx={{width:'100%', height:'100%', overflow:'scroll'}}>
            <Box sx={{width:'100%', display:'flex', pt:'5%', boxSizing:'border-box', alignItems: 'center', flexDirection:'column'}}>
                {/* Slogan */}
                <Typography variant="h2" color="primary" align="center" sx={{fontWeight:'bold', display:'flex'}}>
                    Empower&nbsp;
                    <Typography variant="inherit" color="secondary" sx={{fontWeight:'inherit'}} component={'span'}>Educators</Typography> 
                    &nbsp;to lead change.
                </Typography>
                {/* description */}
                <Typography variant="h5" color="textSecondary" align="center" sx={{width:'60%', mt:'2rem'}}>
                    LearnEd makes it easy to collaborate with educators to improve the teaching experience.
                </Typography>
                {/* get started button */}
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
            {/* image carousel */}
            <Box sx={{width:'100%', height:'100%'}}>
                <Box sx={{width:'100%', height:'100%', alignItems:'center', display:'flex', justifyContent:'center'}}>
                    <DemoCarousel />
                </Box>
            </Box>
            <Footer />
        </Box>
    );
}