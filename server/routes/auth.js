const express = require("express");
const router = express.Router();
const { login, signup, getUserProfile, updateOrCreateUserProfile } = require("../controllers/Auth");
const { authenticate } = require("../middleware/authenticate");

router.post("/login", login);
router.post("/signup", signup);
router.get("/getprofile", authenticate, getUserProfile);
router.put("/update", authenticate, updateOrCreateUserProfile);
router.post("/update", authenticate, updateOrCreateUserProfile);

module.exports = router;
