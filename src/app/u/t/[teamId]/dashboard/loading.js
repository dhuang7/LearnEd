import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import PersonAddRoundedIcon from '@mui/icons-material/PersonAddRounded';
import Skeleton from "@mui/material/Skeleton";
import BookmarkAddRoundedIcon from '@mui/icons-material/BookmarkAddRounded';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import SaveRoundedIcon from '@mui/icons-material/SaveRounded';

export default async function LoadingAgenda() {
    return (
        <Box sx={{width:'100%', height:'100%', display:'flex', flexDirection:'column'}}>
            {/* title */}
            <Box sx={{width:'100%', p:'1rem', pb:0, boxSizing:'border-box'}}>
                <Typography variant='h4'>Dashboard (Work in progress)</Typography>
            </Box>
            {/* norms */}
            <Box sx={{width:'100%',  flexGrow:1, overflow:'hidden'}}>
                <Box sx={{width:'100%', height:'100%', display:'flex'}}>
                    {/* side dash */}
                    <Box sx={{width:'33%', height:'100%', display:'flex', flexDirection:'column', pt:'.5rem', boxSizing:'border-box'}}>
                        {/* member content */}
                        <Box sx={{pb:'1rem', boxSizing:'border-box', width:'100%', height:'17.5rem', pl:'1rem', pr:'.5rem'}}>
                            <Paper 
                                elevation={0} 
                                sx={{
                                    borderRadius:3, boxSizing:'border-box', border:'1px solid', borderColor: 'grey.300',
                                    p:'1rem', height:'100%', 
                                    display:'flex', flexDirection:'column'
                                }}
                                >
                                {/* Title section */}
                                <Box sx={{display:'flex', alignItems:'center'}}>
                                    {/* title */}
                                    <Typography variant="h6">Members:</Typography>
                                    {/* button */}
                                    <IconButton color='primary'><PersonAddRoundedIcon /></IconButton>
                                </Box>
                                {/* data grid */}
                                <Box sx={{flexGrow:1, overflow:'hidden'}}>
                                    <Box sx={{height:'100%'}}>
                                        {Array(4).fill(0).map((v, i) => <Skeleton key={i} height='20%' />)}
                                    </Box>
                                </Box>
                                
                            </Paper>
                        </Box>
                        {/* Norms */}
                        <Box sx={{boxSizing:'border-box', width:'100%', flexGrow:1, overflow:'hidden'}}>
                            <Box sx={{width:'100%', height:'100%', pl:'1rem', pr:'.5rem', boxSizing:'border-box', pb:'1rem'}}>
                                <Paper 
                                    elevation={0} 
                                    sx={{
                                        borderRadius:3, boxSizing:'border-box', border:'1px solid', borderColor: 'grey.300',
                                        p:'1rem', height:'100%', 
                                        display:'flex', flexDirection:'column'
                                    }}
                                    >
                                    <Box sx={{display:'flex', alignItems:'center'}}>
                                        <Typography variant="h6">Norms:</Typography>
                                        {/* add new norm */}
                                        <IconButton
                                            color='info' 
                                            >
                                            <BookmarkAddRoundedIcon />
                                        </IconButton>
                                        {/* delete */}
                                        <IconButton size='small' sx={{ml:'auto'}}><DeleteRoundedIcon /></IconButton>
                                        {/* save */}
                                        <IconButton size='small'><SaveRoundedIcon /></IconButton>
                                    </Box>
                                    <Box sx={{flexGrow:1, overflow:'hidden', pt:'.5rem', boxSizing:'border-box'}}>
                                        {Array(7).fill(0).map((v, i) => <Skeleton key={i} height='12%' />)}
                                    </Box>
                                </Paper>
                            </Box>
                        </Box>
                    </Box>
                    {/* Agenda list */}
                    <Box sx={{flexGrow:1, height:'100%', overflow:'hidden'}}>
                        <Box sx={{width:'100%', height:'100%', pt:'.5rem', pr:'1rem', pl:'.5rem', boxSizing:'border-box', pb:'1rem'}}>
                            <Box sx={{height:'100%', width:'100%'}}>
                                <Paper 
                                    elevation={0} 
                                    sx={{
                                        borderRadius:3, boxSizing:'border-box', border:'1px solid', borderColor: 'grey.300',
                                        p:'1rem', height:'100%', 
                                        display:'flex', flexDirection:'column'
                                    }}
                                    >
                                    {Array(9).fill(0).map((v, i) => <Skeleton key={i} height='10%' />)}
                                </Paper>
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}
