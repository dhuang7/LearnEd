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
                        borderRadius:5, overflow:'hidden', border: '1px solid', borderColor:'divider', boxShadow: 3,
                        width:imageWidth, height: imageHeight, position:'relative',
                    }}
                    >
                    <Image src={src} alt={'demo'} fill />
                </Box>
            </Fade>
        );
    }

    return (
        <Box>
            <Box>
                {/* tabs */}
                <Tabs value={tab} onChange={handleChange} centered>
                    <Tab label="Driver Diagram" icon={<AccountTreeRoundedIcon fontSize="large" />} sx={{width:'10rem'}} />
                    <Tab label="Cycles" icon={<PublishedWithChangesRoundedIcon fontSize="large" />} sx={{width:'10rem'}}/>
                    <Tab label="Calendar" icon={<CalendarMonthRoundedIcon fontSize="large" />} sx={{width:'10rem'}}/>
                </Tabs>
            </Box>
            {/* demos to be shown */}
            <BoxImage src={'/driver-demo.png'} show={tab===0} />
            <BoxImage src={'/cycle-demo.png'} show={tab===1} />
            <BoxImage src={'/calendar-demo.png'} show={tab===2} />
        </Box>
        
    );
}