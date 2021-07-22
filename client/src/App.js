import React from 'react';
import { Switch, Route, Redirect, useHistory} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { fetchUsers, verifyToken } from './store/actions/auth';
import Navbar from './components/Navbar/Navbar';
import Home from './components/pages/Home/Home';
import Work from './components/pages/Work/Work';
import About from './components/pages/About/About';
import Auth from './components/Auth/Auth';
import Profile from './components/pages/Profile/Profile';
import SearchedProfile from './components/pages/Profile/SearchedProfile';
import LinkPost from './components/LinkPost/LinkPost';
import Footer from './components/Footer/Footer';
import { fetchPosts, fetchUserPosts, fetchPostImage } from './store/actions/posts';
import ForgotPassword from './components/Auth/ForgotPassword';
import ResetPassword from './components/Auth/ResetPassword';

function App() {
    const dispatch = useDispatch();
    const history = useHistory();
    const { isLogged } = useSelector(state => state.authReducer);
    const { posts, postsLoaded, userPosts, userPostsLoaded }= useSelector(state => state.postReducer);
    
    // verify jwt token 
    React.useEffect(() => {
        if (!isLogged)
            dispatch(verifyToken(history));
        if (isLogged) {
            dispatch(fetchUserPosts());
            dispatch(fetchUsers());
            dispatch(fetchPosts());
        }
    }, [isLogged]);

    React.useEffect(() => {
        if (postsLoaded) {
            for (const post of posts) {
                dispatch(fetchPostImage(post._id, true, false, false));    
            }
        }
    }, [postsLoaded]);

    React.useEffect(() => {
        if (userPostsLoaded) {
            for (const post of userPosts) {
                dispatch(fetchPostImage(post._id, false, true, false));    
            }
        }
    }, [userPostsLoaded]);

    return (
        <div className="app">
            <Navbar />
            <Switch>
                <Route path="/home" exact component={Home} />
                <Route path="/work" exact component={Work} />
                <Route path="/about" exact component={About} />
                <Route path="/account/signup" exact component={() => !isLogged ? <Auth /> : <Redirect to="/Home" /> } />
                <Route path="/account/signin" exact component={() => !isLogged ? <Auth /> : <Redirect to="/Home" /> } />
                <Route path="/account/password/forgot" exact component={() => !isLogged ? <ForgotPassword /> : <Redirect to="/Home" /> } />
                <Route path="/account/password/reset" exact component={() => !isLogged ? <ResetPassword /> : <Redirect to="/Home" /> } />
                <Route path="/user/profile" exact component={Profile} />
                <Route path="/profile" exact component={SearchedProfile} />
                <Route path="/post" exact component={LinkPost} />
                <Redirect to="/home" />
            </Switch>
            <Footer />
        </div>
    )
}

export default App
