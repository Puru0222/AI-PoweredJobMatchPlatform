import { combineReducers } from "@reduxjs/toolkit";

import authReducer from "../slices/authSlice";
import userReducer from "../slices/userSlice";
import userProfileReducer from "../slices/userProfileSlice";

const rootReducer = combineReducers({
  auth: authReducer,
  user: userReducer,
  userProfile: userProfileReducer,
});

export default rootReducer;
