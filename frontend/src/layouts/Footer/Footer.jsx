import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Instagram,
  Twitter,
  Linkedin,
  Mail,
  Phone,
  MapPin,
  Heart,
} from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-b from-gray-900 to-gray-950 text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-12">
          {/* About Section */}
          <div className="md:col-span-5 space-y-6">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-xl font-bold">A</span>
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                AlumniVerse
              </span>
            </div>
            <p className="text-gray-400 leading-relaxed">
              Connecting students and alumni to foster a strong professional and
              social network. Join our community to stay connected, share
              experiences, and grow together.
            </p>
            <div className="flex items-center space-x-4">
              <motion.a
                href="https://www.instagram.com/i_ataf_ali"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors"
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <Instagram
                  size={20}
                  className="text-gray-400 hover:text-white transition-colors"
                />
              </motion.a>
              <motion.a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors"
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <Twitter
                  size={20}
                  className="text-gray-400 hover:text-white transition-colors"
                />
              </motion.a>
              <motion.a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors"
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <Linkedin
                  size={20}
                  className="text-gray-400 hover:text-white transition-colors"
                />
              </motion.a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-3">
            <h3 className="text-lg font-semibold mb-4 text-gray-200">
              Quick Links
            </h3>
            <ul className="space-y-3">
              {[
                { to: "/announcement", label: "Announcements" },
                { to: "/feed", label: "Feed" },
                { to: "/profile", label: "Profile" },
                { to: "/chat", label: "Chat" },
              ].map((link) => (
                <motion.li key={link.to} whileHover={{ x: 2 }}>
                  <Link
                    to={link.to}
                    className="text-gray-400 hover:text-white transition-colors inline-flex items-center space-x-1"
                  >
                    <span>→</span>
                    <span>{link.label}</span>
                  </Link>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="md:col-span-4">
            <h3 className="text-lg font-semibold mb-4 text-gray-200">
              Contact Us
            </h3>
            <ul className="space-y-3">
              <li className="flex items-center space-x-3 text-gray-400">
                <Mail size={18} />
                <span>support@alumniverse.com</span>
              </li>
              <li className="flex items-center space-x-3 text-gray-400">
                <Phone size={18} />
                <span>+1800 271 8234</span>
              </li>
              <li className="flex items-center space-x-3 text-gray-400">
                <MapPin size={18} />
                <span>BPIT, Rohini Sector 17</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-gray-400 text-sm">
              © {currentYear} AlumniVerse. All rights reserved.
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-400">
              <span>Made with</span>
              <Heart size={14} className="text-red-500 fill-red-500" />
              <span>by</span>
              <a
                href="https://www.instagram.com/i_ataf_ali"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:text-blue-300 transition-colors"
              >
                Ataf Ali
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
