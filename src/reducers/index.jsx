import { combineReducers } from "redux";
import authReducer from "./auth";
import currentUserReducer from "./currentUser"
import questionReducer from "./questions";
import usersReducer from "./users"
import askQuestionReducer from "./askQuestion";
import verifyReducer from "./verify";
import postReducer from "./post.jsx";

export default combineReducers({
    authReducer,
    currentUserReducer,
    questionReducer,
    usersReducer,
    askQuestionReducer,
    verifyReducer,
    postReducer,
})
