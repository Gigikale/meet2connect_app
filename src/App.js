import './App.css';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function App() {
  const router = createBrowserRouter ([
    {
      path: "/signup",
      element: < SignUp />
    },
    {
      path: "/login",
      element: <Login />
    }
  ])
  return (
    <div className='App'>
      <ToastContainer />
      <RouterProvider router = {router} />
    </div>
  );
}

export default App;
