import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import PublishedWithChangesRoundedIcon from '@mui/icons-material/PublishedWithChangesRounded';
import GroupsRoundedIcon from '@mui/icons-material/GroupsRounded';
import YoutubeSearchedForRoundedIcon from '@mui/icons-material/YoutubeSearchedForRounded';
import CorporateFareRoundedIcon from '@mui/icons-material/CorporateFareRounded';
import AccountBalanceRoundedIcon from '@mui/icons-material/AccountBalanceRounded';
import SchoolRoundedIcon from '@mui/icons-material/SchoolRounded';

import NextLink from 'next/link';
import DemoCarousel from "./demoCarousel";
import Image from "next/image";
import Footer from "./footer";
import Reasons from "./reasons";
import Audience from "./audience";


export default function Page() {

    return (
        <Box sx={{width:'100%', height:'100%', overflow:'scroll'}}>
            <Box sx={{width:'100%', display:'flex', pt:'5%', px:'.5rem', boxSizing:'border-box', alignItems: 'center', flexDirection:'column'}}>
                {/* Slogan */}
                <Typography variant="h2" color="primary" align="center" sx={{fontWeight:'bold', display:'flex', flexWrap:'wrap', justifyContent:'center'}}>
                    Empower
                    <Typography variant="inherit" color="secondary" sx={{fontWeight:'inherit', mx:'1.25rem'}} component={'span'}>Educators</Typography> 
                    to lead change.
                </Typography>
                {/* description */}
                <Typography variant="h5" color="textSecondary" align="center" sx={{width:'60%', mt:'2rem'}}>
                    LearnEd makes it easy to collaborate with educators to improve the teaching experience.
                </Typography>
                {/* get started button */}
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
            {/* image carousel */}
            <Box sx={{width:'100%'}}>
                <Box sx={{width:'100%', alignItems:'center', display:'flex', justifyContent:'center'}}>
                    <DemoCarousel />
                </Box>
            </Box>
            {/* first reasoning */}
            <Box sx={{width:'100%', backgroundColor:'grey.100'}}>
                <Box sx={{
                    width:'100%', boxSizing:'border-box', py:{xs:'5rem', md:'10%'}, 
                    alignItems:'center', display:'flex', flexDirection:{xs:'column', md:'row'},
                    }}
                    >
                    {/* broken */}
                    <Box sx={{
                            width:{xs:'100%', md:'50%'}, 
                            display:'flex', alignItems:'center', justifyContent:'center', flexDirection:'column',
                            // pt:{xs:'2rem', md:0}, boxSizing:'border-box'
                        }}
                        >
                        {/* titles */}
                        <Box sx={{width:'75%', mb:'2rem'}}>
                            <Typography variant="h3" color="secondary" align="center" sx={{fontWeight:'bold'}}>Work is broken.</Typography>
                            <Typography variant="h6" color="textSecondary" align="center">
                                PLCs fail to collaborate effectively because of a lack of organized learning.
                            </Typography>
                        </Box>
                        {/* image */}
                        <Box 
                            sx={{
                                width:{xs: '80%',sm:'25rem'}, aspectRatio:1, 
                                overflow:'hidden', borderRadius:5, boxShadow:3, 
                                position:'relative',
                            }}
                            >
                            <Image src='/fragmented-work.png' alt='fragmented work' fill />
                        </Box>
                    </Box>
                    {/* fixed */}
                    <Box sx={{
                            width:{xs:'100%', md:'50%'}, 
                            display:'flex', alignItems:'center', justifyContent:'center', flexDirection:'column',
                            pt:{xs:'4rem', md:0}, boxSizing:'border-box'
                        }}
                        >
                        {/* titles */}
                        <Box sx={{width:'75%', mb:'2rem'}}>
                            <Typography variant="h3" color="secondary" align="center" sx={{fontWeight:'bold'}}>Let's improve.</Typography>
                            <Typography variant="h6" color="textSecondary" align="center">
                                Organize your work, learning, and collaboration all in one central hub.
                            </Typography>
                        </Box>
                        {/* images */}
                        <Box 
                            sx={{
                                width:{xs: '80%',sm:'25rem'}, aspectRatio:1, 
                                overflow:'hidden', 
                                position:'relative',
                            }}
                            >
                            <Image src='/icon.png' alt='icon' fill />
                        </Box>
                    </Box>
                </Box>
            </Box>
            {/* Title reason */}
            <Box sx={{width:'100%', boxSizing:'border-box', py:'5rem'}}>
                <Box sx={{width:'100%', display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center'}}>
                    <Box sx={{width:{xs:'80%', md:'40%'}}}>
                        <Typography variant="h3" color="primary" align="center" sx={{fontWeight:'bold', mb:'1rem'}}>Save time and learn more.</Typography>
                        <Typography variant="h6" color="textSecondary" align="center">
                            Streamline collaboration, manage cycles, and drive improvement effortlessly so that you can focus on what matters most.
                        </Typography>
                    </Box>
                </Box>
            </Box>
            {/* reasons */}
            <Reasons 
                icon={YoutubeSearchedForRoundedIcon}
                title='Find proven practices.'
                description={
                    `Streamline professional learning communities using proven change ideas. 
                    Simplify agenda planning, track progress, and foster continuous improvement—all in one platform.`
                }
                buttonText='Discover now'
                image='/search-ideas.png'
                imageStyle={{
                    borderRadius:3, border:'1px solid', borderColor:'grey.300',
                    boxShadow:5,
                    width:'100%',
                    aspectRatio: '3024/1612',
                    display:'flex',
                }}
                backgroundColor={'grey.100'}
                />
            <Reasons 
                icon={GroupsRoundedIcon}
                title='Collaborate efficiently.'
                description={
                    `Empowers educators to streamline teamwork, align goals, and share insights effortlessly. 
                    From building agendas to tracking progress, everything you need to foster meaningful collaboration is at your fingertips.`
                }
                buttonText='Start Collaborating'
                image='/collaborate-calendar.png'
                imageStyle={{
                    borderRadius:3, border:'1px solid', borderColor:'grey.300',
                    boxShadow:5,
                    width:'100%',
                    aspectRatio: '3024/1612',
                }}
                reverse
                />
            <Reasons 
                icon={PublishedWithChangesRoundedIcon}
                title='Manage cycles.'
                description={
                    `Seamlessly organize and track Plan-Do-Study-Act cycles.
                    Monitor progress, document outcomes, and drive continuous improvement with ease. 
                    Simplify the process and stay focused on achieving your goals.`
                }
                buttonText='Create a cycle'
                image='/manage-cycles.png'
                imageStyle={{
                    borderRadius:3, border:'1px solid', borderColor:'grey.300',
                    boxShadow:5,
                    width:'100%',
                    aspectRatio: '3024/1612',
                }}
                backgroundColor={'grey.100'}
                />

            {/* Audience */}
            <Box sx={{py:'5rem', display:'flex', alignItems:'center', justifyContent:'center', flexDirection:'column'}}>
                <Typography variant="h3" color="primary" sx={{fontWeight:'bold', mb:'3rem'}}>Who We Serve</Typography>
                <Box sx={{display:'flex', maxWidth:'100%', flexWrap:'wrap', justifyContent:'center'}}>
                    <Audience 
                        title='Districts'
                        description='Streamline improvement work for schools, coaches, and teams to improve PLC effectiveness and student outcomes.'
                        icon={<CorporateFareRoundedIcon sx={{fontSize:'7.5rem', color:'text.secondary'}} />}
                        />
                    <Audience 
                        title='Schools'
                        description='Guide student outcome plans school wide through high-functioning PLCs and coaches.'
                        icon={<AccountBalanceRoundedIcon sx={{fontSize:'7.5rem', color:'text.secondary'}}/>}
                        />
                    <Audience 
                        title='Coaches'
                        description='Support teacher teams with individual professional development and data analysis.'
                        icon={<SchoolRoundedIcon sx={{fontSize:'7.5rem', color:'text.secondary'}}/>}
                        />
                    <Audience 
                        title='Teams'
                        description='Demonstrate student outcome improvements through highly collaborative and functioning teams.'
                        icon={<GroupsRoundedIcon sx={{fontSize:'7.5rem', color:'text.secondary'}} />}
                        />
                </Box>
            </Box>
            <Footer />
        </Box>
    );
}