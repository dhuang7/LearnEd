import Box from "@mui/material/Box";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import HelpOutlineRoundedIcon from '@mui/icons-material/HelpOutlineRounded';


import NextLink from 'next/link';

export default function TopNav({handleOpen}) {

    return (
        <AppBar color='inherit' position="relative" elevation={0} sx={{borderBottom: '1px solid', borderColor:'grey.300', boxSizing:'border-box'}}>
            <Toolbar >
                <Box sx={{display:'flex', width:'100%'}}>
                    {/* start */}
                    <Box sx={{alignItems:'center', display:'flex'}}>
                        <NextLink href='/' style={{ textDecoration: 'none', color:'inherit' }}>
                            <Typography variant="h6" color="primary" sx={{fontWeight:'bold'}}>LearnEd</Typography>
                        </NextLink>
                    </Box>
                    {/* middle */}
                    <Box flexGrow={1} />
                    {/* end */}
                    <Box sx={{alignItems:'center', display:'flex'}}>
                        <IconButton><HelpOutlineRoundedIcon /></IconButton>
                        <Button 
                            variant="outlined" 
                            sx={{textTransform:'none', borderRadius:3, width:'5.5rem', py:'.5rem', ml:'.5rem'}}
                            component={NextLink}
                            href='/login'
                            >
                            Login
                        </Button>
                        <Button 
                            variant="contained" disableElevation 
                            sx={{ml: '.5rem', textTransform:'none', borderRadius:3, width:'5.5rem', py:'.5rem'}}
                            component={NextLink}
                            href='/login/signup'
                            >
                            Sign up
                        </Button>
                    </Box>
                </Box>
            </Toolbar>
        </AppBar>
    )
}
