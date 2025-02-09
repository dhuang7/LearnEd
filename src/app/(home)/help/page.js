import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Fade from '@mui/material/Fade';


import Image from "next/image";
import Footer from "../footer";
import Videos from "./videos";


export default function Page() {
    const imageWidth = 500;
    const xsImageWidth = '80';
    const imageHeight = 1/0.53509933774;

    const cyclesRanWidth = imageWidth => `${Number(imageWidth)*250/600}`;
    const cyclesRanHeight = 1/(634/844);
    const cyclesMr = imageWidth => (typeof imageWidth === 'string') ? `${Number(imageWidth)*(28.5/40)}` : Number(imageWidth)*(28.5/300);
    const cyclesMt = imageWidth => (typeof imageWidth === 'string') ? `${Number(imageWidth)*(12.5/40)}` : Number(imageWidth)*(12.5/300);

    const editEventWidth = imageWidth => `${Number(imageWidth)*200/600}`;
    const editEventHeight = 1/(1616/999);
    const editEventMl = imageWidth => (typeof imageWidth === 'string') ? `${Number(imageWidth)*(37/40)}` : Number(imageWidth)*(37/300);
    const editEventMt = imageWidth => (typeof imageWidth === 'string') ? `${Number(imageWidth)*(5.5/40)}` : Number(imageWidth)*(5.5/300);

    const searchBarHeight = 7.5;

    console.log(cyclesMr(imageWidth));
    
    

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
        },
        {
            title: 'Drivers',
            description: 'Learn how to create, manage, and delete your drivers.',
            videoLength: '2:18',
            img: {
                src: '/thumbnails/manage-drivers-thumbnail.png',
                height:343,
                width:640,
                aspectRatio: 640/343
            },
            videoSrc: 'https://www.youtube.com/embed/ds_tg6eDhLQ',
        },
        {
            title: 'Change Ideas',
            description: 'Learn how to create, manage, and delete your change ideas.',
            videoLength: '1:31',
            img: {
                src: '/thumbnails/manage-change-ideas-thumbnail.png',
                height:343,
                width:640,
                aspectRatio: 640/343
            },
            videoSrc: 'https://www.youtube.com/embed/Jjx4XVVe1ug',
        },
        {
            title: 'Measures',
            description: 'Learn how to create, manage, and delete your measures.',
            videoLength: '1:14',
            img: {
                src: '/thumbnails/manage-measures-thumbnail.png',
                height:343,
                width:640,
                aspectRatio: 640/343
            },
            videoSrc: 'https://www.youtube.com/embed/IKmIxJOkyM8',
        },
        {
            title: 'Cycles',
            description: 'Learn how to create, manage, and delete your cycles.',
            videoLength: '1:15',
            img: {
                src: '/thumbnails/manage-cycles-thumbnail.png',
                height:343,
                width:640,
                aspectRatio: 640/343
            },
            videoSrc: 'https://www.youtube.com/embed/YFDE_bOwnxU',
        },
    ]

    return (
        <Box sx={{width:'100%', height:'100%', overflow:'scroll', backgroundColor:'grey.100'}}>
            <Box 
                sx={{
                    width:'100%', minHeight:'100%', pb:`${searchBarHeight+2}rem`, boxSizing:'border-box',
                    display:'flex', alignItems:'center', flexDirection:'column', 
                    backgroundColor:'primary.main', 
                    }}
                >
                {/* Slogan */}
                <Typography variant="h2" align="center" sx={{fontWeight:'bold', display:'flex', mt:'5rem', color:'primary.contrastText'}}>
                    How can we help?
                </Typography>
                {/* description */}
                <Typography variant="h5" align="center" sx={{width:{xs:'90%', md:'60%'}, mt:'2rem', color:'primary.contrastText'}}>
                    Look below for some of our favorite videos to help you streamline your PLC process!
                </Typography>
                {/* image */}
                <Box 
                    sx={{
                        width:'100%', 
                        alignItems:'center', display:'flex', justifyContent:'center', 
                        mt:'3rem', 
                        position:'relative', left:{xs:'-2.5%', sm:'-1.5rem'}
                        // transform:'scale(100vw)'
                        // backgroundColor:'primary.main',
                    }}
                    >
                    {/* driver */}
                    <Fade in timeout={{enter:750}} >
                        <Box 
                            sx={{
                                borderRadius:{xs:2, sm:3}, overflow:'hidden', border: '1px solid', borderColor:'divider', boxShadow: 15,
                                position:'relative', width:{xs:xsImageWidth+'%', sm:imageWidth}, 
                                aspectRatio: imageHeight,
                            }}
                            >
                            <Image src={'/driver-demo.png'} alt={'demo'} fill />
                        </Box>
                    </Fade>
                    {/* dashbaord cycle */}
                    <Fade in timeout={{enter:750}}>
                        <Box 
                            sx={{
                                borderRadius:{xs:2, sm:3}, overflow:'hidden', border: '1px solid', borderColor:'divider', boxShadow: 15,
                                position:'absolute', width: {xs:cyclesRanWidth(xsImageWidth)+'%', sm:Number(cyclesRanWidth(imageWidth))}, 
                                aspectRatio: cyclesRanHeight,
                                mr:{xs:cyclesMr(xsImageWidth)+'%', sm:Number(cyclesMr(imageWidth))}, mt:{xs:cyclesMt(xsImageWidth)+'%', sm:Number(cyclesMt(imageWidth))}
                            }}
                            >
                            <Image src={'/cycles-ran.png'} alt={'demo'} fill />
                        </Box>
                    </Fade>
                    {/* calendar event */}
                    <Fade in timeout={{enter:750}}>
                        <Box 
                            sx={{
                                borderRadius:{xs:2, sm:3}, overflow:'hidden', border: '1px solid', borderColor:'divider', boxShadow: 15,
                                position:'absolute', width: {xs:editEventWidth(xsImageWidth)+'%', sm:Number(editEventWidth(imageWidth))}, 
                                aspectRatio: editEventHeight,
                                ml:{xs:editEventMl(xsImageWidth)+'%', sm:Number(editEventMl(imageWidth))}, mt:{xs:editEventMt(xsImageWidth)+'%', sm:Number(editEventMt(imageWidth))}
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