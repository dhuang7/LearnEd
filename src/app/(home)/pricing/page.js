import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import Footer from "../footer";
import PricingColumn from "./pricingColumn";
import ContactUs from "./contactUs";


export default function Page() {

    

    return (
        <Box sx={{width:'100%', height:'100%', overflow:'scroll', backgroundColor:'grey.100'}}>
            <Box 
                sx={{
                    width:'100%', minHeight:'80%', boxSizing:'border-box',
                    display:'flex', alignItems:'center', flexDirection:'column', 
                    backgroundColor:'primary.main', 
                    pb:'12rem', px:'1rem',
                    }}
                >
                {/* Slogan */}
                <Typography variant="h2" align="center" sx={{fontWeight:'bold', display:'flex', mt:'5rem', color:'primary.contrastText'}}>
                    Invest in change that matters.
                </Typography>
                {/* description */}
                <Typography variant="h3" align="center" sx={{width:'60%', mt:'2rem', color:'primary.contrastText'}}>
                    Praxly is completely free for now!
                </Typography>
                <Typography variant="h5" align="center" sx={{width:'60%', mt:'1rem', color:'primary.contrastText'}}>
                    {/* Possible future monthly pricing below: */}
                </Typography>
            </Box>
            <Box sx={{position:'relative', width:'100%', minHeight:'40rem', display:'flex', justifyContent:'center'}}>
                <Box
                    sx={{
                        width:{xs:'90%', sm:'80%'}, minHeight:'40rem',
                        border:'1px solid', borderColor:'grey.300', borderRadius:3,
                        backgroundColor:'common.white',
                        top:'-10rem', position:'relative',
                        display:'flex', 
                        flexDirection:{xs:'column', lg:'row'},
                        // overflow:'hidden',
                    }}
                    >
                    <PricingColumn 
                        width={{xs:'100%', lg:'33.33%'}} 
                        href='/login'
                        color='chocolate'
                        title='Free Forever'
                        description='Best for personal use.'
                        price='FREE'
                        buttonText='Free Forever'
                        featureTitle='Key Features:'
                        features={[
                            'Individual Team', 'Unlimited cycles', 'Collaborative diagrams', 'Manage calendars', 'Create to-do lists', 'Help Center'
                        ]}
                        />
                    {/* <PricingColumn 
                        width={{xs:'100%', lg:'33.33%'}} 
                        href='/login'
                        color='RoyalBlue'
                        title='Starter'
                        description='Best for instructional leads.'
                        price='$10'
                        buttonText='Get started'
                        featureTitle='Everything in Free Forever, plus:'
                        features={[
                            'Create up to 2 teams', 'On-demand support', 'New feature support', 'AI Assistant Lite',
                        ]}
                        /> */}
                    <PricingColumn 
                        width={{xs:'100%', lg:'33.33%'}} 
                        href='/login'
                        color='ForestGreen'
                        title='Unlimited'
                        description='Best for instructional teams.'
                        price='FREE'
                        buttonText='Get started'
                        featureTitle='Everything in Free Forever, plus:'
                        features={[
                            'Unlimited teams', 'Remote trainings', 'Unlimited AI assistance', 'On-demand support', 'New feature support',
                        ]}
                        />
                    <PricingColumn 
                        width={{xs:'100%', lg:'33.33%'}} 
                        noBorder
                        href='/login'
                        color='Crimson'
                        title='Enterprise'
                        description='Best for schools and districts.'
                        price="Let's talk"
                        priceSize='h4'
                        buttonText='Contact us'
                        customButton={ContactUs}
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