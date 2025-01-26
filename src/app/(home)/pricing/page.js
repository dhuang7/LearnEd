import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import Footer from "../footer";
import PricingColumn from "./pricingColumn";


export default function Page() {

    

    return (
        <Box sx={{width:'100%', height:'100%', overflow:'scroll', backgroundColor:'grey.100'}}>
            <Box 
                sx={{
                    width:'100%', height:'80%', boxSizing:'border-box',
                    display:'flex', alignItems:'center', flexDirection:'column', 
                    backgroundColor:'primary.main', 
                    }}
                >
                {/* Slogan */}
                <Typography variant="h2" align="center" sx={{fontWeight:'bold', display:'flex', mt:'5rem', color:'primary.contrastText'}}>
                    Invest in change that matters.
                </Typography>
                {/* description */}
                <Typography variant="h3" align="center" sx={{width:'60%', mt:'2rem', color:'primary.contrastText'}}>
                    The tool is completely free for now!
                </Typography>
                <Typography variant="h5" align="center" sx={{width:'60%', mt:'1rem', color:'primary.contrastText'}}>
                    Possible future monthly pricing below:
                </Typography>
            </Box>
            <Box sx={{position:'relative', width:'100%', height:'40rem', display:'flex', justifyContent:'center'}}>
                <Box
                    sx={{
                        width:'75%', minWidth:'65rem', minHeight:'40rem',
                        border:'1px solid', borderColor:'grey.300', borderRadius:3,
                        backgroundColor:'common.white',
                        top:'-10rem', position:'absolute',
                        display:'flex',
                    }}
                    >
                    <PricingColumn 
                        width={'33.33%'} 
                        href='/login'
                        color='chocolate'
                        title='Free Forever'
                        description='Best for personal use.'
                        price='FREE'
                        buttonText='Free Forever'
                        featureTitle='Key Features:'
                        features={[
                            'Create up to 2 teams', 'Unlimited cycles', 'Collaborative diagrams', 'Manage calendars', 'Help Center'
                        ]}
                        />
                    <PricingColumn 
                        width={'33.33%'} 
                        href='/login'
                        color='RoyalBlue'
                        title='Unlimited'
                        description='Best for instructional leads.'
                        price='$10'
                        buttonText='Get started'
                        featureTitle='Everything in Free forever, plus:'
                        features={[
                            'Unlimited Teams', 'On-demand support', 'Remote trainings'
                        ]}
                        />
                    <PricingColumn 
                        width={'33.33%'} 
                        noBorder
                        href='/login'
                        color='ForestGreen'
                        title='School and District'
                        description='Best for instructional leads.'
                        price="Let's talk"
                        priceSize='h3'
                        buttonText='Contact sales'
                        featureTitle='Everything in Unlimited, plus:'
                        features={[
                            'Unlimited Teams for all users', 'Central hub for organization', 'Professional Development', 
                            'Dedicated Customer Support', 'Organization-specific features'
                        ]}
                        />
                </Box>
            </Box>
            <Footer />
        </Box>
    );
}