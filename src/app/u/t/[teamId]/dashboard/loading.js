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
                <Box sx={{width:'100%', display:'flex', justifyContent:'space-between', alignItems:'center'}}>
                    <Typography variant='h4'>Dashboard</Typography>
                    {/* <AddAgendaModal teamId={teamId} /> */}
                </Box>
            </Box>
            {/* norms */}
            <Box sx={{width:'100%',  flexGrow:1, overflow:'hidden'}}>
                <Box sx={{width:'100%', height:'100%', boxSizing:'border-box', pt:'.5rem'}}>
                    {/* top dash */}
                    <Box sx={{width:'100%', display:'flex', height:'20rem', boxSizing:'border-box', px:'.5rem'}}>
                        <Box sx={{width:'33.33%', boxSizing:'border-box', px:'.5rem'}}>
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
                                    <Typography variant="h6">Cycles Ran:</Typography>
                                </Box>
                                <Skeleton variant="rectangular" height='100%' />
                            </Paper>
                        </Box>
                        <Box sx={{width:'33.33%', boxSizing:'border-box', px:'.5rem'}}>
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
                                        <IconButton color='primary' ><PersonAddRoundedIcon /></IconButton>
                                    </Box>
                                    {Array(4).fill(0).map((v, i) => <Skeleton key={i} height='20%' />)}
                            </Paper>
                        </Box>
                        <Box sx={{width:'33.33%', boxSizing:'border-box', px:'.5rem'}}>
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
                                    <IconButton  size='small' sx={{ml:'auto'}}><DeleteRoundedIcon /></IconButton>
                                    {/* save */}
                                    <IconButton  size='small'><SaveRoundedIcon /></IconButton>
                                </Box>
                                {Array(4).fill(0).map((v, i) => <Skeleton key={i} height='20%' />)}
                            </Paper>
                        </Box>
                    </Box>
                    {/* rest */}
                    <Box sx={{width:'100%', height:'100%', display:'flex', boxSizing:'border-box', px:'.5rem', py:'1rem'}}>
                        <Box sx={{width:'50%', boxSizing:'border-box', px:'.5rem'}}>
                            <Paper 
                                elevation={0} 
                                sx={{
                                    borderRadius:3, boxSizing:'border-box', border:'1px solid', borderColor: 'grey.300',
                                    p:'1rem', height:'100%', 
                                    display:'flex', flexDirection:'column'
                                }}
                                >
                                {Array(10).fill(0).map((v, i) => <Skeleton key={i} height='20%' />)}
                            </Paper>
                        </Box>
                        <Box sx={{width:'50%', height:'100%', boxSizing:'border-box', px:'.5rem'}}>
                            <Paper
                                elevation={0} 
                                sx={{
                                    borderRadius:3, boxSizing:'border-box', border:'1px solid', borderColor: 'grey.300',
                                    p:'1rem', height:'100%', 
                                    display:'flex', flexDirection:'column'
                                }}
                                >
                                {Array(10).fill(0).map((v, i) => <Skeleton key={i} height='20%' />)}
                            </Paper>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}
