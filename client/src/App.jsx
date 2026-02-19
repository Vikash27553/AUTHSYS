import { RouterProvider } from 'react-router-dom';
// import {UserRouter} from './Routes/UserRouter.jsx';
import { UserRouter } from './Routes/userRouter.jsx';


function App() {
  return (
   <RouterProvider router={UserRouter}/>

  )
}

export default App

