'use client'

import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import Dialog from '@mui/material/Dialog';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';
import List from '@mui/material/List';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Icon from '@mui/material/Icon';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import HelpOutlineRoundedIcon from '@mui/icons-material/HelpOutlineRounded';
import ArticleRoundedIcon from '@mui/icons-material/ArticleRounded';
import PeopleRoundedIcon from '@mui/icons-material/PeopleRounded';

import { useState } from 'react';
import NextLink from 'next/link';
import Image from "next/image";
import CollapsibleListItem from '@/components/collapsibleListItem';


export default function MobileMenu() {
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };
    
    const handleClose = () => {
        setOpen(false);
    };

    return (
        <>
            <IconButton 
                onClick={handleClickOpen}
                size='small'
                sx={{
                    display:{sx:'flex', md:'none'},
                    borderRadius:3,
                    border:'2px solid', borderColor:'grey.300', boxSizing:'border-box',
                    ml:'2px'
                }}
                >
                <MenuRoundedIcon />
            </IconButton>
            
            <Dialog
                fullScreen
                open={open}
                onClose={handleClose}
                slotProps= {{
                    backdrop: {
                        sx:{
                            backgroundColor: 'rgba(0, 0, 0, 0)',
                        }
                    }
                }}
                sx={{display:'flex', flexDirection:'column'}}
                >
                <AppBar color='inherit' position="relative" elevation={0} sx={{borderBottom: '1px solid', borderColor:'grey.300', boxSizing:'border-box'}}>
                    <Toolbar >
                        <Box sx={{display:'flex', width:'100%'}}>
                            {/* start */}
                            <Box sx={{alignItems:'center', display:'flex'}}>
                                {/* logo */}
                                <NextLink onClick={handleClose} href='/' style={{ textDecoration: 'none', color:'inherit', display:'flex', alignItems:'center' }}>
                                    <Icon sx={{height:'2.5rem', width:'2.5rem', position:'relative', mr:'.5rem'}}>
                                        <Image src={'/icon.svg'} alt={'icon'} fill />
                                    </Icon>
                                    <Typography variant="h6" color="primary" sx={{fontWeight:'bold'}}>LearnEd</Typography>
                                </NextLink>
                            </Box>
                            {/* middle */}
                            <Box flexGrow={1} />
                            {/* end */}
                            <Box sx={{alignItems:'center', display:'flex'}}>
                                <IconButton onClick={handleClose} component={NextLink} href='/help'><HelpOutlineRoundedIcon /></IconButton>
                                <IconButton
                                    color="inherit"
                                    onClick={handleClose}
                                    aria-label="close"
                                    // size='small'
                                    sx={{boxSizing:'border-box'}}
                                    >
                                    <CloseIcon />
                                </IconButton>
                            </Box>
                        </Box>
                    </Toolbar>
                </AppBar>
                {/* scroll section */}
                <Box sx={{flexGrow:1, overflow:'hidden'}}>
                    <Box sx={{width:'100%', height:'100%', overflow:'scroll'}}>
                        {/* login */}
                        <Box sx={{alignItems:'center', display:'flex', flexDirection:'column', p:'.5rem', boxSizing:'border-box'}}>
                            <Button 
                                fullWidth
                                variant="outlined" 
                                sx={{textTransform:'none', borderRadius:3, py:'.5rem', my:'.5rem'}}
                                component={NextLink}
                                href='/login'
                                >
                                Login
                            </Button>
                            <Button 
                                fullWidth
                                variant="contained" disableElevation 
                                sx={{textTransform:'none', borderRadius:3, py:'.5rem', my:'.5rem'}}
                                component={NextLink}
                                href='/login/signup'
                                >
                                Sign up
                            </Button>
                        </Box>
                        <Divider />
                        {/* nav */}
                        <List disablePadding>
                            <CollapsibleListItem title='Resources'>
                                <List disablePadding sx={{}}>
                                    <ListItemButton onClick={handleClose} component={NextLink} href='/blog'>
                                        <ListItemIcon><ArticleRoundedIcon /></ListItemIcon>
                                        <ListItemText
                                            primary="Blog"
                                            />
                                    </ListItemButton>
                                    <ListItemButton onClick={handleClose} component={NextLink} href='/experts'>
                                        <ListItemIcon><PeopleRoundedIcon /></ListItemIcon>
                                        <ListItemText
                                            primary="Experts"
                                            />
                                    </ListItemButton>
                                    <ListItemButton onClick={handleClose} component={NextLink} href='/help'>
                                        <ListItemIcon><HelpOutlineRoundedIcon /></ListItemIcon>
                                        <ListItemText
                                            primary="Help Center"
                                            />
                                    </ListItemButton>
                                </List>
                            </CollapsibleListItem>
                            <ListItemButton onClick={handleClose} component={NextLink} href='/pricing'>
                                <ListItemText
                                    primary="Pricing"
                                    />
                            </ListItemButton>
                        </List>
                    </Box>
                </Box>
            </Dialog>


        </>
    );
}
