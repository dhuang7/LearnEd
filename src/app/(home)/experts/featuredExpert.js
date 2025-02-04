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
import ExportDialog from "./expertDialog";



export default function FeaturedExpert({expert}) {
    const [open, setOpen] = useState();
    const fullScreen = useMediaQuery(theme.breakpoints.down('lg'));

    // article size ratios
    const width = 750;
    const height = width * 270/480;

    const linkedInIconWidth = 25;
    const linkedInIconHeight = 0.85039370078 * linkedInIconWidth;

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
                onClick={() => setOpen(true)}
                >
                <Box sx={{display:'flex'}}>
                    <Typography color="textSecondary"><StarsRoundedIcon sx={{mr:'.5rem'}} /></Typography>
                    <Typography color="textSecondary">Featured</Typography>
                </Box>
                
                {/* thumbnail */}
                <Box sx={{width:'100%', justifyContent:'center', display:'flex'}}>
                    <Box 
                        sx={{
                            width:'50%', 
                            aspectRatio: 1,
                            display:'flex', alignItems:'center', justifyContent:'center',
                            position:'relative',
                            borderRadius:5,
                            overflow:'hidden',
                            border:'1px solid',
                            borderColor:'grey.300',
                        }}
                        >
                        <Image src={expert.thumbnail} alt={'icon'} fill style={{objectFit:'contain'}}/>
                    </Box>
                </Box>
                {/* text */}
                <Box sx={{mt:'1rem'}}>
                    {/* title */}
                    <Typography noWrap variant="h4" align="left" color="primary" >
                        {expert.name}
                    </Typography>
                    {/* author */}
                    <Typography noWrap variant="body1" align="left" color="primary">
                        {expert.role}
                    </Typography>
                    {/* time */}
                    <Typography noWrap variant="body1" align="left" color="secondary" sx={{mb:'.5rem'}}>
                        {expert.company}
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
                        {expert.description}
                    </Typography>
                </Box>
            </Paper>

            {/* dialog */}
            <ExportDialog expert={expert} open={open} setOpen={setOpen} />
        </>
    )
}