import { Button, AppBar, IconButton, Popover, Toolbar, Typography, MenuList, MenuItem, Link } from '@mui/material'
import { Menu } from '@mui/icons-material'
import React from 'react'
import { useState } from 'react'

export default function Header() {
  /* state for the popover component. Popover will anchor to the element in anchor */
  const [anchor, setAnchor] = useState(null);

  /**
   * 
   * @param e click event from clicking on IconButton
   */

  const openPopover = (e) => {
    setAnchor(e.currentTarget)
  }

  const handleClose = (e) =>{
    setAnchor(null)
  }

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
            vertical: "bottom",
            horizontal: "left",
          }}
          transformOrigin = {{
            vertical: "top",
            horizontal: "left"
          }}>
            
            <MenuList>
              <MenuItem>
                <Button>
                  <Link href = "/">
                    Home
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
              Log Events
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  )
}
