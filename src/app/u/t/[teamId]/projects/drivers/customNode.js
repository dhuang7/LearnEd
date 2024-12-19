import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Handle, Position } from '@xyflow/react';
 
 
export default function CustomNode() {


    return (
        <>
            <Handle type="target" position={Position.Left} />
            <Handle type="source" position={Position.Right} />
            <Paper 
                elevation={0} 
                sx={{
                    // borderRadius:3, boxSizing:'border-box', border:'1px solid', borderColor: 'grey.300',
                    p:'1rem', py:'.5rem', width:'200px', height:'100px',
                    boxSizing:'border-box',
                    display:'flex', flexDirection:'column',
                    backgroundColor:'primary.main',
                    color:'common.white',
                }}
                >
                    <Box sx={{width:'100%', height:'100%', display:'flex', flexDirection:'column'}}>
                        {/* title */}
                        <Typography variant="h6" align="left">{null||'Enter Text...'}</Typography>
                        {/* description */}
                        <Box sx={{flexGrow:1, overflow:'hidden', boxSizing:'border-box', pl:'.5rem'}}>
                            <Typography 
                                variant="body1" align="left" noWrap 
                                sx={{
                                    whiteSpace: 'pre-wrap',
                                    overflow:'scroll',
                                    maxHeight:'100%',
                                }}
                                >
                                    {null||'Enter Text...'}
                            </Typography>
                        </Box>
                    </Box>
            </Paper>
        </>
    );
}