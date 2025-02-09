import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import Footer from "../footer";
import Experts from "./experts";
import { expertsList } from './expertsList';
import FeaturedExpert from "./featuredExpert";
// import HeadArticleCard from "./headArticleCard";


export default function Page() {
    const searchBarHeight = 7.5;


    return (
        <Box sx={{width:'100%', height:'100%', overflow:'scroll', backgroundColor:'grey.100'}}>
            <Box 
                sx={{
                    width:'100%', minHeight:'100%', boxSizing:'border-box',
                    display:'flex', alignItems:'center', justifyContent:'center', flexDirection:{xs:'column', lg:'row'},
                    backgroundColor:'primary.main',
                    px:{xs:'1rem', sm:'5rem', lg:'10rem'}, boxSizing:'border-box',
                    }}
                >
                <Box sx={{width:{xs:'100%', lg:'50%'}, boxSizing:'border-box', px:'.5rem', pt:{xs:'10%', lg:0}}}>
                    {/* Slogan */}
                    <Typography variant="h2" align="left" sx={{fontWeight:'bold', color:'primary.contrastText', overflowWrap:'break-word'}}>
                        Experts on Improvement and Education
                    </Typography>
                    {/* description */}
                    <Typography variant="h5" align="left" sx={{mt:'2rem', color:'primary.contrastText'}}>
                        Look below for some of our favorite experts in education!
                    </Typography>
                </Box>
                <Box sx={{width:{xs:'100%', lg:'50%'}, display:'flex', alignItems:'center', justifyContent:'center', flexDirection:'column', pt:{xs:'3rem', lg:0}, pb:{xs:'5rem', lg:0}, boxSizing:'border-box'}}>
                    <FeaturedExpert 
                        expert={expertsList.filter(v=>v.name==='Derek Huang')[0]} 
                        />
                </Box>
                
            </Box>
            <Experts experts={expertsList} searchBarHeight={searchBarHeight} />
            <Footer />
        </Box>
    );
}