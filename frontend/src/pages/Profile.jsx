import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { config, path } from "../path";
import { motion, AnimatePresence } from "framer-motion";
import {
  Camera,
  X,
  Mail,
  Phone,
  GraduationCap,
  Building2,
  Shield,
  CheckCircle2,
  Edit3,
} from "lucide-react";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({});
  const [selectedFile, setSelectedFile] = useState(null);

  const userRedux = useSelector((state) => state.user);

  useEffect(() => {
    if (!userRedux || !userRedux._id) {
      setError("User not found in Redux store.");
      setLoading(false);
      return;
    }

    const fetchUser = async () => {
      try {
        const response = await axios.get(
          `${path}/api/users/${userRedux._id}`,
          config
        );
        setUser(response.data.user);
      } catch (err) {
        console.error("Error fetching user:", err);
        setError("Failed to fetch user details.");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [userRedux._id]);

  const handleEditClick = () => {
    setFormData({ ...user });
    setIsEditing(true);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `${path}/api/users/${userRedux._id}`,
        formData,
        config
      );
      setUser(response.data.user);
      setIsEditing(false);
    } catch (err) {
      console.error("Error updating profile:", err);
      setError("Failed to update profile.");
    }
  };

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append("profilePic", selectedFile);

    try {
      const response = await axios.put(
        `${path}/api/users/upload-profile-pic/${userRedux._id}`,
        formData,
        config
      );
      setUser(response.data.user);
      setSelectedFile(null);
    } catch (error) {
      console.error("Upload error", error);
    }
  };

  if (loading)
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent"></div>
      </div>
    );

  if (error)
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="bg-red-50 text-red-600 px-6 py-4 rounded-lg shadow-sm">
          <p className="text-lg font-medium">{error}</p>
        </div>
      </div>
    );

  if (!user)
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="bg-gray-50 text-gray-600 px-6 py-4 rounded-lg shadow-sm">
          <p className="text-lg font-medium">User not found.</p>
        </div>
      </div>
    );

  return (
    <div className="max-w-4xl mx-auto p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl shadow-xl overflow-hidden"
      >
        {/* Cover Photo */}
        <div className="h-48 bg-gradient-to-r from-blue-500 to-purple-600 relative">
          <div className="absolute inset-0 bg-black/20"></div>
        </div>

        {/* Profile Content */}
        <div className="relative px-8 pb-8">
          {/* Profile Picture */}
          <div className="relative -mt-20 mb-6">
            <div className="relative inline-block">
              <img
                src={
                  user.profilePic
                    ? user.profilePic
                    : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
                }
                alt="profile pic"
                className="w-40 h-40 rounded-full border-4 border-white shadow-lg object-cover z-[-1]"
              />
              <label className="absolute bottom-2 right-2 p-2 bg-white rounded-full shadow-md hover:bg-gray-50 transition-colors cursor-pointer">
                <Camera size={20} className="text-gray-600" />
                <input
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={handleFileChange}
                />
              </label>
            </div>
            {selectedFile && (
              <div className="mt-3 flex gap-3 items-center">
                <button
                  onClick={handleUpload}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Upload Picture
                </button>
                <span className="text-sm text-gray-600">
                  {selectedFile.name}
                </span>
              </div>
            )}
          </div>

          {/* User Info */}
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">
                  {user.name}
                </h1>
                <div className="flex items-center gap-2 mt-2">
                  {user.isAdmin && (
                    <span className="flex items-center gap-1 text-purple-600 bg-purple-50 px-3 py-1 rounded-full text-sm font-medium">
                      <Shield size={14} /> Admin
                    </span>
                  )}
                  {user.isApproved && (
                    <span className="flex items-center gap-1 text-green-600 bg-green-50 px-3 py-1 rounded-full text-sm font-medium">
                      <CheckCircle2 size={14} /> Verified
                    </span>
                  )}
                </div>
              </div>
              <button
                onClick={handleEditClick}
                className="flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors"
              >
                <Edit3 size={18} />
                <span>Edit Profile</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-gray-600">
                  <Mail size={20} />
                  <span>{user.email}</span>
                </div>
                <div className="flex items-center gap-3 text-gray-600">
                  <Phone size={20} />
                  <span>{user.phone || "Not provided"}</span>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-gray-600">
                  <GraduationCap size={20} />
                  <span>Batch: {user.batch || "Not provided"}</span>
                </div>
                <div className="flex items-center gap-3 text-gray-600">
                  <Building2 size={20} />
                  <span>Department: {user.department || "Not provided"}</span>
                </div>
              </div>
            </div>

            {user.bio && (
              <div className="mt-6 p-4 bg-gray-50 rounded-xl">
                <p className="text-gray-600 italic">"{user.bio}"</p>
              </div>
            )}
          </div>
        </div>
      </motion.div>

      {/* Edit Profile Modal */}
      <AnimatePresence>
        {isEditing && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 flex items-center justify-center z-50"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-2xl shadow-2xl w-full max-w-lg m-4"
            >
              <div className="p-6 border-b border-gray-100">
                <div className="flex items-center justify-between">
                  <h3 className="text-2xl font-bold text-gray-900">
                    Edit Profile
                  </h3>
                  <button
                    onClick={() => setIsEditing(false)}
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                  >
                    <X size={20} className="text-gray-500" />
                  </button>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="p-6 space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">
                    Phone
                  </label>
                  <input
                    type="text"
                    name="phone"
                    value={formData.phone || ""}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">
                    Batch
                  </label>
                  <input
                    type="text"
                    name="batch"
                    value={formData.batch || ""}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">
                    Department
                  </label>
                  <input
                    type="text"
                    name="department"
                    value={formData.department || ""}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">
                    Bio
                  </label>
                  <textarea
                    name="bio"
                    value={formData.bio || ""}
                    onChange={handleChange}
                    rows={4}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow resize-none"
                  />
                </div>

                <div className="flex items-center justify-end gap-3 mt-6">
                  <button
                    type="button"
                    onClick={() => setIsEditing(false)}
                    className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Profile;
