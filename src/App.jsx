import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Profile from "./pages/Dashboard/Profile";
import Jobs from "./pages/Dashboard/Jobs";
import Dashboard from "./pages/Dashboard/Dashboard";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      <Route path="/dashboard" element={<Dashboard />}>
        <Route path="profile" element={<Profile />} />
        <Route path="jobs" element={<Jobs />} />
      </Route>
      <Route
        path="*"
        element={
          <div className="h-screen flex justify-center items-center text-red-600 text-xl">
            404 - Page Not Found
          </div>
        }
      />
    </Routes>
  );
}

export default App;
