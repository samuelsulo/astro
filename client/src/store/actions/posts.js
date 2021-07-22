import * as api from '../api/index';

/* FETCHING DATA */
// Fetch home page posts
export const fetchPosts = () => async (dispatch) => {
    try {
        dispatch({ type: 'START_LOADING' });
        
        const { data } = await api.fetchPosts();

        dispatch({ type: 'FETCH_POSTS', posts: data.posts, avatars: data.avatars });

    } catch (error) {
        console.log(error);
    }
}

// Fetch logged user's posts
export const fetchUserPosts = () => async (dispatch) => {
    try {
        dispatch({ type: 'START_LOADING'});

        const { data } = await api.fetchUserPosts();

        dispatch({ type: 'FETCH_USER_POSTS', payload: data });

    } catch (error) {
        console.log(error);
    } finally {
        dispatch({ type: 'END_LOADING' });
    }
}

// Fetch single post
export const fetchPost = (id, setError) => async (dispatch) => {
    try {
        const { data } = await api.fetchPost(id);
        
        dispatch({ type: 'FETCH_POST', post: data.post, avatar: data.avatar });

    } catch (error) {
        setError(true);
    }
}

export const fetchPostImage = (id, home, user, searchedUser) => async (dispatch) => {
    try {
        const { data } = await api.fetchPostImage(id);

        if (home)
            dispatch({ type: 'FETCH_POST_IMAGE', payload: data });
        else if (user)
            dispatch({ type: 'FETCH_USER_POST_IMAGE', payload: data });
        else if (searchedUser)
            dispatch({ type: 'FETCH_SEARCHED_USER_POST_IMAGE', payload: data });
        else console.log('Include fetching options');
    } catch (error) {
        console.log(error);
    }
}
/* END */

/* ACTIONS */
// create post
export const createPost = (post, history) => async (dispatch) => {
    try {
        const { data } = await api.createPost(post);

        dispatch({ type: 'CREATE_POST', payload: data});

        history.replace('/user/profile');
    } catch (error) {
        console.log(error);
    }
}

// update post
export const updatePost = ( id, updatedPost, history) => async (dispatch) => {
    try {
        const { data } = await api.updatePost(id, updatedPost);

        dispatch({ type: 'UPDATE_POST', payload: data});

        history.replace('/user/profile');
        
    } catch (error) {
        console.log(error);
    }
}

// delete post
export const deletePost = (id) => async (dispatch) => {
    try {
        const { data } = await api.deletePost(id);

        dispatch({ type: 'DELETE_POST', payload: data});

    } catch (error) {
        console.log(error);
    }
}

// like post
export const likePost = (id) => async (dispatch) => {
    try {
        const { data } = await api.likePost(id);

        dispatch({ type: 'LIKE_POST', payload: data});
    } catch (error) {
        console.log(error);
    }
}

// report post
export const reportPost = (description, id) => {
    try {
        api.reportPost(description, id);

    } catch (error) {
        console.log(error);        
    }
}
/* END */