import React, { useEffect, useState } from "react";

const AiMatchup = ({ userProfile, jobs }) => {
  const [matchedJobs, setMatchedJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchJobMatches = async () => {
      if (!userProfile || !jobs || jobs.length === 0) {
        setMatchedJobs([]);
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const prompt = `
User Profile:
  Location: ${userProfile.location || "N/A"}
  Experience: ${userProfile.experience || 0} years
  Skills: ${
    userProfile.skills && userProfile.skills.length > 0
      ? userProfile.skills.join(", ")
      : "N/A"
  }
  Preferred Job Type: ${userProfile.preferredJobType || "N/A"}

Available Jobs:
${jobs
  .map(
    (job) =>
      `  - ID: ${job._id}, Title: ${job.title}, Company: ${
        job.company
      }, Location: ${job.location || "N/A"}, Skills: ${
        job.skills && job.skills.length > 0 ? job.skills.join(", ") : "N/A"
      }, Job Type: ${job.jobType || "N/A"}, Description: ${
        job.description || "N/A"
      }`
  )
  .join("\n")}

Based on the user profile, identify the top 3 most relevant job matches from the 'Available Jobs' list. Consider skills, experience, location, and preferred job type. Return only a JSON array of the '_id' values of the top 3 matched jobs, like this: ["job_id_1", "job_id_2", "job_id_3"]. If fewer than 3 matches are found, return all found matches.
                `;

        const chatHistory = [];
        chatHistory.push({ role: "user", parts: [{ text: prompt }] });

        const payload = {
          contents: chatHistory,
          generationConfig: {
            responseMimeType: "application/json",
            responseSchema: {
              type: "ARRAY",
              items: { type: "STRING" },
            },
          },
        };

        const apiKey = "AIzaSyCp6EGVoNhZUxqUJwleUXDVL7XtKgiVMMI"; 
        const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

        const response = await fetch(apiUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(
            `API error: ${response.status} ${response.statusText} - ${errorData.error.message}`
          );
        }

        const result = await response.json();

        if (
          result.candidates &&
          result.candidates.length > 0 &&
          result.candidates[0].content &&
          result.candidates[0].content.parts &&
          result.candidates[0].content.parts.length > 0
        ) {
          const jsonString = result.candidates[0].content.parts[0].text;
          const matchedJobIds = JSON.parse(jsonString);

          // Filter the original jobs array to get the full job objects
          const topMatches = jobs.filter((job) =>
            matchedJobIds.includes(job._id)
          );
          setMatchedJobs(topMatches);
        } else {
          setError("No valid response from AI for job matching.");
          setMatchedJobs([]);
        }
      } catch (err) {
        console.error("Error fetching job matches:", err);
        setError(`Failed to fetch job matches: ${err.message}`);
        setMatchedJobs([]);
      } finally {
        setLoading(false);
      }
    };

    fetchJobMatches();
  }, [userProfile, jobs]); // Re-run when userProfile or jobs change

  return (
    <div className="bg-white/10 text-white p-4 rounded-lg shadow-xl max-w-4xl mx-auto my-8 font-inter">
      <h1 className="text-3xl font-bold mb-6 text-center text-blue-300">
        AI Job Matcher
      </h1>

      <div className="mb-8 p-4 bg-gray-700/30 rounded-lg shadow-inner">
        <h2 className="text-xl font-semibold mb-3 text-blue-200">
          Your Profile
        </h2>
        <p>
          <strong>Location:</strong> {userProfile?.location || "N/A"}
        </p>
        <p>
          <strong>Experience:</strong> {userProfile?.experience || 0} years
        </p>
        <p>
          <strong>Skills:</strong> {userProfile?.skills?.join(", ") || "N/A"}
        </p>
        <p>
          <strong>Preferred Job Type:</strong>{" "}
          {userProfile?.preferredJobType || "N/A"}
        </p>
      </div>

      <h2 className="text-2xl font-bold mb-4 text-center text-green-300">
        Top 3 Job Matches
      </h2>

      {loading && (
        <div className="text-center text-lg text-yellow-300">
          <p>Finding your perfect matches...</p>
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-yellow-300 mx-auto mt-4"></div>
        </div>
      )}

      {error && (
        <div className="text-center text-red-400 p-4 bg-red-900/30 rounded-lg">
          <p>Error: {error}</p>
          <p>Please try again later or check your network connection.</p>
        </div>
      )}

      {!loading && !error && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {matchedJobs.length > 0 ? (
            matchedJobs.map((job) => (
              <div
                key={job._id}
                className="border border-gray-600 rounded-lg p-5 shadow-md hover:shadow-lg transition-all duration-300 bg-gray-800/50 flex flex-col justify-between"
              >
                <div>
                  <h3 className="text-xl font-semibold mb-2 text-purple-300">
                    {job.title}
                  </h3>
                  <p className="text-gray-300 mb-1">
                    <strong>Company:</strong> {job.company}
                  </p>
                  <p className="text-gray-300 mb-1">
                    <strong>Location:</strong> {job.location || "N/A"}
                  </p>
                  <p className="text-gray-300 mb-1">
                    <strong>Skills:</strong>{" "}
                    {job.skills && job.skills.length > 0
                      ? job.skills.join(", ")
                      : "N/A"}
                  </p>
                  <p className="text-gray-300 mb-3">
                    <strong>Type:</strong> {job.jobType || "N/A"}
                  </p>
                  {job.description && (
                    <p className="text-sm text-gray-400 line-clamp-3">
                      {job.description}
                    </p>
                  )}
                </div>
                <button className="mt-4 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md transition duration-300 ease-in-out transform hover:scale-105 shadow-lg">
                  View Details
                </button>
              </div>
            ))
          ) : (
            <p className="col-span-full text-center text-gray-400 text-lg">
              No top job matches found based on your profile.
            </p>
          )}
        </div>
      )}
    </div>
  );
};

// Main App component to demonstrate AIJobMatch
const App = () => {
  // Mock userProfile data (replace with your actual fetched data)
  const mockUserProfile = {
    _id: "682d67c43623cd1fd37b449f",
    user: "682d67c43623cd1fd37b449c",
    location: "Indore India",
    experience: 1,
    skills: ["Nodejs", "react", "express"],
    preferredJobType: "remote",
    createdAt: "2025-05-21T05:42:28.792Z",
    updatedAt: "2025-05-21T05:44:44.364Z",
    __v: 0,
  };

  // Mock jobs data (replace with your actual fetched data)
  const mockJobs = [
    {
      _id: "job1",
      title: "Full Stack Developer",
      company: "Tech Solutions",
      location: "Indore India",
      skills: ["Nodejs", "react", "MongoDB"],
      jobType: "full-time",
      description:
        "Exciting opportunity for a full stack developer with Node.js and React experience.",
    },
    {
      _id: "job2",
      title: "Frontend Engineer",
      company: "Web Innovators",
      location: "Bangalore India",
      skills: ["react", "JavaScript", "HTML", "CSS"],
      jobType: "remote",
      description:
        "Join our team as a frontend engineer focusing on React applications.",
    },
    {
      _id: "job3",
      title: "Backend Developer",
      company: "Data Systems",
      location: "Pune India",
      skills: ["express", "Nodejs", "PostgreSQL"],
      jobType: "full-time",
      description:
        "We are looking for a skilled backend developer with Express and Node.js expertise.",
    },
    {
      _id: "job4",
      title: "Remote React Developer",
      company: "Global Remote Co.",
      location: "Anywhere",
      skills: ["react", "Redux", "TypeScript"],
      jobType: "remote",
      description: "Fully remote position for an experienced React developer.",
    },
    {
      _id: "job5",
      title: "Junior Express Developer",
      company: "Startup Hub",
      location: "Indore India",
      skills: ["express", "Nodejs"],
      jobType: "full-time",
      description:
        "Entry-level position for a backend developer passionate about Express.",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
      <AiMatchup userProfile={mockUserProfile} jobs={mockJobs} />
    </div>
  );
};

export default AiMatchup;
