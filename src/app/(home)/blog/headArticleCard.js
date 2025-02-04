'use client'

import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import useMediaQuery from "@mui/material/useMediaQuery";
import StarsRoundedIcon from '@mui/icons-material/StarsRounded';


import Image from "next/image";
import { useState } from "react";
import theme from "@/app/theme";
import NextLink from 'next/link';



export default function HeadArticleCard({article}) {
    const [open, setOpen] = useState();
    const fullScreen = useMediaQuery(theme.breakpoints.down('lg'));

    // article size ratios
    const width = 750;
    const height = width * 270/480;

    return (
        <>
            <Paper 
                elevation={0} 
                sx={{
                    m:'1rem', width:'85%', p:'1rem', 
                    borderRadius:3, border: '1px solid', borderColor: 'grey.300',
                    boxShadow:5,
                    textDecoration:'none',
                    transition: 'border-color 0.25s',
                    '&:hover': {
                        borderColor: 'info.main', // Change the border color on hover
                        cursor: 'pointer',
                    },
                }} 
                component={NextLink}
                href={article.href}
                >
                <Box sx={{display:'flex'}}>
                    <Typography color="textSecondary"><StarsRoundedIcon sx={{mr:'.5rem'}} /></Typography>
                    <Typography color="textSecondary">Featured</Typography>
                </Box>
                {/* thumbnail */}
                <Box sx={{width:'100%', justifyContent:'center', display:'flex'}}>
                    <Box 
                        sx={{
                            // width:640, 
                            width:'100%',
                            aspectRatio: 640/345,
                            display:'flex', alignItems:'center', justifyContent:'center',
                            position:'relative',
                            borderRadius:2,
                            overflow:'hidden',
                            border:'1px solid',
                            borderColor:'grey.300',
                        }}
                        >
                        <Image src={article.thumbnail} alt={'icon'} fill style={{objectFit:'contain'}}/>
                    </Box>
                </Box>
                {/* text */}
                <Box sx={{mt:'1rem'}}>
                    {/* title */}
                    <Typography noWrap variant="h4" align="left" color="primary" >
                        {article.title}
                    </Typography>
                    {/* author */}
                    <Typography noWrap variant="body1" align="left" color="primary" sx={{mb:'.5rem'}}>
                        By {article.author}
                    </Typography>
                    {/* time */}
                    <Typography noWrap variant="body1" align="left" color="secondary">
                        {article.length} mins
                    </Typography>
                    {/* description */}
                    <Typography 
                        variant="body2" align="left" 
                        color="textSecondary"
                        sx={{
                            whiteSpace: 'pre-wrap',
                            wordBreak: 'break-word',
                            maxHeight:'100%',
                            display: '-webkit-box',
                            WebkitLineClamp: 3,
                            lineClamp: 3,
                            overflow: 'hidden',
                            WebkitBoxOrient: 'vertical',
                            height:`${3*1.25}rem`
                        }}
                        >
                        {article.description}
                    </Typography>
                </Box>
            </Paper>
        </>
    )
}