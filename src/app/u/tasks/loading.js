import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Skeleton from "@mui/material/Skeleton";
import Button from "@mui/material/Button";
import AddRoundedIcon from '@mui/icons-material/AddRounded';





export default function Tasks({users}) {
    

    return (
        <Box sx={{width:'100%', height:'100%', display:'flex', flexDirection:'column'}}>
            {/* title */}
            <Box sx={{width:'100%', p:'1rem', pb:0, boxSizing:'border-box'}}>
                <Box sx={{width:'100%', display:'flex', justifyContent:'space-between', alignItems:'center'}}>
                    <Typography variant='h4'>Tasks</Typography>
                    {/* Add task button */}
                    <Button 
                        color='info' 
                        variant='contained' disableElevation 
                        sx={{borderRadius:3, textTransform:'none'}} 
                        startIcon={<AddRoundedIcon />}
                        >
                        New
                    </Button>
                </Box>
            </Box>
            {/* paper */}
            <Box sx={{width:'100%',  flexGrow:1, overflow:'hidden'}}>
                <Box sx={{width:'100%', height:'100%', display:'flex'}}>
                    {/* side dash */}
                    <Box sx={{width:'17.5rem', height:'100%', pt:'.5rem', pb:'1rem', pl:'1rem', pr:'.5rem', boxSizing:'border-box'}}>
                        
                    </Box>
                    {/* Main calendar */}
                    <Box sx={{flexGrow:1, height:'100%', overflow:'hidden'}}>
                        <Box sx={{width:'100%', height:'100%', pt:'.5rem', boxSizing:'border-box', pb:'1rem'}}>
                            <Box sx={{width:'100%', height:'100%', display:'flex', boxSizing:'border-box', px:'1rem', pl:'.5rem'}}>
                                <Paper 
                                    elevation={0} 
                                    sx={{
                                        borderRadius:3, boxSizing:'border-box', border:'1px solid', borderColor: 'grey.300',
                                        p:'1rem', px:'.5rem', width:'100%', height:'100%', overflow:'scroll',
                                        display:'flex', flexDirection:'column', position:'relative', boxSizing:'border-box',
                                    }}
                                    >
                                    {Array(10).fill(0).map((v, i) => <Skeleton key={i} height='20%'  />)}
                                </Paper>
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}
