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
    const [editTitle, setEditTitle] = useState(false);
    const [editOutcomes, setEditOutcomes] = useState(false);
    const [editDiscussions, setEditDiscussions] = useState(false);

    function handleName({target}) {
        setTopics(ts => {
            ts[listOrder-1] = {
                ...ts[listOrder-1],
                name: target.value,
            }

            return [...ts];
        })
    }

    function handleOutcomes({target}) {
        setTopics(ts => {
            ts[listOrder-1] = {
                ...ts[listOrder-1],
                outcomes: target.value,
            }

            return [...ts];
        })
    }

    function handleDiscussions({target}) {
        setTopics(ts => {
            ts[listOrder-1] = {
                ...ts[listOrder-1],
                discussions: target.value,
            }

            return [...ts];
        })
    }

    function handleEditTitle() {
        setEditTitle(s=>!s);
    }

    function handleEditOutcomes() {
        setEditOutcomes(s=>!s);
    }

    function handleEditDiscussions() {
        setEditDiscussions(s=>!s);
    }

    return (
        <ListItem 
            divider
            sx={{
                flexDirection:'column',
                display:'flex'
            }}
            >
            {/* TITLE */}
            <Box sx={{display:'flex', alignItems:'center', width:'100%'}}>
                {/* Topic number */}
                <Typography variant="h6" sx={{boxSizing:'border-box', whiteSpace:'nowrap'}}>Topic #{listOrder}:</Typography>
                {/* Button Edit Text */}
                {(editTitle)
                    ? <Box sx={{boxSizing:'border-box', pr:'.5rem', flexGrow:1}}>
                        {/* text */}
                        <TextField 
                            size='small'
                            fullWidth
                            autoFocus
                            value={topic.name}
                            onChange={handleName}
                            onBlur={handleEditTitle}
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
                            onClick={handleEditTitle}
                            sx={{
                                width:'100%',
                                textTransform:'none',
                                whiteSpace:'pre-wrap',
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

            {/* THE REST */}
            {/* outcomes */}
            <Box sx={{width:'100%', boxSizing:'border-box', pt:'.23rem'}}>
                {/* title */}
                <Typography sx={{fontWeight:'bold'}}>Outcomes:</Typography>
                {/* writing box and button */}
                {(editOutcomes)
                    ? <Box sx={{boxSizing:'border-box', pr:'.5rem', flexGrow:1}}>
                        {/* text */}
                        <TextField 
                            size='small'
                            fullWidth
                            autoFocus
                            value={topic.outcomes}
                            onChange={handleOutcomes}
                            onBlur={handleEditOutcomes}
                            multiline
                            slotProps={{
                                input: {
                                    sx: {
                                        p:'6px 8px',
                                        lineHeight:'1.5',
                                    }
                                },
                            }}
                            />
                    </Box>
                    : <Button onClick={handleEditOutcomes} sx={{width:'100%', textTransform:'none', whiteSpace:'pre-wrap',}}>
                        <Box sx={{width:'100%', overflow:'hidden'}}>
                            <Typography align='left' color='textSecondary' sx={{wordWrap: 'break-word'}}>
                                {topic.outcomes || 'Enter text...'}
                            </Typography>
                        </Box>
                    </Button>
                }
            </Box>

            {/* Discussions */}
            <Box sx={{width:'100%', boxSizing:'border-box', pt:'.23rem'}}>
                {/* title */}
                <Typography sx={{fontWeight:'bold'}}>Discussions:</Typography>
                {/* writing box and button */}
                {(editDiscussions)
                    ? <Box sx={{boxSizing:'border-box', pr:'.5rem', flexGrow:1}}>
                        {/* text */}
                        <TextField 
                            size='small'
                            fullWidth
                            autoFocus
                            value={topic.discussions}
                            onChange={handleDiscussions}
                            onBlur={handleEditDiscussions}
                            multiline
                            slotProps={{
                                input: {
                                    sx: {
                                        p:'6px 8px',
                                        lineHeight:'1.5',
                                    }
                                },
                            }}
                            />
                    </Box>
                    : <Button onClick={handleEditDiscussions} sx={{width:'100%', textTransform:'none', whiteSpace:'pre-wrap',}}>
                        <Box sx={{width:'100%', overflow:'hidden'}}>
                            <Typography align='left' color='textSecondary' sx={{wordWrap: 'break-word'}}>
                                {topic.discussions || 'Enter text...'}
                            </Typography>
                        </Box>
                    </Button>
                }
            </Box>
        </ListItem>
    );
}