import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';

import NextLink from 'next/link';

export default function PricingColumn({href, width, noBorder, title, description, color, price, priceSize, buttonText, featureTitle, features}) {
    return (
        <Box 
            sx={{
                width:width, display:'flex', flexDirection:'column', 
                boxSizing:'border-box', py:'2rem', px:{xs:'2rem', sm:'4rem'}, 
                borderRight:{xs:0, lg:noBorder||'1px solid'}, 
                borderBottom: {xs:noBorder||'1px solid', lg:0}, borderColor:{xs:'grey.300', lg:'grey.300'},
            }}
            >
            {/* Top */}
            <Box sx={{mb:'2rem'}}>
                <Typography variant="h5" sx={{fontWeight:'bold', color:color}}>{title}</Typography>
                <Typography variant="body1" >{description}</Typography>
                <Box sx={{height:'7rem', display:'flex', alignItems:'center'}}>
                    <Typography variant={priceSize||'h2'} sx={{fontWeight:'bold', color:color,}}>{price}</Typography>
                </Box>
                <Button 
                    variant="contained" disableElevation fullWidth
                    sx={{
                        textTransform:'none', backgroundColor:color, borderRadius:3,
                        '&:hover': {
                            backgroundColor: color,
                            filter: 'brightness(1.1)',
                        }
                    }}
                    component={NextLink}
                    href={href}
                    >
                    <Typography variant="h5">{buttonText}</Typography>
                </Button>
            </Box>
            {/* Features */}
            <Box>
                <Typography variant="body1" sx={{fontWeight:'bold', mb:'.5rem'}}>{featureTitle}</Typography>
                {features?.map((v, i) => (
                    <Box key={i} sx={{display:'flex', alignItems:'center', mb:'.5rem'}}>
                        <CheckRoundedIcon fontSize="small" sx={{mr:'.5rem'}} />
                        <Typography>{v}</Typography>
                    </Box>
                ))}
            </Box>
        </Box>
    );
}