import { Link, useLocation } from "react-router-dom";
import { Megaphone, Home, MessageCircle, UserRound } from "lucide-react";

const Header = () => {
  const location = useLocation();

  return (
    <header className="bg-white shadow-md p-4 flex justify-between items-center">
      {/* Left Side - Logo */}
      <div className="text-2xl font-bold text-gray-800">AlumniVerse</div>

      {/* Right Side - Navigation Links */}
      <nav className="flex space-x-6">
        <NavItem
          to="/announcements"
          icon={<Megaphone size={24} />}
          label="Announcements"
          active={location.pathname === "/announcements"}
        />
        <NavItem
          to="/feed"
          icon={<Home size={24} />}
          label="Feed"
          active={location.pathname === "/feed"}
        />
        <NavItem
          to="/chat"
          icon={<MessageCircle size={24} />}
          label="Chat"
          active={location.pathname === "/chat"}
        />

        <NavItem
          to="/profile"
          icon={<UserRound size={"28px"} />}
          label="Profile"
          active={location.pathname === "/profile"}
        />
      </nav>
    </header>
  );
};

// Reusable Navigation Item
const NavItem = ({ to, icon, label, active }) => {
  return (
    <Link
      to={to}
      className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition ${
        active ? "bg-blue-500 text-white" : "text-gray-600 hover:text-blue-500"
      }`}
    >
      {icon}
      <span>{label}</span>
    </Link>
  );
};

export default Header;
