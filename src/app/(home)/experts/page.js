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
                    width:'100%', height:'100%', boxSizing:'border-box',
                    display:'flex', alignItems:'center', justifyContent:'center',
                    backgroundColor:'primary.main',
                    px:'10rem', boxSizing:'border-box',
                    }}
                >
                <Box sx={{width:'40%', boxSizing:'border-box', px:'.5rem'}}>
                    {/* Slogan */}
                    <Typography variant="h2" align="left" sx={{fontWeight:'bold', color:'primary.contrastText', overflowWrap:'break-word'}}>
                        Experts on Improvement and Education
                    </Typography>
                    {/* description */}
                    <Typography variant="h5" align="left" sx={{mt:'2rem', color:'primary.contrastText'}}>
                        Look below for some of our favorite experts in education!
                    </Typography>
                </Box>
                <Box sx={{width:'60%', minWidth:'42rem', display:'flex', alignItems:'center', justifyContent:'center', flexDirection:'column'}}>
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