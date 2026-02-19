import React from 'react'
import logo1 from '../assets/images/logo1.png';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom'; 
import { toast } from 'react-toastify';

function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const showtoastmsg = () => {
    toast.info("Signup successful", { position: "top-right" });
    toast.success("Verify your email to continue ", { position: "top-right" });
  }

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${import.meta.env.VITE_LOCAL_API_URL}/api/register`,
        { name, email, password },
        { headers: { 'Content-Type': 'application/json' } }
      );
      showtoastmsg();
      console.log("Signup successful:", response.data);
      setName('');
      setEmail('');
      setPassword('');
      navigate('/login');
    } catch (error) {
      console.error("Error during signup:", error.response?.data || error.message);
      toast.error(error.response?.data?.message || "Signup failed. Please try again.", {
        position: "top-right",
      });
    }
  };

  return (
    <div className='min-h-screen w-full bg-gradient-to-br from-blue-600 to-purple-700 flex justify-center items-center p-4 sm:p-6'>
      <section className='max-w-md w-full bg-white rounded-3xl shadow-2xl p-6 sm:p-10 transition-all'>
        <form onSubmit={handleSubmit} className="space-y-5">
          
          <div className='text-center mb-6'>
            <img src={logo1} alt="Logo" className="h-20 w-20 mx-auto mb-4 object-contain" />
            <h1 className='text-3xl text-gray-800 font-extrabold tracking-tight'>Create Account</h1>
            <p className="text-gray-500 mt-2">Join us today!</p>
          </div>

          <div>
            <label className='block text-gray-700 font-semibold mb-2 ml-1' htmlFor='username'>Full Name</label>
            <input 
              onChange={(e) => setName(e.target.value)} 
              type='text' 
              value={name} 
              id='username' 
              placeholder='Enter your full name' 
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none transition-all bg-gray-50"
              required 
            />
          </div>

          <div> 
            <label className='block text-gray-700 font-semibold mb-2 ml-1' htmlFor='useremail'>Email</label>
            <input 
              onChange={(e) => setEmail(e.target.value)} 
              type='email' 
              value={email} 
              id='useremail' 
              placeholder='Enter Email Address'
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none transition-all bg-gray-50"
              required
            />
          </div>

          <div>
            <label className='block text-gray-700 font-semibold mb-2 ml-1' htmlFor='userPassword'>Password</label>
            <input 
              onChange={(e) => setPassword(e.target.value)} 
              type="password" 
              value={password} 
              id="userPassword" 
              placeholder="Enter Password" 
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none transition-all bg-gray-50"
              required
            />
          </div>

          <button 
            type="submit"
            className='w-full bg-green-500 hover:bg-green-600 text-white text-lg font-bold py-3 rounded-xl shadow-lg shadow-green-100 cursor-pointer active:scale-95 transition-all mt-2'
          >
            Sign Up 
          </button>

          <div className='text-center pt-2'>
            <p className='text-sm text-gray-600'>
              Already have an account?{' '}
              <Link to='/login' className='text-blue-600 font-bold hover:underline'>
                Login
              </Link>
            </p>
          </div>
        </form>
      </section>
    </div>
  )
}

export default Signup;