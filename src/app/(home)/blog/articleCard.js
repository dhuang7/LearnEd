'use client'

import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import CloseIcon from '@mui/icons-material/Close'
import useMediaQuery from "@mui/material/useMediaQuery";



import Image from "next/image";
import { useState } from "react";
import theme from "@/app/theme";
import NextLink from 'next/link';



export default function ArticleCard({article}) {
    const fullScreen = useMediaQuery(theme.breakpoints.down('lg'));


    return (
        <>
            <Paper 
                elevation={0} 
                sx={{
                    m:'1rem', width:'20rem', p:'1rem', 
                    borderRadius:3, border: '1px solid', borderColor: 'grey.300',
                    textDecoration:'none',
                    transition: 'border-color 0.25s',
                    '&:hover': {
                        borderColor: 'info.main', // Change the border color on hover
                    },
                }} 
                component={NextLink}
                href={article.href}
                >
                {/* thumbnail */}
                <Box sx={{width:'100%', justifyContent:'center', display:'flex'}}>
                    <Box 
                        sx={{
                            width:640/2, 
                            height:345/2, 
                            display:'flex', alignItems:'center', justifyContent:'center',
                            position:'relative',
                            borderRadius:2,
                            overflow:'hidden',
                            border:'1px solid',
                            borderColor:'grey.300',
                        }}
                        >
                        <Image src={article.thumbnail} alt={'icon'} width={article.aspectRatio*345/2} height={345/2}/>
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