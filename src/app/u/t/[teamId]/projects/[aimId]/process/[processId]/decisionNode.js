

import Paper from "@mui/material/Paper";
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import EditRoundedIcon from '@mui/icons-material/EditRounded';


import { Handle, Position } from "@xyflow/react";
import EditNodeSideView from "./editNodeSideView";





export default function DecisionNode({data}) {

    return (
        <>
            {/* actual node */}
            <Box sx={{width:'15.5rem', aspectRatio:1, display:'flex', justifyContent:'center', alignItems:'center'}}>
                <Paper 
                    elevation={0} 
                    sx={{
                        width:'11rem', aspectRatio:1,//height:'100px',
                        boxSizing:'border-box',
                        // borderRadius:5,
                        display:'flex', flexDirection:'column',
                        backgroundColor:'chocolate',
                        color:'common.white',
                        border:'.5px solid',
                        borderColor:'grey.300',
                        transform: 'rotate(45deg)'
                    }}
                    >
                    <Box 
                        sx={{
                            width:'100%', height:'100%', 
                            display:'flex', flexDirection:'column', justifyContent:'center', 
                            transform:'rotate(-45deg)', 
                            boxSizing:'border-box', px:'1rem'
                        }}
                        >
                        {/* title */}
                        <Box sx={{display:'flex', alignItems:'center', width:'100%', boxSizing:'border-box'}}>
                            <Typography variant="body1" align="left" sx={{mr:'auto'}}>Decision</Typography>
                            <EditNodeSideView nodeInfo={data}/>
                        </Box>
                        {/* divider */}
                        <Divider sx={{borderColor:'inherit', width:'100%'}} />
                        {/* Name */}
                        <Typography noWrap variant="h5" align="left" fontWeight={'bold'}>{data.name||'Enter name...'}</Typography>
                        {/* description */}
                        <Box sx={{overflow:'hidden', boxSizing:'border-box', minHeight:'37.71px'}}>
                            <Typography 
                                variant="body1" align="left" 
                                // noWrap
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
            </Box>

            {/* handles */}
            <Handle id='west' type="target" position={Position.Left} style={{width:'.5rem', height:'.5rem'}} />
            <Handle id='west' type="source" position={Position.Left} style={{width:'.5rem', height:'.5rem'}} />
            <Handle id='east' type="target" position={Position.Right} style={{width:'.5rem', height:'.5rem'}} />
            <Handle id='east' type="source" position={Position.Right} style={{width:'.5rem', height:'.5rem'}} />
            <Handle id='north' type="target" position={Position.Top} style={{width:'.5rem', height:'.5rem'}} />
            <Handle id='north' type="source" position={Position.Top} style={{width:'.5rem', height:'.5rem'}} />
            <Handle id='south' type="target" position={Position.Bottom} style={{width:'.5rem', height:'.5rem'}} />
            <Handle id='south' type="source" position={Position.Bottom} style={{width:'.5rem', height:'.5rem'}} />
        </>
    );
}