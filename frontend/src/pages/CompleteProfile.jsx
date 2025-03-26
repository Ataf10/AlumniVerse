import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { path } from "../path";

import { useSelector } from "react-redux";

const CompleteProfile = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  useEffect(() => {
    if (user.email) {
      if (location.state?.from.pathname) {
        navigate(`${location.state?.from.pathname}`);
      } else {
        navigate("/feed");
      }
    }
  }, [navigate, user]);

  const [formData, setFormData] = useState({
    batch: "",
    department: "",
    phone: "",
    bio: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/auth/complete-profile`,
        formData,
        { withCredentials: true }
      );

      if (response.data.success) {
        navigate("/feed");
      }
    } catch (error) {
      console.error("Profile Completion Error", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-md w-96">
        <h2 className="text-2xl font-bold mb-4 text-center">
          Complete Your Profile
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="batch"
            placeholder="Batch (e.g., 2022)"
            value={formData.batch}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
          <input
            type="text"
            name="department"
            placeholder="Department (e.g., Computer Science)"
            value={formData.department}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
          <input
            type="text"
            name="phone"
            placeholder="+91 ----"
            value={formData.phoneNumber}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
          <textarea
            name="bio"
            placeholder="Tell us about yourself"
            value={formData.bio}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default CompleteProfile;
