'use client'

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import useMediaQuery from "@mui/material/useMediaQuery";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import IconButton from "@mui/material/IconButton";
import CloseIcon from '@mui/icons-material/Close'
import EmailRoundedIcon from '@mui/icons-material/EmailRounded';
import LanguageRoundedIcon from '@mui/icons-material/LanguageRounded';

import Image from "next/image";
import theme from "@/app/theme";
import NextLink from 'next/link';



export default function ExportDialog({expert, open, setOpen}) {
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

    const linkedInIconWidth = 25;
    const linkedInIconHeight = 0.85039370078 * linkedInIconWidth;


    return (
        <>
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
                    <Box sx={{display:'flex', flexDirection:{xs:'column', md:'row'}, justifyContent:'center', alignItems:'center'}}>
                        {/* thumbnail */}
                        <Box sx={{width:{xs:'70%', sm:345}, justifyContent:'center', alignItems:'center', display:'flex', mr:{xs:0, md:'2rem'}, mb:{xs:'2rem', md:0}}}>
                            <Box 
                                sx={{
                                    width:'100%', 
                                    aspectRatio:1,
                                    display:'flex', alignItems:'center', justifyContent:'center',
                                    position:'relative',
                                    borderRadius:9999,
                                    overflow:'hidden',
                                    border:'1px solid',
                                    borderColor:'grey.300',
                                }}
                                >
                                <Image src={expert.thumbnail} alt={'icon'} fill />
                            </Box>
                        </Box>
                        <Box sx={{width:{xs:'90%', sm:520}, justifyContent:'center', alignItems:'center', display:'flex'}}>
                            <Box>
                                <Typography variant="h4" color="primary">{expert.name}</Typography>
                                <Typography variant="body1" color="primary">{expert.role}</Typography>
                                <Typography variant="body1" color="secondary" sx={{mb:'.5rem'}}>{expert.company}</Typography>
                                {expert.description.split('\n').map((v, i) => (
                                    <Typography key={i} variant="body1" sx={{mb:'1rem'}}>{v}</Typography>
                                ))}
                                {/* social */}
                                <Box sx={{display:'flex', alignItems:'center'}}>
                                    {/* website */}
                                    {expert.website && (
                                        <Box sx={{mr:'.5rem'}}>
                                            <NextLink target="_blank" href={expert.website} >
                                                <LanguageRoundedIcon sx={{color:'text.secondary'}} />
                                            </NextLink>
                                        </Box>
                                    )}
                                    {/* email */}
                                    {expert.email && (
                                        <Box sx={{mr:'.5rem'}}>
                                            <NextLink target="_blank" href={`mailto:${expert.email}`}>
                                                <EmailRoundedIcon sx={{color:'text.secondary'}} />
                                            </NextLink>
                                        </Box>
                                    )}
                                    {/* linkedin */}
                                    {expert.linkedIn && (
                                        <Box sx={{mr:'.5rem'}}>
                                            <NextLink target="_blank" href={expert.linkedIn} >
                                                <Image src={'/linkedin-icon.png'} width={linkedInIconWidth} height={linkedInIconHeight} alt='linkedin' />
                                            </NextLink>
                                        </Box>
                                    )}
                                </Box>
                            </Box>
                        </Box>
                    </Box>
                </DialogContent>
            </Dialog>
        </>
    )
}