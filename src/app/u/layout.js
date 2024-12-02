'use client'

import Box from "@mui/material/Box";

import TopNav from './topNav';
import SideNav from './sideNav';
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import TextField from "@mui/material/TextField";
import DialogActions from "@mui/material/DialogActions";
import { useEffect, useState } from "react";
import createClient from "@/utils/supabase/client";
import useMediaQuery from "@mui/material/useMediaQuery";
import theme from "@/app/theme";
import {createProfile} from './createProfileAction';


export default function Navbars({children}) {
    const [open, setOpen] = useState(true);
    const [hasProfile, setHasProfile] = useState(true);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

    function handleOpen() {
        setOpen(o=>!o);
    }

    function handleCloseDialog(e) {
        setHasProfile(true);
    }

    function handleFirstName({target}) {
        setFirstName(target.value);
    }

    function handleLastName({target}) {
        setLastName(target.value);
    }

    async function handleSubmit(e) {
        e.preventDefault();
        await createProfile({firstName, lastName});
        handleCloseDialog();
    }

    useEffect(() => {
        async function getProfile() {
            const supabase = createClient();
            let { data: profiles, error } = await supabase
                .from('profiles')
                .select('*');

            setHasProfile(profiles.length > 0);
        }

        getProfile();
    }, [])
    

    return (
        <Box sx={{width:'100%', height:'100%', display:'flex', flexDirection:'column', overflow:'hidden'}}>
            {/* top navbar */}
            <Box sx={{width:'100%'}}>
                <TopNav handleOpen={handleOpen} />
            </Box>
            <Box flexGrow={1}>
                <Box sx={{width:'100%', height:'100%', display:'flex'}}>
                    {/* side drawer */}
                    <Box sx={{height:'100%'}}>
                        <SideNav open={open} />
                    </Box>
                    <Box flexGrow={1}>
                        {/* content */}
                        <Box sx={{width:'100%', height:'100%'}}>
                            {children}
                        </Box>
                    </Box>
                </Box>
            </Box>
            <Dialog
                open={!hasProfile}
                maxWidth='sm'
                fullWidth
                fullScreen={fullScreen}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                >
                <form onSubmit={handleSubmit}>
                    <DialogTitle id="alert-dialog-title">
                        Finish your profile
                    </DialogTitle>
                    <DialogContent>
                        <Box sx={{pt:1}}>
                            <TextField 
                                required
                                label='First Name'
                                value={firstName}
                                onChange={handleFirstName}
                                sx={{width:'100%', mb:'1rem'}}
                                />
                            <TextField 
                                required
                                label='Last Name'
                                value={lastName}
                                onChange={handleLastName}
                                sx={{width:'100%'}}
                                />
                        </Box>
                    </DialogContent>
                    <DialogActions>
                        <Button type='submit' autoFocus>
                            Save
                        </Button>
                    </DialogActions>
                </form>
            </Dialog>
        </Box>
    )
}
