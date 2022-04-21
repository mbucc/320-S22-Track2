import React, {useEffect, useState} from 'react';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import TreeView from '@mui/lab/TreeView';
import TreeItem from '@mui/lab/TreeItem';
import {BPTextButton} from '../common/button';

import {BPColors, BPDimens, BPStandards} from '../../../utils/business-process/standards';
import renderBusinessProcessInstances from './tree-item-log';
import TreeContextMenu from './tree-context-menu';

export const findExpandable = (tree) => {
  const result = [];
  const stack = [...tree];
  while (stack.length) {
    const node = stack.pop();
    if (Array.isArray(node.children)) {
      result.push(node.name);
      node.children.forEach((n) => stack.push(n));
    }
    if (Array.isArray(node.activities)) {
      result.push(node.name);
    }
  }
  return result;
};

// Reusable EAI domain tree item style.
const rootTreeStyle = {
  backgroundColor: BPColors.transparent,
  borderRadius: BPDimens.treeRadius,
  marginBottom: '10px',
  '&:hover': {
    backgroundColor: BPColors.gray[70] + '4f',
  },
  '& > .MuiTreeItem-content': {
    minHeight: 40,
    backgroundColor: BPColors.gray[30],
    borderRadius: BPDimens.treeRadius,
    border: BPStandards.border,
    '&:hover': {
      backgroundColor: BPColors.gray[100],
    },
    '&.Mui-focused, &.Mui-selected, &.Mui-focused.Mui-selected': {
      backgroundColor: BPColors.gray[70],
      '&:hover': {
        backgroundColor: BPColors.gray[100],
      },
    },
  },
};

// Reusable publishing domain and business process tree item style.
const subTreeStyle = {
  backgroundColor: BPColors.transparent,
  borderRadius: BPDimens.treeRadius,
  marginTop: '1px',
  '&:hover': {
    backgroundColor: BPColors.gray[70] + '4f',
  },
  '& > .MuiTreeItem-content': {
    minHeight: 34,
    borderRadius: BPDimens.treeRadius,
    '&:hover': {
      backgroundColor: BPColors.gray[100],
    },
    '&.Mui-focused, &.Mui-selected, &.Mui-focused.Mui-selected': {
      backgroundColor: BPColors.gray[100],
    },
  },
};

/**
 * The hierarchy tree view component of business process view.
 * @param {Object} props - The props passed to the component.
 * @param {function} props.onChange - The callback function when the tree view is changed.
 * @return {JSX.Element} - The generated tree view component.
 */
export default function BPTreeComponent({data: dataProp, onChange}) {
  const [data, setData] = useState(dataProp);
  const [expanded, setExpanded] = React.useState([]);
  const [expandable, setExpandable] = useState([]);
  const [contextMenu, setContextMenu] = React.useState(null);

  useEffect(() => {
    setData(dataProp);
    setExpandable(findExpandable(dataProp));
  }, [dataProp]);

  const handleContextMenu = (event, source) => {
    event.stopPropagation();
    event.preventDefault();
    setContextMenu(
      contextMenu === null ?
        {
          mouseX: event.clientX - 2,
          mouseY: event.clientY - 4,
          node: source,
        } :
        null,
    );
  };

  const handleClose = () => {
    setContextMenu(null);
  };
  const handleToggle = (event, nodeIds) => {
    setExpanded(nodeIds);
  };

  const handleExpandClick = () => {
    setExpanded((oldExpanded) =>
            oldExpanded.length === 0 ? expandable : []
    );
  };

  // NOTE: For now, needs to be put here to pass in handleContextMenu.
  const renderEAIDomains = (nodes) => (
    <TreeItem
      key={nodes.name}
      nodeId={nodes.name}
      label={nodes.name}
      onContextMenu={(e) => handleContextMenu(e, nodes)}
      sx={rootTreeStyle}
    >
      {
        Array.isArray(nodes.children) ?
          nodes.children.map((node) => renderPublishingBusinessDomains(node)) :
          null
      }
    </TreeItem>
  );

  const renderPublishingBusinessDomains = (nodes) => (
    <TreeItem
      key={nodes.name}
      nodeId={nodes.name}
      label={nodes.name}
      onContextMenu={(e) => handleContextMenu(e, nodes)}
      sx={subTreeStyle}
    >
      {
        Array.isArray(nodes.children) ?
          nodes.children.map((node) => renderBusinessProcesses(node)) :
          null
      }
    </TreeItem>
  );

  const renderBusinessProcesses = (nodes) => (
    <TreeItem
      key={nodes.name}
      nodeId={nodes.name}
      label={nodes.name}
      onContextMenu={(e) => handleContextMenu(e, nodes)}
      sx={subTreeStyle}
    >
      {
        Array.isArray(nodes.activities) ?
          nodes.activities.map((log) => renderBusinessProcessInstances(log, (log) => {
            if (onChange) {
              onChange(log);
            }
          })) :
          null
      }
    </TreeItem>
  );

  useEffect(() => {
    console.log('expanded', expanded);
  }, [expanded]);

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
        <BPTextButton
          onClick={handleExpandClick}
        >
          {expanded.length === 0 ? 'Expand All' : 'Collapse All'}
        </BPTextButton>
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
          overflowX: 'hidden',
          overflowY: 'auto',
        }}
        onContextMenu={(e) => e.preventDefault()} // Disable the default context menu on BPTreeView.
      >
        <TreeView
          aria-label="controlled"
          defaultCollapseIcon={<ExpandMoreIcon />}
          defaultExpandIcon={<ChevronRightIcon />}
          expanded={expanded}
          onNodeToggle={handleToggle}
          sx={{
            padding: '20px 20px',
          }}
          multiSelect
        >
          {
            data.map((nodes) => renderEAIDomains(nodes))
          }
        </TreeView>
        <TreeContextMenu
          expanded={expanded}
          setExpanded={(newExpanded) => setExpanded(newExpanded)}
          contextMenu={contextMenu}
          handleClose={handleClose}
        />
      </div>
    </div>
  );
};
