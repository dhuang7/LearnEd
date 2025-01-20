import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Fade from '@mui/material/Fade';


import Image from "next/image";
import Footer from "../footer";
import Videos from "./videos";


export default function Page() {
    const imageWidth = 600;
    const imageHeight = 0.53509933774 * imageWidth;

    const cyclesRanWidth = 250;
    const cyclesRanHeight = 634/844 * cyclesRanWidth;

    const editEventWidth = 200;
    const editEventHeight = 1616/999 * editEventWidth;

    const searchBarHeight = 7.5;

    

    const videos = [
        {
            title: 'Projects',
            description: 'Learn how to create, manage, and delete your projects.',
            videoLength: '1:25',
            img: {
                src: '/thumbnails/create-project-thumbnail.png',
                height:343,
                width:640,
                aspectRatio: 640/343
            },
            videoSrc: 'https://www.youtube.com/embed/rU4FclQb0L4',
        },
        {
            title: 'Aims',
            description: 'Learn how to create, manage, and delete your aims.',
            videoLength: '0:58',
            img: {
                src: '/thumbnails/manage-aim-thumbnail.png',
                height:343,
                width:640,
                aspectRatio: 640/343
            },
            videoSrc: 'https://www.youtube.com/embed/5UcYtpUfCxI',
        }
    ]

    return (
        <Box sx={{width:'100%', height:'100%', overflow:'scroll', backgroundColor:'grey.100'}}>
            <Box 
                sx={{
                    width:'100%', height:'100%', pb:`${searchBarHeight+2}rem`, boxSizing:'border-box',
                    display:'flex', alignItems:'center', flexDirection:'column', 
                    backgroundColor:'primary.main', 
                    }}
                >
                {/* Slogan */}
                <Typography variant="h2" align="center" sx={{fontWeight:'bold', display:'flex', mt:'5rem', color:'primary.contrastText'}}>
                    How can we help?
                </Typography>
                {/* description */}
                <Typography variant="h5" align="center" sx={{width:'60%', mt:'2rem', color:'primary.contrastText'}}>
                    Look below for some of our favorite videos to help you streamline your PLC process!
                </Typography>
                {/* image */}
                <Box 
                    sx={{
                        width:'100%', 
                        alignItems:'center', display:'flex', justifyContent:'center', 
                        mt:'3rem', 
                        position:'relative', left:'-1.5rem', 
                        // backgroundColor:'primary.main',
                    }}
                    >
                    {/* driver */}
                    <Fade in timeout={{enter:750}} >
                        <Box 
                            sx={{
                                borderRadius:3, overflow:'hidden', border: '1px solid', borderColor:'divider', boxShadow: 15,
                                position:'relative', width:imageWidth, height: imageHeight,
                            }}
                            >
                            <Image src={'/driver-demo.png'} alt={'demo'} fill />
                        </Box>
                    </Fade>
                    {/* dashbaord cycle */}
                    <Fade in timeout={{enter:750}}>
                        <Box 
                            sx={{
                                borderRadius:3, overflow:'hidden', border: '1px solid', borderColor:'divider', boxShadow: 15,
                                position:'absolute', width: cyclesRanWidth, height: cyclesRanHeight,
                                mr:'27rem', mt:'12rem'
                            }}
                            >
                            <Image src={'/cycles-ran.png'} alt={'demo'} fill />
                        </Box>
                    </Fade>
                    {/* calendar event */}
                    <Fade in timeout={{enter:750}}>
                        <Box 
                            sx={{
                                borderRadius:3, overflow:'hidden', border: '1px solid', borderColor:'divider', boxShadow: 15,
                                position:'absolute', width: editEventWidth, height: editEventHeight,
                                ml:'35rem', mt:'5rem'
                            }}
                            >
                            <Image src={'/edit-event.png'} alt={'demo'} fill />
                        </Box>
                    </Fade>
                </Box>
            </Box>
            <Videos videos={videos} searchBarHeight={searchBarHeight} />
            <Footer />
        </Box>
    );
}