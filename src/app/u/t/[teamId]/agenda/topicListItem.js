'use client'

import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Typography from "@mui/material/Typography";
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import IconButton from "@mui/material/IconButton";
import Autocomplete from "@mui/material/Autocomplete";
import SubdirectoryArrowRightRoundedIcon from '@mui/icons-material/SubdirectoryArrowRightRounded';
import { useState } from "react";





export default function TopicListItem({topic, setTopics, listOrder, handleDeleteTopic}) {
    const [showText, setShowText] = useState(false);

    function handleName({target}) {
        setTopics(ts => {
            ts[listOrder-1] = {
                ...ts[listOrder],
                name: target.value,
            }

            return [...ts];
        })
    }

    function handleCancelEnter(event) {
        if (event.key === 'Enter') {
            event.preventDefault();
            event.target.blur();
        }
    }

    function handleButtonEdit() {
        setShowText(s=>!s);
    }

    return (
        <ListItem 
            divider
            sx={{
                flexDirection:'column',
                display:'flex'
            }}
            >
            {/* list item titles */}
            <Box sx={{display:'flex', alignItems:'center', width:'100%'}}>
                {/* Topic number */}
                <Typography variant="h6" sx={{boxSizing:'border-box', whiteSpace:'nowrap'}}>Topic #{listOrder}:</Typography>
                {/* Button Edit Text */}
                {(showText)
                ? <Box sx={{boxSizing:'border-box', pr:'.5rem', flexGrow:1}}>
                    {/* text */}
                    <TextField 
                        size='small'
                        fullWidth
                        autoFocus
                        value={topic.name}
                        onChange={handleName}
                        onKeyDown={handleCancelEnter}
                        onBlur={handleButtonEdit}
                        multiline
                        slotProps={{
                            input: {
                                sx: theme => ({
                                    p:'6px 8px',
                                    lineHeight:'1.5',
                                    fontSize:theme.typography.h6
                                })
                            },
                        }}
                        />
                </Box>
                : <Box sx={{boxSizing:'border-box', pr:'.5rem', flexGrow:1, overflow:'hidden'}}>
                    {/* button */}
                    <Button
                        onClick={handleButtonEdit}
                        sx={{
                            width:'100%',
                            textTransform:'none',
                        }}
                        >
                        <Box sx={{width:'100%', overflow:'hidden'}}>
                            <Typography align='left' variant='h6' sx={{wordWrap: 'break-word'}}>
                                {topic.name || 'Enter text...'}
                            </Typography>
                        </Box>
                    </Button>
                </Box>
                }
                {/* cycles */}
                <Autocomplete 
                    options={[{label:'test'}]}
                    sx={{width:'9rem', boxSizing:'border-box', pr:'.5rem'}} 
                    size='small'
                    renderInput={(params) => (
                        <TextField 
                            {...params} 
                            label="Cycles" 
                            sx={{width:'9rem'}}
                            />
                    )}
                    />
                {/* trash */}
                <IconButton data-order={listOrder} onClick={handleDeleteTopic}><DeleteRoundedIcon /></IconButton>
            </Box>
            {/* outcomes */}
            <Box sx={{width:'100%', display:'flex', justifyContent:'left'}}>
                {/* arrow icon */}
                {/* <SubdirectoryArrowRightRoundedIcon /> */}
                {/* content */}
                <Box sx={{flexGrow:1, overflow:'hidden', boxSizing:'border-box', pt:'.23rem'}}>
                    {/* title */}
                    <Typography sx={{fontWeight:'bold'}}>Outcomes:</Typography>
                    {/* writing box and button */}
                    <Button sx={{width:'100%', textTransform:'none'}}>
                        <Box sx={{width:'100%', overflow:'hidden'}}>
                            <Typography align='left' sx={{wordWrap: 'break-word'}}>woei3jeoiiweofijwwefwfnwejkfnwefeofiwjeofijwoefjwoejfowiefjowiejfowijefoiwjefowjoefjwoejfowjefw3</Typography>
                        </Box>
                    </Button>
                </Box>
            </Box>
            <Box sx={{width:'100%', display:'flex', justifyContent:'left'}}>
                {/* arrow icon */}
                {/* <SubdirectoryArrowRightRoundedIcon /> */}
                {/* content */}
                <Box sx={{flexGrow:1, overflow:'hidden', boxSizing:'border-box', pt:'.23rem'}}>
                    {/* title */}
                    <Typography sx={{fontWeight:'bold'}}>Discussion:</Typography>
                    {/* writing box and button */}
                    <Button sx={{width:'100%', textTransform:'none'}}>
                        <Box sx={{width:'100%', overflow:'hidden'}}>
                            <Typography align='left' sx={{wordWrap: 'break-word'}}>woei3jeoiiweofijwwefwfnwejkfnwefeofiwjeofijwoefjwoejfowiefjowiejfowijefoiwjefowjoefjwoejfowjefw3</Typography>
                        </Box>
                    </Button>
                </Box>
            </Box>
        </ListItem>
    );
}