const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const UserProfile = require("../models/UserProfile");

const JWT_SECRET = process.env.JWT_SECRET;

exports.signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "Email already in use." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });
    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "7d" });
    user.token = token;
    await user.save();

    const userProfile = await UserProfile.create({
      user: user._id,
      location: "",
      experience: 0,
      skills: [],
      preferredJobType: "any",
    });

    res.status(201).json({
      message: "User registered successfully.",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
      userProfile,
    });
  } catch (err) {
    console.error("Signup error:", err);
    res.status(500).json({ message: "Server error." });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required." });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password." });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password." });
    }

    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "7d" });

    user.token = token;
    const userProfile = await UserProfile.findOne({ user: user._id });

    console.log("first");
    console.log(token);
    console.log(userProfile);

    res.status(200).json({
      message: "Login successful.",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
      token,
      userProfile,
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: "Server error." });
  }
};

exports.getUserProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId).select(
      "location experience skills preferredJobType"
    );

    if (!user)
      return res
        .status(404)
        .json({ success: false, message: "User not found" });

    res.status(200).json({ success: true, userProfile: user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

exports.updateOrCreateUserProfile = async (req, res) => {
  try {
    console.log("second");
    const userId = req.user.id;
    console.log(userId);
    const { location, experience, skills, preferredJobType } = req.body;

    console.log(location);
    console.log(experience);
    console.log(skills);
    console.log(preferredJobType);

    const userProfile = await UserProfile.findOneAndUpdate(
      { user: userId }, // find by user reference
      {
        user: userId,
        location,
        experience,
        skills,
        preferredJobType,
      },
      { new: true, upsert: true, runValidators: true }
    );

    res.status(200).json({ success: true, userProfile });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Update failed" });
  }
};
