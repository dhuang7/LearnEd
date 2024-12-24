'use client'

import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { useState } from 'react';


export default function PDSAPages() {
    const [pageNum, setPageNum] = useState(0);

    // handle tab change
    function handleChange(event, newValue) {
        setPageNum(newValue);
    }

    // pdsa colors
    const color = [ 'Chocolate', 'RoyalBlue', 'ForestGreen', 'Crimson']

    return (
        <Box sx={{height:'100%', width:'100%'}}>
            {/* tabs */}
            <Box sx={{ borderBottom: 1, borderColor: 'grey.300', width:'100%', display:'flex', justifyContent:'right' }}>
                <Tabs 
                    value={pageNum} 
                    onChange={handleChange} 
                    TabIndicatorProps={{
                        sx:{
                            backgroundColor: color[pageNum]
                        }
                    }}
                    sx={{
                        justifyContent:'right', display:'flex',
                        '& .Mui-selected': {
                            color: color[pageNum]
                        }
                    }}
                    >
                    <Tab label="Plan" sx={{p:0}} />
                    <Tab label="Do" sx={{p:0}}  />
                    <Tab label="Study" sx={{p:0}}  />
                    <Tab label="Act" sx={{p:0}}  />
                </Tabs>
            </Box>
            {/* Content */}
            <CustomTabPanel value={pageNum} index={0}>
                Item One
            </CustomTabPanel>
            <CustomTabPanel value={pageNum} index={1}>
                Item Two
            </CustomTabPanel>
            <CustomTabPanel value={pageNum} index={2}>
                Item Three
            </CustomTabPanel>
            <CustomTabPanel value={pageNum} index={3}>
                Item Four
            </CustomTabPanel>
        </Box>
    )
}

function CustomTabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
    <Box
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        {...other}
        >
        {value === index && children}
    </Box>
    );
}