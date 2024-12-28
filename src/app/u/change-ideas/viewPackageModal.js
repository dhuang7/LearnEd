'use client'

import Button from "@mui/material/Button";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Drawer from "@mui/material/Drawer";
import LastPageRoundedIcon from '@mui/icons-material/LastPageRounded';
import Typography from "@mui/material/Typography";
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import Rating from "@mui/material/Rating";
import StarRoundedIcon from '@mui/icons-material/StarRounded';
import StarOutlineRoundedIcon from '@mui/icons-material/StarOutlineRounded';
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Chip from '@mui/material/Chip';



import createClient from "@/utils/supabase/client";
import { useEffect, useState } from "react";



export default function ViewPackageModal({open, setOpen, changePackage, projects}) {
    const supabase = createClient();
    const [changeIdeas, setChangeIdeas] = useState([]);
    const [project, setProject] = useState(projects[0]);

    useEffect(() => {
        async function getChangeIdeas() {
            const {data, error} = await supabase.rpc('get_change_ideas_info', {
                cp_id: changePackage?.id,
            });
            console.log(error);

            setChangeIdeas(data||[]);
        }


        if (changePackage) getChangeIdeas();
    }, [changePackage]);

    function handleClose(e) {
        // close modal
        setOpen(false);
    }

    function handleSelectProject({target}) {
        setProject(target.value);
    }

    async function handleAddChangeIdea() {
        const {data, error} = await supabase
            .from('change_ideas')
            .insert({
                change_package_id: changePackage.id,
                aim_id: project.id,
            });

        handleClose();
    }

    return (
        <>
            {/* open dialog */}
            <Drawer
                open={open}
                anchor='right'
                ModalProps={{
                    slotProps: {
                        backdrop: {
                            onClick:handleClose,
                            sx:{
                                backgroundColor: 'rgba(0, 0, 0, 0)',
                            }
                        }
                    },
                }}
                elevation={5}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                PaperProps={{
                    sx: {
                        width:{xs:'100%', md:'35rem'},
                        display:'flex',
                        flexDirection:'row',
                        alignItems:'flex-start',
                        overflow:'hidden'
                    }
                }}
                >
                {/* close arrow button */}
                <Box sx={{px:'.25rem', boxSizing:'border-box'}}>
                    <IconButton size='small' onClick={handleClose} sx={{mt:'1.1rem', borderRadius:1}}><LastPageRoundedIcon /></IconButton>
                </Box>
                {/* form */}
                <Box style={{height:'100%', width:'100%', display:'flex', flexDirection:'column', overflow:'hidden'}}>
                    {/* title */}
                    <DialogTitle id="alert-dialog-title" sx={{pl:0, display:'flex', alignItems:'center'}}>
                        {/* title */}
                        <Typography variant='inherit'>View Change Package</Typography>
                        {/* close button */}
                        <IconButton onClick={handleClose} sx={{ml:'auto'}}><CloseRoundedIcon /></IconButton>
                    </DialogTitle>
                    {/* content */}
                    <DialogContent sx={{pb:0, pl:0}}>
                        <Box sx={{pt:1, display:'flex', flexDirection:'column', height:'100%', boxSizing:'border-box',}}>
                            <Box sx={{boxSizing:'border-box', pb:'1rem', display:'flex', width:'100%', justifyContent:'space-between'}}>
                                {/* name */}
                                <Box>
                                    <Typography variant="h6" >Name:</Typography>
                                    <Typography variant="body1" color='primary' >{changePackage?.name}</Typography>
                                </Box>
                                <Box sx={{display:'flex'}}>
                                    {/* rating */}
                                    <Box sx={{mr:'1rem'}}>
                                        <Typography variant="h6" >Rating:</Typography>
                                        <Rating 
                                            value={changePackage?.rating} 
                                            readOnly 
                                            icon={<StarRoundedIcon fontSize='inherit' />}
                                            emptyIcon={<StarOutlineRoundedIcon fontSize='inherit'  />}
                                            precision={.5}
                                            />
                                    </Box>
                                    {/* Num cycles */}
                                    <Box sx={{display:'flex', flexDirection:'column', alignItems:'center'}}>
                                        <Typography variant="h6" >Cycles:</Typography>
                                        <Typography variant="body1" color='primary' >{changePackage?.num_cycles}</Typography>
                                    </Box>
                                </Box>
                            </Box>
                            {/* description and tags */}
                            <Box sx={{boxSizing:'border-box', pb:'1rem', display:'flex'}}>
                                {/* description */}
                                <Box>
                                    <Typography variant="h6" >Description:</Typography>
                                    <Typography 
                                        variant="body1" color='primary' 
                                        sx={{
                                            whiteSpace: 'pre-wrap',
                                            wordBreak: 'break-word',
                                            maxHeight:'5.25rem',
                                            display: '-webkit-box',
                                            overflow: 'scroll',
                                            WebkitBoxOrient: 'vertical',
                                        }}
                                        >
                                        {changePackage?.description}
                                    </Typography>
                                </Box>
                                {/* tags */}
                                <Box sx={{width:'199.44px', minWidth:'199.44px'}}>
                                    <Typography variant="h6" >Tags:</Typography>
                                    <Box sx={{width:'100%', maxHeight:'5.25rem', overflow:'scroll'}}>
                                        <Box sx={{display:'flex', flexWrap:'wrap'}}>
                                            {/* primary */}
                                            {changePackage?.tags.p?.map((v,i) => (
                                                <Box key={i} sx={{boxSizing:'border-box', display:'flex', p:'.125rem'}}>
                                                    <Chip 
                                                        label={v} size="small" 
                                                        sx={{
                                                            backgroundColor:'royalBlue', color:'common.white',
                                                        }} 
                                                        />
                                                </Box>
                                            ))}
                                            {/* secondary */}
                                            {changePackage?.tags.s?.map((v,i) => (
                                                <Box key={i} sx={{boxSizing:'border-box', display:'flex', p:'.125rem'}}>
                                                    <Chip 
                                                        label={v} size="small" 
                                                        sx={{
                                                            backgroundColor:'forestGreen', color:'common.white',
                                                        }} 
                                                        />
                                                </Box>
                                            ))}
                                        </Box>
                                    </Box>
                                </Box>
                            </Box>
                            <Divider />
                            {/* list of change idea reviews */}
                            <List sx={{overflow:'scroll'}}>
                                {changeIdeas.map((v, i) => (
                                    <ListItem key={i} sx={{px:'.5rem'}}>
                                        <Box sx={{borderRadius:3, border:'1px solid', borderColor:'grey.300', boxSizing:'border-box', p:'.5rem', width:'100%', boxShadow:2}}>
                                            <Box sx={{display:'flex', alignItems:'center', mb:'.5rem', fontWeight:'bold'}}>
                                                {/* team name */}
                                                <Typography variant="body1" sx={{fontWeight:'bold', mr:'.5rem'}}>{v.team_name}</Typography>
                                                {/* project name */}
                                                <Typography variant="body1" color="textSecondary" noWrap>{v.project_name}</Typography>
                                                {/* rating */}
                                                <Rating 
                                                    value={v.rating} 
                                                    readOnly 
                                                    icon={<StarRoundedIcon fontSize='inherit' />}
                                                    emptyIcon={<StarOutlineRoundedIcon fontSize='inherit'  />}
                                                    precision={.5}
                                                    sx={{ml:'auto', mr:'.5rem'}}
                                                    />
                                                {/* num cycles */}
                                                <Typography color='textSecondary'>Cycles: {v.num_cycles}</Typography>
                                            </Box>
                                            {(v.conclusions)
                                                ? <Typography>{v.conclusions}</Typography>
                                                : <Typography color="textSecondary">{'(No conclusion)'}</Typography>
                                            }
                                        </Box>
                                    </ListItem>
                                    
                                ))}
                            </List>
                        </Box>
                    </DialogContent>
                    {/* buttons */}
                    <DialogActions sx={{px:0, justifyContent:'center'}}>
                        {/* select project */}
                        <Box sx={{mr:'auto', width:'10rem'}}>
                            <TextField
                                select
                                label='Projects'
                                value={project}
                                onChange={handleSelectProject}
                                fullWidth
                                slotProps={{
                                    select: {
                                        renderValue:(v) => v.name,
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
                                >
                                {projects.map((p, i) => (
                                    <MenuItem key={i} value={p}>
                                        <Box sx={{display:'flex'}}>
                                            <Typography sx={{mr:'.5rem'}}>{p.name}</Typography>
                                            <Typography color='textSecondary'>({p.teams.name})</Typography>
                                        </Box>
                                    </MenuItem>
                                ))}
                            </TextField>
                        </Box>
                        {/* button actions */}
                        <Button onClick={handleClose}>Close</Button>
                        <Button onClick={handleAddChangeIdea}>Add</Button>
                    </DialogActions>
                </Box>
            </Drawer>
        </>
        
    )
}