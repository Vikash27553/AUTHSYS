import { RouterProvider } from 'react-router-dom';
import {UserRouter} from './Routes/UserRouter.jsx';


function App() {
  return (
   <RouterProvider router={UserRouter}/>

  )
}

export default App

