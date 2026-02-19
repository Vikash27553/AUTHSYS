import { RouterProvider } from 'react-router-dom';
import {userRouter} from './Routes/UserRouter.jsx';


function App() {
  return (
   <RouterProvider router={userRouter}/>

  )
}

export default App

