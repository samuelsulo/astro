// POST REDUCER
const postReducer = (
    state = {
        isLoading: true,
        postsLoaded: false,
        userPostsLoaded: false,
        searchedUserPostsLoaded: false,
        userPosts: [],
        posts: [],
        searchedUserPosts: [],
        post: '',
        avatar: '',
    }, action) => {

    switch(action.type) {

        /* LOADING */
        case 'START_LOADING':
            return { ...state, isLoading: true };
        case 'END_LOADING':
            return { ...state, isLoading: false };
        /* END */
        
        /* FETCHING DATA */
        case 'FETCH_POST':
            return { ...state, post: action.post, avatar: action.avatar };
        case 'FETCH_POSTS':
            return { ...state, posts: action.posts, postsLoaded: true };
        case 'FETCH_USER_POSTS':
            return { ...state, userPosts: action.payload, userPostsLoaded: true };
        case 'FETCH_SEARCHED_USER_POSTS':
            return {...state, searchedUserPosts: action.posts, searchedUserPostsLoaded: true }
        /* END */

        /* FETCHING IMAGES */
        case 'FETCH_POST_IMAGE':
            return {...state, posts: state.posts.map((x) => x._id === action.payload._id ? {...x, image: action.payload.image } : x)};
        case 'FETCH_USER_POST_IMAGE':
            return {...state, userPosts: state.userPosts.map((x) => x._id === action.payload._id ? {...x, image: action.payload.image } : x)};
        case 'FETCH_SEARCHED_USER_POST_IMAGE':
            return {...state,
                searchedUserPosts: state.searchedUserPosts.map((x) => x._id === action.payload._id ? {...x, image: action.payload.image } : x),
                searchedUserPostsLoaded: false
            };
        /* END */

        /* ACTIONS */
        case 'CREATE_POST':
            return { ...state, userPosts: [action.payload, ...state.userPosts] };
        case 'UPDATE_POST':
            return { ...state, userPosts: state.userPosts.map((x) => x._id === action.payload._id ? action.payload : x) };
        case 'DELETE_POST':
            return { ...state, userPosts: state.userPosts.filter((x) => x._id !== action.payload) };
        case 'LIKE_POST':
            return { ...state, 
                posts: state.posts.map((x) => x._id === action.payload._id ? {...x, likes: action.payload.likes } : x),
                userPosts: state.userPosts.map((x) => x._id === action.payload._id ? {...x, likes: action.payload.likes } : x),
                searchedUserPosts: state.searchedUserPosts.map((x) => x._id === action.payload._id ? {...x, likes: action.payload.likes } : x),
                post: state.post._id === action.payload._id ? {...state.post, likes: action.payload.likes } : state.post,
            };
        /* END */
        
        /* RESET */
        case 'FETCH_SEARCHED_USER_POSTS_RESET':
            return {...state, searchedUserPostsLoaded: false};
        case 'LOGOUT':
            return {...state, userPosts: [], posts: [], avatars: [], searchedUserPosts: [], userPostsLoaded: false, postsLoaded: false, searchedUserPostsLoaded: false};
        /* END */

        // DEFAULT CASE
        default:
            return state;
    }
}

export default postReducer;