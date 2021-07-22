import { combineReducers } from "redux";
import authReducer from './authReducer';
import postReducer from "./postReducer";

// combines states
const reducers = combineReducers({
    authReducer,
    postReducer,
});

export default reducers;