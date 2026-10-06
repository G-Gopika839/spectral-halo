import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import CoursePlayer from "./pages/CoursePlayer";
import Dashboard from "./pages/Dashboard";
import Admin from "./pages/Admin";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import LiveClass from "./pages/LiveClass";

function AppContent() {
  const location = useLocation();
  const hideNavbar = location.pathname === '/login' || location.pathname === '/signup';

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-white to-slate-200 
                    dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 
                    text-gray-900 dark:text-white transition-colors duration-300">

      {/* Navbar - Hidden on login/signup pages */}
      {!hideNavbar && <Navbar />}

      {/* Page Content */}
      <main className={hideNavbar ? "" : "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8"}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/course/:videoId" element={<CoursePlayer />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/live" element={<LiveClass />} />
        </Routes>
      </main>

    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
