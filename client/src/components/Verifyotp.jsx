import React, { useState } from 'react'
import axios from 'axios';
import { toast } from 'react-toastify'; 
import { useLocation, useNavigate } from "react-router-dom";

function Verifyotp() {
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState('');

    const location = useLocation();
    const navigate = useNavigate(); 

    const handleverifyotp = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${import.meta.env.VITE_LOCAL_API_URL}/api/verifyotp`, { email, otp }, { headers: { 'Content-Type': 'application/json' } });
            toast.success(response.data.message || "OTP verified successfully!");
        }
        catch (error) {
            toast.error(error.response?.data?.message || "OTP verification failed. Please try again.", {
                position: "top-right",
            });
        } 
        
        if (otp) {
            navigate('/reset'); 
        }
    }

    return (
        <div className="min-h-screen w-full bg-gradient-to-br from-blue-600 to-purple-700 flex justify-center items-center p-4 sm:p-6">
            <div className="max-w-md w-full bg-white rounded-3xl shadow-2xl p-8 sm:p-10 transition-all">
                <form onSubmit={handleverifyotp} className="space-y-6">
                    
                    <div className="text-center mb-8">
                        <h1 className="text-3xl font-extrabold text-gray-800 tracking-tight">Verify OTP</h1>
                        <p className="text-gray-500 mt-2 text-sm">Please enter the code sent to your email</p>
                    </div>

                    <div>
                        <label className="block text-gray-700 font-semibold mb-2 ml-1">Email Address</label>
                        <input 
                            type='email' 
                            value={email} 
                            onChange={(e) => setEmail(e.target.value)} 
                            placeholder='Enter Registered Email'
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none transition-all bg-gray-50"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700 font-semibold mb-2 ml-1">Enter OTP</label>
                        <input 
                            type='text' 
                            value={otp} 
                            onChange={(e) => setOtp(e.target.value)} 
                            placeholder='6-digit code'
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none transition-all bg-gray-50 text-center tracking-widest font-bold"
                            required
                        />
                    </div>

                    <button 
                        type="submit"
                        className='w-full bg-green-500 hover:bg-green-600 text-white text-lg font-bold py-3 rounded-xl shadow-lg shadow-green-100 cursor-pointer active:scale-95 transition-all mt-4'
                    >
                        Verify & Proceed
                    </button>

                    <div className="text-center pt-2">
                        <button 
                            type="button" 
                            onClick={() => navigate('/login')}
                            className="text-sm text-blue-600 font-semibold hover:underline"
                        >
                            Back to Login
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Verifyotp;