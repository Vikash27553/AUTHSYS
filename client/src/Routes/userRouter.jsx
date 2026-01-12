import { createBrowserRouter } from "react-router-dom";
import Login from "../components/Login.jsx";
import Home from "../components/Home.jsx";
import Signup from "../components/Signup.jsx";
import Resetpassword from "../components/Resetpassword.jsx";
import About from "../components/About.jsx";
import Contactus from "../components/Contactus.jsx";  



const userRouter = createBrowserRouter([
  {
    path: "/",
    element: <Home />
  },
  {
    path: "/login",
    element: <Login />
  },
 

{
    path: "/signup",
    element: <Signup />
  },
{
    path: "/reset",
    element: <Resetpassword />
  }
  ,
  {
    path: '/about',
    element: <About />
  },
  {
    path: '/contact',
    element: <Contactus />
  }
  // Add more routes here...
]);

export { userRouter };
