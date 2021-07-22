import React from 'react';
import { Typography, SwipeableDrawer, Divider, List, ListItem, ListItemIcon, ListItemText, IconButton, Avatar } from '@material-ui/core';
import { useHistory, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import HomeIcon from '@material-ui/icons/Home';
import WorkIcon from '@material-ui/icons/Work';
import InfoIcon from '@material-ui/icons/Info';
import ContactSupportIcon from '@material-ui/icons/ContactSupport';
import LockIcon from '@material-ui/icons/Lock';
import LockOpen from '@material-ui/icons/LockOpen';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

import { logout } from '../../store/actions/auth';
import {useStyles} from './styles';

function MenuSlider( props ) {
    const { isLogged, user, open, setOpen } = props;
    const handleDrawerClose = () => setOpen(false);
    const history = useHistory();
    const dispatch = useDispatch();

    const thisLogout = () => {
        handleDrawerClose();
        dispatch(logout());
        history.replace('/account/signin');
    }

    const classes = useStyles();
      
    return (
        <SwipeableDrawer
            anchor='left'
            open={open}
            onClose={() => setOpen(false)}
            onOpen={() => setOpen(true)}
            className={classes.drawer}
        >
            <div className={classes.drawerHeader}>
                { isLogged ? 
                    <Link to="/user/profile" className={classes.profileLink}>
                        <Avatar src={user.image} style={{backgroundColor: user.avatarColor}}>
                            {(user.username).substring(0, 1).toUpperCase()}
                        </Avatar>
                        <Typography  style={{marginLeft: '20px'}} variant="body1">{user.username}</Typography>
                    </Link>
                    :
                    <>
                        <img src="/img/astro_logo.png" style={{width: '20%'}} alt=""/> 
                        <Typography variant="h6" style={{color: '#03a9f4', width: '40%'}}>Astro</Typography>
                    </>
                    
                }
                <IconButton onClick={handleDrawerClose}>
                    <ChevronLeftIcon />
                </IconButton>
            </div>
            <Divider />
            <List className={classes.list}>
                {[
                    ['Home', '/home', <HomeIcon/>],
                    ['Work', '/work', <WorkIcon/>],
                    ['About', '/about', <InfoIcon/>],
                    ['Contact', '/About#contact', <ContactSupportIcon/>],
                ].map((arr, index) => (
                    <Link to={arr[1]} key={index} className={classes.link} onClick={() => setOpen(false)}>
                        <ListItem button>
                            <ListItemIcon className={classes.drawerIcons}>{arr[2]}</ListItemIcon>
                            <ListItemText primary={arr[0]} />
                        </ListItem>
                    </Link>
                ))}
            </List>
            <Divider />
            <List className={classes.list}>
            
                {!isLogged ? 
                    [
                        ['Sign up', '/account/signup', <LockIcon/>],
                        ['Sign in', '/account/signin', <LockOpen/>],
                    ].map((arr, index) => (
                        <Link to={arr[1]} key={index} className={classes.link} onClick={() => setOpen(false)}>
                            <ListItem button>
                                <ListItemIcon className={classes.drawerIcons}>{arr[2]}</ListItemIcon>
                                <ListItemText primary={arr[0]} />
                            </ListItem>
                        </Link>
                    )) : 
                        <ListItem button onClick={thisLogout}>
                            <ListItemIcon className={classes.drawerIcons}><ExitToAppIcon /></ListItemIcon>
                            <ListItemText primary="Logout" />
                        </ListItem>
                }
            </List>
        </SwipeableDrawer>
    )
}

export default MenuSlider;
