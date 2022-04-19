import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import {BPDimens, BPStandards} from '../../../utils/business-process/standards';

/**
 * The context menu for the tree.
 * @param {object} props - The props of the context menu component.
 * @return {JSX.Element} - The context menu for the tree.
 */
export default function TreeContextMenu(props) {
  return (
    <Menu
      open={props.contextMenu !== null}
      onClose={props.handleClose}
      anchorReference="anchorPosition"
      anchorPosition={
          props.contextMenu !== null ?
            {top: props.contextMenu.mouseY, left: props.contextMenu.mouseX} :
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
      <MenuItem onClick={props.handleClose}>Expand Children</MenuItem>
      <MenuItem onClick={props.handleClose}>Collapse Children</MenuItem>
      <MenuItem onClick={props.handleClose}>View Detail</MenuItem>
      <MenuItem onClick={props.handleClose}>{props.contextMenu !== null ? props.contextMenu.source : null}</MenuItem>
    </Menu>
  );
}
