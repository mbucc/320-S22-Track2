import {Button, AppBar, IconButton, Popover, Toolbar, Typography, MenuList, MenuItem, Link} from '@mui/material';
import {Menu} from '@mui/icons-material';
import React from 'react';
import {useState} from 'react';

/**
 * @param {*} props homeHref - hypertext reference for the home button. homeText - text for the home button. titleText - text for the title
 * @return {JSX.Element}
 */
export default function Header(props) {
  /* state for the popover component. Popover will anchor to the element in anchor */
  const [anchor, setAnchor] = useState(null);

  /**
   *
   * @param e click event from clicking on IconButton
   */

  const openPopover = (e) => {
    setAnchor(e.currentTarget);
  };

  /**
   * handles closing of popover menu
   */

  const handleClose = () =>{
    setAnchor(null);
  };

  return (
    <div>
      <AppBar position = "static">
        <Toolbar>
          <IconButton onClick={openPopover}>
            <Menu />
          </IconButton>
          <Popover
            open = {Boolean(anchor)}
            anchorEl = {anchor}
            onClose = {handleClose}
            anchorOrigin = {{
              vertical: 'bottom',
              horizontal: 'left',
            }}
            transformOrigin = {{
              vertical: 'top',
              horizontal: 'left',
            }}>

            <MenuList>
              <MenuItem>
                <Button>
                  <Link href = {props.homeHref}>
                    {props.homeText}
                  </Link>
                </Button>
              </MenuItem>
              <MenuItem>
                <Button>
                  Profile
                </Button>
              </MenuItem>
              <MenuItem>
                <Button>
                  Logout
                </Button>
              </MenuItem>
            </MenuList>
          </Popover>
          <Typography variant = "h4">
            {props.titleText}
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
}

Header.defaultProps = {
  homeHref: '/',
  homeText: 'Home',
  titleText: 'DefaultTitle',
};
