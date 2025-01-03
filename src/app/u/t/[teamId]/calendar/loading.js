import Box from "@mui/material/Box";
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Skeleton from "@mui/material/Skeleton";




export default async function Loading() {

    return (
        <Box sx={{width:'100%', height:'100%', display:'flex', flexDirection:'column'}}>
            {/* title */}
            <Box sx={{width:'100%', p:'1rem', pb:0, boxSizing:'border-box'}}>
                <Box sx={{width:'100%', display:'flex', justifyContent:'space-between', alignItems:'center'}}>
                    <Typography variant='h4'>Calendar</Typography>
                    {/* add member button to open dialog */}
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
            {/* norms */}
            <Box sx={{width:'100%',  flexGrow:1, overflow:'hidden'}}>
                <Box sx={{width:'100%', height:'100%', display:'flex'}}>
                    {/* side dash */}
                    <Box sx={{width:'17.5rem', height:'100%', pt:'.5rem', pb:'1rem', pl:'1rem', pr:'.5rem', boxSizing:'border-box'}}>
                        {/* side calendar */}
                        <Paper 
                            elevation={0} 
                            sx={{
                                borderRadius:3, boxSizing:'border-box', border:'1px solid', borderColor: 'grey.300',
                                p:'.5rem', py: '1rem', height:'100%', 
                                display:'flex', flexDirection:'column'
                            }}
                            >
                            <Skeleton height='40%' />
                            {Array(5).fill(0).map((v, i) => <Skeleton key={i} height='10%' />)}
                        </Paper>
                    </Box>
                    {/* Main calendar */}
                    <Box sx={{flexGrow:1, height:'100%', overflow:'hidden'}}>
                        <Box sx={{width:'100%', height:'100%', pt:'.5rem', pr:'1rem', pl:'.5rem', boxSizing:'border-box', pb:'1rem'}}>
                        <Paper 
                            elevation={0} 
                            sx={{
                                borderRadius:3, boxSizing:'border-box', border:'1px solid', borderColor: 'grey.300',
                                p:'1rem', height:'100%', 
                                display:'flex', flexDirection:'column'
                            }}
                            >
                            {Array(7).fill(0).map((v, i) => <Skeleton key={i} height='12%' />)}
                        </Paper>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}
