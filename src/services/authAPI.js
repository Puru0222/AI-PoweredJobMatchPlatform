import { toast } from "react-hot-toast";
import { apiConnector } from "./apiConnector";
import { endpoints } from "./apis";
import { clearUser, setUser } from "../slices/userSlice";
import { clearUserProfile, setUserProfile } from "../slices/userProfileSlice";
import { useSelector } from "react-redux";

const { SIGNUP_API, LOGIN_API, GET_PROFILE_API, UPDATE_PROFILE_API } =
  endpoints;

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

      toast.success("Login Successful");
      dispatch(setUser({ ...response.data.user, token: response.data.token }));
      console.log("first")
      console.log(response.data.userProfile)
      dispatch(setUserProfile(response.data.userProfile || null));
      navigate("/dashboard/profile");
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

export function getUserProfile(token) {
  return async (dispatch) => {
    try {
      const response = await apiConnector("GET", GET_PROFILE_API, null, {
        Authorization: `Bearer ${token}`,
      });
      if (response.data?.success) {
        dispatch(setUserProfile(response.data.userProfile));
      }
    } catch (error) {
      console.error("Failed to fetch user profile:", error);
    }
  };
}

// ✅ New: Update or Create Profile
export function saveUserProfile(formData, isEditing, token) {
  return async (dispatch) => {
    const toastId = toast.loading("Saving...");
    try {
      console.log("first");
      console.log(token);
      console.log(formData);

      const skillsArray = formData.skills
        .split(",")
        .map((s) => s.trim())
        .filter((s) => s !== "");

      if (!formData.experience || skillsArray.length === 0) {
        toast.error("Experience and at least one skill are required");
        toast.dismiss(toastId);
        return;
      }

      const profileData = {
        location: formData.location,
        experience: parseInt(formData.experience),
        skills: skillsArray,
        preferredJobType: formData.preferredJobType,
      };

      const response = await apiConnector(
        isEditing ? "PUT" : "POST",
        UPDATE_PROFILE_API,
        profileData,
        {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        }
      );

      if (response.data?.success) {
        toast.success(
          isEditing
            ? "Profile updated successfully!"
            : "Profile created successfully!"
        );
        dispatch(setUserProfile(response.data.userProfile));
      }
    } catch (error) {
      console.error("Save profile error:", error);
      toast.error(error.response?.data?.message || "Something went wrong.");
    } finally {
      toast.dismiss(toastId);
    }
  };
}
