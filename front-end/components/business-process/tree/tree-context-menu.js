import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';


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
    >
      <MenuItem onClick={props.handleClose}>Expand Children</MenuItem>
      <MenuItem onClick={props.handleClose}>Collapse Children</MenuItem>
      <MenuItem onClick={props.handleClose}>View Detail</MenuItem>
    </Menu>
  );
}
