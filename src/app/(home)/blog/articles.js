'use client'

import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';


import { useEffect, useState } from "react";
import ArticleCard from "./articleCard";




export default function Articles({articles, searchBarHeight}) {
    const [searchText, setSearchText] = useState('');
    const [shownArticles, setShownArticles] = useState(articles);

    useEffect(() => {
        setShownArticles(articles.filter(vf => {
            if (searchText === '') return true;
            const searchString = vf.title + ' ' + vf.description;
            return search(searchString, searchText);
        }))
    }, [searchText]);

    function handleSearchText({target}) {
        setSearchText(target.value);
    }

    return (
        <>
            {/* search bar */}
            <Box sx={{width:'100%', display:'flex', justifyContent:'center', height:0}}>
                <Paper
                    sx={{
                        width:'80%', height:`${searchBarHeight}rem`,
                        border:'1px solid', borderColor:'grey.300', borderRadius:3,
                        position:'relative', top:`-${searchBarHeight/2}rem`,
                        boxShadow:0,
                    }}
                    >
                    <Box 
                        sx={{
                            display:'flex', justifyContent:'center', alignItems:'center', 
                            height:'100%',
                            boxSizing:'border-box', px:'5rem'
                        }}
                        >
                        {/* Search bar */}
                        <TextField
                            fullWidth
                            variant="standard"
                            placeholder='Search...'
                            value={searchText}
                            onChange={handleSearchText}
                            slotProps={{
                                input:{
                                    endAdornment:(
                                        <InputAdornment position='end'>
                                            <IconButton size='large' edge="end">
                                                <SearchRoundedIcon fontSize="large" />
                                            </IconButton>
                                        </InputAdornment>
                                    )
                                },
                                htmlInput:{
                                    sx:{
                                        fontSize:'2rem'
                                    }
                                }
                            }}
                            />
                    </Box>
                </Paper>
            </Box>
            {/* articles */}
            <Box sx={{width:'100%', display:'flex', justifyContent:'center', flexWrap:'wrap', pb:'1rem', pt:`${searchBarHeight/2+1}rem`, boxSizing:'border-box'}}>
                {Boolean(shownArticles.length) || <Typography color="textSecondary" sx={{height:'20rem', mt:'2rem'}}>No articles...</Typography>}
                {shownArticles.map((article, i) => (
                    <ArticleCard key={i} article={article} />
                ))}
            </Box>
        </>
    );
}


function search(text, searchString) {
    const searchValues = searchString.split(' ').map(value => value.trim().toLowerCase());
    const lowerText = text.toLowerCase();

    const allFound = searchValues.every(value => lowerText.includes(value));
    console.log(searchValues)
    return allFound;
}