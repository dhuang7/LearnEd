import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import EmailRoundedIcon from '@mui/icons-material/EmailRounded';


import NextLink from 'next/link';
import Image from "next/image";
import ContactUs from "./contactUs";



export default function Footer() {
    const linkedInIconWidth = 25;
    const linkedInIconHeight = 0.85039370078 * linkedInIconWidth;

    return (
        <>
            {/* Ending login */}
            <Box sx={{width:'100%', height:'50%', backgroundColor: 'grey.300'}}>
                <Box sx={{width:'100%', height:'100%', display:'flex', justifyContent:'center', alignItems:'center', flexDirection:'column'}}>
                    <Typography variant="h4" color="primary" align="center" sx={{fontWeight:'bold', display:'flex'}}>
                        Start making&nbsp;
                        <Typography variant="inherit" color="secondary" sx={{fontWeight:'inherit'}} component={'span'}>change</Typography> 
                        &nbsp;happen.
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
            </Box>
            {/* footer */}
            <Box sx={{width:'100%', display:'flex', boxSizing:'border-box', py:'2rem', backgroundColor:'common.white'}}>
                <Box sx={{width:'30%', display:'flex', justifyContent:'center', alignItems:'flex-end', flexDirection:'column'}}>
                    {/* logo and social */}
                    <Typography variant="h3" color="primary" sx={{fontWeight:'bold'}}>LearnEd</Typography>
                    {/* social */}
                    <Box sx={{display:'flex', alignItems:'center'}}>
                        {/* email */}
                        <Box sx={{mr:'.5rem'}}>
                            <NextLink target="_blank" href='mailto:derekhuang7@gmail.com'>
                                <EmailRoundedIcon sx={{color:'common.black'}} />
                            </NextLink>
                        </Box>
                        {/* linkedin */}
                        <Box>
                            <NextLink target="_blank" href='https://www.linkedin.com/in/derekjhuang/' >
                                <Image src={'/linkedin-icon.png'} width={linkedInIconWidth} height={linkedInIconHeight} alt='linkedin' />
                            </NextLink>
                        </Box>
                    </Box>
                </Box>
                <Box sx={{width:'70%', display:'flex', justifyContent:'center', alignItems:'center', flexDirection:'column'}}>
                    <ContactUs />
                </Box>
            </Box>
        </>
    );
}