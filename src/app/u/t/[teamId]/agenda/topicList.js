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
import { useState } from "react";

import TopicListItem from './topicListItem';



export default function TopicList({topics, setTopics}) {


    

    function handleAddTopic() {
        setTopics(ts => ts.concat([{
            orderNum: ts.length + 1,
            name: '',
            outcomes:'',
            discussions:'',
            cycle_id:'',
        }]))
    }

    function handleDeleteTopic({currentTarget}) {
        const value = Number(currentTarget.dataset.order)-1;
        if (topics.length === 1) {
            setTopics([]);
        } else {
            setTopics(ts => [
                ...ts.slice(0, value),
                ...ts.slice(value+1)
            ])
        }
        
    }

    

    return (
        <>
            {/* Content */}
            <Box sx={{flexGrow:1, overflow:'hidden', }}>
                <Box sx={{height:'100%', overflowX:'hidden', borderTop:'1px solid', borderColor:'grey.300', boxSizing:'border-box'}}>
                    {/* Topic lists */}
                    <List disablePadding>
                        {/* topic list items */}
                        {topics.map((topic, i) => (
                            <TopicListItem key={i} topic={topic} setTopics={setTopics} listOrder={i+1} handleDeleteTopic={handleDeleteTopic} />
                        ))}
                        {/* add new topic */}
                        <ListItem>
                            <Button 
                                color='info' 
                                // variant='contained' disableElevation 
                                sx={{borderRadius:3, textTransform:'none'}} 
                                startIcon={<AddRoundedIcon />}
                                onClick={handleAddTopic}
                                // disabled={loading}
                                >
                                Topic
                            </Button>
                        </ListItem>
                    </List>
                </Box>
            </Box>                            
                        
        </>
        
    )
}