import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function Home() {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <h1 className="text-3xl font-bold text-blue-600">
        Welcome to JOBMATCHUP
      </h1>
    </div>
  );
}

function NotFound() {
  return (
    <div className="flex items-center justify-center h-screen bg-red-100">
      <h1 className="text-xl font-semibold text-red-600">
        404 - Page Not Found
      </h1>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
