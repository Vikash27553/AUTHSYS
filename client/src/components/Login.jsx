import React from "react";
import { Link} from 'react-router-dom';
import logo1 from '../assets/images/logo1.png';
function Login() {

return (
    <div className=" min-h-screen  w-full h-auto bg-gradient-to-br from-blue-500 to-purple-600 flex justify-center items-center p-4">
        <div className="  max-w-sm w-full bg-white rounded-2xl p-8 space-y-8">
            <div className="text-center mb-4">
                 <div>
                <img src={logo1} alt="Logo" className=" h-20 w-20 mx-auto mb-4"/>
            </div>
                <h1 className=" text-3xl text-green-500 font-bold mb-2 space-y-6"> Login page </h1>
            </div>
           
             <form >
                <div>
                    <label className=" block text-grey-700  font-bold text-xl  mb-2">Email</label>
                    <input type="email" id=" useremail" placeholder="Enter Email Address" required ></input>
                </div>

                 <div>
                    <label className=" block text-grey-700  font-bold text-xl mb-2">Password</label>
                    <input type="password" id=" userpassword" placeholder="Enter Password " required></input>
                </div>

                <button className=" w-full text-xl  rounded-xl bg-green-200 mt-2 mb-2 hover:bg-green-500  cursor-pointer">Login</button>

                <div className=" flex justify-evenly items-center gap-5">
                    <p><Link to="/signup">New user <span className=" text-red-500">signup ? </span> </Link></p>
                    <p><Link to ='/reset'><span className=" text-blue-500">Forget Password ? </span> </Link></p>
                </div>
                 
             </form>



        </div>
      

    </div>
)




    
  
  
}

export default Login
