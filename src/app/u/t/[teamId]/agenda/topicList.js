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



export default function TopicList({params}) {
    const [topics, setTopics] = useState([]);


    function handleAddTopic() {
        setTopics(ts => ts.concat([{
            orderNum: ts.length + 1,
            name: 'Enter text...',
            
        }]))
    }

    function handleDeleteTopic({currentTarget}) {
        const value = Number(currentTarget.dataset.ordernum)-1;
        if (topics.length === 1) {
            setTopics([]);
        } else {
            setTopics(ts => [
                ...ts.slice(0, value),
                ...ts.slice(value+1)
            ])
        }
        
    }

    function TopicListItem({orderNum, name}) {
        return (
            <ListItem 
                divider
                >
                <Box sx={{display:'flex', alignItems:'center', width:'100%'}}>
                    <Typography variant="h6" sx={{boxSizing:'border-box', pr:'.5rem'}}>Topic #{orderNum}:</Typography>
                    {/* <TextField 
                        label='topic'
                        sx={{
                            pr:'.5rem',
                            flexGrow:1,
                        }}
                        /> */}
                    <Box sx={{boxSizing:'border-box', pr:'.5rem', flexGrow:1}}>
                        <Button
                            sx={{
                                width:'100%',
                                textTransform:'none',
                                justifyContent:'left'
                            }}
                            >
                            {name}
                        </Button>
                    </Box>
                    <Autocomplete 
                        options={[{label:'test'}]}
                        sx={{width:'9rem', boxSizing:'border-box', pr:'.5rem'}} 
                        size='small'
                        renderInput={(params) => (
                            <TextField 
                                {...params} 
                                label="Cycles" 
                                />
                        )}
                        />
                    <IconButton data-ordernum={orderNum} onClick={handleDeleteTopic}><DeleteRoundedIcon /></IconButton>
                </Box>
            </ListItem>
        );
    }

    return (
        <>
            {/* Content */}
            <Box sx={{flexGrow:1, overflow:'hidden', }}>
                <Box sx={{height:'100%', overflow:'scroll'}}>
                    {/* Topic lists */}
                    <List disablePadding sx={{borderTop:'1px solid', borderColor:'grey.300'}}>
                        {topics.map((topic, i) => (
                            <TopicListItem key={i} {...topic} orderNum={i+1} />
                        ))}
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