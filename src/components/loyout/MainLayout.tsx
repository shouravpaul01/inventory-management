
import { Outlet } from "react-router-dom";
import Header from "../ui/Header";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const MainLayout = () => {
  return (
    <div className="my-container">
      <Header />
      <Outlet />
      <ToastContainer />
    </div>
  );
};

export default MainLayout;
