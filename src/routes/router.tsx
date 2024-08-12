import { createBrowserRouter } from "react-router-dom";
import LoginPage from "../pages/auth/LoginPage";
import MainLayout from "../components/loyout/MainLayout";
import HomePage from '../pages/home/HomePage'
import FacultyPage from '../pages/faculty/FacultyPage'
import UserPage from "../pages/user/UserPage";


 const router = createBrowserRouter([
  {
    path:"/",
    element:<MainLayout/>,
    children:[
      {
      path:"/",
      element:<HomePage />
      },
      {
      path:"/users",
      element:<UserPage />
      },
      {
      path:"/faculty",
      element:<FacultyPage />
      }
    ]
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  
]);
export default router