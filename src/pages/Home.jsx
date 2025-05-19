import React, { useState } from "react";
import img from "../asset/Homepage.jpeg";
import {
  FaUserCircle,
  FaRegUser,
  FaInfoCircle,
  FaArrowRight,
} from "react-icons/fa";
import { Link } from "react-router-dom";

const Home = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col font-sans">
      <div
        className="min-h-screen bg-cover bg-center relative"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.65), rgba(0, 0, 0, 0.4)), url(${img})`,
          backgroundAttachment: "fixed",
        }}
      >
        <header className="bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg border-b border-white border-opacity-20 sticky top-0 z-10">
          <div className="container mx-auto px-4 py-3 flex flex-col sm:flex-row justify-between items-center">
            <h1 className="text-2xl md:text-3xl font-bold text-white mb-3 sm:mb-0">
              <span className="text-indigo-400">Job</span>Match
            </h1>

            {/* Mobile menu button (visible on small screens) */}
            <div className="block sm:hidden absolute right-4 top-4">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="text-white focus:outline-none"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16m-7 6h7"
                  ></path>
                </svg>
              </button>
            </div>

            {/* Desktop navigation (hidden on small screens) */}
            <nav className="hidden sm:flex space-x-3 md:space-x-6">
              <Link to={"/login"}>
                <button className="text-white hover:text-indigo-300 transition-colors flex items-center gap-1 md:gap-2 text-sm md:text-base">
                  <FaUserCircle /> Login
                </button>
              </Link>
              <Link to={"/signup"}>
                <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-3 md:px-4 py-1.5 md:py-2 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-1 md:gap-2 text-sm md:text-base">
                  <FaRegUser /> Sign Up
                </button>
              </Link>

              <Link to={"/home"}>
                <button className="text-white hover:text-indigo-300 transition-colors underline decoration-1 underline-offset-4 text-sm md:text-base">
                  Guest Access
                </button>
              </Link>
            </nav>

            {/* Mobile navigation (expanded when menu button is clicked) */}
            <nav
              className={`${
                mobileMenuOpen ? "flex" : "hidden"
              } sm:hidden flex-col items-center space-y-4 w-full py-4`}
            >
              <a
                href="#login"
                className="text-white hover:text-indigo-300 transition-colors flex items-center gap-2"
              >
                <FaUserCircle /> Login
              </a>
              <a
                href="#signup"
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2 w-full justify-center"
              >
                <FaRegUser /> Sign Up
              </a>
              <a
                href="#guest"
                className="text-white hover:text-indigo-300 transition-colors underline decoration-1 underline-offset-4"
              >
                Guest Access
              </a>
            </nav>
          </div>
        </header>

        {/* Hero content */}
        <div className="container mx-auto px-6 flex items-center h-screen">
          <div className="max-w-3xl animate-fadeIn">
            <h2 className="text-5xl font-bold text-white mb-6 leading-tight">
              Find Your <span className="text-indigo-400">Perfect Career</span>{" "}
              Match with AI
            </h2>
            <p className="text-xl text-gray-200 mb-8 leading-relaxed">
              Our intelligent platform analyzes your skills and preferences to
              connect you with opportunities that truly align with your career
              goals.
            </p>
            <div className="flex flex-wrap gap-4">
              <button className="group bg-indigo-600 hover:bg-indigo-700 text-white text-lg font-semibold py-3 px-8 rounded-lg shadow-lg hover:shadow-indigo-500/50 transition-all duration-300 flex items-center gap-2">
                Get Started
                <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="bg-transparent hover:bg-white hover:bg-opacity-10 text-white text-lg font-semibold py-3 px-8 border-2 border-white rounded-lg transition-all duration-300">
                Learn More
              </button>
            </div>

            <div className="mt-16 grid grid-cols-3 gap-8 text-center">
              <div className="bg-white bg-opacity-10 backdrop-filter backdrop-blur-sm p-4 rounded-xl">
                <p className="text-3xl font-bold text-indigo-400">500+</p>
                <p className="text-white">Companies</p>
              </div>
              <div className="bg-white bg-opacity-10 backdrop-filter backdrop-blur-sm p-4 rounded-xl">
                <p className="text-3xl font-bold text-indigo-400">10k+</p>
                <p className="text-white">Job Matches</p>
              </div>
              <div className="bg-white bg-opacity-10 backdrop-filter backdrop-blur-sm p-4 rounded-xl">
                <p className="text-3xl font-bold text-indigo-400">95%</p>
                <p className="text-white">Success Rate</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <footer className="bg-white py-6">
        <div className="container mx-auto px-5 text-center">
          <p className="text-gray-600">
            &copy; 2025 JobMatch. All rights reserved.
          </p>
          <div className="mt-2 flex justify-center space-x-4 text-gray-500">
            <a href="#terms" className="hover:text-indigo-600">
              Terms
            </a>
            <a href="#privacy" className="hover:text-indigo-600">
              Privacy
            </a>
            <a href="#contact" className="hover:text-indigo-600">
              Contact
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
