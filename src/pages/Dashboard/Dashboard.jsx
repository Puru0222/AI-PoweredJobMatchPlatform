import React from "react";
import Sidebar from "../../component/Sidebar";
import { Outlet, Link } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import { useSelector, useStore } from "react-redux";

const Dashboard = () => {

  const user = useSelector((state) => state.user);

  return (
    <div className="min-h-screen flex ">
      <div className="bg-gray-700 border-r border-gray-600">
        <Sidebar />
      </div>

      <div className="flex flex-col flex-1 overflow-hidden">
        <header className="fixed top-2 justify-center right-6 lg:right-10 z-10">
          <div className="px-4 py-3 flex justify-evenly items-center">
            <div className="flex items-center space-x-4">
              <div className="flex items-center gap-3 text-sm text-white">
                <FaUserCircle size={24} className="text-gray-300" />
                <span className="mr-2">{user.name}</span>
              </div>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto bg-custom-bg bg-cover bg-center bg-fixed pt-20 px-6">
          <div className="container mx-auto">
            <div className="text-sm text-gray-400 mb-6">
              Dashboard / <span className="text-white">Current Page</span>
            </div>

            <div className="bg-black/40 rounded-lg shadow-lg p-6 border border-gray-700">
              <Outlet />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
