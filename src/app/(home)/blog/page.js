import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Fade from '@mui/material/Fade';


import Image from "next/image";
import Footer from "../footer";
import Articles from "./articles";
import HeadArticleCard from "./headArticleCard";

import {info as wiisInfo} from './what-is-improvement-science/page';


export default function Page() {
    const searchBarHeight = 7.5;

    const articles = [
        wiisInfo,
    ];

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
                        Improvement Science tips and trends
                    </Typography>
                    {/* description */}
                    <Typography variant="h5" align="left" sx={{mt:'2rem', color:'primary.contrastText'}}>
                        Look below for some of our favorite articles from experienced improvement scientists!
                    </Typography>
                </Box>
                <Box sx={{width:'60%', minWidth:'42rem', display:'flex', alignItems:'center', justifyContent:'center', flexDirection:'column'}}>
                    <HeadArticleCard 
                        article={articles.filter(v=>v.title==='What is Improvement Science?')[0]} 
                        />
                </Box>
                
            </Box>
            <Articles articles={articles} searchBarHeight={searchBarHeight} />
            <Footer />
        </Box>
    );
}