import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import { config, path } from "../path";

const AdminProtectedRoutes = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const userRedux = useSelector((state) => state.user);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (!userRedux || !userRedux._id) {
      navigate("/", { state: { from: location } });
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
        navigate("/feed", { state: { from: location } });
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [userRedux, navigate, location]);

  if (loading) return null;

  return user && user.isAdmin ? children : null;
};

export default AdminProtectedRoutes;
