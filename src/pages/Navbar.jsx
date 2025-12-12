import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  
  // 1️⃣ Mobile menu toggle state
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // 2️⃣ Dashboard title based on role
  const dashboardTitle =
    user?.role === "admin" ? "Admin Dashboard" : "Employee Dashboard";

  // 3️⃣ Logout handler
  const handleLogout = () => {
    logout();
    navigate("/login");
    setIsMobileMenuOpen(false); // Close mobile menu
  };

  // 4️⃣ Toggle mobile menu
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="bg-gray-800/80 backdrop-blur-lg shadow-md border-b border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* LEFT: User Greeting */}
          <div className="flex-shrink-0">
            <h1 className="text-white text-sm sm:text-base lg:text-lg font-semibold">
              Hello, <span className="text-blue-400">{user?.name}</span>
            </h1>
          </div>

          {/* CENTER: Dashboard Title (Hidden on mobile) */}
          <div className="hidden md:block">
            <h2 className="text-gray-300 text-lg lg:text-xl font-bold tracking-wide">
              {dashboardTitle}
            </h2>
          </div>

          {/* RIGHT: Desktop Logout Button */}
          <div className="hidden md:block">
            <button
              onClick={handleLogout}
              className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg text-white font-medium 
              text-sm transition shadow hover:shadow-red-500/30"
            >
              Logout
            </button>
          </div>

          {/* MOBILE: Hamburger Button */}
          <div className="md:hidden">
            <button
              onClick={toggleMobileMenu}
              className="text-gray-300 hover:text-white focus:outline-none focus:ring-2 
              focus:ring-inset focus:ring-white p-2"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                // Close Icon (X)
                <svg
                  className="h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                // Hamburger Icon (Three lines)
                <svg
                  className="h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* MOBILE MENU (Dropdown) */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-gray-700">
          <div className="px-2 pt-2 pb-3 space-y-1">
            
            {/* Dashboard Title (Mobile) */}
            <div className="px-3 py-2">
              <p className="text-gray-300 text-center font-semibold">
                {dashboardTitle}
              </p>
            </div>

            {/* Role Badge (Mobile) */}
            <div className="px-3 py-2">
              <span className="inline-block bg-blue-500/20 text-blue-400 px-3 py-1 rounded-full text-xs">
                Role: {user?.role}
              </span>
            </div>

            {/* Logout Button (Mobile) */}
            <button
              onClick={handleLogout}
              className="w-full text-left px-3 py-2 rounded-md text-white bg-red-600 
              hover:bg-red-700 transition font-medium"
            >
              Logout
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}