'use client'

import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";
import createClient from "@/utils/supabase/client";



export default function RunChartDash({
    aimId, 
    category, process, measure, 
    setCategory, setProcess, setMeasure
}) {
    const supabase = createClient();
    const [processes, setProcesses] = useState([]);
    const [measures, setMeasures] = useState([]);
    const [categoryText, setCategoryText] = useState(category);
    const [processText, setProcessText] = useState(process);
    const [measureText, setMeasureText] = useState(measure);

    const measureTables = {
        'projects': 'aim_measures',
        'primary_drivers': 'primary_driver_measures',
        'secondary_drivers': 'secondary_driver_measures',
        'change_ideas': 'change_idea_measures',
        'pdsa_cycles': 'cycle_measures',
    }

    const measureId = {
        'projects': 'aim_id',
        'primary_drivers': 'primary_driver_id',
        'secondary_drivers': 'secondary_driver_id',
        'change_ideas': 'change_idea_id',
        'pdsa_cycles': 'cycle_id',
    }

    // initialize processes
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

    // initialize measures
    useEffect(() => {
        async function getMeasures() {
            if (!processText) return;
            
            const {data, error} = await supabase
                .from(measureTables[categoryText])
                .select(`
                    *,
                    ...measure_types(
                        measure_name:name
                    )    
                `)
                .eq(measureId[categoryText], processText);

            console.log(error);
            console.log(data);

            setMeasures(data);
            setMeasureText(data[0]);
            setMeasure(data[0]);
        }

        getMeasures();
    }, [processText]);

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
                value={measureText || ''}
                onChange={handleMeasureText}
                slotProps={{
                    select: {
                        renderValue:(v) => v.measure_name,
                    },
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
                {measures.map((v, i) => (
                    <MenuItem key={i} value={v}>
                        <Box sx={{display:'flex', alignItems:'center', width:'100%'}}>
                            <Typography sx={{mr:'.5rem'}}>{v.measure_name}</Typography>
                            <Typography color="textSecondary" sx={{ml:'auto'}}>Entries: {v.data_list.length}</Typography>
                        </Box>
                    </MenuItem>
                ))}
            </TextField>
        </Paper>
    )
}

