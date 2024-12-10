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





export default function TopicListItem({topic, setTopics, listOrder, handleDeleteTopic}) {
    const {orderNum, name} = topic;
    const [showText, setShowText] = useState(false);

    function handleButtonEdit() {
        setShowText(s=>!s);
    }

    return (
        <ListItem 
            divider
            >
            <Box sx={{display:'flex', alignItems:'center', width:'100%'}}>
                <Typography variant="h6" sx={{boxSizing:'border-box', pr:'.5rem'}}>Topic #{listOrder}:</Typography>
                {(showText)
                ? <Box sx={{boxSizing:'border-box', pr:'.5rem', flexGrow:1}}>
                    <TextField 
                        size='small'
                        fullWidth
                        autoFocus
                        onBlur={handleButtonEdit}
                        />
                </Box>
                : <Box sx={{boxSizing:'border-box', pr:'.5rem', flexGrow:1}}>
                    <Button
                        onClick={handleButtonEdit}
                        sx={{
                            width:'100%',
                            textTransform:'none',
                            justifyContent:'left'
                        }}
                        >
                        {name}
                    </Button>
                </Box>
                }
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
                <IconButton data-order={listOrder} onClick={handleDeleteTopic}><DeleteRoundedIcon /></IconButton>
            </Box>
        </ListItem>
    );
}