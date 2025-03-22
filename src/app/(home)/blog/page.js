import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import Footer from "../footer";
import Articles from "./articles";
import HeadArticleCard from "./headArticleCard";

import {info as wiisInfo} from './what-is-improvement-science/page';
import { info as hctefcsiInfo } from "./harnessing-collective-teacher-efficacy-for-continuous-school-improvement/page";
import { info as tsoplcInfo } from "./the-science-of-professional-learning-communities/page";
import { info as ocipInfo } from "./overcoming-challenges-in-plc/page";
import { info as tdotrapInfo } from "./the-disconnect-of-the-researcher-and-practitioner/page";
import { info as iaajInfo } from "./improvement-as-a-journey/page";


export default function Page() {
    const searchBarHeight = 7.5;

    const articles = [
        wiisInfo, hctefcsiInfo, tsoplcInfo, ocipInfo, tdotrapInfo, iaajInfo,
    ];

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
                        Improvement Science tips and trends
                    </Typography>
                    {/* description */}
                    <Typography variant="h5" align="left" sx={{mt:'2rem', color:'primary.contrastText'}}>
                        Look below for some of our favorite articles from experienced improvement scientists!
                    </Typography>
                </Box>
                <Box sx={{width:{xs:'100%', md:'80%', lg:'50%'}, display:'flex', alignItems:'center', justifyContent:'center', flexDirection:'column', pt:{xs:'3rem', lg:0}, pb:{xs:'5rem', lg:0}, boxSizing:'border-box'}}>
                    <HeadArticleCard 
                        article={tsoplcInfo} 
                        />
                </Box>
                
            </Box>
            <Articles articles={articles} searchBarHeight={searchBarHeight} />
            <Footer />
        </Box>
    );
}