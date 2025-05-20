import { toast } from "react-hot-toast";
import { apiConnector } from "./apiConnector";
import { endpoints } from "./apis";
import { clearUser, setUser } from "../slices/userSlice";
import { clearUserProfile, setUserProfile } from "../slices/userProfileSlice";

const { SIGNUP_API, LOGIN_API } = endpoints;

export function signUp(name, email, password, navigate) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...");
    try {
      const response = await apiConnector("POST", SIGNUP_API, {
        name,
        email,
        password,
      });
      toast.success("Signup Successful");
      navigate("/login");
    } catch (error) {
      toast.error("Signup Failed");
      navigate("/signup");
    }
    toast.dismiss(toastId);
  };
}

export function login(email, password, navigate) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...");
    try {
      const response = await apiConnector("POST", LOGIN_API, {
        email,
        password,
      });

      console.log(response);
      toast.success("Login Successful");
      dispatch(setUser(response.data.user));
      // dispatch(setUserProfile(response.data.userProfile));
      navigate("/dashboard");
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Something went wrong. Please try again."
      );
    } finally {
      toast.dismiss(toastId);
    }
  };
}

export function logout(navigate) {
  return (dispatch) => {
    localStorage.removeItem("token");
    dispatch(clearUser());
    dispatch(clearUserProfile());
    navigate("/login");
    toast.success("Logged out successfully.");
  };
}
