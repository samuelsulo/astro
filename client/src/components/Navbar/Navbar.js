import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { AppBar, Toolbar, Typography, IconButton, List, ListItem, Divider, Avatar, ListItemText } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';

import MenuSlider from './MenuSlider';
import IconProfile from './IconProfile';
import { Search, SearchIconWrapper, StyledInputBase} from './Search';
import SearchIcon from '@material-ui/icons/Search';
import { useStyles } from './styles';

function Navbar() {
    const [open, setOpen] = React.useState(false);
    const [search, setSearch] = React.useState('');
    const [foundUsers, setFoundUsers] = React.useState([]);
    const [notFound, setNotFound] = React.useState(false);
    const [listOpen, setListOpen] = React.useState(false);
    const {isLogged, user} = useSelector(state => state.authReducer);
    const users = useSelector(state => state.authReducer.users);
    
    const handleDrawerOpen = () => setOpen(true);

    const handleSearch = (e) => {
        const value = e.target.value;
        let arr = [];
        setSearch(value);
        if (value === '') return setFoundUsers(arr);
        let numberOfFound = 0;
        for (let i = 0; i < users.length; i++) {
            if (value.toLowerCase() === (users[i].username).substring(0, value.length).toLowerCase()) {
                numberOfFound++;
                arr.push(users[i])
            }
        }
        setFoundUsers(arr);
        if (numberOfFound === 0) {
            setNotFound(true);
        } else setNotFound(false);
    }

    const clear = () => {
        setSearch('');
        setFoundUsers([]);
        setNotFound(false);
    }

    const classes = useStyles();
    return (
        <div id="navbar" className={classes.root}>
            <AppBar position="static" className={classes.appBar}>
                <Toolbar className={classes.toolbar}>
                    <div className={classes.item1}>
                        <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu" onClick={handleDrawerOpen}>
                            <MenuIcon />
                        </IconButton>
                        <Link to="/home" className={classes.logoLink}>
                            <Typography variant="h6" className={classes.title}>
                            Astro
                            </Typography>
                        </Link>
                    </div>
                    {isLogged && <div className={classes.item2}>
                        <Search style={{position: 'relative'}}>
                            <SearchIconWrapper>
                                <SearchIcon />
                            </SearchIconWrapper>
                            <StyledInputBase
                                type="text"
                                placeholder='Search...'
                                value={search}
                                onChange={handleSearch}
                                onFocus={() => setListOpen(true)}
                                onBlur={() => setTimeout(() => setListOpen(false) , 100)}
                            />
                            {listOpen && (foundUsers.length > 0 || notFound) && 
                                <List className={classes.searchList}>
                                {foundUsers.map((x, index) => (
                                    <Link to={{ 
                                        pathname: `/profile`,
                                        search: `${x.username}` 
                                        }} key={index} className={classes.link} onClick={clear}>
                                        <ListItem className={classes.searchListItem}>
                                            <Avatar className={classes.avatar} src={x.image} style={{backgroundColor: x.avatarColor}}>{(x.username).substring(0, 1).toUpperCase()}</Avatar>
                                            <ListItemText primary={x.username} />
                                        </ListItem>
                                        <Divider />
                                    </Link>
                                    )
                                )}
                                {notFound && 
                                    <ListItem className={classes.searchListItem}>
                                        User not found.
                                    </ListItem>}
                            </List>    }
                        </Search>
                        <IconProfile /> 
                    </div>}
                </Toolbar>
                <MenuSlider isLogged={isLogged} user={user} open={open} setOpen={setOpen}/>
            </AppBar>
        </div>
    )
}

export default Navbar;
