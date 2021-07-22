import React from 'react';
import { Link } from 'react-router-dom';

import { IconButton, Menu, MenuItem} from '@material-ui/core';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import SettingsIcon from '@material-ui/icons/Settings';

import { useStyles } from './styles';

function IconProfile() {

    const [anchorEl, setAnchorEl] = React.useState(null);
    const openMenu = Boolean(anchorEl);
  
    const handleMenu = (event) => {
      setAnchorEl(event.currentTarget);
    };
  
    const handleClose = () => {
      setAnchorEl(null);
    };

    const classes = useStyles();
    return (
        <div>
            <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
            >
                <AccountCircleIcon />
            </IconButton>
            <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
                }}
                open={openMenu}
                onClose={handleClose}
            >
                {[
                    ["Profile", "", <AccountCircleIcon />],
                    ["Post", "?addPost", <AddCircleIcon />], 
                    ["Settings", "?settings", <SettingsIcon />],
                ].map((arr, index) => (
                    <Link key={index} to={{
                        pathname: "/user/profile",
                        search: arr[1]}} className={classes.link}>
                        <MenuItem onClick={handleClose} className={classes.menuItem}>{arr[2]} {arr[0]}</MenuItem>
                    </Link>
                ))}
            </Menu>
        </div>
    )
}

export default IconProfile
