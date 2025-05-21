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
