import React from 'react'
import { Link} from 'react-router-dom';
import logo1 from '../assets/images/logo1.png';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate} from 'react-router-dom';



function Resetpassword() {

 const [email, setEmail] = useState('');
 const [newPassword, setNewPassword] = useState('');
 const [confirmPassword, setConfirmPassword] = useState('');

    const navigate = useNavigate();

 const handleResetPassword = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8080/api/reset", { email, newPassword, confirmPassword });
      alert(response.data.message || "Password reset successfully!");
        navigate('/login'); // Redirect to login after successful password reset

    } catch (error) {
      alert(error.response?.data?.message || "Failed to reset password.");
    }
  };

  return (
    <div>
      <div className=' min-h-screen  w-full bg-gradient-to-br from-blue-500 to-purple-600 flex justify-center items-center p-4 '>
        <div className='max-w-sm bg-white w-full rounded-xl p-8 space-y-6 shadow-lg'>
            
            {/*header section */}
            <form onSubmit={handleResetPassword}>

            <div className=' text-center mb-4'>
                 <div>
                <img src={logo1} alt="Logo" className=" h-20 w-20 mx-auto mb-4"/>
            </div>
                <h1 className=' font-bold text-2xl text-green-400'>Reset Password </h1>
            </div>

            <div>
                <label className=' block text-gray-700 font-semibold text-xl mb-2 '>Email</label>
                <input type='email' id='useremail' value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Enter Email Address'/>
            </div> 
            <div>
                <label className=' block text-gray-700 font-semibold text-xl mb-2 '>Enter New Password</label>
                <input type='password ' id='userpassword' value={newPassword} onChange={(e) => setNewPassword(e.target.value)} placeholder='Enter new Password '/>
            </div>

            <div>
                <label className=' block text-gray-700 font-semibold text-xl mb-2 '>Confirm New Password</label>
                <input type='password ' id='userpassword' value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder='Confirm new Password '/>
            </div>
            <button className=' w-full h-auto bg-green-200 hover:bg-green-500 rounded-xl cursor-pointer '>Reset Password</button>

            <div className=' text-center'>
                <p><Link to='/login' className=' text-blue-500'>Back to Login</Link></p>
            </div>
            </form>


        </div>

      </div>
    </div>
  )
}

export default Resetpassword
