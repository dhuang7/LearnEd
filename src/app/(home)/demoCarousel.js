'use client'

import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import AccountTreeRoundedIcon from '@mui/icons-material/AccountTreeRounded';
import PublishedWithChangesRoundedIcon from '@mui/icons-material/PublishedWithChangesRounded';
import CalendarMonthRoundedIcon from '@mui/icons-material/CalendarMonthRounded';
import Fade from '@mui/material/Fade';

import Image from "next/image";
import { useState } from "react";



export default function DemoCarousel() {
    const imageWidth = 1000;
    const imageHeight = 0.53509933774 * imageWidth;

    const [tab, setTab] = useState(0);

    function handleChange(event, newValue) {
        setTab(newValue);
    }

    function BoxImage({src, show}) {
        if (!show) return;
        return (
            <Fade in={show} timeout={{enter:750}}>
                <Box 
                    sx={{
                        borderRadius:{xs:2, sm:4, md:5}, overflow:'hidden', border: '1px solid', borderColor:'divider', boxShadow: 3,
                        width:'80%', aspectRatio: 1/0.53509933774, position:'relative',
                    }}
                    >
                    <Image src={src} alt={'demo'} fill />
                </Box>
            </Fade>
        );
    }

    return (
        <Box sx={{display:'flex', flexDirection:'column', alignItems:'center', width:'100%'}}>
            <Box sx={{display:'flex', justifyContent:'center', width:'100%'}}>
                {/* tabs */}
                {/* MAKE THESE TABS SCROLLABLE */}
                <Tabs value={tab} onChange={handleChange}  sx={{width:{sx:'70%', md:'45%'}}} scrollButtons='auto' allowScrollButtonsMobile variant="scrollable">
                    <Tab label="Driver Diagram" icon={<AccountTreeRoundedIcon fontSize="large" />} sx={{width:'33.33%'}} />
                    <Tab label="Cycles" icon={<PublishedWithChangesRoundedIcon fontSize="large" />} sx={{width:'33.33%'}}/>
                    <Tab label="Calendar" icon={<CalendarMonthRoundedIcon fontSize="large" />} sx={{width:'33.33%'}}/>
                </Tabs>
            </Box>
            {/* demos to be shown */}
            <BoxImage src={'/driver-demo.png'} show={tab===0} />
            <BoxImage src={'/cycle-demo.png'} show={tab===1} />
            <BoxImage src={'/calendar-demo.png'} show={tab===2} />
        </Box>
        
    );
}