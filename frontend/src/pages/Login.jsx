import { useState, useEffect } from "react";
import { GoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { path, config } from "../path";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { addUser } from "../store/features/user";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    if (user.email) {
      navigate("/feed");
    }
  }, [user]);

  useEffect(() => {
    const fetchTokenUser = async () => {
      try {
        const response = await axios.get(`${path}/auth/tokenLogin`, config);
        dispatch(addUser(response.data));
      } catch (err) {
        console.log(err);
        navigate("/");
      }
    };
    fetchTokenUser();
    if (!user) {
      navigate("/", { state: { from: location } });
    }
  }, []);

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/auth/login`,
        formData,
        { withCredentials: true }
      );

      if (response.data.success) {
        dispatch(addUser(response.data.user)); // Store user in Redux
        navigate("/feed"); // Redirect after successful login
      } else {
        alert(response.data.message || "Invalid Credentials"); // Show error message
      }
    } catch (error) {
      console.error(
        "Login Error:",
        error.response?.data?.message || error.message
      );
      alert("Login failed! Please check your credentials.");
    }
  };

  // Handle Google Login
  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      const { credential } = credentialResponse;

      // Send Google Token to Backend
      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/auth/google`,
        { token: credential },
        { withCredentials: true }
      );

      if (response.data.success) {
        dispatch(addUser(response.data.user)); // Store user in Redux ✅
        navigate(response.data.exists ? "/feed" : "/");
      }
    } catch (error) {
      console.error(
        "Google Auth Error:",
        error.response?.data?.message || error.message
      );
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md">
        <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">
          Login
        </h2>

        {/* Email & Password Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring focus:ring-blue-300"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring focus:ring-blue-300"
            required
          />
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition"
          >
            Login
          </button>
        </form>

        {/* Divider */}
        <div className="mt-6 text-center text-gray-500">Or</div>

        {/* Google Login Button */}
        <div className="mt-4 flex justify-center">
          <GoogleLogin
            onSuccess={handleGoogleSuccess}
            onError={() => console.log("Google Login Failed")}
          />
        </div>

        {/* Sign Up Link */}
        <p className="text-center mt-6 text-gray-600">
          Don't have an account?{" "}
          <span
            className="text-blue-500 hover:underline cursor-pointer"
            onClick={() => navigate("/signup")}
          >
            Sign Up
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;
