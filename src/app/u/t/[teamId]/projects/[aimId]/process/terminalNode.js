

import Paper from "@mui/material/Paper";
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import EditRoundedIcon from '@mui/icons-material/EditRounded';


import { Handle, Position } from "@xyflow/react";





export default function TerminalNode({data}) {

    return (
        <>
            {/* handles */}
            <Handle id='west' type="target" position={Position.Left} style={{width:'.5rem', height:'.5rem'}} />
            <Handle id='west' type="source" position={Position.Left} style={{width:'.5rem', height:'.5rem'}} />
            <Handle id='east' type="target" position={Position.Right} style={{width:'.5rem', height:'.5rem'}} />
            <Handle id='east' type="source" position={Position.Right} style={{width:'.5rem', height:'.5rem'}} />
            <Handle id='north' type="target" position={Position.Top} style={{width:'.5rem', height:'.5rem'}} />
            <Handle id='north' type="source" position={Position.Top} style={{width:'.5rem', height:'.5rem'}} />
            <Handle id='south' type="target" position={Position.Bottom} style={{width:'.5rem', height:'.5rem'}} />
            <Handle id='south' type="source" position={Position.Bottom} style={{width:'.5rem', height:'.5rem'}} />

            {/* actual node */}
            <Paper 
                elevation={0} 
                sx={{
                    p:'2.5rem', py:'.5rem', width:'250px', //height:'100px',
                    boxSizing:'border-box',
                    borderRadius:999999,
                    display:'flex', flexDirection:'column',
                    backgroundColor:'crimson',
                    color:'common.white',
                    border:'.5px solid',
                    borderColor:'grey.300',
                }}
                >
                <Box sx={{width:'100%', height:'100%', display:'flex', flexDirection:'column'}}>
                    {/* title */}
                    <Box sx={{display:'flex', alignItems:'center'}}>
                        <Typography variant="body1" align="left">Terminal</Typography>
                        <IconButton 
                            size='small'
                            color='inherit'
                            // onClick={handleOpen}
                            sx={{
                                ml:'auto',
                            }}
                            >
                                <EditRoundedIcon fontSize='small' />
                        </IconButton>
                    </Box>
                    {/* divider */}
                    <Divider sx={{borderColor:'inherit'}} />
                    {/* Name */}
                    <Typography noWrap variant="h5" align="left" fontWeight={'bold'}>{data.name||'Enter name...'}</Typography>
                    {/* description */}
                    <Box sx={{flexGrow:1, overflow:'hidden', boxSizing:'border-box'}}>
                        <Typography 
                            variant="body1" align="left" 
                            sx={{
                                whiteSpace: 'pre-wrap',
                                wordBreak: 'break-word',
                                height:'100%',
                                display: '-webkit-box',
                                WebkitLineClamp: 2,
                                lineClamp: 2,
                                overflow: 'hidden',
                                WebkitBoxOrient: 'vertical',
                            }}
                            >
                                {data.description||'Enter description...'}
                        </Typography>
                    </Box>
                </Box>
            </Paper>
        </>
    );
}