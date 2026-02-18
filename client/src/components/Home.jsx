import React from "react";
import axios from "axios";




function Home() {


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
      <header>
        <nav className="mx-auto flex bg-gradient-to-r from-blue-500 to-purple-600 items-center  justify-around p-4 gap-10 relative w-full">
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


            <div className="flex items-center justify-center gap-5 mt-5">
          <button onClick={handlelogout} className="w-30 h-10 bg-yellow-600 text to-black font-bold mx-2 px-4 cursor-pointer hover:bg-yellow-300 rounded-4xl "> Logout</button>
        </div>
        </nav>

      
      </header>
    </div>
  );
}

export default Home;
