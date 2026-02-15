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

       const response = await axios.post("http://localhost:8080/api/login", { email, password }, { headers: { 'Content-Type': 'application/json' } });
    
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
         const response = await axios.post('http://localhost:8080/api/forgot', { email }, { headers: { 'Content-Type': 'application/json' } });
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
    <div className=" min-h-screen  w-full h-auto bg-gradient-to-br from-blue-500 to-purple-600 flex justify-center items-center p-4">
      <div className="  max-w-sm w-full bg-white rounded-2xl p-8 space-y-8">
        <form onSubmit={handleSubmit}>
          <div className="text-center mb-4">
            <div>
              <img src={logo1} alt="Logo" className=" h-20 w-20 mx-auto mb-4" />
            </div>
            <h1 className=" text-3xl text-green-500 font-bold mb-2 space-y-6">
              {" "}
              Login page{" "}
            </h1>
          </div>

          <form>
            <div>
              <label className=" block text-grey-700  font-bold text-xl  mb-2">
                Email
              </label>
              <input
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                value={email}
                id=" useremail"
                placeholder="Enter Email Address"
                required
              ></input>
            </div>

            <div>
              <label className=" block text-grey-700  font-bold text-xl mb-2">
                Password
              </label>
              <input
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                value={password}
                id=" userpassword"
                placeholder="Enter Password "
                required
              ></input>
            </div>

            <button onClick={handleSubmit} className=" w-full text-xl  rounded-xl bg-green-200 mt-2 mb-2 hover:bg-green-500  cursor-pointer">
              Login
            </button>

            <div className=" flex justify-evenly items-center gap-5">
              <p>
                <Link to="/signup">
                  New user <span className=" text-red-500">signup ? </span>
                </Link>
              </p>
              <p>
                
                 <button onClick={handleforget}> <span className=" text-blue-500 cursor-pointer">Forget Password ? </span> </button>
                
              </p>
            </div>
          </form>
        </form>
      </div>
    </div>
  );
}

export default Login;
