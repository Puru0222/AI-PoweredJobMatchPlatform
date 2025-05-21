import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { createJob } from "../services/jobAPI";

const CreateJobForm = () => {
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    const jobData = {
      ...data,
      skills: data.skills.split(",").map((skill) => skill.trim()),
    };

    dispatch(createJob(jobData));
    reset();
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 border rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-4">Create a Job</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Title */}
        <div>
          <label className="block font-medium">Title</label>
          <input
            type="text"
            {...register("title", { required: "Title is required" })}
            className="w-full p-2 border rounded"
          />
          {errors.title && (
            <p className="text-red-500 text-sm">{errors.title.message}</p>
          )}
        </div>

        {/* Company */}
        <div>
          <label className="block font-medium">Company</label>
          <input
            type="text"
            {...register("company", { required: "Company is required" })}
            className="w-full p-2 border rounded"
          />
          {errors.company && (
            <p className="text-red-500 text-sm">{errors.company.message}</p>
          )}
        </div>

        {/* Location */}
        <div>
          <label className="block font-medium">Location</label>
          <input
            type="text"
            {...register("location")}
            className="w-full p-2 border rounded"
          />
        </div>

        {/* Skills */}
        <div>
          <label className="block font-medium">Skills (comma separated)</label>
          <input
            type="text"
            {...register("skills", { required: "Skills are required" })}
            className="w-full p-2 border rounded"
          />
          {errors.skills && (
            <p className="text-red-500 text-sm">{errors.skills.message}</p>
          )}
        </div>

        {/* Job Type */}
        <div>
          <label className="block font-medium">Job Type</label>
          <select
            {...register("jobType", { required: true })}
            className="w-full p-2 border rounded"
          >
            <option value="any">Any</option>
            <option value="remote">Remote</option>
            <option value="onsite">Onsite</option>
          </select>
        </div>

        {/* Description */}
        <div>
          <label className="block font-medium">Description</label>
          <textarea
            {...register("description")}
            className="w-full p-2 border rounded"
            rows={4}
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default CreateJobForm;
