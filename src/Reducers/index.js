import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "../Slices/authSlice.js";
import userReducer from "../Slices/profileSlice.js"
import logoutReducer from "../Slices/LogoutSlice.jsx";
import accountReducer from "../Slices/AccountSlice.jsx";
import printOrderReducer from "../Slices/PlaceOrderModelSlice.jsx";
import disableReducer from "../Slices/DisableFunctionality.jsx"


const rootReducer = combineReducers({
    "auth" : authReducer ,
    "user":userReducer,
    "logout": logoutReducer,
    "account" : accountReducer,
    "placeOrder" : printOrderReducer,
    "disable" : disableReducer
})

export default rootReducer;