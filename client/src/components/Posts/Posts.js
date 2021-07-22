import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Grid, Button } from '@material-ui/core';

// components
import Post from './Post/Post';
import { useStyles } from './styles';
import Loading from '../Loading/Loading';

function Posts({ posts, home, user }) {
    const isLoading = useSelector(state => state.postReducer.isLoading);
    const { users } = useSelector(state => state.authReducer);

    const getAvatar = (id) => {
        if (!home)
            return user;
        else {
            for (const x of users) {
                if (x._id === id)
                    return x;
            }
        }
    }

    const classes = useStyles();
    return (
        <>
            {!isLoading ? <Grid container spacing={2} className={classes.container} justifyContent="center">
                {posts.map((post, index) => (
                    <Grid item lg={3} md={3} sm={5} xs={12} key={index}>
                            <Post post={post} home={home} avatar={getAvatar(post.userId)} createPost={false}/>
                    </Grid>
                ))}
            </Grid> : <Loading />}
            
            {!isLoading && posts.length === 0 && !home && 
                <Grid container justifyContent="center">
                    <Link className={classes.link} to={{pathname: "/user/profile", search: "?addPost"}}>
                        <Button className={classes.button}>Start posting</Button>
                    </Link>
                </Grid>
            }
        </>
    )
}

export default Posts
