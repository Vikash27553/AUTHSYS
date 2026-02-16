import React,{useState} from 'react'
import axios from 'axios';
import { toast } from 'react-toastify'; 
import { useLocation, useNavigate } from "react-router-dom";

// In your server entry file (e.g., index.js or server.js)


function Verifyotp() {


    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState('');


    const location = useLocation();
    const navigate = useNavigate(); 

    // const navigate = Navigate();
    const handleverifyotp = async(e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/verifyotp`, { email, otp }, { headers: { 'Content-Type': 'application/json' } });
           toast.success(response.data.message || "OTP verified successfully!");
            // Optionally, you can show a success message or redirect the user after successful OTP verification
            
        }
        
        catch (error) {
            toast.error(error.response?.data?.message || "OTP verification failed. Please try again.", {
                position: "top-right",
            });
         
        } if(otp){
             navigate('/reset'); // Redirect to login after OTP verification (adjust as needed)
        }
        // Implement OTP verification logic here
    }
  return (
    <div className=" min-h-screen  w-full h-auto bg-gradient-to-br from-blue-500 to-purple-600 flex justify-center items-center p-4">

        <div className=" max-w-sm w-full bg-white rounded-2xl p-8 space-y-6 shadow-lg flex justify-center items-center">
        <form  onSubmit={handleverifyotp}>

             <h1 className=" text-3xl text-green-400 font-bold mb-2">Verify OTP</h1>

            <label className=" block text-grey-700  font-bold text-xl  mb-2 ">Enter Email</label>
            <input className=" block text-grey-700  font-bold text-xl  mb-2" type='email' value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Enter Email '></input>
            <label className=" block text-grey-700  font-bold text-xl  mb-2">Enter OTP</label>
            <input className=" block text-grey-700  font-bold text-xl  mb-2" type='text' value={otp} onChange={(e) => setOtp(e.target.value)} placeholder='Enter OTP'></input>
            <button className='bg-green-400 text-xl rounded-4xl p-3 cursor-pointer' >Submit</button>
        </form>


      </div>
    </div>
  )
}

export default Verifyotp
