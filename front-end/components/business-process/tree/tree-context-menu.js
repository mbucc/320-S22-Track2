import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import {BPDimens, BPStandards} from '../../../utils/business-process/standards';
import {findExpandable} from './tree-view';

/**
 * The context menu for the tree.
 * @param {object} props - The props of the context menu component.
 * @return {JSX.Element} - The context menu for the tree.
 */
export default function TreeContextMenu({contextMenu, handleClose, expanded, setExpanded}) {
  return (
    <Menu
      open={contextMenu !== null}
      onClose={handleClose}
      anchorReference="anchorPosition"
      anchorPosition={
          contextMenu !== null ?
            {top: contextMenu.mouseY, left: contextMenu.mouseX} :
            undefined
      }
      sx={{
        '& .MuiPaper-root': {
          borderRadius: BPDimens.cornerRadius + 'px',
          border: BPStandards.border,
          boxShadow: BPStandards.menuShadow,
        },
        '& .MuiMenuItem-root': {
          fontSize: '0.95rem',
        },
      }}
    >
      <MenuItem
        onClick={() => {
          const toBeExpanded = findExpandable([contextMenu.node]);
          if (!expanded.includes(contextMenu.node.name)) {
            // Expand.
            setExpanded([...expanded, ...toBeExpanded]);
          } else {
            setExpanded([
              ...expanded,
              ...(toBeExpanded.filter((n) => n !== contextMenu.node.name)),
            ]);
          }
          handleClose();
        }}
      >
        Expand All Children
      </MenuItem>
      <MenuItem
        onClick={() => {
          const toBeCollapsed = findExpandable([contextMenu.node]);
          setExpanded(expanded.filter((name) => {
            return !toBeCollapsed.includes(name) || name === contextMenu.node.name;
          }));
          handleClose();
        }}
      >
        Collapse All Children
      </MenuItem>
    </Menu>
  );
}
