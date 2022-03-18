import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import TreeView from '@mui/lab/TreeView';
import TreeItem from '@mui/lab/TreeItem';
import { BPTextButton } from '../common/button';
import { sampleEAIDomains } from '../../../utils/business-process/sample-data';
import {BPColors, BPDimens, BPStandards} from '../../../utils/business-process/standards';

const findExpandable = (tree) => {
    const result = [];
    const stack = [...tree];
    while (stack.length) {
        const node = stack.pop()
        if(Array.isArray(node.children)){
            result.push(node.name)
            node.children.forEach(n => stack.push(n))
        }
    }
    return result
}
    
const renderTree = (nodes) => (
    <TreeItem key={nodes.name} nodeId={nodes.name} label={nodes.name}
    sx={{
        backgroundColor:  BPColors.gray[30],
          "&:hover": {
            backgroundColor: BPColors.gray[70],
            }
    }}
    >
        {
            Array.isArray(nodes.children)
                ? nodes.children.map((node) => renderTree(node))
                : null}
    </TreeItem>
);

export default function ControlledTreeView() {
    const [expanded, setExpanded] = React.useState([]);


    const handleToggle = (event, nodeIds) => {
        setExpanded(nodeIds);
    };

    const handleExpandClick = () => {
        setExpanded((oldExpanded) =>

            oldExpanded.length === 0 ? findExpandable(sampleEAIDomains) : []
        );
    };


    return (
        <div
            style={{
                width: '100%',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
            }}
        >
            {/* Top Bar */}
            <div
                style={{
                    width: '100%',
                    height: BPDimens.toolbarHeight,
                    flexShrink: 0,
                    flexGrow: 0,
                    padding: '0px 20px',
                    borderBottom: BPStandards.border,
                    backgroundColor: '#fff',
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'flex-start',
                    columnGap: 2,
                }}
            >
                <BPTextButton onClick={handleExpandClick}>{expanded.length === 0 ? 'Expand All' : 'Collapse All'}</BPTextButton>
            </div>

            {/* Tree Map */}
            <div
                style={{
                    width: '100%',
                    height: '100%',
                    flexShrink: 1,
                    flexGrow: 0,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'left',
                    justifyContent: 'flex-start',
                    padding: 20,
                    overflowY: 'scroll',
                    rowGap: 14,
                }}
            >
                <TreeView
                    aria-label="controlled"
                    defaultCollapseIcon={<ExpandMoreIcon />}
                    defaultExpandIcon={<ChevronRightIcon />}
                    expanded={expanded}
                    onNodeToggle={handleToggle}
                    multiSelect
                >
                    {sampleEAIDomains.map((nodes) => renderTree(nodes))}
                </TreeView>
            </div>
        </div>

    );
}