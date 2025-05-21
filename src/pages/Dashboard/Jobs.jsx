import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getAllJobs } from "../../services/jobAPI";

const Jobs = () => {
  const dispatch = useDispatch();
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const fetchJobs = async () => {
      const allJobs = await dispatch(getAllJobs());
      setJobs(allJobs);
    };

    fetchJobs();
  }, [dispatch]);

  return (
    <div className="bg-white/10 text-white p-4 rounded-lg">
      <h1 className="text-3xl font-bold mb-6">Available Jobs</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {jobs.length > 0 ? (
          jobs.map((job) => (
            <div
              key={job._id}
              className="border rounded-lg p-4 shadow hover:shadow-lg transition"
            >
              <h2 className="text-xl font-semibold">{job.title}</h2>
              <p className="">{job.company}</p>
              <p className="text-sm ">{job.location || "N/A"}</p>
              <p className="mt-2">
                <strong>Skills:</strong> {job.skills.join(", ")}
              </p>
              <p>
                <strong>Type:</strong> {job.jobType}
              </p>
              {job.description && (
                <p className="mt-2">{job.description}</p>
              )}
            </div>
          ))
        ) : (
          <p>No jobs found.</p>
        )}
      </div>
    </div>
  );
};

export default Jobs;
