import * as api from '../api/index';

/* AUTHENTICATION */
// with login or signup
export const auth = (user, checkbox, history, isSignup, formErrors, setFormErrors) => async (dispatch) => {
    try {
        let res;
        if (isSignup)
            res = await api.signUp(user, checkbox);
        else
            res = await api.signIn(user, checkbox);

        const { data } = res;

        dispatch({ type: 'AUTH', payload: data.user });

        history.push('/Home');
    } catch (error) {
        switch (error.response.data.message) {
            case "Both":
                setFormErrors({ 
                    ...formErrors, 
                    username: { label: "Not available", error: true },
                    email: { label: "Not available", error: true},
                });
                break;
            case "Username":
                setFormErrors({ 
                    ...formErrors, 
                    username: { label: "Not available", error: true },
                });
                break;
            case "Email":
                setFormErrors({ 
                    ...formErrors, 
                    email: { label: "Not available", error: true},
                })
                break;
            default:
                setFormErrors({
                    ...formErrors,
                    error: error.response.data.message,
                });
                break;
        }
    }
}

// with jwt token saved in httpOnly cookie
export const verifyToken = (history) => async (dispatch) => {
    const path = (history.location.pathname).substring(0, 13);
    try {
        const token = document.cookie;

        if (token.split('=')[1] === 'none') 
            return dispatch({type: 'END_LOADING'});

        const { data } = await api.getUser();
        
        dispatch({ type: 'AUTH', payload: data.user});
        
    } catch (error) {
        if (error && error.response && error.response.status && 
            error.response.status === 401) {
            dispatch({ type: 'END_LOADING' });
            if (path === "/user/profile" || path === "/profile")
                history.push('/account/signin');
        }
    }
}
/* END */

/* ACTIONS */
// update profile
export const updateProfile = (updatedUser, history, formErrors, setFormErrors) => async (dispatch) => {
    try {
        const { data } = await api.updateProfile(updatedUser);

        dispatch({ type: 'UPDATE_PROFILE', payload: data});

        history.push({pathname: '/user/profile', search: ''});
    } catch (error) {
        switch (error.response.data.message) {
            case "Both":
                setFormErrors({ 
                    ...formErrors, 
                    username: { label: "Not available", error: true },
                    email: { label: "Not available", error: true},
                });
                break;
            case "Username":
                setFormErrors({ 
                    ...formErrors, 
                    username: { label: "Not available", error: true },
                });
                break;
            case "Email":
                setFormErrors({ 
                    ...formErrors, 
                    email: { label: "Not available", error: true},
                })
                break;
            default:
                setFormErrors({
                    ...formErrors,
                    error: error.response.data.message,
                });
                break;
        }
    }
}

// follow or unfollow profile
export const followProfile = (id) => async (dispatch) => {
    try {
        const { data } = await api.followProfile(id);

        dispatch({ type: 'UPDATE_FOLLOWER', payload: data.follower });

        dispatch({ type: 'UPDATE_FOLLOWED', payload: data.followed });
    } catch (error) {
        console.log(error);
    }
}

// logout
export const logout = () => async (dispatch) => {
    try {
        await api.logout();

        dispatch({ type: 'LOGOUT' });
    } catch (error) {
        console.log(error);
    }
}
/* END */

/* FETCHING */
//some data about all users
export const fetchUsers = () => async (dispatch) => {
    try {
        const { data } = await api.fetchUsers();

        dispatch({ type: 'FETCH_USERS', payload: data });
    } catch (error) {
        console.log(error);
    }
}

//data about searched user
export const fetchSearchedUser = (username, actualUserId, history) => async (dispatch) => {
    try {
        dispatch({ type: 'START_LOADING' });

        const { data } = await api.getSearchedUser(username);

        if (actualUserId !== data.user._id) {
            
            dispatch({ type: 'FETCH_SEARCHED_USER', user: data.user });
            
            dispatch({ type: 'FETCH_SEARCHED_USER_POSTS', posts: data.posts });
        }
        else history.push('/user/profile');

    } catch (error) {
        console.log(error);
        history.push('/home');
    } finally {
        dispatch({ type: 'END_LOADING' });
    }    
}
/* END */