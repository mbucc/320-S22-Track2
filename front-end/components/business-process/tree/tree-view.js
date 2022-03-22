import * as React from 'react';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import TreeView from '@mui/lab/TreeView';
import TreeItem from '@mui/lab/TreeItem';
import {BPTextButton} from '../common/button';
import {sampleEAIDomains} from '../../../utils/business-process/sample-data';
import {BPColors, BPDimens, BPStandards} from '../../../utils/business-process/standards';
import Image from 'next/image';
import TreeContextMenu from './tree-context-menu';

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

const BPActivitySeverityIcons = {
  info: '/business-process/icons/severity-icons-info.svg',
  warning: '/business-process/icons/severity-icons-warning.svg',
  error: '/business-process/icons/severity-icons-error.svg',
  success: '/business-process/icons/severity-icons-success.svg',
};

const BPActivitySeverityIcon = ({severity}) => {
  return (
    <Image
      width={18}
      height={18}
      src={BPActivitySeverityIcons[severity]}
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

const data = sampleEAIDomains;
const _expandable = findExpandable(data);

/**
 * The hierarchy tree view component of business process view.
 * @param {Object} props - The props passed to the component.
 * @param {Object} props.onChange - The callback function when the tree view is changed.
 * @return {JSX.Element} - The generated tree view component.
 */
export default function BPTreeComponent({onChange}) {
  const [expanded, setExpanded] = React.useState([]);
  const [contextMenu, setContextMenu] = React.useState(null);

  const handleContextMenu = (event, source) => {
    event.stopPropagation();
    event.preventDefault();
    setContextMenu(
      contextMenu === null ?
        {
          mouseX: event.clientX - 2,
          mouseY: event.clientY - 4,
          source: source,
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
            oldExpanded.length === 0 ? _expandable : []
    );
  };
  // For now, needs to be put here to pass in handleContextMenu
  const renderEAIDomains = (nodes) => (
    <TreeItem
      key={nodes.name}
      nodeId={nodes.name}
      label={nodes.name}
      onContextMenu={(e) => handleContextMenu(e, nodes.name)}
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
      onContextMenu={(e) => handleContextMenu(e, nodes.name)}
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
      onContextMenu={(e) => handleContextMenu(e, nodes.name)}
      sx={subTreeStyle}
    >
      {
        Array.isArray(nodes.activities) ?
          nodes.activities.map((log) => renderBusinessProcessInstances(log)) :
          null
      }
    </TreeItem>
  );

  const renderBusinessProcessInstances = (log) =>(
    <TreeItem
      key={log.id}
      nodeId={log.id}
      icon={<BPActivitySeverityIcon severity={log.severity}/>}
      label={log.sampleContent}
      sx={{
        marginTop: '1px',
        borderRadius: BPDimens.treeRadius,
        color: getColorBySeverity(log.severity),
        backgroundColor: BPColors.transparent,
        '&:hover': {
          backgroundColor: BPColors.gray[100],
        },
        '& > .MuiTreeItem-content': {
          minHeight: 34,
          borderRadius: BPDimens.treeRadius,
          padding: '0px 13px',
          '&.Mui-focused, &.Mui-selected, &.Mui-focused.Mui-selected': {
            backgroundColor: BPColors.gray[100],
            '&:hover': {
              backgroundColor: BPColors.transparent,
            },
          },
          '&:hover': {
            backgroundColor: BPColors.transparent,
          },
        },
      }}
    />
  );
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
          padding: 20,
          overflowY: 'scroll',
          rowGap: 14,
        }}
        onContextMenu={e => e.preventDefault()}
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
            data.map((nodes) => renderEAIDomains(nodes))
          }
        </TreeView>
        <TreeContextMenu contextMenu={contextMenu} handleClose={handleClose}/>
      </div>
    </div>
  );
};
