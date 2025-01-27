import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Fade from '@mui/material/Fade';


import Image from "next/image";
import Footer from "../footer";
import { Divider } from "@mui/material";


export default function ArticleFormat({children, aspectRatio, title, author, length, description, href, thumbnail}) {

    return (
        <Box sx={{width:'100%', height:'100%', overflow:'scroll', backgroundColor:'grey.100'}}>
            <Box 
                sx={{
                    width:'100%', height:'70%', boxSizing:'border-box',
                    display:'flex', alignItems:'center', justifyContent:'center',
                    backgroundColor:'primary.main',
                    px:'10rem', boxSizing:'border-box',
                    }}
                >
                <Box sx={{width:'50%', minWidth:'35rem', display:'flex', alignItems:'center', justifyContent:'center', flexDirection:'column'}}>
                    {/* images */}
                    <Box 
                        sx={{
                            width:550, height:1/aspectRatio*550, 
                            overflow:'hidden', 
                            position:'relative',
                            border:'1px solid', borderColor:'grey.300', borderRadius:3,
                            boxShadow:5
                        }}
                        >
                        <Image src={thumbnail} alt='icon' fill />
                    </Box>
                </Box>
                <Box sx={{width:'50%', boxSizing:'border-box', px:'.5rem'}}>
                    {/* title */}
                    <Typography variant="h3" align="left" sx={{fontWeight:'bold', color:'primary.contrastText', overflowWrap:'break-word'}} >
                        {title}
                    </Typography>
                    {/* Divider */}
                    <Divider sx={{borderColor:'common.white', my:'1rem'}} />
                    {/* author */}
                    <Typography variant="h5" align="left" sx={{color:'primary.contrastText', overflowWrap:'break-word'}}>
                        By {author}
                    </Typography>
                    {/* time */}
                    <Typography variant="body1" align="left" sx={{color:'primary.contrastText', overflowWrap:'break-word', mb:'1rem'}}>
                        {length} mins
                    </Typography>
                    {/* description */}
                    <Typography 
                        variant="h6" align="left" 
                        sx={{
                            whiteSpace: 'pre-wrap',
                            wordBreak: 'break-word',
                            maxHeight:'100%',
                            display: '-webkit-box',
                            WebkitLineClamp: 3,
                            lineClamp: 3,
                            overflow: 'hidden',
                            WebkitBoxOrient: 'vertical',
                            height:`${3*1.25}rem`,
                            color:'primary.contrastText', overflowWrap:'break-word',
                        }}
                        >
                        {description}
                    </Typography>
                </Box>
            </Box>
            <Box sx={{width:'100%', px:'20rem', py: '2rem', boxSizing:'border-box',}}>
                {children}
            </Box>
            <Footer />
        </Box>
    );
}