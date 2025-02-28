import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import EditRoundedIcon from '@mui/icons-material/EditRounded';


import { BaseEdge, EdgeLabelRenderer, getSmoothStepPath } from "@xyflow/react";
import { useState } from "react";
import createClient from "@/utils/supabase/client";






export default function EditableEdge({ id, sourceX, sourceY, targetX, targetY, style, markerEnd, sourcePosition, targetPosition, label }) {
    const supabase = createClient();
    const [labelText, setLabelText] = useState(label);
    const [editValue, setEditValue] = useState(false);
    const [showEdit, setShowEdit] = useState(false);
    const [edgePath, labelX, labelY] = getSmoothStepPath({
        sourceX,
        sourceY,
        targetX,
        targetY,
        sourcePosition,
        targetPosition
    });

    function handleLabelText({target}) {
        setLabelText(target.value);
    }

    function handleEditValue(e) {
        e.stopPropagation();
        setEditValue(e=>!e);
    }

    function handleShowEdit() {
        setShowEdit(true);
    }

    function handleHideEdit() {
        setShowEdit(false);
    }

    async function handleTurnOffEditValue(e) {
        e.stopPropagation();
        setEditValue(false);

        const {data, error} = await supabase
            .from('process_edges')
            .update({
                label:labelText,
            })
            .eq('id', id)
            .select();

        console.log(data);
    }

    return (
        <>
            {/* actual edge svg */}
            <g onMouseLeave={handleHideEdit} onMouseOver={handleShowEdit} style={{ cursor: 'pointer' }}>
                <BaseEdge id={id} path={edgePath} style={style} markerEnd={markerEnd} />
            </g>
            {/* edge label */}
            <EdgeLabelRenderer>
                {editValue && (
                    <TextField 
                        size='small'
                        // fullWidth
                        autoFocus
                        value={labelText}
                        onChange={handleLabelText}
                        onBlur={handleTurnOffEditValue}
                        // disabled={disabled}
                        multiline
                        slotProps={{
                            input: {
                                sx: {
                                    p:0,
                                }
                            },
                            htmlInput: {
                                sx: theme => ({
                                    p:0,
                                    textAlign:'center',
                                    fontSize:theme.typography.h5,
                                    maxWidth:'10rem',
                                    fontWeight:'bold',
                                    backgroundColor:'common.white'
                                })
                            }
                        }}
                        sx={{
                            position: 'absolute',
                            transform: `translate(-50%, -50%) translate(${labelX}px, ${labelY}px)`,
                            pointerEvents: 'all',
                        }}
                        />
                    )}
                {!editValue && (
                    <Button
                        className="nodrag nopan"
                        onClick={handleEditValue}
                        variant="contained"
                        disableElevation
                        sx={{
                            p:0,
                            // px:'.25rem',
                            textTransform:'none',
                            minWidth:0,
                            position: 'absolute',
                            transform: `translate(-50%, -50%) translate(${labelX}px, ${labelY}px)`,
                            pointerEvents: 'all',
                            backgroundColor: 'transparent',
                            '&:hover': {
                                filter: 'brightness(1.5)',
                            }
                        }}
                        >
                        <Typography 
                            variant="h5" align="center" color="textSecondary" fontWeight={'bold'} 
                            sx={{
                                maxWidth: '10rem',
                                whiteSpace: 'pre-wrap',
                                overflowWrap: 'break-word', // Breaks long words if needed
                                wordBreak: 'break-word', // Extra safety for older browsers
                            }}
                            >
                            {/* to create highlighted thing */}
                            <span 
                                style={{
                                    backgroundColor: labelText ? 'rgba(255, 255, 255, 0.7)' : 'transparent',
                                    borderRadius:3

                                }}
                                >
                                {labelText || (
                                    <IconButton 
                                        size="small" 
                                        component='span' 
                                        onMouseOver={handleShowEdit} onMouseLeave={handleHideEdit}
                                        sx={{
                                            opacity: showEdit ? 1:0,
                                            transition: 'opacity .25s',
                                        }}
                                        >
                                        <EditRoundedIcon fontSize="small" />
                                    </IconButton>
                                )}
                            </span>
                        </Typography>
                    </Button>
                )}
            </EdgeLabelRenderer>
        </>
    );
}