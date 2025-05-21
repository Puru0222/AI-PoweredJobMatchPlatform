const BASE_URL = process.env.REACT_APP_BASE_URL;

// AUTH ENDPOINTS
export const endpoints = {
  SIGNUP_API: BASE_URL + "/auth/signup",
  LOGIN_API: BASE_URL + "/auth/login",
  GET_PROFILE_API: BASE_URL + "/auth/getprofile",
  UPDATE_PROFILE_API: BASE_URL + "/auth/update",
};
