import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./layouts/Header/Header";
import Footer from "./layouts/Footer/Footer";
import Announcement from "./pages/Announcement";
import Feed from "./pages/Feed";
import Friends from "./pages/Friends";
import Chat from "./pages/Chat";
import Profile from "./pages/Profile";

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        {/* Header at the top */}
        <Header />

        {/* Main content area that expands to push the footer down */}
        <main className="flex-grow">
          <Routes>
            <Route path="/announcements" element={<Announcement />} />
            <Route path="/feed" element={<Feed />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/chat" element={<Chat />} />
          </Routes>
        </main>

        {/* Footer stays at the bottom */}
        <Footer />
      </div>
    </Router>
  );
}

export default App;
