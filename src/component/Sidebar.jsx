import React, { useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import {
  FaUser,
  FaSearch,
  FaSignOutAlt,
  FaChevronLeft,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import { IoIosCreate } from "react-icons/io";
import { useDispatch } from "react-redux";
import { logout } from "../services/authAPI";

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout(navigate));
  };

  const navigation = [
    { name: "Profile", path: "profile", icon: <FaUser /> },
    { name: "Find Jobs", path: "jobs", icon: <FaSearch /> },
    { name: "Create Job", path: "createjob", icon: <IoIosCreate /> },
  ];

  const activeStyle = "bg-indigo-600 text-white";
  const inactiveStyle = "text-gray-300 hover:bg-gray-700 hover:text-white";

  return (
    <>
      {/* Mobile overlay */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 z-20 md:hidden transition-opacity duration-300 ${
          mobileOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setMobileOpen(false)}
      ></div>

      {/* Mobile toggle button */}
      <button
        className="fixed top-4 left-4 z-20 md:hidden bg-gray-700 text-white p-2 rounded-lg shadow-lg"
        onClick={() => setMobileOpen(!mobileOpen)}
      >
        {mobileOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
      </button>

      {/* Sidebar */}
      <aside
        className={`
          fixed md:static top-0 left-0 z-30
          h-screen overflow-y-auto 
          transition-all duration-300 ease-in-out 
          bg-gray-900 text-white
          ${collapsed ? "w-20" : "w-64"}
          ${mobileOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
        `}
      >
        {/* Sidebar header with logo */}
        <div className="px-4 py-5 flex justify-between items-center border-b border-gray-800">
          <div className="flex items-center">
            <div className="bg-indigo-600 text-white p-2 rounded-lg">
              <span className="font-bold text-xl">JM</span>
            </div>
            {!collapsed && (
              <h1 className="ml-3 font-bold text-xl">
                Job<span className="text-indigo-400">Match</span>
              </h1>
            )}
          </div>
          <button
            className="hidden md:block text-gray-400 hover:text-white"
            onClick={() => setCollapsed(!collapsed)}
          >
            <FaChevronLeft
              className={`transition-transform duration-200 ${
                collapsed ? "rotate-180" : ""
              }`}
            />
          </button>
        </div>

        {/* Main navigation */}
        <nav className="p-4 space-y-1">
          {navigation.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) => `
                flex items-center px-3 py-3 rounded-lg transition-colors
                ${isActive ? activeStyle : inactiveStyle}
              `}
            >
              <span className="text-lg">{item.icon}</span>
              {!collapsed && <span className="ml-3">{item.name}</span>}
            </NavLink>
          ))}
        </nav>

        {/* Divider */}
        <div className="mx-4 my-2 border-t border-gray-800"></div>

        {/* Logout button */}
        <nav className="p-4 space-y-1">
          <div
            onClick={handleLogout}
            className="flex items-center px-3 py-3 rounded-lg cursor-pointer transition-colors text-gray-300 hover:bg-gray-700 hover:text-white"
          >
            <FaSignOutAlt />
            {!collapsed && <span className="ml-3">Logout</span>}
          </div>
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;
