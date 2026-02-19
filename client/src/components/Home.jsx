import React, { useState, useEffect } from "react";
import axios from "axios";

function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false); // Toggle for mobile menu

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    setIsLoggedIn(!!token);
  }, []);

  const handleAccount = () => (window.location.href = "/signup");

  const handlelogout = async (e) => {
    e.preventDefault();
    if (!isLoggedIn) {
      alert("Please login first!");
      window.location.href = "/login";
      return;
    }
    try {
      const token = localStorage.getItem("accessToken");
      await axios.post(`${import.meta.env.VITE_LOCAL_API_URL}/api/logout`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      localStorage.clear();
      window.location.href = "/login";
    } catch (err) {
      localStorage.clear();
      window.location.href = "/login";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100">
      <header className="relative w-full">
        {/* Navigation Bar */}
        <nav className="bg-gradient-to-r from-blue-600 to-purple-700 p-4 shadow-lg">
          <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between">
            
            {/* Logo / Brand */}
            <div className="text-white font-bold text-xl">AUTHSYS</div>

            {/* Hamburger Button (Visible only on Mobile) */}
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="sm:hidden text-white focus:outline-none p-2"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                )}
              </svg>
            </button>

            {/* Menu Links & Buttons */}
            <div className={`${isMenuOpen ? "flex" : "hidden"} sm:flex flex-col sm:flex-row w-full sm:w-auto items-center gap-6 mt-4 sm:mt-0 transition-all duration-300`}>
              
              <ul className="flex flex-col sm:flex-row items-center gap-6 text-white font-medium">
                <li><a href="/" className="hover:text-yellow-300 transition">Home</a></li>
                <li><a href="/about" className="hover:text-yellow-300 transition">About</a></li>
                <li><a href="/contact" className="hover:text-yellow-300 transition">Contact</a></li>
              </ul>

              <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto border-t sm:border-none border-blue-400 pt-4 sm:pt-0">
                {!isLoggedIn && (
                  <button 
                    onClick={handleAccount}
                    className="w-full sm:w-auto bg-yellow-500 text-black font-bold py-2 px-6 rounded-full hover:bg-yellow-400 active:scale-95 transition shadow-md cursor-pointer"
                  >
                    Create Account
                  </button>
                )}
                <button 
                  onClick={handlelogout}
                  className={`w-full sm:w-auto font-bold py-2 px-6 rounded-full active:scale-95 transition shadow-md cursor-pointer ${
                    isLoggedIn ? "bg-red-500 text-white hover:bg-red-600" : "bg-white/20 text-white hover:bg-white/30"
                  }`}
                >
                  Logout
                </button>
              </div>

            </div>
          </div>
        </nav>
      </header>
      
      {/* Page Content */}
      <main className="p-10 text-center">
         <h1 className="text-3xl font-bold text-gray-800">Welcome to the Dashboard</h1>
      </main>
    </div>
  );
}

export default Home;