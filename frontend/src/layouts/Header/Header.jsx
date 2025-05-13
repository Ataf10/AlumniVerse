import { Link, useLocation } from "react-router-dom";
import { Megaphone, Home, MessageCircle, UserRound, Bell } from "lucide-react";
import { motion } from "framer-motion";
import axios from "axios";
import AdminProtectedRoutes from "../../components/AdminPortectedRoutes";
import { useSelector } from "react-redux";
import { path, config } from "../../path";
import { useState, useEffect } from "react";

const Header = () => {
  const [user, setUser] = useState(null);

  const userRedux = useSelector((state) => state.user);

  useEffect(() => {
    if (!userRedux || !userRedux._id) {
      return;
    }

    const fetchUser = async () => {
      try {
        const response = await axios.get(
          `${path}/api/users/getUserByID/${userRedux._id}`,
          config
        );

        setUser(response.data.user);
      } catch (err) {
        console.error("Error fetching user:", err);
        setError("Failed to fetch user details.");
      }
    };

    fetchUser();
  }, [userRedux._id]);

  const location = useLocation();

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
              <span className="text-xl font-bold text-white">A</span>
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              AlumniVerse
            </span>
          </Link>

          {/* Navigation */}
          <nav className="flex items-center space-x-1">
            <AdminProtectedRoutes>
              <NavItem
                to="/adminDashboard"
                label="Admin DashBoard"
                active={location.pathname === "/adminDashboard"}
                badge={1}
              />
            </AdminProtectedRoutes>

            <NavItem
              to="/broadcast"
              icon={<Megaphone size={20} />}
              label="Broadcast"
              active={location.pathname === "/broadcast"}
            />
            <NavItem
              to="/feed"
              icon={<Home size={20} />}
              label="Feed"
              active={location.pathname === "/feed"}
            />
            <NavItem
              to="/chat"
              icon={<MessageCircle size={20} />}
              label="Chat"
              active={location.pathname === "/chat"}
              badge={1}
            />

            {/* Profile */}
            <div className="ml-2">
              <NavItem
                to="/profile"
                icon={
                  <img
                    src={
                      user?.profilePic
                        ? user?.profilePic
                        : `https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png`
                    }
                    alt="Profile"
                    className="w-8 h-8 rounded-full object-cover border-2 border-white shadow-sm"
                  />
                }
                label="Profile"
                active={location.pathname === "/profile"}
              />
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
};

const NavItem = ({ to, icon, label, active, badge }) => {
  return (
    <Link to={to} className="relative group">
      <div
        className={`
        flex items-center space-x-2 px-3 py-2 rounded-xl transition-all duration-200
        ${
          active
            ? "bg-blue-500 text-white shadow-md shadow-blue-500/20"
            : "text-gray-500 hover:bg-gray-100"
        }
      `}
      >
        {/* Icon */}
        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
          {icon}
        </motion.div>

        {/* Label */}
        <span className="text-sm font-medium">{label}</span>

        {/* Badge */}
        {badge && (
          <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center">
            {badge}
          </span>
        )}
      </div>

      {/* Active Indicator */}
      {active && (
        <motion.div
          layoutId="activeIndicator"
          className="absolute -bottom-[1px] left-0 right-0 h-0.5 bg-blue-500"
          initial={false}
          transition={{ type: "spring", stiffness: 380, damping: 30 }}
        />
      )}
    </Link>
  );
};

export default Header;
