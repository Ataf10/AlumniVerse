import { GoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import axios from "axios";
import { path, config } from "../path";
import { useDispatch } from "react-redux";
import { addUser } from "../store/features/user";

const Signup = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  useEffect(() => {
    const fetchTokenUser = async () => {
      try {
        const response = await axios.get(`${path}/auth/tokenLogin`, config);
        console.log(response.data);
        dispatch(addUser(response.data));
      } catch (err) {
        console.log(err);
        navigate("/signup");
        console.log(`yahi error hai`);
      }
    };

    fetchTokenUser();
    if (!user) {
      navigate("/", { state: { from: location } });
    }
  }, []);

  useEffect(() => {
    if (user.email) {
      navigate("/feed");
    }
  }, [user]);

  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      const { credential } = credentialResponse;

      // Send Google Token to backend
      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/auth/google`,
        { token: credential },
        { withCredentials: true }
      );

      // Navigate based on response
      if (response.data.redirect === "complete-profile") {
        navigate("/complete-profile");
      } else {
        navigate("/feed");
      }
    } catch (error) {
      console.error("Google Auth Error", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-md w-96">
        <h2 className="text-2xl font-bold mb-4 text-center">Sign Up</h2>
        <GoogleLogin
          onSuccess={handleGoogleSuccess}
          onError={() => console.log("Login Failed")}
        />
      </div>
    </div>
  );
};

export default Signup;
