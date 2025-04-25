import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { path, config } from "../path";
import SpecificFeed from "./SpecificFeed";

import {
  Camera,
  Mail,
  Phone,
  GraduationCap,
  Building2,
  Shield,
  CheckCircle2,
} from "lucide-react";
import { motion } from "framer-motion";

const UserProfile = () => {
  const { userId } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`${path}/api/users/${userId}`, config);
        setUser(response.data.user);
      } catch (err) {
        console.error("Error fetching user:", err);
        setError("Failed to fetch user details.");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [userId]);

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
            </div>
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

      <div className="mt-12">
        {/* Passing userId as a prop to filter posts */}
        <SpecificFeed userId={userId} />
      </div>
    </div>
  );
};

export default UserProfile;
