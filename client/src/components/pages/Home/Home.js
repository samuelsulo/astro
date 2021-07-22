import React from 'react';
import { Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

import Posts from '../../Posts/Posts';
import { useStyles } from './styles';
import Loading from '../../Loading/Loading';


function Home() {
    document.title = "Astro | Home";
    const { posts, isLoading } = useSelector(state => state.postReducer);
    const { isLogged, user } = useSelector(state => state.authReducer);
    
    const classes = useStyles();
    return (
        isLoading ? <Loading /> : isLogged ? <div className={classes.home}>
            <Posts posts={posts} user={user} home={true}/>
        </div> : <Redirect to="/account/signin" />
    )
}

export default Home
