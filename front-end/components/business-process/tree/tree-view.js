import * as React from 'react';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import TreeView from '@mui/lab/TreeView';
import TreeItem from '@mui/lab/TreeItem';
import {BPTextButton} from '../common/button';
import {sampleEAIDomains} from '../../../utils/business-process/sample-data';
import {BPColors, BPDimens, BPStandards} from '../../../utils/business-process/standards';
import Image from 'next/image';

const BPActivitySeverity = {
  info: '/business-process/icons/severity-icons-info.svg',
  warning: '/business-process/icons/severity-icons-warning.svg',
  error: '/business-process/icons/severity-icons-error.svg',
  success: '/business-process/icons/severity-icons-success.svg',
};

const getColorBySeverity = (severity) => {
  switch (severity) {
    case 'success':
      return BPColors.success;
    case 'info':
      return BPColors.info;
    case 'warning':
      return BPColors.warning;
    case 'error':
      return BPColors.error;
  }
};

const BPActivitySeverityIcon = ({severity}) => {
  return (
    <Image
      width={18}
      height={18}
      src={BPActivitySeverity[severity]}
    />
  );
};
const findExpandable = (tree) => {
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
const contextMenu = (e, source) => console.log( source + 'rightclick');

const renderLog = (log) =>(
  <TreeItem key={log.id} nodeId={log.id} icon = {<BPActivitySeverityIcon severity={log.severity} />}
    label={log.severity} sx={{
      backgroundColor: log.severity == 'info' ? BPColors.green[50] : BPColors.gray[30],
      '&:hover': {
        backgroundColor: BPColors.gray[70],
      },
    }}>

  </TreeItem>
);
const renderTree = (nodes) => (
  <TreeItem key={nodes.name} nodeId={nodes.name} label={nodes.name} onContextMenu={(e) => contextMenu(e, nodes.name)}
    sx={{
      backgroundColor: BPColors.gray[30],
      '&:hover': {
        backgroundColor: BPColors.gray[70],
      },
    }}
  >
    {
            Array.isArray(nodes.children) ?
                nodes.children.map((node) => renderTree(node)) :
                Array.isArray(nodes.activities) ? nodes.activities.map((log) => renderLog(log)) : null}
  </TreeItem>
);

const data = sampleEAIDomains;
const _expandable = findExpandable(data);

export default function ControlledTreeView() {
  const [expanded, setExpanded] = React.useState([]);

  const handleToggle = (event, nodeIds) => {
    setExpanded(nodeIds);
  };

  const handleExpandClick = () => {
    setExpanded((oldExpanded) =>

            oldExpanded.length === 0 ? _expandable : []
    );
  };

  const handleRightClick = () =>{
    console.log('hello');
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
          {
            data.map((nodes) => renderTree(nodes))
          }
        </TreeView>
      </div>
    </div>

  );
}
