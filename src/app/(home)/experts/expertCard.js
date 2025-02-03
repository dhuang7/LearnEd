'use client'

import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import useMediaQuery from "@mui/material/useMediaQuery";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import IconButton from "@mui/material/IconButton";
import CloseIcon from '@mui/icons-material/Close'
import EmailRoundedIcon from '@mui/icons-material/EmailRounded';

import Image from "next/image";
import theme from "@/app/theme";
import NextLink from 'next/link';
import { useState } from "react";



export default function ExpertCard({expert}) {
    const fullScreen = useMediaQuery(theme.breakpoints.down('lg'));
    const [open, setOpen] = useState(false);

    const linkedInIconWidth = 25;
    const linkedInIconHeight = 0.85039370078 * linkedInIconWidth;


    return (
        <>
            <Paper 
                elevation={0} 
                sx={{
                    m:'1rem', width:'15rem', p:'1rem', 
                    borderRadius:3, border: '1px solid', borderColor: 'grey.300',
                    textDecoration:'none',
                    transition: 'border-color 0.25s',
                    '&:hover': {
                        borderColor: 'info.main', // Change the border color on hover
                        cursor: 'pointer',
                    },
                }} 
                onClick={() => setOpen(true)}
                >
                {/* thumbnail */}
                <Box sx={{width:'100%', justifyContent:'center', display:'flex'}}>
                    <Box 
                        sx={{
                            width:345/2, 
                            height:345/2, 
                            display:'flex', alignItems:'center', justifyContent:'center',
                            position:'relative',
                            borderRadius:9999,
                            overflow:'hidden',
                            border:'1px solid',
                            borderColor:'grey.300',
                        }}
                        >
                        <Image src={expert.thumbnail} alt={'icon'} width={expert.aspectRatio*345/2} height={345/2} />
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
            <Dialog 
                open={open} 
                onClose={() => setOpen(false)}
                fullScreen={fullScreen}
                maxWidth='md'
                sx={{
                    '& .MuiDialog-paper': {
                        maxWidth:'none',
                        maxHeight:'none',
                        borderRadius:fullScreen ? 0 : 5,
                    }
                }}
                >
                <DialogTitle sx={{p:'2rem', pb:0, height:0}}>
                    <Box sx={{display:'flex', width:'100%', alignItems:'center', top:'-1rem', position:'relative'}}>
                        {/* <Typography variant="inherit">Expert</Typography> */}
                        <IconButton
                            aria-label="close"
                            onClick={() => setOpen(false)}
                            sx={(theme) => ({
                                color: theme.palette.grey[500],
                                ml:'auto'
                            })}
                            >
                            <CloseIcon />
                        </IconButton>
                    </Box>
                </DialogTitle>
                
                {/* frame */}
                <DialogContent sx={{p:'2rem'}}>
                    <Box sx={{display:'flex'}}>
                        {/* thumbnail */}
                        <Box sx={{width:345, justifyContent:'center', alignItems:'center', display:'flex', mr:'2rem'}}>
                            <Box 
                                sx={{
                                    width:345, 
                                    height:345, 
                                    display:'flex', alignItems:'center', justifyContent:'center',
                                    position:'relative',
                                    borderRadius:9999,
                                    overflow:'hidden',
                                    border:'1px solid',
                                    borderColor:'grey.300',
                                }}
                                >
                                <Image src={expert.thumbnail} alt={'icon'} width={expert.aspectRatio*345} height={345} />
                            </Box>
                        </Box>
                        <Box sx={{width:345, justifyContent:'center', alignItems:'center', display:'flex'}}>
                            <Box>
                                <Typography variant="h4" color="primary">{expert.name}</Typography>
                                <Typography variant="body1" color="primary">{expert.role}</Typography>
                                <Typography variant="body1" color="secondary" sx={{mb:'.5rem'}}>{expert.company}</Typography>
                                <Typography variant="body1" sx={{mb:'1rem'}}>{expert.description}</Typography>
                                {/* social */}
                                <Box sx={{display:'flex'}}>
                                    {/* email */}
                                    <Box sx={{mr:'.5rem'}}>
                                        <NextLink target="_blank" href={`mailto:${expert.email}`}>
                                            <EmailRoundedIcon sx={{color:'common.black'}} />
                                        </NextLink>
                                    </Box>
                                    {/* linkedin */}
                                    <Box sx={{mr:'.5rem'}}>
                                        <NextLink target="_blank" href={expert.linkedIn} >
                                            <Image src={'/linkedin-icon.png'} width={linkedInIconWidth} height={linkedInIconHeight} alt='linkedin' />
                                        </NextLink>
                                    </Box>
                                </Box>
                            </Box>
                        </Box>
                    </Box>
                </DialogContent>
            </Dialog>
        </>
    )
}