import React from 'react'
import logo1 from '../assets/images/logo1.png';

function Signup() {
  return (
    <div className=' min-h-screen  bg-gradient-to-br from-blue-500 to-purple-600 flex justify-center items-center p-4'>
      <section className=' max-w-sm w-full bg-white rounded-2xl shadow-xl p-8 space-y-6'>
        <div className=' text-center'>
           <div>
                <img src={logo1} alt="Logo" className=" h-20 w-20 mx-auto mb-4"/>
            </div>
          <h1 className=' text-3xl text-green-300 font-bold'>Signup Page</h1>
        </div>

        <div>
          <label className=' block text-gray-700 font-semibold mb-2' htmlFor='username'>Full Name</label>
          <input type='text' id='username'placeholder='Enter your full name text' required />
        </div>

        <div> 
          <label className='block text-grey-300 font-bold' > Email</label>
          <input type='email' id='useremail' placeholder='Enter Email Address'></input>
        </div>

        <div>
          <label className='block text-grey-700 font-semibold mb-2' >Enter Password </label>
          <input type="password " id="userPassword" placeholder="Enter Password"></input>
        </div>

        {/*signup button*/}
        <button className='w-full bg-green-100 hover:bg-green-500 text-xl font-bold  rounded-xl cursor-pointer'>Sign Up </button>


        {/*button for already account and forget password */}

        <div className='flex items-center justify-between'>
          <p><a href='/login' className=' text-sm  gap-0.5'>Alreday have an Acoount ? <span className='text-red-500'>login</span> </a></p>
        </div>
      </section>
      -
    </div>
  )
}

export default Signup
