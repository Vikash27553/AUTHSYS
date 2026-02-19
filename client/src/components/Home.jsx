import React from "react";
import axios from "axios";




function Home() {
const handleAccount = (e) => {
  e.preventDefault();
  window.location.href = "/signup";
}


const handlelogout = async (e) => {
  e.preventDefault();
  try {
    // 1. Match the key to what you saved in Login!
    const token = localStorage.getItem("accessToken"); 
    
    console.log("Token sent to logout:", token); 

    await axios.post(
      `${import.meta.env.VITE_LOCAL_API_URL}/api/logout`,
      {}, 
      { 
        headers: { 
          'Authorization': `Bearer ${token}` 
        } 
      }
    );

    // 2. Clean up both tokens
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
   
    window.location.href = "/login";
    console.log("Logout successful");
  } catch (error) {
    console.error("Logout failed:", error.response?.data || error.message);
  }
};

  return (
    <div>
      <header className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100 ">
        <nav className="mx-auto min-w-full  flex bg-gradient-to-r from-blue-500 to-purple-600 items-center  justify-around p-4 gap-10 relative w-full">
          {/* <img src={logo} className='h-10  w-10 left-15 top-2 z-10  absolute'/> */}
          <ul className="flex  text-white  gap-10">
            <li>
              {" "}
              <a href="/"> Home </a>
            </li>
            <li>
              {" "}
              <a href="/about"> About </a>
            </li>
            <li>
              {" "}
              <a href="/contact"> Contact </a>
            </li>
          </ul>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8 px-4">
  <button 
    onClick={handleAccount} 
    className="w-full sm:w-auto min-w-[160px] h-11 bg-yellow-600 text-black font-bold py-2 px-6 cursor-pointer hover:bg-yellow-500 transition-colors rounded-full shadow-md active:scale-95"
  >
    Create Account
  </button>
  
  <button 
    onClick={handlelogout} 
    className="w-full sm:w-auto min-w-[120px] h-11 border-2 border-yellow-600 text-yellow-700 sm:bg-yellow-600 sm:text-black font-bold py-2 px-6 cursor-pointer hover:bg-yellow-500 sm:border-none transition-colors rounded-full shadow-sm active:scale-95"
  >
    Logout
  </button>
</div>

        </nav>

      
      </header>
    </div>
  );
}

export default Home;
