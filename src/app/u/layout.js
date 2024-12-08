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
import { useEffect, useState, useContext, createContext } from "react";
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
    const [teamInfo, setTeamInfo] = useState(null);

    // handlers
    function handleOpen() {
        // toggles the side bar
        setOpen(o=>!o);
    }

    function handleCloseDialog(e) {
        // profile dialog
        setHasProfile(true);
    }

    function handleFirstName({target}) {
        // profile
        setFirstName(target.value);
    }

    function handleLastName({target}) {
        // profile
        setLastName(target.value);
    }

    async function handleSubmit(e) {
        // profile
        e.preventDefault();
        const {data, error} = await createProfile({firstName, lastName});
        if (error) {
            console.log(error);
            return;
        }
        handleCloseDialog();
    }
    
    useEffect(() => {
        async function getProfile() {
            // checks if user has a profile
            const supabase = createClient();
            const { data: { user } } = await supabase.auth.getUser();
            let { data: profiles, error } = await supabase
                .from('profiles')
                .select('*')
                .eq('user_id', user.id);

            setHasProfile(profiles.length > 0);
        }

        getProfile();

        
    }, [])
    

    return (
        <TeamContext.Provider value={[teamInfo, setTeamInfo]}>
            <Box sx={{width:'100%', height:'100%', display:'flex', flexDirection:'column', overflow:'hidden'}}>
                {/* top navbar */}
                <Box sx={{width:'100%'}}>
                    <TopNav handleOpen={handleOpen} />
                </Box>
                {/* rest */}
                <Box flexGrow={1} sx={{overflow:'hidden'}}>
                    <Box sx={{width:'100%', height:'100%', display:'flex'}}>
                        {/* side drawer */}
                        <Box sx={{height:'100%'}}>
                            <SideNav open={open} />
                        </Box>
                        {/* rest */}
                        <Box flexGrow={1} sx={{ overflow:'hidden' }}>
                            {/* ------ MAIN CONTENT ------ */}
                            <Box sx={{width:'100%', height:'100%', backgroundColor:'grey.100'}}>
                                {children}
                            </Box>
                        </Box>
                    </Box>
                </Box>
                {/* profile completion dialog */}
                <Dialog
                    open={!hasProfile}
                    maxWidth='sm'
                    fullWidth
                    fullScreen={fullScreen}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                    >
                    <form onSubmit={handleSubmit}>
                        {/* title */}
                        <DialogTitle id="alert-dialog-title">
                            Finish your profile
                        </DialogTitle>
                        {/* content */}
                        <DialogContent>
                            <Box sx={{pt:1}}>
                                {/* first name */}
                                <TextField 
                                    required
                                    label='First Name'
                                    value={firstName}
                                    onChange={handleFirstName}
                                    sx={{width:'100%', mb:'1rem'}}
                                    />
                                {/* last name */}
                                <TextField 
                                    required
                                    label='Last Name'
                                    value={lastName}
                                    onChange={handleLastName}
                                    sx={{width:'100%'}}
                                    />
                            </Box>
                        </DialogContent>
                        {/* button save */}
                        <DialogActions>
                            <Button type='submit' autoFocus>
                                Save
                            </Button>
                        </DialogActions>
                    </form>
                </Dialog>
            </Box>
        </TeamContext.Provider>
    )
}

export const TeamContext = createContext(null);

export function useTeamContext() {
    // gets and stores the team context when you have a specific team
    const context = useContext(TeamContext);
    if (!context) throw new Error('useTeamContext must be used within ParentProvider');
    return context;
}