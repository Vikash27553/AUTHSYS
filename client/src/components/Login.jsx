import React, { useState } from "react";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import logo1 from "../assets/images/logo1.png";
import axios from "axios";
import { toast} from 'react-toastify';


function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  const location = useLocation();
  const navigate = useNavigate();





  useEffect(() => {
    // 1. Create a URLSearchParams object from the current URL
    const queryParams = new URLSearchParams(location.search);

    // 2. Check if 'verified' parameter exists and is 'true'
    if (queryParams.get("isVerfied") === "true") {
      toast.success("Email verified successfully! You can now log in.", {
        position: "top-right",
       
      });

      // 3. Clean the URL so the toast doesn't pop up again if they refresh
      navigate("/login", { replace: true });
    }
  }, [location, navigate]);

  const handleSubmit = async(e) => {
    e.preventDefault();
    try {

       const response = await axios.post(`${import.meta.env.VITE_LOCAL_API_URL}/api/login`, { email, password }, { headers: { 'Content-Type': 'application/json' } });
    
            console.log("Login successful:", response.data);
            localStorage.setItem("accessToken", response.data.accessToken);
            localStorage.setItem("refreshToken", response.data.refreshToken);

      navigate('/'); // Redirect to dashboard after successful login  
      
    } catch (error) {
      if(error.response){
        toast.error(error.response.data.message || "Login failed. Please try again.", {
          position: "top-right",
        });
      }
      
    }
    
  };
 
  // const showverifymsg =()=>{
  // toast.success("Email is verified you can login ", {  //   position: "top-right",
  // })
  // };
   const handleforget = async(e)=>{
    e.preventDefault();
    try {
         const response = await axios.post(`${import.meta.env.VITE_LOCAL_API_URL}/api/forgot`, { email }, { headers: { 'Content-Type': 'application/json' } });
        toast.success(response.data.message || "Password reset link sent! Check your email.", {
          position: "top-right",

      });
        navigate('/verifyotp'); // Redirect to login after sending reset link

    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to send password reset link.", {
        position: "top-right",
      });
    }
   }


  return (
   <div className="min-h-screen w-full bg-gradient-to-br from-blue-600 to-purple-700 flex justify-center items-center p-4 sm:p-6">
      
      {/* Main Card */}
      <div className="max-w-md w-full bg-white rounded-3xl shadow-2xl p-6 sm:p-10 transition-all">
        
        {/* Header Section */}
        <div className="text-center mb-8">
          <img src={logo1} alt="Logo" className="h-20 w-20 mx-auto mb-4 object-contain" />
          <h1 className="text-3xl font-extrabold text-gray-800 tracking-tight">
            Welcome Back
          </h1>
          <p className="text-gray-500 mt-2">Please enter your details</p>
        </div>

        {/* Form Section */}
        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* Email Field */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2 ml-1">
              Email Address
            </label>
            <input
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              value={email}
              placeholder="name@company.com"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none transition-all bg-gray-50"
              required
            />
          </div>

          {/* Password Field */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2 ml-1">
              Password
            </label>
            <input
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              value={password}
              placeholder="••••••••"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none transition-all bg-gray-50"
              required
            />
          </div>

          {/* Login Button */}
          <button 
            type="submit" 
            className="w-full bg-green-500 text-white font-bold py-3 px-4 rounded-xl hover:bg-green-600 shadow-lg shadow-green-200 active:scale-[0.98] transition-all cursor-pointer text-lg"
          >
            Sign In
          </button>

          {/* Footer Links */}
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-2 text-sm">
            <p className="text-gray-600">
              New here? <Link to="/signup" className="text-red-500 font-bold hover:underline">Create Account</Link>
            </p>
            <button 
              type="button"
              onClick={handleforget} 
              className="text-blue-600 font-semibold hover:text-blue-800 transition cursor-pointer"
            >
              Forgot Password?
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
