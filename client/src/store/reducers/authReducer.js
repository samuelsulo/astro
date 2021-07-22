const initialState = {
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    description: '',
    image: '',
    avatarColor: '',
    username: '',
    follower: [],
    followed: [],
};

// AUTH REDUCER
const authReducer = (
    state = {
        isLogged: false,
        user: initialState,
        users: [],
        searchedUser: initialState
    }, action) => {

    switch(action.type) {

        /* FETCHING */
        case 'AUTH': 
            return {...state, isLogged: true, user: action.payload};
        case 'FETCH_USERS':
            return {...state, users: action.payload};
        case 'FETCH_SEARCHED_USER':
            return {...state, searchedUser: action.user};
        /* END */

        /* ACTIONS */
        case 'UPDATE_PROFILE':
            return {...state, user: action.payload};
        case 'UPDATE_FOLLOWED':
            return {...state, user: {...state.user, followed: action.payload }};
        case 'UPDATE_FOLLOWER':
            return {...state, searchedUser: {...state.searchedUser, follower: action.payload }};
        /* END */

        /* RESET */
        case 'LOGOUT':
            return {...state, isLogged: false, user: initialState};
        /* END */

        // DEFAULT CASE
        default:
            return state;
   }
}

export default authReducer;