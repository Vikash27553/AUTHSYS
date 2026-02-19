import React from 'react'
import logo1 from '../assets/images/logo1.png';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; 
import { toast} from 'react-toastify';


function Signup() {

const[name, setName] = useState('');
const[email, setEmail] =useState('');
const[password,setPassword] =useState('');

const showtoastmsg =()=>{
  toast.info("Signup successful", {
    position: "top-right",
  });
  toast.success("Verify your email to continue ", {
    position: "top-right",

  })
}


const navigate = useNavigate();
const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const response = await axios.post(`${import.meta.env.VITE_LOCAL_API_URL}/api/register`,
    // Send plain object directly - no JSON.stringify needed
      { name, email, password },  // 2nd param: request body (plain object)
      { 
        headers: { 'Content-Type': 'application/json' }  // 3rd param: config object
      }
    );
    showtoastmsg();
    console.log("Signup successful:", response.data);
    setName('');
    setEmail('');
    setPassword('');
    
    navigate('/login');
     // Redirect to login page after successful signup
  } catch (error) {

    console.error("Error during signup:", error.response?.data || error.message);
    toast.error(error.response?.data?.message || "Signup failed. Please try again.", {
      position: "top-right",
    });
  }
};




return (
    
    <div className=' min-h-screen  bg-gradient-to-br from-blue-500 to-purple-600 flex justify-center items-center p-4'>
      <section className=' max-w-sm w-full bg-white rounded-2xl shadow-xl p-8 space-y-6'>
        <form onSubmit={handleSubmit}>
        <div className=' text-center'>
           <div>
                <img src={logo1} alt="Logo" className=" h-20 w-20 mx-auto mb-4"/>
            </div>
          <h1 className=' text-3xl text-green-300 font-bold'>Signup Page</h1>
        </div>
        <div>
          <label className=' block text-gray-700 font-semibold mb-2' htmlFor='username'>Full Name</label>
          <input  onChange={(e)=> setName(e.target.value)}type='text' value={name} id='username'placeholder='Enter your full name text' required />
       
        </div>

        <div> 
          <label className='block text-grey-300 font-bold' > Email</label>
          <input onChange={(e)=> setEmail(e.target.value)} type='email' value={email} id='useremail' placeholder='Enter Email Address'></input>
        </div>

        <div>
          <label className='block text-grey-700 font-semibold mb-2' >Enter Password </label>
          <input onChange={(e)=> setPassword(e.target.value)} type="password" value={password} id="userPassword" placeholder="Enter Password" ></input>
        </div>

        {/*signup button*/}
        <button className='w-full bg-green-100 hover:bg-green-500 text-xl font-bold  rounded-xl cursor-pointer'>Sign Up </button>


        {/*button for already account and forget password */}

        <div className='flex items-center justify-between'>
          <p><a href='/login' className=' text-sm  gap-0.5'>Alreday have an Acoount ? <span className='text-red-500'>login</span> </a></p>
        </div>
         </form>
      </section>
      
    </div>
  )
}

export default Signup
