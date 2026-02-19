import { RouterProvider } from 'react-router-dom';
// import {UserRouter} from './Routes/UserRouter.jsx';
import { userRouter } from './Routes/userRouter.jsx';


function App() {
  return (
   <RouterProvider router={userRouter}/>

  )
}

export default App

