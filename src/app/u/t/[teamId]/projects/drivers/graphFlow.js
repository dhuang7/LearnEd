'use client'

import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
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

import { useEffect, useState } from 'react';
import '@xyflow/react/dist/style.css';
import { AimNode, PrimaryDriverNode, SecondaryDriverNode } from './customNode';
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
function GraphFlowLayout({teamId, aim, primaryDrivers}) {
    const { fitView } = useReactFlow();
    const supabase = createClient();
    const router = useRouter();
    const nodeTypes = { 
        aimNode: AimNode,
        primaryDriverNode: PrimaryDriverNode,
        secondaryDriverNode: SecondaryDriverNode,
    };

    const [aimNodes, setAimNodes] = useState([]);
    const [primaryDriverNodes, setPrimaryDriverNodes] = useState([]);
    const [aimPrimaryEdges, setAimPrimaryEdges] = useState([]);
    const [nodes, setNodes, onNodesChange] = useNodesState([]);
    const [edges, setEdges, onEdgesChange] = useEdgesState([]);

    // update and reformat nodes and edges
    useEffect(() => {
        // edges
        setAimNodes([{
            id: aim.id,
            position: {x: aim.aim_position_x, y: aim.aim_position_y},
            data: {
                id: aim.id,
                name: aim.aim_name,
                description: aim.aim_description,
                measure: aim.aim_outcome_measure,
                teamId: teamId,
            },
            type: 'aimNode',
        }]);
        setPrimaryDriverNodes(primaryDrivers.map((pn, i) => ({
            id: pn.id,
            position: {x: pn.position_x, y: pn.position_y},
            data: {
                id: pn.id,
                name: pn.name,
                description: pn.description,
                measure: pn.process_measure,
            },
            type: 'primaryDriverNode'
        })));

        // edges
        setAimPrimaryEdges(primaryDrivers.map((pn, i) => ({id: pn.aim_id+','+pn.id, source: pn.aim_id, target: pn.id })));

    }, [aim, primaryDrivers]);

    // manage edge and node states
    useEffect(() => {
        // set nodes and edges
        setNodes([...aimNodes, ...primaryDriverNodes]);
        setEdges([...aimPrimaryEdges]);
    }, [aimNodes, primaryDriverNodes, aimPrimaryEdges])
    

    // adding new nodes won't be all that hard. just add the new node because
    // each node is already having the saving part for itself in the node itself

    // add projects

    // add drivers
    async function handleAddPrimaryDrivers() {
        const {data, error} = await supabase
            .from('primary_drivers')
            .insert({aim_id: aim.id});

        router.refresh();
        // not refreshing properly ///////////////// start transition?
    }

    // add secondary drivers

    // add change ideas

    // maybe all the above should just be one function that changes based on an input of 
    // aim, primary driver, secondary driver, or change idea

    // handlers
    function handleNodesChange(changes) {
        onNodesChange(changes);
    }

    function handleEdgesChange(changes) {
        onEdgesChange(changes);
    }

    function handleConnect(params) {
        setEdges((eds) => addEdge(params, eds))
    }

    function handleLayout(direction) {
        const layouted = getLayoutedElements(nodes, edges, { direction });
    
        setNodes([...layouted.nodes]);
        setEdges([...layouted.edges]);
    
        window.requestAnimationFrame(() => {
            fitView();
        });
    }

    return (
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
                        onClick={() => handleLayout('LR')}
                        size='small'
                        sx={{borderRadius:3, textTransform:'none', justifyContent:'left'}}
                        >
                            Secondary
                    </Button>
                    <Button  
                        color='info'
                        variant='contained' disableElevation 
                        startIcon={<AddRoundedIcon />}
                        onClick={() => handleLayout('LR')}
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