import React from 'react'
import { Link} from 'react-router-dom';
import logo1 from '../assets/images/logo1.png';

function Resetpassword() {
  return (
    <div>
      <div className=' min-h-screen  w-full bg-gradient-to-br from-blue-500 to-purple-600 flex justify-center items-center p-4 '>
        <div className='max-w-sm bg-white w-full rounded-xl p-8 space-y-6 shadow-lg'>
            
            {/*header section */}

            <div className=' text-center mb-4'>
                 <div>
                <img src={logo1} alt="Logo" className=" h-20 w-20 mx-auto mb-4"/>
            </div>
                <h1 className=' font-bold text-2xl text-green-400'>Reset Password </h1>
            </div>

            <div>
                <label className=' block text-gray-700 font-semibold text-xl mb-2 '>Email</label>
                <input type='email' id='useremail' placeholder='Enter Email Address'/>
            </div> 
            <div>
                <label className=' block text-gray-700 font-semibold text-xl mb-2 '>Enter New Password</label>
                <input type='password ' id='userpassword' placeholder='Enter new Password '/>
            </div>

            <div>
                <label className=' block text-gray-700 font-semibold text-xl mb-2 '>Confirm New Password</label>
                <input type='password ' id='userpassword' placeholder='Confirm new Password '/>
            </div>
            <button className=' w-full h-auto bg-green-200 hover:bg-green-500 rounded-xl cursor-pointer '>Reset Password</button>

            <div className=' text-center'>
                <p><Link to='/login' className=' text-blue-500'>Back to Login</Link></p>
            </div>


        </div>

      </div>
    </div>
  )
}

export default Resetpassword
