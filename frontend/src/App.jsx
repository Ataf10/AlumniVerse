import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Announcement from "./pages/Announcement";
import Feed from "./pages/Feed";
import AdminDashboard from "./pages/AdminDashboard";
import Layout from "./layouts/Layout";
import Chat from "./pages/Chat";
import Profile from "./pages/Profile";
import Signup from "./pages/Signup";
import CompleteProfile from "./pages/CompleteProfile";
import ProtectedRoute from "./components/ProtectedRoutes";
import AdminProtectedRoute from "./components/AdminPortectedRoutes";
import UserProfile from "./pages/UserProfile";
import NotApproved from "./pages/NotApproved";
import { useState } from "react";

function App() {
  const [pendingCount, setPendingCount] = useState(0);
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        {/* Main content area that expands to push the footer down */}
        <main className="flex-grow">
          <Routes>
            <Route path="/signup" element={<Signup />} />
            <Route path="/complete-profile" element={<CompleteProfile />} />
            <Route path="/" element={<Login />} />
            <Route
              path="/userProfile/:userId"
              element={
                <Layout>
                  <UserProfile />
                </Layout>
              }
            />
            <Route
              path="/broadcast"
              element={
                <Layout>
                  <Announcement />
                </Layout>
              }
            />
            <Route
              path="/feed"
              element={
                <Layout>
                  <Feed />
                </Layout>
              }
            />
            <Route
              path="/profile"
              element={
                <Layout>
                  <Profile />
                </Layout>
              }
            />
            <Route
              path="/chat"
              element={
                <Layout>
                  <Chat />
                </Layout>
              }
            />
            <Route
              path="/adminDashboard"
              element={
                <Layout>
                  <AdminDashboard setPendingCount={setPendingCount} />
                </Layout>
              }
            />
            <Route
              path="/not-approved"
              element={
                <Layout>
                  <NotApproved />
                </Layout>
              }
            />
          </Routes>
        </main>

        {/* Footer stays at the bottom */}
      </div>
    </Router>
  );
}

export default App;
