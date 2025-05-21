import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllJobs, matchJob } from "../../services/jobAPI";

const Jobs = () => {
  const dispatch = useDispatch();
  const [jobs, setJobs] = useState([]);
  const [matchedJobs, setMatchedJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const {userProfile} = useSelector((state) => state.userProfile);

  useEffect(() => {
    const fetchJobs = async () => {
      const allJobs = await dispatch(getAllJobs());
      setJobs(allJobs);
    };

    fetchJobs();
  }, [dispatch]);

  const findAiMatches = async () => {
    setIsLoading(true);
    console.log("first")
    try {
      const matched = await dispatch(matchJob(userProfile, jobs)); // ← note the extra ()
      setMatchedJobs(matched);
    } catch (error) {
      console.error("Error during AI matching:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white/10 text-white p-4 rounded-lg">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold mb-6">Available Jobs</h1>
        <button
          className="text-xl items-center font-bold bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg transition"
          onClick={findAiMatches}
          disabled={isLoading}
        >
          {isLoading ? "Matching..." : "AI Match"}
        </button>
      </div>

      {matchedJobs.length > 0 && (
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4 text-green-400">
            Top Matches For You
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {matchedJobs.map((job) => (
              <div
                key={job._id}
                className="border border-green-500 rounded-lg p-4 shadow hover:shadow-lg transition bg-green-900/20"
              >
                <div className="flex justify-between items-start">
                  <h2 className="text-xl font-semibold">{job.title}</h2>
                  <span className="bg-green-600 text-white px-2 py-1 rounded text-xs">
                    {Math.round(job.matchScore * 100)}% Match
                  </span>
                </div>
                <p className="">{job.company}</p>
                <p className="text-sm ">{job.location || "N/A"}</p>
                <p className="mt-2">
                  <strong>Skills:</strong> {job.skills.join(", ")}
                </p>
                <p>
                  <strong>Type:</strong> {job.jobType}
                </p>
                {job.description && <p className="mt-2">{job.description}</p>}
                {job.matchReasons && (
                  <p className="mt-2 text-green-300 text-sm">
                    <strong>Why this matches:</strong> {job.matchReasons}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      <h2 className="text-2xl font-bold mb-4">All Available Jobs</h2>
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
              {job.description && <p className="mt-2">{job.description}</p>}
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
