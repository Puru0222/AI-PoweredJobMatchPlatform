// const express = require('express');
// const router = express.Router();
const { GoogleGenerativeAI } = require('@google/generative-ai');

// // Initialize Gemini API
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const Job = require("../models/Job");

exports.createJob = async (req, res) => {
  try {
    const { title, company, location, skills, jobType, description } = req.body;

    // Validate required fields
    if (!title || !company || !skills || !jobType) {
      return res.status(400).json({ message: "Missing required fields." });
    }

    // Ensure skills is an array
    if (!Array.isArray(skills)) {
      return res.status(400).json({ message: "Skills must be an array." });
    }

    const newJob = await Job.create({
      title,
      company,
      location,
      skills,
      jobType,
      description,
    });

    res.status(201).json({
      success: true,
      message: "Job created successfully.",
      job: newJob,
    });
  } catch (error) {
    console.error("Create Job Error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error. Job creation failed.",
    });
  }
};

exports.getAllJobs = async (req, res) => {
  try {
    const jobs = await Job.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      jobs,
    });
  } catch (error) {
    console.error("Get Jobs Error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch jobs.",
    });
  }
};

exports.aiMatch = async (req, res) => {
  console.log("third");

  try {
    const { userProfile, jobs } = req.body;
    if (!userProfile || !jobs || jobs.length === 0) {
      return res.status(400).json({
        success: false,
        message: "User profile or jobs data missing",
      });
    }

    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    // Create prompt for Gemini
    const prompt = `
    I need to find the top 3 job matches for a user based on their profile and available jobs.
    
    User Profile:
    - Location: ${userProfile.location}
    - Experience: ${userProfile.experience} years
    - Skills: ${userProfile.skills.join(", ")}
    - Preferred Job Type: ${userProfile.preferredJobType}
    
    Available Jobs:
    ${jobs
      .map(
        (job, index) => `
    Job ${index + 1}:
    - ID: ${job._id}
    - Title: ${job.title}
    - Company: ${job.company}
    - Location: ${job.location || "Not specified"}
    - Skills Required: ${job.skills.join(", ")}
    - Job Type: ${job.jobType}
    - Description: ${job.description || "Not provided"}
    `
      )
      .join("\n")}
    
    Please analyze the user's profile and the available jobs to find the top 3 matching jobs. 
    For each matched job, provide:
    1. The job ID
    2. A match score between 0 and 1 (1 being a perfect match)
    3. A brief explanation of why this job is a good match for the user
    
    Format your response as valid JSON with this structure:
    {
      "matchedJobs": [
        {
          "jobId": "job_id_here",
          "matchScore": 0.95,
          "matchReasons": "Explanation of the match"
        },
        ...
      ]
    }
    `;

        console.log(prompt)

    // Generate content with Gemini
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const textResponse = response.text();

    // Extract JSON from the response
    let jsonMatch;
    try {
      // Look for JSON in the response text
      const jsonStart = textResponse.indexOf("{");
      const jsonEnd = textResponse.lastIndexOf("}") + 1;
      if (jsonStart >= 0 && jsonEnd > jsonStart) {
        const jsonStr = textResponse.substring(jsonStart, jsonEnd);
        jsonMatch = JSON.parse(jsonStr);
      } else {
        throw new Error("No valid JSON found in response");
      }
    } catch (err) {
      console.error("Failed to parse Gemini response:", err);
      return res.status(500).json({
        success: false,
        message: "Failed to parse AI response",
        rawResponse: textResponse,
      });
    }

    // Process matched jobs to include full job details
    const matchedJobsWithDetails = jsonMatch.matchedJobs
      .map((match) => {
        const jobDetails = jobs.find((job) => job._id === match.jobId);
        if (!jobDetails) return null;

        return {
          ...jobDetails,
          matchScore: match.matchScore,
          matchReasons: match.matchReasons,
        };
      })
      .filter((job) => job !== null);

    return res.json({
      success: true,
      matchedJobs: matchedJobsWithDetails,
    });
  } catch (error) {
    console.error("AI Job Matching Error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to process job matching",
      error: error.message,
    });
  }
};
