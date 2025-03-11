import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-8 mt-auto">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About Section */}
          <div>
            <h2 className="text-lg font-semibold">About AlumniVerse</h2>
            <p className="text-gray-400 mt-2">
              Connecting students and alumni to foster a strong professional and
              social network.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h2 className="text-lg font-semibold">Quick Links</h2>
            <ul className="mt-2 space-y-2">
              <li>
                <Link
                  to="/announcement"
                  className="text-gray-400 hover:text-white"
                >
                  Announcements
                </Link>
              </li>
              <li>
                <Link to="/feed" className="text-gray-400 hover:text-white">
                  Feed
                </Link>
              </li>
              <li>
                <Link to="/friends" className="text-gray-400 hover:text-white">
                  Friends
                </Link>
              </li>
              <li>
                <Link to="/chat" className="text-gray-400 hover:text-white">
                  Chat
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact & Social Media */}
          <div>
            <h2 className="text-lg font-semibold">Contact</h2>
            <p className="text-gray-400 mt-2">Developed by Ataf Ali</p>
            <div className="flex space-x-4 mt-3">
              <Link
                to="https://www.instagram.com/i_ataf_ali"
                className="text-gray-400 hover:text-white"
                target="_blank"
                rel="noopener noreferrer"
              >
                Instagram
              </Link>
              <Link
                to="#"
                className="text-gray-400 hover:text-white"
                target="_blank"
                rel="noopener noreferrer"
              >
                Twitter
              </Link>
              <Link
                to="#"
                className="text-gray-400 hover:text-white"
                target="_blank"
                rel="noopener noreferrer"
              >
                LinkedIn
              </Link>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-700 mt-6 pt-4 text-center text-gray-500 text-sm">
          © {new Date().getFullYear()} AlumniVerse. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
