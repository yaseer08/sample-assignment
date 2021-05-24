import { combineReducers } from '@reduxjs/toolkit';
import userReducer from './userReducer';
import userDetailReducer from './userDetailReducer';


const reducer = combineReducers({
    users: userReducer,
    userDetails: userDetailReducer,
});

export default reducer;