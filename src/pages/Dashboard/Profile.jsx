import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserProfile, saveUserProfile } from "../../services/authAPI";

const Profile = () => {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.user);
  const {userProfile} = useSelector((state) => state.userProfile);

  const [formData, setFormData] = useState({
    location: "",
    experience: "",
    skills: "",
    preferredJobType: "any",
  });
  
  const [loading, setLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (!userProfile || !userProfile.skills) {
      dispatch(getUserProfile(token));
    } else {
      setFormData({
        location: userProfile.location || "",
        experience: userProfile.experience || "",
        skills: userProfile.skills.join(", "),
        preferredJobType: userProfile.preferredJobType || "any",
      });
      setIsEditing(true);
    }
  }, [userProfile, dispatch, token]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await dispatch(saveUserProfile(formData, isEditing, token));
    setLoading(false);
  };
  // if (!userProfile) {
  //   return <div>Loading profile...</div>;
  // }
  console.log("Second")
  console.log(userProfile)
  
  return (
    <div className="text-white">
      <h1 className="text-2xl font-bold mb-6">
        {isEditing ? "Edit Your Profile" : "Create Your Profile"}
      </h1>
      <form onSubmit={handleSubmit}>
        {/* Location */}
        <div className="mb-4">
          <label className="block mb-1 text-sm font-medium">Location</label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            className="w-full px-3 py-2 text-black border rounded-md"
            placeholder="City, Country"
          />
        </div>

        {/* Experience */}
        <div className="mb-4">
          <label className="block mb-1 text-sm font-medium">
            Experience (years) <span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            name="experience"
            value={formData.experience}
            onChange={handleChange}
            className="w-full px-3 py-2 text-black border rounded-md"
            min="0"
            required
          />
        </div>

        {/* Skills */}
        <div className="mb-4">
          <label className="block mb-1 text-sm font-medium">
            Skills <span className="text-red-500">*</span>
          </label>
          <textarea
            name="skills"
            value={formData.skills}
            onChange={handleChange}
            className="w-full px-3 py-2 text-black border rounded-md"
            placeholder="JavaScript, React, Node.js"
            rows="3"
            required
          />
        </div>

        {/* Preferred Job Type */}
        <div className="mb-6">
          <label className="block mb-1 text-sm font-medium">
            Preferred Job Type <span className="text-red-500">*</span>
          </label>
          <div className="flex gap-4">
            {["remote", "onsite", "any"].map((type) => (
              <label key={type} className="inline-flex text-black items-center">
                <input
                  type="radio"
                  name="preferredJobType"
                  value={type}
                  checked={formData.preferredJobType === type}
                  onChange={handleChange}
                  className="mr-2"
                />
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </label>
            ))}
          </div>
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className={`px-4 py-2 text-white font-medium rounded-md ${
            loading ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {loading
            ? "Saving..."
            : isEditing
            ? "Update Profile"
            : "Create Profile"}
        </button>
      </form>
    </div>
  );
};

export default Profile;
