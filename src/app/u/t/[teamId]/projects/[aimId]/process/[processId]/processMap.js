'use client'

import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import Link from '@mui/material/Link';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Typography from '@mui/material/Typography';
// import AccountTreeRoundedIcon from '@mui/icons-material/AccountTreeRounded';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';


import { addEdge, Background, ConnectionLineType, Controls, MarkerType, Panel, ReactFlow, ReactFlowProvider, SelectionMode, useEdgesState, useNodesState, useReactFlow } from "@xyflow/react";
// import Dagre from '@dagrejs/dagre';
import '@xyflow/react/dist/style.css';
import { useEffect, useState, useTransition } from "react";
import createClient from "@/utils/supabase/client";
import TerminalNode from "./terminalNode";
import { useRouter } from 'next/navigation';
import ProcessNode from './processNode';
import DecisionNode from './decisionNode';
import EditableEdge from './editableEdge';
import NextLink from 'next/link';
import { IconButton } from '@mui/material';


export default function ProcessMap(params) {
    return (
        <ReactFlowProvider>
            <ProcessMapLayout {...params} />
        </ReactFlowProvider>
    );
}

function ProcessMapLayout({processMap, processEdges, processNodes, breadcrumbs, processMaps}) {
    const supabase = createClient();
    const router = useRouter();
    // const { fitView } = useReactFlow();
    const [isPending, startTransition] = useTransition();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        function handleGraphUpdates() {
            router.refresh();
        }


        const channel = supabase
            .channel('map_changes')
            .on('postgres_changes', { event: '*', schema: 'public', table: 'process_maps' }, handleGraphUpdates)
            .on('postgres_changes', { event: '*', schema: 'public', table: 'process_nodes' }, handleGraphUpdates)
            .on('postgres_changes', { event: '*', schema: 'public', table: 'process_edges' }, handleGraphUpdates)
            .on('postgres_changes', { event: '*', schema: 'public', table: 'projects' }, handleGraphUpdates)
            .subscribe();

        return () => supabase.removeChannel(channel);
    }, []);

    // node types 
    const nodeTypes = {
        terminal: TerminalNode,
        process: ProcessNode,
        decision: DecisionNode,
    }

    // edge types
    const edgeTypes = {
        'editableEdge': EditableEdge,
    }

    // formatted nodes and edges
    const formattedNodes = processNodes.map(v => ({
        id: v.id,
        position: {x: v.position_x, y: v.position_y},
        data: {
            ...v,
            process_maps: processMaps,
            breadcrumbs: breadcrumbs,
            curr_map: processMap,
        },
        type: v.type
    }));

    const formattedEdges = processEdges.map(v => ({
        id: v.id,
        label:v.label,
        source: v.source_id,
        target: v.target_id,
        sourceHandle: v.source_handle,
        targetHandle: v.target_handle,
        markerEnd: {
            type: MarkerType.ArrowClosed,
            width:'.75rem',
            height:'.75rem',
            // color:'#000000'
        },
        style: {
            strokeWidth: '.25rem',
            // stroke:'#000000',
        },
        type:'editableEdge',
    }));

    // manage edge and node states
    const [nodes, setNodes, onNodesChange] = useNodesState(formattedNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState(formattedEdges);

    useEffect(() => {
        // set nodes and edges
        setNodes(formattedNodes);
        setEdges(formattedEdges);
    }, [processMap])

    // makes sure that the info is loaded before finishing.
    useEffect(() => {
        if (!isPending) {
            setLoading(false);
        }
    }, [isPending])




    // Handlers //////////////////
    
    // add terminal node
    async function handleAddTerminal() {
        setLoading(true);
        const {data, error} = await supabase
            .from('process_nodes')
            .insert({map_id: processMap.id, type: 'terminal'})
            .select();

        // reset everything
        startTransition(() => {
            router.refresh();
        })
    }

    // add process node
    async function handleAddProcess() {
        setLoading(true);
        const {data, error} = await supabase
            .from('process_nodes')
            .insert({map_id: processMap.id, type: 'process'})
            .select();

        // reset everything
        startTransition(() => {
            router.refresh();
        })
    }

    // add decision node
    async function handleAddDecision() {
        setLoading(true);
        const {data, error} = await supabase
            .from('process_nodes')
            .insert({map_id: processMap.id, type: 'decision'})
            .select();

        // reset everything
        startTransition(() => {
            router.refresh();
        })
    }

    // handler node change
    async function handleNodesChange(changes) {
        onNodesChange(changes);

        // update node position every time the drag is done
        changes.forEach(async v => {
            if (v.type === 'position' && v.dragging === false) {
                const {data, error} = await supabase
                    .from('process_nodes')
                    .update({
                        position_x: v.position.x,
                        position_y: v.position.y,
                    })
                    .eq('id', v.id)
                    .select();
            }
        })
    }

    // handle edge change
    async function handleEdgesChange(changes) {
        if (changes[0].type === 'remove') {
            const {data, error} = await supabase
                .from('process_edges')
                .delete()
                .eq('id', changes[0].id);

            console.log(error);
        }


        onEdgesChange(changes);
    }

    // handle new connection
    async function handleConnect(params) {
        // insert edge
        const {data, error} = await supabase
            .from('process_edges')
            .insert({
                source_id: params.source,
                target_id: params.target,
                map_id: processMap.id,
                source_handle: params.sourceHandle,
                target_handle: params.targetHandle,
            })
            .select();

        console.log(error);

        if (error) return;

        // format new edge
        const newEdge = {
            id: data[0].id,
            source: data[0].source_id,
            target: data[0].target_id,
            sourceHandle: data[0].source_handle,
            targetHandle: data[0].target_handle,
            markerEnd: {
                type: MarkerType.ArrowClosed,
                width:'.75rem',
                height:'.75rem',
                // color:'#000000'
            },
            style: {
                strokeWidth: '.25rem',
                // stroke:'#000000',
            },
            type:ConnectionLineType.SmoothStep,
        }

        // set new edge
        setEdges((eds) => addEdge(newEdge, eds));
    }
    

    function handleDelete(objs) {
        if (objs.nodes.length > 0) return false;
        return objs;
    }

    // handle auto layout
    // async function handleLayout(direction) {
    //     const layouted = getLayoutedElements(nodes, edges, { direction });
    
    //     // update the nodes on the backend
    //     layouted.nodes.forEach(async v => {
    //         const {data, error} = await supabase
    //             .from('process_nodes')
    //             .update({
    //                 position_x: v.position.x,
    //                 position_y: v.position.y,
    //             })
    //             .eq('id', v.id)
    //             .select();

    //         if (error) {
    //             console.log(error);
    //             router.refresh();
    //         }
    //     });

    //     // update front end nodes
    //     setNodes([...layouted.nodes]);
    //     setEdges([...layouted.edges]);
    
    //     window.requestAnimationFrame(() => {
    //         fitView();
    //     });
    // }
    
    return (
        <>
            <ReactFlow 
                nodeTypes={nodeTypes}
                edgeTypes={edgeTypes}
                nodes={nodes} 
                edges={edges}
                onNodesChange={handleNodesChange}
                onEdgesChange={handleEdgesChange}
                onConnect={handleConnect}
                onBeforeDelete={handleDelete}
                maxZoom={5}
                minZoom={.1}
                fitView
                panOnScroll
                selectionOnDrag
                selectionMode={SelectionMode.Partial}
                connectionLineType={ConnectionLineType.SmoothStep}
                >
                {/* breadcrumb */}
                <Panel position="top-left">
                    <Box
                        sx={{
                            borderRadius:3,
                            boxSizing:'border-box',
                            pl:'.5rem',
                            pr:'1rem',
                            py:'.15rem',
                            border:'1px solid', borderColor:'divider',
                            backgroundColor:'common.white',
                        }}
                        >
                        <Breadcrumbs maxItems={5} separator='›' aria-label="breadcrumb">
                            <IconButton size='small' component={NextLink} href='../process' sx={{color:'inherit'}}><HomeRoundedIcon fontSize='small' /></IconButton>
                            {breadcrumbs?.map((v, i) => (
                                <Link 
                                    key={i} 
                                    underline='hover' 
                                    component={NextLink} 
                                    href={{
                                        pathname: v.id,
                                        query: {
                                            bcNames:breadcrumbs.map(v => v.name).slice(0, i),
                                            bcIds:breadcrumbs.map(v => v.id).slice(0, i),
                                        }
                                    }} 
                                    sx={{color:'inherit'}}
                                    >
                                    {v.name}
                                </Link>
                            ))}
                            <Typography sx={{ color: 'text.primary' }}>{processMap.name}</Typography>
                        </Breadcrumbs>
                    </Box>
                </Panel>

                {/* adding buttons */}
                <Panel position="top-right">
                    {/* buttons on the graph */}
                    <Stack direction={'row'} spacing={'.5rem'}>
                        {/* <Button 
                            color='info'
                            variant='contained' disableElevation 
                            startIcon={<AccountTreeRoundedIcon />}
                            onClick={() => handleLayout('LR')}
                            size='small'
                            sx={{borderRadius:3, textTransform:'none', justifyContent:'left'}}
                            >
                                Auto
                        </Button> */}
                        <Button  
                            color='info'
                            variant='contained' disableElevation 
                            startIcon={<AddRoundedIcon />}
                            onClick={handleAddTerminal}
                            size='small'
                            sx={{borderRadius:3, textTransform:'none', justifyContent:'left'}}
                            >
                                Terminal
                        </Button>
                        <Button  
                            color='info'
                            variant='contained' disableElevation 
                            startIcon={<AddRoundedIcon />}
                            onClick={handleAddProcess}
                            size='small'
                            sx={{borderRadius:3, textTransform:'none', justifyContent:'left'}}
                            >
                                Process
                        </Button>
                        <Button  
                            color='info'
                            variant='contained' disableElevation 
                            startIcon={<AddRoundedIcon />}
                            onClick={handleAddDecision}
                            size='small'
                            sx={{borderRadius:3, textTransform:'none', justifyContent:'left'}}
                            >
                                Decision
                        </Button>
                    </Stack>
                </Panel>
                <Background />
                <Controls />
            </ReactFlow>

            {/* blur loading */}
            {loading && 
                <Box sx={{width:'100%', height:'100%', position:'absolute', top:0, left:0, p:'1rem', zIndex:1, boxSizing:'border-box'}}>
                    <Box sx={{backgroundColor:'common.black', opacity: 0.5, width:'100%', height:'100%', display:'flex', alignItems:'center', justifyContent:'center'}} >
                        <CircularProgress />
                    </Box>
                </Box>
            }
        </>
    );
}

// const getLayoutedElements = (nodes, edges, options) => {
//     const g = new Dagre.graphlib.Graph().setDefaultEdgeLabel(() => ({}));
//     g.setGraph({ 
//         rankdir: options.direction,
//         align: 'UL',
//     });

//     edges.forEach((edge) => g.setEdge(edge.source, edge.target));
//     nodes.forEach((node) =>
//     g.setNode(node.id, {
//         ...node,
//         width: node.measured?.width ?? 0,
//         height: node.measured?.height ?? 0,
//     }),
//     );

//     Dagre.layout(g);

//     console.log

//     return {
//         nodes: nodes.map((node) => {
//             const position = g.node(node.id);
//             // We are shifting the dagre node position (anchor=center center) to the top left
//             // so it matches the React Flow node anchor point (top left).
//             const x = position.x - (node.measured?.width ?? 0) / 2;
//             const y = position.y - (node.measured?.height ?? 0) / 2;

//             return { ...node, position: { x, y } };
//         }),
//         edges,
//     };
// };
