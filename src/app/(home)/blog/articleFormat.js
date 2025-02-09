import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import NextLink from 'next/link';
import Image from "next/image";
import Footer from "../footer";
import { Divider } from "@mui/material";
import AuthorInfo from "./authorInfo";


export default function ArticleFormat({children, aspectRatio, title, author, length, description, thumbnail}) {

    return (
        <Box sx={{width:'100%', height:'100%', overflow:'scroll', backgroundColor:'grey.100'}}>
            <Box 
                sx={{
                    width:'100%', minHeight:'70%', boxSizing:'border-box',
                    display:'flex', alignItems:'center', justifyContent:'center', flexDirection:{xs:'column', lg:'row'},
                    backgroundColor:'primary.main',
                    px:{xs:'1rem', md:'5rem', lg:'10rem'}, boxSizing:'border-box',
                    }}
                >
                <Box sx={{width:{xs:'90%', lg:'50%'}, py:{xs:'3rem', lg:0}, boxSizing:'border-box', display:'flex', alignItems:'center', justifyContent:'center', flexDirection:'column'}}>
                    {/* images */}
                    <Box 
                        sx={{
                            width:{xs:'80%', lg:'90%'}, aspectRatio:aspectRatio, 
                            overflow:'hidden', 
                            position:'relative',
                            border:'1px solid', borderColor:'grey.300', borderRadius:3,
                            boxShadow:5
                        }}
                        >
                        <Image src={thumbnail} alt='icon' fill />
                    </Box>
                </Box>
                <Box sx={{width:{xs:'90%', lg:'50%'}, boxSizing:'border-box', px:'.5rem', pb:{xs:'3rem', lg:0}}}>
                    {/* title */}
                    <Typography variant="h3" align="left" sx={{fontWeight:'bold', color:'primary.contrastText', overflowWrap:'break-word'}} >
                        {title}
                    </Typography>
                    {/* Divider */}
                    <Divider sx={{borderColor:'common.white', my:'1rem'}} />
                    {/* author */}
                    <AuthorInfo author={author} />
                    {/* time */}
                    <Typography variant="body1" align="left" sx={{color:'primary.contrastText', overflowWrap:'break-word', mb:'1rem'}}>
                        {length} mins
                    </Typography>
                    {/* description */}
                    <Typography 
                        variant="h6" align="left" 
                        sx={{
                            whiteSpace: 'pre-wrap',
                            // wordBreak: 'break-word',
                            // maxHeight:'100%',
                            // display: '-webkit-box',
                            // WebkitLineClamp: 3,
                            // lineClamp: 3,
                            // overflow: 'hidden',
                            // WebkitBoxOrient: 'vertical',
                            // height:`${3*1.25}rem`,
                            color:'primary.contrastText', overflowWrap:'break-word',
                        }}
                        >
                        {description}
                    </Typography>
                </Box>
            </Box>
            <Box sx={{width:'100%', px:{xs:'1rem', lg:'20rem'}, py: '2rem', boxSizing:'border-box',}}>
                {children}
            </Box>
            <Footer />
        </Box>
    );
}

export function Header({children}) {
    return (
        <Typography variant="h4" sx={{fontWeight:'bold', my:'1rem'}}>
            {children}
        </Typography>
    );
}

export function Paragraph({children, inline, bolded}) {
    return (
        <Typography sx={{fontSize:'1.25rem', lineHeight:'2.5rem', mb:inline?0:'2rem', fontWeight:bolded&&'bold'}}>
            {children}
        </Typography>
    );
}

export function LIParagraph({children, bolded}) {
    return (
        <li style={{fontSize:'1.25rem', lineHeight:'2.5rem', fontWeight:bolded&&'bold'}}>
            {children}
        </li>
    );
}

export function ArticleLink({children, href}) {
    return (
        <NextLink target="_blank" href={href}>{children}</NextLink>
    );
}