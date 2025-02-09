'use client'

import Typography from "@mui/material/Typography";


import { useState } from "react";
import ExpertDialog from "../experts/expertDialog";
import { expertsList } from "../experts/expertsList";




export default function AuthorInfo({author}) {
    const expert = expertsList.filter(v => v.name === author)[0];
    const [open, setOpen] = useState(false);


    return (
        <>
            <Typography 
                onClick={() => setOpen(true)}
                variant="h5" 
                align="left" 
                sx={{
                    color:'primary.contrastText', overflowWrap:'break-word', textDecoration:'underline',
                    '&:hover': {
                        cursor:'pointer',
                    }
                }}
                >
                By {expert ? expert.name : author}
            </Typography>
            
            {expert && <ExpertDialog expert={expert} open={open} setOpen={setOpen} />}
        </>
    );
}