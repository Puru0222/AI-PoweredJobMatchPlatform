import { toast } from "react-hot-toast";
import { apiConnector } from "./apiConnector";
import { endpoints } from "./apis";

const {
  SIGNUP_API,
  LOGIN_API,
} = endpoints;


export function signUp(
  name,
  email,
  password,
  navigate
) {
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

export function login(loginEmail, loginPassword, navigate) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...");
    try {
      const response = await apiConnector("POST", LOGIN_API, {
        email: loginEmail,
        password: loginPassword,
      });

      if (!response.data.success) {
        toast.error(response.data.message);
        toast.dismiss(toastId);
        return;
      }
      toast.success("Login Successful");
    //   dispatch(setToken(response.data.token));
    //   dispatch(setUser(response.data.user));
    //   localStorage.setItem("token", JSON.stringify(response.data.token));
      navigate("/home");
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