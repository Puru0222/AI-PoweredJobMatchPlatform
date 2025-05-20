import React, { useState } from "react";
import img from "../asset/check.png";
import imgRight from "../asset/HomepageRight.jpeg";
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
        className="min-h-screen bg-custom-bg bg-cover bg-center relative"
      >
        <header className="bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg border-b border-white border-opacity-20 sticky top-0 z-10">
          <div className="container mx-auto px-4 py-3 flex justify-between items-center relative">
            <h1 className="text-2xl md:text-3xl font-bold text-white">
              <span className="text-indigo-400">Job</span>Match
            </h1>

            {/* Mobile menu button */}
            <div className="block sm:hidden">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="text-white focus:outline-none"
                aria-label="Toggle menu"
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
                    d={
                      mobileMenuOpen
                        ? "M6 18L18 6M6 6l12 12"
                        : "M4 6h16M4 12h16m-7 6h7"
                    }
                  ></path>
                </svg>
              </button>
            </div>

            {/* Desktop navigation */}
            <nav className="hidden sm:flex space-x-3 md:space-x-6">
              <Link to="/login">
                <button className="text-white bg-gray-500 rounded-full hover:text-indigo-400 px-3 md:px-4 py-1.5 md:py-2 transition-colors flex items-center gap-1 md:gap-2 text-sm md:text-base">
                  <FaUserCircle /> Login
                </button>
              </Link>
              <Link to="/signup">
                <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-3 md:px-4 py-1.5 md:py-2 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-1 md:gap-2 text-sm md:text-base">
                  <FaRegUser /> Sign Up
                </button>
              </Link>
              <Link to="/home">
                <button className="text-white hover:text-indigo-300 px-3 md:px-4 py-1.5 md:py-2 transition-colors underline decoration-1 underline-offset-4 text-sm md:text-base">
                  Guest Access
                </button>
              </Link>
            </nav>
          </div>

          {/* Mobile navigation - now outside the header flex container for better layout */}
          <nav
            className={`${
              mobileMenuOpen ? "max-h-screen py-4" : "max-h-0"
            } sm:hidden overflow-hidden transition-all duration-300 flex flex-col items-center space-y-4 w-full bg-black bg-opacity-50`}
          >
            <Link
              to="/login"
              className="text-white px-4 py-2 hover:text-indigo-300 transition-colors flex items-center gap-2"
            >
              <FaUserCircle /> Login
            </Link>
            <Link
              to="/signup"
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2 w-4/5 justify-center"
            >
              <FaRegUser /> Sign Up
            </Link>
            <Link
              to="/home"
              className="text-white hover:text-indigo-300 transition-colors underline decoration-1 underline-offset-4"
            >
              Guest Access
            </Link>
          </nav>
        </header>

        {/* Hero content */}
        <div className="flex-grow flex justify-center items-center">
          <div className="gap-4 mx-auto px-4 py-8 md:py-12 flex flex-col lg:flex-row items-center justify-end">
            <div className="w-full lg:w-1/2 animate-fadeIn text-center lg:text-left mb-8 lg:mb-0">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 md:mb-6 leading-tight">
                Find Your{" "}
                <span className="text-indigo-400">Perfect Career</span> Match
                with AI
              </h2>
              <p className="text-lg md:text-xl text-gray-200 mb-6 md:mb-8 leading-relaxed">
                Our intelligent platform analyzes your skills and preferences to
                connect you with opportunities that truly align with your career
                goals.
              </p>
              <div className="flex flex-wrap justify-center lg:justify-start gap-3 md:gap-4">
                <button className="group bg-indigo-600 hover:bg-indigo-700 text-white text-base md:text-lg font-semibold py-2 md:py-3 px-6 md:px-8 rounded-lg shadow-lg hover:shadow-indigo-500/50 transition-all duration-300 flex items-center gap-2">
                  Get Started
                  <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
                </button>
                <button className="bg-transparent hover:bg-white hover:bg-opacity-10 text-white text-base md:text-lg font-semibold py-2 md:py-3 px-6 md:px-8 border-2 border-white rounded-lg transition-all duration-300">
                  Learn More
                </button>
              </div>

              <div className="mt-8 md:mt-16 grid grid-cols-3 gap-3 md:gap-8 text-center">
                <div className="bg-white bg-opacity-10 backdrop-filter backdrop-blur-sm p-2 md:p-4 rounded-xl">
                  <p className="text-xl md:text-3xl font-bold text-indigo-400">
                    500+
                  </p>
                  <p className="text-white text-sm md:text-base">Companies</p>
                </div>
                <div className="bg-white bg-opacity-10 backdrop-filter backdrop-blur-sm p-2 md:p-4 rounded-xl">
                  <p className="text-xl md:text-3xl font-bold text-indigo-400">
                    10k+
                  </p>
                  <p className="text-white text-sm md:text-base">Job Matches</p>
                </div>
                <div className="bg-white bg-opacity-10 backdrop-filter backdrop-blur-sm p-2 md:p-4 rounded-xl">
                  <p className="text-xl md:text-3xl font-bold text-indigo-400">
                    95%
                  </p>
                  <p className="text-white text-sm md:text-base">
                    Success Rate
                  </p>
                </div>
              </div>
            </div>

            <div className="flex lg:w-5/12 lg:px-6 w-4/6">
              <img
                src={imgRight}
                alt="Career professional"
                className="w-full rounded-xl shadow-2xl object-cover"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </div>

      <footer className="bg-white py-4 md:py-6">
        <div className="mx-auto px-4 text-center">
          <p className="text-gray-600">
            &copy; 2025 JobMatch. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
