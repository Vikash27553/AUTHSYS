import { RouterProvider } from 'react-router-dom';
import {userRouter} from '../src/Routes/userRouter.jsx';

function App() {
  return (
   <RouterProvider router={userRouter}/>

  )
}

export default App

