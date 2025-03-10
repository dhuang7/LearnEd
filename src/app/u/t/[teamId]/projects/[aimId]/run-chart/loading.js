import Box from "@mui/material/Box";
import Skeleton from "@mui/material/Skeleton";
import Paper from "@mui/material/Paper";




export default function Loading() {
    

    return (
        <>
            {/* norms */}
            <Box sx={{width:'100%',  height:'100%', overflow:'hidden'}}>
                <Box sx={{width:'100%', height:'100%', display:'flex'}}>
                    {/* side dash */}
                    <Box sx={{width:'16.5rem', height:'100%', pr:'.5rem', boxSizing:'border-box'}}>
                        {/* side */}
                        <Paper 
                            elevation={0} 
                            sx={{
                                borderRadius:3, boxSizing:'border-box', border:'1px solid', borderColor: 'grey.300',
                                p:'.5rem', py: '.5rem', height:'100%', width:'100%', overflow:'hidden',
                                display:'flex', flexDirection:'column', position:'relative'
                            }}
                            >
                            {Array(5).fill(0).map((v, i) => <Skeleton key={i} height='20%' />)}
                        </Paper>
                    </Box>
                    {/* Main graph */}
                    <Box sx={{flexGrow:1, height:'100%', overflow:'hidden'}}>
                        <Box sx={{width:'100%', height:'100%', pl:'.5rem', boxSizing:'border-box'}}>
                        <Paper 
                            elevation={0} 
                            sx={{
                                borderRadius:3, boxSizing:'border-box', border:'1px solid', borderColor: 'grey.300',
                                height:'100%', width:'100%', overflow:'hidden', p:'1rem', py:'.5rem',
                                display:'flex', flexDirection:'column', position:'relative'
                            }}
                            >
                            {Array(5).fill(0).map((v, i) => <Skeleton key={i} height='20%' />)}
                        </Paper>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </>
    )
}

