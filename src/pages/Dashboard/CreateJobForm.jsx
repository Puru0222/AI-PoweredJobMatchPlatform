import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { createJob } from "../../services/jobAPI";
import { FaBriefcase, FaBuilding, FaMapMarkerAlt, FaTools, FaTags, FaFileAlt } from "react-icons/fa";

const CreateJobForm = () => {
  const dispatch = useDispatch();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    setIsSubmitting(true);
    const jobData = {
      ...data,
      skills: data.skills.split(",").map((skill) => skill.trim()),
    };

    dispatch(createJob(jobData)).then(() => {
      setIsSubmitting(false);
      reset();
      // You could add a success toast/notification here
    });
  };

  return (
    <div className="text-white mx-auto p-4 rounded-xl shadow-lg">
      <h2 className="text-3xl rounded-lg bg-gradient-to-r from-blue-600 to-indigo-700 p-4 font-bold mb-6 text-center">
        <FaBriefcase className="inline-block mr-2 text-blue-600" />
        Create a New Job
      </h2>
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
        {/* Title */}
        <div className="form-group">
          <label className="font-medium flex items-center mb-2">
            <FaBriefcase className="mr-2 text-blue-600" />
            Job Title
          </label>
          <input
            type="text"
            placeholder="e.g. Senior React Developer"
            {...register("title", { required: "Job title is required" })}
            className={`w-full p-3 bg-gray-50 border ${
              errors.title ? "border-red-300 bg-red-50" : "border-gray-300"
            } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200`}
          />
          {errors.title && (
            <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>
          )}
        </div>

        {/* Company */}
        <div className="form-group">
          <label className="font-medium flex items-center mb-2">
            <FaBuilding className="mr-2 text-blue-600" />
            Company
          </label>
          <input
            type="text"
            placeholder="e.g. Acme Inc."
            {...register("company", { required: "Company name is required" })}
            className={`w-full p-3 bg-gray-50 border ${
              errors.company ? "border-red-300 bg-red-50" : "border-gray-300"
            } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200`}
          />
          {errors.company && (
            <p className="text-red-500 text-sm mt-1">{errors.company.message}</p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Location */}
          <div className="form-group">
            <label className="font-medium flex items-center mb-2">
              <FaMapMarkerAlt className="mr-2 text-blue-600" />
              Location
            </label>
            <input
              type="text"
              placeholder="e.g. New York, NY"
              {...register("location")}
              className="w-full p-3 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
            />
          </div>

          {/* Job Type */}
          <div className="form-group">
            <label className="font-medium flex items-center mb-2">
              <FaTags className="mr-2 text-blue-600" />
              Job Type
            </label>
            <select
              {...register("jobType", { required: true })}
              className="w-full p-3 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
            >
              <option value="remote">Remote</option>
              <option value="onsite">Onsite</option>
              <option value="any">Any</option>
            </select>
          </div>
        </div>

        {/* Skills */}
        <div className="form-group">
          <label className="font-medium flex items-center mb-2">
            <FaTools className="mr-2 text-blue-600" />
            Skills Required
          </label>
          <input
            type="text"
            placeholder="e.g. React, JavaScript, CSS, Node.js"
            {...register("skills", { required: "At least one skill is required" })}
            className={`w-full p-3 bg-gray-50 border ${
              errors.skills ? "border-red-300 bg-red-50" : "border-gray-300"
            } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200`}
          />
          {errors.skills ? (
            <p className="text-red-500 text-sm mt-1">{errors.skills.message}</p>
          ) : (
            <p className="text-gray-100 text-xs mt-1">Separate skills with commas</p>
          )}
        </div>

        {/* Description */}
        <div className="form-group">
          <label className="font-medium flex items-center mb-2">
            <FaFileAlt className="mr-2 text-blue-600" />
            Job Description
          </label>
          <textarea
            {...register("description")}
            placeholder="Describe the job responsibilities, requirements, and company benefits..."
            className="w-full p-3 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
            rows={2}
          />
        </div>

        {/* Submit */}
        <div className="flex items-center justify-between pt-4 border-t">
          <button
            type="button"
            onClick={() => reset()}
            className="px-4 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 transition duration-200"
          >
            Clear Form
          </button>
          
          <button
            type="submit"
            disabled={isSubmitting}
            className={`px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-medium rounded-lg 
            hover:from-blue-700 hover:to-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 
            transition duration-200 transform hover:scale-105 ${isSubmitting ? "opacity-70 cursor-not-allowed" : ""}`}
          >
            {isSubmitting ? "Submitting..." : "Create Job"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateJobForm;