import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserProfile, saveUserProfile } from "../../services/authAPI";
import {
  FaUser,
  FaMapMarkerAlt,
  FaBriefcase,
  FaTools,
  FaCog,
  FaCheck,
} from "react-icons/fa";
import { toast } from "react-hot-toast";

const Profile = () => {
  const dispatch = useDispatch();
  const { token, user } = useSelector((state) => state.user);
  const { userProfile } = useSelector((state) => state.userProfile);

  const [formData, setFormData] = useState({
    location: "",
    experience: "",
    skills: "",
    preferredJobType: "any",
  });

  const [loading, setLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  useEffect(() => {
    if (!userProfile || !userProfile.skills) {
      dispatch(getUserProfile(token));
    } else {
      setFormData({
        location: userProfile.location || "",
        experience: userProfile.experience || "",
        skills: Array.isArray(userProfile.skills)
          ? userProfile.skills.join(", ")
          : userProfile.skills,
        preferredJobType: userProfile.preferredJobType || "any",
      });
      setIsEditing(!!userProfile._id);
    }
  }, [userProfile, dispatch, token]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
    setSaveSuccess(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await dispatch(saveUserProfile(formData, isEditing, token));
      setLoading(false);
      setSaveSuccess(true);
      toast.success(
        isEditing
          ? "Profile updated successfully!"
          : "Profile created successfully!"
      );
    } catch (error) {
      setLoading(false);
      toast.error("Something went wrong. Please try again.");
    }
  };

  // Function to render skills as tags
  const renderSkillsPreview = () => {
    if (!formData.skills) return null;

    return formData.skills.split(",").map((skill, index) => (
      <span
        key={index}
        className="bg-blue-100 text-blue-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full"
      >
        {skill.trim()}
      </span>
    ));
  };

  return (
    <div className="mx-auto">
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        {/* Profile Header */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-4 text-white">
          <div className="flex items-center">
            <div className="bg-white rounded-full p-3 mr-4 text-blue-700">
              <FaUser size={24} />
            </div>
            <div>
              <h1 className="text-2xl font-bold">
                {isEditing ? "Edit Your Profile" : "Create Your Profile"}
              </h1>
              <p className="text-blue-100">
                {user?.email ||
                  "Complete your profile to find the perfect job match"}
              </p>
            </div>
          </div>
        </div>

        {/* Profile Content */}
        <div className="p-4">
          {/* Profile Preview Card (only shown if editing) */}
          {isEditing && (
            <div className="bg-gray-50 rounded-lg p-4 mb-6 border border-gray-200">
              <h3 className="text-lg font-medium text-gray-800 mb-3 flex items-center">
                <FaUser className="mr-2 text-blue-600" />
                Profile Summary
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-600">
                <div className="flex items-start">
                  <FaMapMarkerAlt className="mr-2 mt-1 text-blue-600" />
                  <div>
                    <p className="text-sm font-medium text-gray-500">
                      Location
                    </p>
                    <p>{formData.location || "Not specified"}</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <FaBriefcase className="mr-2 mt-1 text-blue-600" />
                  <div>
                    <p className="text-sm font-medium text-gray-500">
                      Experience
                    </p>
                    <p>
                      {formData.experience}{" "}
                      {parseInt(formData.experience) === 1 ? "year" : "years"}
                    </p>
                  </div>
                </div>
                <div className="flex items-start col-span-1 md:col-span-2">
                  <FaTools className="mr-2 mt-1 text-blue-600" />
                  <div>
                    <p className="text-sm font-medium text-gray-500">Skills</p>
                    <div className="flex flex-wrap mt-1">
                      {renderSkillsPreview()}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-3">
            {/* Location */}
            <div className="form-group">
              <label className="flex mb-2 text-sm font-medium text-gray-700 items-center">
                <FaMapMarkerAlt className="mr-2 text-blue-600" />
                Location
              </label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                className="w-full px-4 py-3 text-gray-700 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                placeholder="City, Country (e.g., San Francisco, USA)"
              />
              <p className="mt-1 text-xs text-gray-500">
                Your location helps us find jobs in your area
              </p>
            </div>

            {/* Experience */}
            <div className="form-group">
              <label className="flex mb-2 text-sm font-medium text-gray-700 items-center">
                <FaBriefcase className="mr-2 text-blue-600" />
                Experience (years) <span className="text-red-500 ml-1">*</span>
              </label>
              <input
                type="number"
                name="experience"
                value={formData.experience}
                onChange={handleChange}
                className="w-full px-4 py-3 text-gray-700 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                min="0"
                max="50"
                required
              />
            </div>

            {/* Skills */}
            <div className="form-group">
              <label className="flex mb-2 text-sm font-medium text-gray-700 items-center">
                <FaTools className="mr-2 text-blue-600" />
                Skills <span className="text-red-500 ml-1">*</span>
              </label>
              <textarea
                name="skills"
                value={formData.skills}
                onChange={handleChange}
                className="w-full px-4 py-3 text-gray-700 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                placeholder="JavaScript, React, Node.js, CSS, UI/UX Design"
                rows="1"
                required
              />
              <p className="mt-1 text-xs text-gray-500">
                Separate each skill with a comma
              </p>

              {formData.skills && (
                <div className="mt-3">
                  <p className="text-xs font-medium text-gray-500 mb-1">
                    Preview:
                  </p>
                  <div className="flex flex-wrap">{renderSkillsPreview()}</div>
                </div>
              )}
            </div>

            {/* Preferred Job Type */}
            <div className="form-group">
              <label className="flex mb-3 text-sm font-medium text-gray-700 items-center">
                <FaCog className="mr-2 text-blue-600" />
                Preferred Job Type <span className="text-red-500 ml-1">*</span>
              </label>

              <div className="grid grid-cols-3 gap-3 mt-2">
                {[
                  { value: "remote", label: "Remote", icon: "🌎" },
                  { value: "onsite", label: "On-site", icon: "🏢" },
                  { value: "any", label: "Any Type", icon: "✓" },
                ].map((type) => (
                  <label
                    key={type.value}
                    className={`
                      flex flex-col items-center justify-center p-4 rounded-lg cursor-pointer border-2 
                      transition-all duration-200 hover:bg-gray-50
                      ${
                        formData.preferredJobType === type.value
                          ? "border-blue-500 bg-blue-50"
                          : "border-gray-200"
                      }
                    `}
                  >
                    <div className="text-2xl mb-2">{type.icon}</div>
                    <input
                      type="radio"
                      name="preferredJobType"
                      value={type.value}
                      checked={formData.preferredJobType === type.value}
                      onChange={handleChange}
                      className="sr-only"
                    />
                    <span
                      className={`text-sm font-medium ${
                        formData.preferredJobType === type.value
                          ? "text-blue-700"
                          : "text-gray-700"
                      }`}
                    >
                      {type.label}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Submit */}
            <div className="flex items-center justify-between pt-6 border-t border-gray-200">
              <button
                type="button"
                onClick={() => window.history.back()}
                className="px-4 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 transition-all duration-200"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={loading}
                className={`
                  group px-6 py-3 flex items-center justify-center rounded-lg font-medium text-white
                  transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
                  ${
                    loading
                      ? "bg-gray-400 cursor-not-allowed"
                      : saveSuccess
                      ? "bg-green-600 hover:bg-green-700"
                      : "bg-blue-600 hover:bg-blue-700"
                  }
                `}
              >
                {loading ? (
                  <>
                    <svg
                      className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Saving...
                  </>
                ) : saveSuccess ? (
                  <>
                    <FaCheck className="mr-2" /> Saved Successfully
                  </>
                ) : (
                  <>{isEditing ? "Update Profile" : "Create Profile"}</>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;
