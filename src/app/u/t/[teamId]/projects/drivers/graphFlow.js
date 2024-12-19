'use client'

import {
    ReactFlow,
    ReactFlowProvider,
    Panel,
    useReactFlow,
    Background,
    Controls,
    applyNodeChanges,
    applyEdgeChanges,
    addEdge,
} from '@xyflow/react';
import Dagre from '@dagrejs/dagre';

import { useState } from 'react';
import '@xyflow/react/dist/style.css';
import CustomNode from './customNode';


function GraphFlowLayout({params}) {
    const { fitView } = useReactFlow();
    const [nodes, setNodes] = useState(initialNodes);
    const [edges, setEdges] = useState(initialEdges);

    function handleNodesChange(changes) {
        setNodes((nds) => applyNodeChanges(changes, nds))
    }

    function handleEdgesChange(changes) {
        setEdges((eds) => applyEdgeChanges(changes, eds))
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
            >
            <Panel position="top-right">
                <button onClick={() => handleLayout('TB')}>vertical layout</button>
                <button onClick={() => handleLayout('LR')}>horizontal layout</button>
            </Panel>
            <Background />
            <Controls />
        </ReactFlow>
    )
}

export default function GraphFlow() {
    return (
        <ReactFlowProvider>
            <GraphFlowLayout />
        </ReactFlowProvider>
    );
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

const nodeTypes = { customNode: CustomNode };

const initialNodes = [
    {
        id: '1',
        position: { x: 0, y: 0 },
        data: { label: 'Hello' },
        type: 'customNode',
    },
    {
        id: '2',
        position: { x: 100, y: 100 },
        data: { label: 'World' },
        type: 'customNode',
    },
];

const initialEdges = [{ id: '1-2', source: '1', target: '2' }];