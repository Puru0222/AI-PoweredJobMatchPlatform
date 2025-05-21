const express = require("express");
const { createJob, getAllJobs } = require("../controllers/Job");
const router = express.Router();

// router.post("/aiSearch", aiSearch);
router.post("/create", createJob);
router.get("/getjob", getAllJobs);

module.exports = router;
