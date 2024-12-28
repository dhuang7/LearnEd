import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Skeleton from "@mui/material/Skeleton";



export default async function Page() {


    return (
        <Box sx={{width:'100%', height:'100%', display:'flex', flexDirection:'column'}}>
            {/* title */}
            <Box sx={{width:'100%', p:'1rem', pb:0, boxSizing:'border-box'}}>
                <Box sx={{width:'100%', display:'flex', justifyContent:'left', alignItems:'center'}}>
                    <Typography variant='h4'>Change Ideas</Typography>
                </Box>
            </Box>

            {/* change list */}
            <Box sx={{flexGrow:1, overflow:'hidden'}}>
                <Box sx={{width:'100%', height:'100%', boxSizing:'border-box', p:'1rem', pt:'.5rem'}}>
                    <Paper 
                        elevation={0} 
                        sx={{
                            borderRadius:3, boxSizing:'border-box', border:'1px solid', borderColor: 'grey.300',
                            p:'1rem', height:'100%', width:'100%', overflow:'hidden',
                            display:'flex', flexDirection:'column', position:'relative'
                        }}
                        >
                        
                        {Array(5).fill(0).map((v, i) => <Skeleton key={i} height='20%' />)}
                    </Paper>
                </Box>
            </Box>
        </Box>
    )
}
