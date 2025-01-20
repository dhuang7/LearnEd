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


export default function VideoCard({video}) {
    const [open, setOpen] = useState();
    const fullScreen = useMediaQuery(theme.breakpoints.down('lg'));

    // video size ratios
    const width = 750;
    const height = width * 270/480;

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
                onClick={() => setOpen(true)}
                >
                {/* thumbnail */}
                <Box sx={{width:'100%', justifyContent:'center', display:'flex'}}>
                    <Box 
                        sx={{
                            width:`20rem`, 
                            height:`${20*(1/video.img.aspectRatio)}rem`, 
                            position:'relative',
                            borderRadius:2,
                            overflow:'hidden',
                            border:'1px solid',
                            borderColor:'grey.300',
                        }}
                        >
                        <Image src={video.img.src} alt={'icon'} fill />
                    </Box>
                </Box>
                {/* text */}
                <Box sx={{mt:'1rem'}}>
                    {/* title */}
                    <Typography noWrap variant="h4" align="left" color="primary" sx={{mb:'.5rem'}}>
                        {video.title}
                    </Typography>
                    {/* time */}
                    <Typography noWrap variant="body1" align="left" color="primary">
                        {video.videoLength} mins
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
                        {video.description}
                    </Typography>
                </Box>
            </Paper>

            {/* dialog */}
            <Dialog 
                open={open} 
                onClose={() => setOpen(false)}
                fullScreen={fullScreen}
                sx={{
                    '& .MuiDialog-paper': {
                        maxWidth:'none',
                        maxHeight:'none',
                        borderRadius:fullScreen ? 0 : 5,
                    }
                }}
                >
                <DialogTitle id="customized-dialog-title">
                    <Box sx={{display:'flex', width:'100%', alignItems:'center'}}>
                        <Typography variant="inherit">{video.title}</Typography>
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
                
                {/* video frame */}
                <Box sx={{overflow:'scroll', width:'100%', height:'100%'}}>
                    <Box
                        sx={{
                            borderRadius:4,
                            height:height,
                            width:width,
                            mx:'1.5rem',
                            mb:'1.5rem',
                            overflow:'hidden',
                            border:'1px solid',
                            borderColor:'grey.300'
                        }}
                        >
                        <iframe id="ytplayer" type="text/html" width="100%" height="100%"
                            src={video.videoSrc}
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                            referrerPolicy="strict-origin-when-cross-origin" 
                            allowFullScreen
                            style={{
                                border:'none'
                            }}
                            />
                    </Box>
                </Box>
            </Dialog>
        </>
    )
}