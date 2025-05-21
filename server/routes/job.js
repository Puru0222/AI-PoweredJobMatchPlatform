const express = require("express");
const { createJob, getAllJobs, aiMatch } = require("../controllers/Job");
const router = express.Router();

router.post("/create", createJob);
router.get("/getjob", getAllJobs);
router.post("/jobmatch", aiMatch);

module.exports = router;
