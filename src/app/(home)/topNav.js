import Box from "@mui/material/Box";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import HelpOutlineRoundedIcon from '@mui/icons-material/HelpOutlineRounded';
import Icon from '@mui/material/Icon';

import Image from "next/image";
import NextLink from 'next/link';
import NavMenus from "./navMenus";
import MobileMenu from "./mobileMenu";

export default function TopNav({handleOpen}) {

    return (
        <AppBar color='inherit' position="relative" elevation={0} sx={{borderBottom: '1px solid', borderColor:'grey.300', boxSizing:'border-box'}}>
            <Toolbar >
                <Box sx={{display:'flex', width:'100%'}}>
                    {/* start */}
                    <Box sx={{alignItems:'center', display:'flex'}}>
                        {/* logo */}
                        <NextLink href='/' style={{ textDecoration: 'none', color:'inherit', display:'flex', alignItems:'center' }}>
                            <Icon sx={{height:'2.5rem', width:'2.5rem', position:'relative', mr:'.5rem'}}>
                                <Image src={'/icon.svg'} alt={'icon'} fill />
                            </Icon>
                            <Typography variant="h6" color="primary" sx={{fontWeight:'bold'}}>LearnEd</Typography>
                        </NextLink>
                        {/* nav */}
                        <Box sx={{display:{xs:'none', md:'flex'}, alignItems:'center', ml:'1rem'}}>
                            <NavMenus />
                        </Box>
                    </Box>
                    {/* middle */}
                    <Box flexGrow={1} />
                    {/* end */}
                    <Box sx={{alignItems:'center', display:'flex'}}>
                        <IconButton component={NextLink} href='/help'><HelpOutlineRoundedIcon /></IconButton>
                        <Button 
                            variant="outlined" 
                            sx={{textTransform:'none', borderRadius:3, width:'5.5rem', py:'.5rem', ml:'.5rem', display:{xs:'none', md:'flex'}}}
                            component={NextLink}
                            href='/login'
                            >
                            Login
                        </Button>
                        <Button 
                            variant="contained" disableElevation 
                            sx={{ml: '.5rem', textTransform:'none', borderRadius:3, width:'5.5rem', py:'.5rem', display:{xs:'none', md:'flex'}}}
                            component={NextLink}
                            href='/login/signup'
                            >
                            Sign up
                        </Button>
                        {/* Mobile Menu */}
                        <MobileMenu />
                    </Box>
                </Box>
            </Toolbar>
        </AppBar>
    )
}
