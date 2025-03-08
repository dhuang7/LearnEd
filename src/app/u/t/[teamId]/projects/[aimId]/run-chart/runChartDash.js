'use client'

import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";
import createClient from "@/utils/supabase/client";



export default function RunChartDash({
    aimId, measureTypes, 
    category, process, measure, 
    setCategory, setProcess, setMeasure
}) {
    const supabase = createClient();
    const [processes, setProcesses] = useState([]);
    const [categoryText, setCategoryText] = useState(category);
    const [processText, setProcessText] = useState(process);
    const [measureText, setMeasureText] = useState(measure);

    // initialize
    useEffect(() => {
        async function getProcesses() {
            const eqProjects = categoryText === 'projects' ? 'id' : 'aim_id';

            const {data, error} = await supabase
                .from(categoryText)
                .select(
                    categoryText === 'change_ideas'
                        ? `*, ...change_packages(name)`
                        : `*`
                )
                .eq(eqProjects, aimId);

            setProcesses(data);
            setProcessText(data[0].id);
        }

        getProcesses();
    }, [categoryText]);

    // handlers /////////////

    async function handleCategoryText({target}) {
        setCategoryText(target.value);
        setCategory(target.value);
    }

    function handleProcessText({target}) {
        setProcessText(target.value);
        setProcess(target.value);
    }

    function handleMeasureText({target}) {
        setMeasureText(target.value);
        setMeasure(target.value);
    }

    return (
        <Paper 
            elevation={0} 
            sx={{
                borderRadius:3, boxSizing:'border-box', border:'1px solid', borderColor: 'grey.300',
                p:'.5rem', py: '.5rem', height:'100%', width:'100%', overflow:'hidden',
                display:'flex', flexDirection:'column', position:'relative'
            }}
            >
            {/* title */}
            <Typography variant="h6" align="center">Select Chart:</Typography>
            {/* Category */}
            <TextField
                select
                label="Category"
                value={categoryText}
                onChange={handleCategoryText}
                slotProps={{
                    htmlInput: {
                        sx: {
                            py:'.5rem'
                        }
                    },
                    inputLabel: {
                        shrink: true,
                    }
                }}
                sx={{mt:'1rem'}}
                >
                <MenuItem value={'projects'}>Aim</MenuItem>
                <MenuItem value={'primary_drivers'}>Primary Driver</MenuItem>
                <MenuItem value={'secondary_drivers'}>Secondary Driver</MenuItem>
                <MenuItem value={'change_ideas'}>Change Idea</MenuItem>
                {/* <MenuItem value={'pdsa_cycles'}>Cycles</MenuItem> */}
            </TextField>
            {/* Process */}
            <TextField
                select
                label="Process"
                value={processText}
                onChange={handleProcessText}
                slotProps={{
                    htmlInput: {
                        sx: {
                            py:'.5rem'
                        }
                    },
                    inputLabel: {
                        shrink: true,
                    }
                }}
                sx={{mt:'1rem'}}
                >
                {processes.map((v, i) => (
                    categoryText === 'projects'
                    ? <MenuItem key={i} value={v.id}>{v.aim_name || '(No name)'}</MenuItem>
                    : <MenuItem key={i} value={v.id}>{v.name || '(No name)'}</MenuItem>
                ))}
            </TextField>
            {/* Measure */}
            <TextField
                select
                label="Measure"
                value={measureText}
                onChange={handleMeasureText}
                slotProps={{
                    htmlInput: {
                        sx: {
                            py:'.5rem'
                        }
                    },
                    inputLabel: {
                        shrink: true,
                    }
                }}
                sx={{mt:'1rem'}}
                >
                {measureTypes.map((v, i) => (
                    <MenuItem key={i} value={v.id}>{v.name}</MenuItem>
                ))}
            </TextField>
        </Paper>
    )
}

