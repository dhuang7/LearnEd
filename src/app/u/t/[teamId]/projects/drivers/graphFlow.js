'use client'

import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import CircularProgress from '@mui/material/CircularProgress';
import AccountTreeRoundedIcon from '@mui/icons-material/AccountTreeRounded';
import AddRoundedIcon from '@mui/icons-material/AddRounded';

import {
    ReactFlow,
    ReactFlowProvider,
    Panel,
    useReactFlow,
    Background,
    Controls,
    SelectionMode,
    addEdge,
    useEdgesState,
    useNodesState,
} from '@xyflow/react';
import Dagre from '@dagrejs/dagre';

import { useEffect, useState, useTransition } from 'react';
import '@xyflow/react/dist/style.css';
import { AimNode, PrimaryDriverNode, SecondaryDriverNode, ChangeIdeaNode } from './customNode';
import createClient from '@/utils/supabase/client';
import { useRouter } from 'next/navigation';


// Provider
export default function GraphFlow(params) {
    return (
        <ReactFlowProvider>
            <GraphFlowLayout {...params} />
        </ReactFlowProvider>
    );
}

// Actual Component
function GraphFlowLayout({
    teamId, aim, 
    primaryDrivers, primarySecondaryEdges,
    secondaryDrivers, secondaryChangeEdges,
    changeIdeas,
}) {
    const { fitView } = useReactFlow();
    const supabase = createClient();
    const router = useRouter();
    const [isPending, startTransition] = useTransition();
    const nodeTypes = { 
        aimNode: AimNode,
        primaryDriverNode: PrimaryDriverNode,
        secondaryDriverNode: SecondaryDriverNode,
        changeIdeaNode: ChangeIdeaNode,
    };

    const [loading, setLoading] = useState(false);
    
    // reformat all nodes
    const aimNodes = [{
        id: aim.id+',projects',
        cool:'cool',
        position: {x: aim.aim_position_x, y: aim.aim_position_y},
        data: {
            id: aim.id,
            name: aim.aim_name,
            description: aim.aim_description,
            measure: aim.aim_outcome_measure,
            teamId: teamId,
        },
        type: 'aimNode',
    }];

    const primaryDriverNodes = primaryDrivers.map((pn, i) => ({
        id: pn.id+',primary_drivers',
        position: {x: pn.position_x, y: pn.position_y},
        data: {
            id: pn.id,
            name: pn.name,
            description: pn.description,
            measure: pn.process_measure,
            aimId: pn.aim_id,
        },
        type: 'primaryDriverNode'
    }));

    const secondaryDriverNodes = secondaryDrivers.map((sn, i) => ({
        id: sn.id+',secondary_drivers',
        position: {x: sn.position_x, y: sn.position_y},
        data: {
            id: sn.id,
            name: sn.name,
            description: sn.description,
            measure: sn.process_measure,
            aimId: sn.aim_id,
        },
        type: 'secondaryDriverNode'
    }));

    const changeIdeaNodes = changeIdeas.map((cn, i) => ({
        id: cn.id+',change_ideas',
        position: {x: cn.position_x, y: cn.position_y},
        data: {
            id: cn.id,
            name: cn.name,
            description: cn.description,
            aimId: cn.aim_id,
        },
        type: 'changeIdeaNode'
    }));

    // makes sure that the info is loaded before finishing.
    useEffect(() => {
        if (!isPending) {
            setLoading(false);
        }
    }, [isPending])

    // reformat all edges
    const ape = primaryDrivers.map((pn, i) => ({
        id: pn.id+',primary_drivers', 
        source: pn.aim_id+',projects', 
        target: pn.id+',primary_drivers' 
    }));

    const pse = primarySecondaryEdges.map((e, i) => ({
        id: e.id+',primary_secondary_edges', 
        source: e.source_id+',primary_drivers', 
        target: e.target_id+',secondary_drivers', 
    }));

    const sce = secondaryChangeEdges.map((e, i) => ({
        id: e.id+',secondary_change_edges', 
        source: e.source_id+',secondary_drivers', 
        target: e.target_id+',change_ideas', 
    }));

    // manage edge and node states
    const [nodes, setNodes, onNodesChange] = useNodesState([...aimNodes, ...primaryDriverNodes, ...secondaryDriverNodes, ...changeIdeaNodes]);
    const [edges, setEdges, onEdgesChange] = useEdgesState([...ape, ...pse, ...sce]);

    useEffect(() => {
        // set nodes and edges
        setNodes([...aimNodes, ...primaryDriverNodes, ...secondaryDriverNodes, ...changeIdeaNodes]);
        setEdges([...ape, ...pse,...sce]);
    }, [aim])

    // add projects

    // add drivers
    async function handleAddPrimaryDrivers() {
        setLoading(true);
        const {data, error} = await supabase
            .from('primary_drivers')
            .insert({aim_id: aim.id});

        // reset everything
        startTransition(() => {
            router.refresh();
        })
    }

    // add secondary drivers
    async function handleAddSecondaryDrivers() {
        setLoading(true);
        const {data, error} = await supabase
            .from('secondary_drivers')
            .insert({aim_id: aim.id});

        // reset everything
        startTransition(() => {
            router.refresh();
        })
    }

    // add change ideas
    async function handleAddChangeIdeas() {
        setLoading(true);
        const {data, error} = await supabase
            .from('change_ideas')
            .insert({aim_id: aim.id});

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
                const [id, type] = v.id.split(',');
                const {data, error} = await supabase
                    .from(type)
                    .update({
                        [type === 'projects'? 'aim_position_x':'position_x']: v.position.x,
                        [type === 'projects'? 'aim_position_y':'position_y']: v.position.y,
                    })
                    .eq('id', id)
                    .select();
            }
        })
    }

    // handle edge change
    async function handleEdgesChange(changes) {
        if (changes[0].type === 'remove') {
            const [id, type] = changes[0].id.split(',');

            if (type === 'primary_drivers') return;

            const {data, error} = await supabase
                .from(type)
                .delete()
                .eq('id', id);
        }

        onEdgesChange(changes);
    }

    // handle new connection
    async function handleConnect(params) {
        // get correct table dictionary
        const types = {
            'primary_drivers': {'secondary_drivers': 'primary_secondary_edges'},
            'secondary_drivers': {'change_ideas': 'secondary_change_edges'},
        }

        // get info
        const [sourceId, sourceType] = params.source.split(',');
        const [targetId, targetType] = params.target.split(',');

        const type = types[sourceType]?.[targetType];

        // if such a connection can't exist, then cancel
        if (!type) return;
        
        // insert edge
        const {data, error} = await supabase
            .from(type)
            .insert({
                source_id: sourceId,
                target_id: targetId,
                aim_id: aim.id,
            })
            .select();

        // format new edge
        const newEdge = {
            id: data[0].id+','+type,
            source: data[0].source_id+','+sourceType,
            target: data[0].target_id+','+targetType,
        }

        // set new edge
        setEdges((eds) => addEdge(newEdge, eds));
    }

    // handle auto layout
    async function handleLayout(direction) {
        const layouted = getLayoutedElements(nodes, edges, { direction });
    
        // update the nodes on the backend
        layouted.nodes.forEach(async v => {
            const [id, type] = v.id.split(',');
            const {data, error} = await supabase
                .from(type)
                .update({
                    [type === 'projects'? 'aim_position_x':'position_x']: v.position.x,
                    [type === 'projects'? 'aim_position_y':'position_y']: v.position.y,
                })
                .eq('id', id)
                .select();

            if (error) {
                console.log(error);
                router.refresh();
            }
        });

        // update front end nodes
        setNodes([...layouted.nodes]);
        setEdges([...layouted.edges]);
    
        window.requestAnimationFrame(() => {
            fitView();
        });
    }

    return (
        <>
            <ReactFlow 
                nodeTypes={nodeTypes}
                nodes={nodes} 
                edges={edges}
                onNodesChange={handleNodesChange}
                onEdgesChange={handleEdgesChange}
                onConnect={handleConnect}
                fitView
                panOnScroll
                selectionOnDrag
                // panOnDrag={[1,2]}
                selectionMode={SelectionMode.Partial}
                >
                <Panel position="top-right">
                    <Stack direction={'row'} spacing={'.5rem'}>
                        <Button 
                            color='info'
                            variant='contained' disableElevation 
                            startIcon={<AccountTreeRoundedIcon />}
                            onClick={() => handleLayout('LR')}
                            size='small'
                            sx={{borderRadius:3, textTransform:'none', justifyContent:'left'}}
                            >
                                Auto
                        </Button>
                        <Button  
                            color='info'
                            variant='contained' disableElevation 
                            startIcon={<AddRoundedIcon />}
                            onClick={handleAddPrimaryDrivers}
                            size='small'
                            sx={{borderRadius:3, textTransform:'none', justifyContent:'left'}}
                            >
                                Primary
                        </Button>
                        <Button  
                            color='info'
                            variant='contained' disableElevation 
                            startIcon={<AddRoundedIcon />}
                            onClick={handleAddSecondaryDrivers}
                            size='small'
                            sx={{borderRadius:3, textTransform:'none', justifyContent:'left'}}
                            >
                                Secondary
                        </Button>
                        <Button  
                            color='info'
                            variant='contained' disableElevation 
                            startIcon={<AddRoundedIcon />}
                            onClick={handleAddChangeIdeas}
                            size='small'
                            sx={{borderRadius:3, textTransform:'none', justifyContent:'left'}}
                            >
                                Change Idea
                        </Button>
                    </Stack>
                </Panel>
                <Background />
                <Controls />
            </ReactFlow>
            {loading && 
                <Box sx={{width:'100%', height:'100%', position:'absolute', top:0, left:0, p:'1rem', zIndex:1, boxSizing:'border-box'}}>
                    <Box sx={{backgroundColor:'common.black', opacity: 0.5, width:'100%', height:'100%', display:'flex', alignItems:'center', justifyContent:'center'}} >
                        <CircularProgress />
                    </Box>
                </Box>
            }
        </>
    )
}




// this is for auto layout
const getLayoutedElements = (nodes, edges, options) => {
    const g = new Dagre.graphlib.Graph().setDefaultEdgeLabel(() => ({}));
    g.setGraph({ rankdir: options.direction });

    edges.forEach((edge) => g.setEdge(edge.source, edge.target));
    nodes.forEach((node) =>
    g.setNode(node.id, {
        ...node,
        width: node.measured?.width ?? 0,
        height: node.measured?.height ?? 0,
    }),
    );

    Dagre.layout(g);

    return {
        nodes: nodes.map((node) => {
            const position = g.node(node.id);
            // We are shifting the dagre node position (anchor=center center) to the top left
            // so it matches the React Flow node anchor point (top left).
            const x = position.x - (node.measured?.width ?? 0) / 2;
            const y = position.y - (node.measured?.height ?? 0) / 2;

            return { ...node, position: { x, y } };
        }),
        edges,
    };
};


// function debounce(func, delay) {
//     let timeout;

//     return function (...args) {
//         // Clear the existing timeout if the function is called again
//         clearTimeout(timeout);

//         // Set a new timeout
//         timeout = setTimeout(() => {
//             func.apply(this, args); // Call the function with the correct context and arguments
//         }, delay);
//     };
// }