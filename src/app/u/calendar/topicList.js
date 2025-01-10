'use client'

import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import AddRoundedIcon from '@mui/icons-material/AddRounded';

import TopicListItem from './topicListItem';



export default function TopicList({topics, setTopics}) {


    

    function handleAddTopic() {
        setTopics(ts => ts.concat([{
            order_num: ts.length + 1,
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
            setTopics(ts => {
                const newTs = [];
                let adjust = 0;
                ts.forEach((v, i) => {
                    const newV = {...v}
                    if (i === value) {
                        adjust = 1;
                        return;
                    }
                    newV.order_num = newV.order_num-adjust;
                    newTs.push(newV);
                })

                return newTs;
            })
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
                        {topics.sort((a,b) => a.order_num - b.order_num).map((topic, i) => (
                            <TopicListItem key={i} topic={topic} setTopics={setTopics} listOrder={i+1} handleDeleteTopic={handleDeleteTopic} />
                        ))}
                        {/* add new topic */}
                        <ListItem>
                            <Button 
                                color='info' 
                                sx={{borderRadius:3, textTransform:'none'}} 
                                startIcon={<AddRoundedIcon />}
                                onClick={handleAddTopic}
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