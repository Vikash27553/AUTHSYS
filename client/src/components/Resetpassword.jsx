import React from 'react'
import { Link } from 'react-router-dom';
import logo1 from '../assets/images/logo1.png';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Resetpassword() {
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const navigate = useNavigate();

  const handleResetPassword = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${import.meta.env.VITE_LOCAL_API_URL}/api/reset`, { email, newPassword, confirmPassword });
      alert(response.data.message || "Password reset successfully!");
      navigate('/login'); 
    } catch (error) {
      alert(error.response?.data?.message || "Failed to reset password.");
    }
  };

  return (
    <div className='min-h-screen w-full bg-gradient-to-br from-blue-600 to-purple-700 flex justify-center items-center p-4 sm:p-6'>
      <div className='max-w-md w-full bg-white rounded-3xl shadow-2xl p-6 sm:p-10 transition-all'>
        
        <form onSubmit={handleResetPassword} className="space-y-5">
          {/* Header Section */}
          <div className='text-center mb-6'>
            <img src={logo1} alt="Logo" className="h-20 w-20 mx-auto mb-4 object-contain" />
            <h1 className='font-extrabold text-3xl text-gray-800 tracking-tight'>Reset Password</h1>
            <p className="text-gray-500 mt-2 text-sm">Create a strong new password for your account</p>
          </div>

          <div>
            <label className='block text-gray-700 font-semibold mb-2 ml-1' htmlFor='useremail'>Email</label>
            <input 
              type='email' 
              id='useremail' 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              placeholder='Enter Registered Email'
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none transition-all bg-gray-50"
              required
            />
          </div> 

          <div>
            <label className='block text-gray-700 font-semibold mb-2 ml-1' htmlFor='newpassword'>New Password</label>
            <input 
              type='password' 
              id='newpassword' 
              value={newPassword} 
              onChange={(e) => setNewPassword(e.target.value)} 
              placeholder='••••••••'
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none transition-all bg-gray-50"
              required
            />
          </div>

          <div>
            <label className='block text-gray-700 font-semibold mb-2 ml-1' htmlFor='confirmpassword'>Confirm Password</label>
            <input 
              type='password' 
              id='confirmpassword' 
              value={confirmPassword} 
              onChange={(e) => setConfirmPassword(e.target.value)} 
              placeholder='••••••••'
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none transition-all bg-gray-50"
              required
            />
          </div>

          <button 
            type="submit"
            className='w-full bg-green-500 hover:bg-green-600 text-white text-lg font-bold py-3 rounded-xl shadow-lg shadow-green-100 cursor-pointer active:scale-95 transition-all mt-2'
          >
            Update Password
          </button>

          <div className='text-center pt-2'>
            <Link to='/login' className='text-blue-600 font-bold hover:underline transition-all text-sm'>
              Back to Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Resetpassword;