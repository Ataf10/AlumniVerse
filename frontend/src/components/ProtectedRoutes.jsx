import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { config, path } from "../path";
import { addUser } from "../store/features/user";

const ProtectedRoute = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.email);

  const dispatch = useDispatch();
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
  }, [user, navigate]);

  return user ? children : null;
};

export default ProtectedRoute;
