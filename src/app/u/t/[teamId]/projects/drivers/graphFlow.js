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


// Provider
export default function GraphFlow({params}) {
    return (
        <ReactFlowProvider>
            <GraphFlowLayout {...params} />
        </ReactFlowProvider>
    );
}

// Actual Component
function GraphFlowLayout({teamId, projects}) {
    const { fitView } = useReactFlow();
    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
    const nodeTypes = { 
        aimNode: AimNode,
        primaryDriverNode: PrimaryDriverNode,
        secondaryDriverNode: SecondaryDriverNode,
    };

    // adding new nodes won't be all that hard. just add the new node because
    // each node is already having the saving part for itself in the node itself

    // add projects

    // add drivers

    // add secondary drivers

    // add change ideas

    // maybe all the above should just be one function that changes based on an input of 
    // aim, primary driver, secondary driver, or change idea

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
                        onClick={() => handleLayout('LR')}
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




// Extra things



const initialNodes = [
    {
        id: '1',
        position: { x: 0, y: 0 },
        data: { 
            id: null,
            name: 'poop',
            description: 'i have  a really long obsession with really long names',
            measure:'cool',
            teamId: '', 
        },
        type: 'aimNode',
    },
    {
        id: '2',
        position: { x: 350, y: 0 },
        data: { 
            id: null,
            name: 'we',
            description: 'i have  a really long obsession with really long names',
            measure:'333333',
            teamId: '', 
        },
        type: 'primaryDriverNode',
    },
];

const initialEdges = [{ id: '1-2', source: '1', target: '2' }];