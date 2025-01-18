import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import EmailRoundedIcon from '@mui/icons-material/EmailRounded';
import Icon from "@mui/material/Icon";
import Fade from '@mui/material/Fade';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';


import NextLink from 'next/link';
import Image from "next/image";
import ContactUs from "../contactUs";


export default function Page() {
    const linkedInIconWidth = 25;
    const linkedInIconHeight = 0.85039370078 * linkedInIconWidth;

    const imageWidth = 600;
    const imageHeight = 0.53509933774 * imageWidth;

    const cyclesRanWidth = 250;
    const cyclesRanHeight = 634/844 * cyclesRanWidth;

    const editEventWidth = 200;
    const editEventHeight = 1616/999 * editEventWidth;

    const searchBarHeight = 7.5;

    // custom Video card
    const VideoCard = (video) => {
        return (
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
                // component={NextLink} 
                // href={'/u/t/'+team.team.id}
                >
                <Box sx={{width:'100%', justifyContent:'center', display:'flex'}}>
                    <Icon sx={{p:'1rem', width:'100%', height:'7.5rem'}}>
                        <Image src={'/icon.svg'} alt={'icon'} width={1} height={1} style={{width:'auto', height:'100%'}} />
                    </Icon>
                </Box>
                <Box>
                    <Typography noWrap variant="h4" align="center">
                        {/* {team.team.name} */}
                        video
                    </Typography>
                </Box>
            </Paper>
        )
    }

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
            {/* search bar */}
            <Box sx={{width:'100%', display:'flex', justifyContent:'center', height:0}}>
                <Paper
                    sx={{
                        width:'80%', height:`${searchBarHeight}rem`,
                        border:'1px solid', borderColor:'grey.300', borderRadius:3,
                        position:'relative', top:`-${searchBarHeight/2}rem`,
                        boxShadow:0,
                    }}
                    >
                    <Box 
                        sx={{
                            display:'flex', justifyContent:'center', alignItems:'center', 
                            height:'100%',
                            boxSizing:'border-box', px:'5rem'
                        }}
                        >
                        {/* Search bar */}
                        <TextField
                            fullWidth
                            variant="standard"
                            placeholder='Search...'
                            slotProps={{
                                input:{
                                    endAdornment:(
                                        <InputAdornment position='end'>
                                            <IconButton size='large' edge="end">
                                                <SearchRoundedIcon fontSize="large" />
                                            </IconButton>
                                        </InputAdornment>
                                    )
                                },
                                htmlInput:{
                                    sx:{
                                        fontSize:'2rem'
                                    }
                                }
                            }}
                            />
                    </Box>
                </Paper>
            </Box>
            {/* videos */}
            <Box sx={{width:'100%', display:'flex', justifyContent:'center', flexWrap:'wrap', pb:'1rem', pt:`${searchBarHeight/2+1}rem`, boxSizing:'border-box'}}>
                <Typography color="textSecondary" sx={{height:'30rem', mt:'2rem'}}>No videos yet...</Typography>
                {/* {[1,2,3,4,5,6].map((video, i) => (
                    <VideoCard key={i} video={video} />
                ))} */}
            </Box>
            {/* Ending login */}
            <Box sx={{width:'100%', height:'50%', backgroundColor: 'grey.300'}}>
                <Box sx={{width:'100%', height:'100%', display:'flex', justifyContent:'center', alignItems:'center', flexDirection:'column'}}>
                    <Typography variant="h4" color="primary" align="center" sx={{fontWeight:'bold', display:'flex'}}>
                        Start making&nbsp;
                        <Typography variant="inherit" color="secondary" sx={{fontWeight:'inherit'}} component={'span'}>change</Typography> 
                        &nbsp;happen.
                    </Typography>
                    <Button 
                        variant="contained" disableElevation 
                        sx={{borderRadius:3, textTransform:'none', mt:'2rem', py:'.75rem', px:'2rem'}}
                        component={NextLink}
                        href='/login'
                        >
                        <Typography variant="h6">
                            Get started
                        </Typography>
                    </Button>
                </Box>
            </Box>
            {/* footer */}
            <Box sx={{width:'100%', display:'flex', boxSizing:'border-box', py:'2rem', backgroundColor:'common.white'}}>
                <Box sx={{width:'30%', display:'flex', justifyContent:'center', alignItems:'flex-end', flexDirection:'column'}}>
                    {/* logo and social */}
                    <Typography variant="h3" color="primary" sx={{fontWeight:'bold'}}>LearnEd</Typography>
                    {/* social */}
                    <Box sx={{display:'flex', alignItems:'center'}}>
                        {/* email */}
                        <Box sx={{mr:'.5rem'}}>
                            <NextLink target="_blank" href='mailto:derekhuang7@gmail.com'>
                                <EmailRoundedIcon sx={{color:'common.black'}} />
                            </NextLink>
                        </Box>
                        {/* linkedin */}
                        <Box>
                            <NextLink target="_blank" href='https://www.linkedin.com/in/derekjhuang/' >
                                <Image src={'/linkedin-icon.png'} width={linkedInIconWidth} height={linkedInIconHeight} alt='linkedin' />
                            </NextLink>
                        </Box>
                    </Box>
                </Box>
                <Box sx={{width:'70%', display:'flex', justifyContent:'center', alignItems:'center', flexDirection:'column'}}>
                    <ContactUs />
                </Box>
            </Box>
        </Box>
    );
}