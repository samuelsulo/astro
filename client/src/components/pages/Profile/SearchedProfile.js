import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {  useHistory } from 'react-router-dom';
import { Avatar, Grid, Typography, Button } from '@material-ui/core';

import { fetchSearchedUser, followProfile } from '../../../store/actions/auth';
import { fetchPostImage } from '../../../store/actions/posts';
import Posts from '../../Posts/Posts';
import CostumDialog from './CustomDialog';
import { useStyles } from './styles';
import Loading from '../../Loading/Loading';

function SearchedProfile() {

    const [open, setOpen] = React.useState(false);
    const [dialogTitle, setDialogTitle] = React.useState();
    const [matchingUsers, setMatchingUsers] = React.useState([]);
    const { isLoading, searchedUserPostsLoaded } = useSelector(state => state.postReducer);
    const { isLogged, users } = useSelector(state => state.authReducer);
    const user = useSelector(state => state.authReducer.searchedUser);
    const actualUser = useSelector(state => state.authReducer.user);
    const posts = useSelector(state => state.postReducer.searchedUserPosts);
    const dispatch = useDispatch();
    const history = useHistory();
    const username = (history.location.search).substring(1, (history.location.search).length).toLowerCase();

    React.useEffect(() => {
        document.title = `Astro | Profile: ${username}`;
        dispatch(fetchSearchedUser(username, actualUser._id, history));
    }, [dispatch, username, history, actualUser._id]);

    React.useEffect(() => {
        if (searchedUserPostsLoaded) {
            for (const post of posts) {
                dispatch(fetchPostImage(post._id, false, false, true));    
            }
        }
    }, [searchedUserPostsLoaded]);

    const handleFollow = () => {
        dispatch(followProfile(user._id))
    }

    const openDialog = (ids, title) => {
        let temp = []
        for (let i = 0; i < users.length; i++) {
            if (ids.includes(users[i]._id))
                temp.push(users[i]);
        }
        setMatchingUsers(temp);
        setOpen(true);
        setDialogTitle(title)
    }

    const classes = useStyles();
    return (
        isLogged ? isLoading ? <Loading /> : 
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
                                    <Grid item md={1} sm={2} xs={3} className={classes.link}>
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
                                    <Grid item xs={12}>
                                        <Button size="small" onClick={handleFollow} className={(user.follower).includes(actualUser._id) ? classes.unFollowButton : classes.followButton}>
                                            {(user.follower).includes(actualUser._id) ? "unfollow" : "follow"}
                                        </Button>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item xs={12} align="center" className={classes.bio}>
                                <Typography variant="subtitle1">{user.description !== '' ? 'Bio:' : ''}</Typography>
                                <Typography variant="body2">{user.description}</Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                   
                    <Grid item xs={12}>
                        <Posts posts={posts} user={user} home={true}/>
                    </Grid>
                </Grid>
                <CostumDialog  open={open} setOpen={setOpen} users={matchingUsers} title={dialogTitle}/>

            </div>) : ''
    )
}

export default SearchedProfile
