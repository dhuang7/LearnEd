import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Skeleton from "@mui/material/Skeleton";
import Paper from "@mui/material/Paper";



export default async function Loading() {
    
    return (
        <Box sx={{display:'flex', flexDirection:'column', width:'100%', height:'100%', boxSizing:'border-box'}}>
            {/* title */}
            <Box sx={{width:'100%', p:'1rem', pb:0, boxSizing:'border-box'}}>
                <Box sx={{width:'100%', display:'flex', justifyContent:'space-between', alignItems:'center'}}>
                    <Typography variant='h4'>Team Settings</Typography>
                    <Button variant="outlined" color='error'>Delete Team</Button>
                </Box>
            </Box>
            {/* content profile */}
            <Box sx={{flexGrow:1, width:'100%', overflow:'hidden'}}>
                <Box sx={{width:'100%', height:'100%', boxSizing:'border-box', p:'1rem', pt:'.5rem'}}>
                    <Paper 
                        elevation={0} 
                        sx={{
                            borderRadius:3, boxSizing:'border-box', border:'1px solid', borderColor: 'grey.300',
                            p:'1rem', px:'.5rem', width:'100%', height:'100%', overflow:'scroll',
                            display:'flex', flexDirection:'column', position:'relative', boxSizing:'border-box',
                        }}
                        >
                        {Array(10).fill(0).map((v, i) => <Skeleton key={i} height='20%' />)}
                    </Paper>
                </Box>
            </Box>
        </Box>
    )
}