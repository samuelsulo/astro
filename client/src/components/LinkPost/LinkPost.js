import React from 'react';
import { useHistory, Redirect } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { fetchPost } from '../../store/actions/posts';
import Post from '../Posts/Post/Post';
import Loading from '../Loading/Loading';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    cardContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '80vh',
        [theme.breakpoints.down('xs')]: {
            height: 'auto',
            margin: theme.spacing(2, 0),
        },
    },
    card: {
        width: 345,
        [theme.breakpoints.down('xs')]: {
            width: '90%',
        }
    }
}))

function LinkPost() {
    document.title = "Post";
    const history = useHistory();
    const dispatch = useDispatch();
    const [loading, setLoading] = React.useState(true);
    const { post, avatar } = useSelector(state => state.postReducer);
    const { user, isLogged } = useSelector(state => state.authReducer);
    const [error, setError] = React.useState(false);

    React.useEffect(() => {
        let id = history.location.search;
        id = id.substring(1, id.length);
        if (isLogged) {
            dispatch(fetchPost(id, setError));
            setLoading(false);
        }
    }, [isLogged]);

    const classes = useStyles();
    return (
        loading ? <Loading/> : isLogged ?
            <div  className={classes.cardContainer}>
                <div className={classes.card}>
                    {error ? 'Post not found' : 
                    <Post post={post} avatar={avatar} user={user} home={true} createPost={false}/>}
                </div>
            </div> : <Redirect to="/account/signin" />
    )
}

export default LinkPost;
