import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { path, config } from "../path";

const NotApproved = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const userRedux = useSelector((state) => state.user);

  useEffect(() => {
    if (!userRedux || !userRedux._id || userRedux._id === "") return;

    const checkApproval = async () => {
      try {
        const res = await axios.get(
          `${path}/api/users/getUserByID/${userRedux._id}`,
          config
        );
        setUser(res.data.user);
        if (!res.data.user.isApproved) navigate("/not-approved");
      } catch (err) {
        console.error("Error checking user approval status", err);
      }
    };

    checkApproval();
  }, [userRedux]);
  // Only run once on mount
  // No dependency — runs once on mount

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-white px-4 py-12">
      <div className="max-w-xl w-full bg-white shadow-2xl rounded-2xl p-10 border border-gray-200">
        <div className="mb-6 text-center">
          <h1 className="text-3xl font-semibold text-red-600 mb-4">
            Access Denied!
          </h1>
          <p className="text-gray-700 text-lg">
            You are not approved by the administrator to access{" "}
            <span className="font-semibold text-indigo-600">AlumniVerse</span>.
          </p>
        </div>
        <div className="text-center text-sm text-gray-500 mt-4">
          If you think this is a mistake, try contacting the administrator.
        </div>
      </div>
    </div>
  );
};

export default NotApproved;
