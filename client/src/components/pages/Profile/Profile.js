import React from 'react';
import { useSelector  } from 'react-redux';
import {  useHistory } from 'react-router-dom';

import { Avatar, Grid, Typography } from '@material-ui/core';

import NavbarLink from '../../NavbarLink/NavbarLink';
import CostumDialog from './CustomDialog';
import {useStyles} from './styles';
import Posts from '../../Posts/Posts';
import Form from '../../Posts/Form/Form';
import Settings from './Settings';

function Profile() {
    document.title = "Astro | myProfile";
    const { isLogged, user, users } = useSelector(state => state.authReducer);
    const posts = useSelector(state => state.postReducer.userPosts);
    const [page, setPage] = React.useState({posts: false, addPost: false, settings: false});
    const [open, setOpen] = React.useState(false);
    const [dialogTitle, setDialogTitle] = React.useState();
    const [matchingUsers, setMatchingUsers] = React.useState([]);
    const history = useHistory();
    const location = history.location;

    
    React.useEffect(() => {
        document.title = "Profile";
        if (location.search === '?addPost')
            setPage({ ...page, posts: false, addPost: true, settings: false });
        else if (location.search === '?settings')
            setPage({ ...page, posts: false, addPost: false, settings: true });
        else 
            setPage({ ...page, posts: true, addPost: false, settings: false });
    }, [location]);

    const linkToPosts = () => {
        if (location.pathname === "/user/profile" && location.search !== "")
            history.push("/user/profile");
    }

    const openDialog = (ids, title) => {
        let temp = []
        for (let i = 0; i < users.length; i++) {
            if (ids.includes(users[i]._id))
                temp.push(users[i]);
        }
        setMatchingUsers(temp);
        setOpen(true);
        setDialogTitle(title);
    }

    const classes = useStyles();
    return (
        isLogged ?
            (<div>
                <Grid container>
                    <Grid item xs={12}>
                        <Grid container justifyContent="center" className={classes.header}>
                            <Grid item xs={12} align="center">
                                <Avatar className={classes.avatar} style={{backgroundColor: user.avatarColor }} src={user.image}>
                                    {(user.username).substring(0, 1).toUpperCase()}
                                </Avatar>
                            </Grid>
                            <Grid item xs={12} align="center">
                                <Typography variant="body1" className={classes.name}>{user.username}</Typography>
                            </Grid>
                            <Grid item xs={12} align="center">
                                <Grid container justifyContent="center">
                                    <Grid item md={1} sm={2} xs={3} onClick={linkToPosts} className={classes.link}>
                                        <label>{posts.length}</label>
                                        <Typography>post</Typography>
                                    </Grid>
                                    <Grid item md={1} sm={2} xs={3} className={classes.link}
                                        onClick={() => openDialog(user.follower, "Follower")}>
                                        <label>{(user.follower).length}</label>
                                        <Typography>follower</Typography>
                                    </Grid>
                                    <Grid item md={1} sm={2} xs={3} className={classes.link}
                                        onClick={() => openDialog(user.followed, "Followed")}>
                                        <label>{(user.followed).length}</label>
                                        <Typography>followed</Typography>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item xs={12} align="center" className={classes.bio}>
                                <Typography variant="subtitle1">{user.description !== '' ? 'Bio:' : ''}</Typography>
                                <Typography variant="body2">{user.description}</Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                    {page.posts && 
                        <Grid item xs={12}>
                            <Posts posts={posts} user={user} home={false}/>
                        </Grid>
                    }
                    {page.addPost && 
                        <Grid item xs={12}>
                            <Form />
                        </Grid>
                    }
                    {page.settings && 
                        <Grid item xs={12}>
                            <Settings user={user}/>
                        </Grid>
                    }
                </Grid>
                <CostumDialog  open={open} setOpen={setOpen} users={matchingUsers} title={dialogTitle}/>
            </div>) : ''
    )
}

export default Profile
