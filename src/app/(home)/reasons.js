import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

import NextLink from 'next/link';
import Image from "next/image";


export default function Reasons({icon, title, description, buttonText, image, reverse, backgroundColor}) {
    const Icon = icon;

    const Text = () => (
        <Box sx={{width:'50%', display:'flex', alignItems:'center', justifyContent:'center', flexDirection:'column'}}>
            {/* titles */}
            <Box sx={{width:'80%'}}>
                <Typography variant="h3" color="textSecondary" sx={{mb:'.5rem'}}><Icon fontSize="inherit" /></Typography>
                <Typography variant="h3" color="primary" align="left" sx={{fontWeight:'bold', mb:'1rem'}}>{title}</Typography>
                <Typography variant="h6" color="textSecondary" align="left" sx={{mb:'2rem'}}>
                    {description}
                </Typography>
                {/* get started button */}
                <Button 
                    variant="outlined" disableElevation 
                    sx={{borderRadius:3, textTransform:'none',}}
                    color="secondary"
                    component={NextLink}
                    href='/login'
                    >
                    <Typography variant="body1">
                        {buttonText}
                    </Typography>
                </Button>
            </Box>
        </Box>
    );

    const Images = () => (
        <Box sx={{width:'50%', display:'flex', alignItems:'center', justifyContent:'center', flexDirection:'column'}}>
            {/* images */}
            <Box 
                sx={{
                    width:'25rem', height:'25rem', 
                    overflow:'hidden', 
                    position:'relative',
                }}
                >
                <Image src={image} alt='icon' fill />
            </Box>
        </Box>
    );

    return (
        <Box sx={{width:'100%', height:'75%', boxSizing:'border-box', px:'5%', backgroundColor:backgroundColor||'common.white'}}>
            <Box sx={{width:'100%', height:'100%', alignItems:'center', display:'flex'}}>
                {reverse
                    ? <>
                        {/* text */}
                        <Images />
                        {/* image */}
                        <Text />
                    </>
                    : <>
                        {/* text */}
                        <Text />
                        {/* image */}
                        <Images />
                    </>
                }
            </Box>
        </Box>
    );
}