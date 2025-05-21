import { toast } from "react-hot-toast";
import { jobendpoints } from "./apis";
import { apiConnector } from "./apiConnector";

const { CREATE_JOB, GET_JOB } = jobendpoints;

export function createJob(jobData) {
  return async (dispatch) => {
    const toastId = toast.loading("Creating job...");
    try {
      const response = await apiConnector("POST", CREATE_JOB, jobData);

      toast.success("Job created successfully!");
      console.log("Created Job:", response.data);


      //navigate("/dashboard/jobs");
    } catch (error) {
      console.error("Create Job Error:", error);
      toast.error(
        error.response?.data?.message ||
          "Something went wrong. Please try again."
      );
    } finally {
      toast.dismiss(toastId);
    }
  };
}

export function getAllJobs() {
  return async (dispatch) => {
    const toastId = toast.loading("Loading jobs...");
    try {
      const response = await apiConnector("GET", GET_JOB);
      toast.dismiss(toastId);
      return response.data.jobs;
    } catch (error) {
      toast.dismiss(toastId);
      toast.error(
        error.response?.data?.message || "Failed to fetch jobs"
      );
      return [];
    }
  };
}
