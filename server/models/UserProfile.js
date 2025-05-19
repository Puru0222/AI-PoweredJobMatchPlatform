const mongoose = require("mongoose");

const userProfileSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    location: {
      type: String,
      trim: true,
    },
    experience: {
      type: Number,
      required: true,
    },
    skills: [
      {
        type: String,
        trim: true,
        required: true,
      },
    ],
    preferredJobType: {
      type: String,
      enum: ["remote", "onsite", "any"],
      default: "any",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("UserProfile", userProfileSchema);
