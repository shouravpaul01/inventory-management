import {  NavLink, useLocation, useNavigate,  } from "react-router-dom";
import { FaAngleDown, FaAngleUp, FaArrowRightFromBracket, FaBars, FaBoxOpen, FaCubesStacked, FaHouse, FaRegCircleUser,  } from "react-icons/fa6";
import React, { useState } from "react";
import julogo from '/ju-logo-big.png'

import InputSearch from "./InputSearch";



const Header = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const queryParams = new URLSearchParams(location.search);
    const candidateUser = null
    const [isOpenDropdown, setIsOpenDropdown] = useState(false)
    const [searchInputValue, setSearchInputValue] = useState(queryParams.get("search") || "");


    
const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (searchInputValue == "") {
      return;
    }
    // navigate(`/products?search=${encodeURIComponent(searchInputValue)}`);
  };
   

    // Sidebar hide when  Mobile menu item click
    const handleSidebarClose = () => {
        document.getElementById('my-drawer-3').checked = false
    }

    const handleLogout = () => {
      
    };



    const authNav = <>
        <li>
            <div className="dropdown dropdown-bottom dropdown-end text-black">
                <label tabIndex={0} onClick={() => setIsOpenDropdown(!isOpenDropdown)} className={`mx-0 md:mx-2 flex items-center  justify-center gap-8 border border-violet-200 rounded-full text-white p-1`}>
                    {/* <div className="avatar">
                        <div className="w-7 rounded-full">
                            <img src={''} alt="profile" width={28} height={28} />
                        </div>
                        
                    </div> */}
                    <FaRegCircleUser className="text-lg" />
                    <span className="pe-1">{isOpenDropdown ? <FaAngleDown /> : <FaAngleUp />}</span></label>
                {
                    isOpenDropdown && <ul tabIndex={0} onClick={() => setIsOpenDropdown(!isOpenDropdown)} className="dropdown-content z-[1] menu-item p-2 shadow bg-base-100 border-e border-indigo-400 animate-custom mt-3 w-52 ">
                        <li>
                            <NavLink to={`${candidateUser ? '/user/setting' : 'dashboard'}`} className={({ isActive }) => isActive ? 'menu-item-active' : ''}><FaHouse /> Dashboard</NavLink>
                        </li>
                        <li>
                            <NavLink to={'/my-accessories'} className={({ isActive }) => isActive ? 'menu-item-active' : ''}><FaCubesStacked /> My-Accessories</NavLink>
                        </li>
                        <li>
                            <NavLink to={'/my-accessories'} onClick={() => handleLogout()} ><FaArrowRightFromBracket />Logout</NavLink>

                        </li>
                        
                    </ul>
                }
            </div>
        </li>
    </>

    const navLink = <ul className="flex flex-col md:flex-row md:items-center md:justify-center gap-3 md:gap-1 pe-2 text-white">
        <li className="pe-8"><form onSubmit={handleSearchSubmit} className="w-64 ">
                    <InputSearch
                      className="input-sm rounded-full"
                      setSearchValue={setSearchInputValue}
                      value={searchInputValue}
                      onChange={(e) => setSearchInputValue(e.target.value)}
                    />
                  </form></li>
        <li className="nav nav-item"><NavLink to={'/'} className={({ isActive }) => isActive ? 'nav-item nav-active-link ' : ''} onClick={() => handleSidebarClose()}>Home</NavLink></li>
        <li className="nav  nav-item"><NavLink to={'/my-order'} className={({ isActive }) => isActive ? 'nav-item nav-active-link ' : ''}>My-Order</NavLink></li>

        {
            authNav
        }
        <li className="flex items-center justify-center"><NavLink to={'/confirm-accessories'} className="indicator" >
            {
                <span className="indicator-item badge badge-secondary px-1 ">{0}</span>
            }

            <div className="text-[22px] text-white"><FaBoxOpen /></div>
        </NavLink></li>
    </ul>




    return (
        <>
            <header className="px-0 my-container ">

                <div className="drawer">
                    <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
                    <div className="drawer-content border-t-2 border-violet-500">
                        {/* Navbar */}
                        <div className="relative md:flex hidden">

                            <div className="md:flex hidden  ps-1">
                                <div className='relative z-10'>
                                    <div className="bg-white w-[100px] h-[100px] rounded-full">

                                    </div>
                                    <div className='w-24 h-24 absolute top-[2px] left-[2px] border-2 border-dotted border-violet-800 rounded-full animate-spin p-4'>
                                    </div>
                                    <img src={julogo} className='w-16 absolute top-3 left-5 opacity-85' alt="ju-logo" />
                                </div>
                                <div className="flex absolute left-[72px] top-6 ">
                                    <div className="parallelogram-clip-path w-[340px] ps-10 py-[6px] font-bold align-middle">
                                        <p className="text-lg md:text-[22px] text-violet-800">Jahangirnagar University</p>
                                        <p className="">Inventory Management</p>
                                    </div>
                                </div>
                            </div>
                            <div className=" absolute top-[70px] w-full h-10 flex  justify-end  bg-violet-700 rounded-md border-b md:border-none border-violet-800  ">

                                {/* Navbar menu content here */}
                                {navLink}


                            </div>
                        </div>
                        <div className="my-5 space-x-2">
                        
                        <NavLink to={"/users"} className={({ isActive }) => isActive ? 'btn btn-sm btn-primary' : 'btn btn-sm btn-outline btn-primary'}>Users</NavLink>
                        <NavLink to={"/faculty"} className={({ isActive }) => isActive ? 'btn btn-sm btn-primary' : 'btn btn-sm btn-outline btn-primary'}>Faculty</NavLink>
                        <NavLink to={"/categories"} className={({ isActive }) => isActive ? 'btn btn-sm btn-primary' : 'btn btn-sm btn-outline btn-primary'}>Categories</NavLink>
                        <NavLink to={"/sub-categories"} className={({ isActive }) => isActive ? 'btn btn-sm btn-primary' : 'btn btn-sm btn-outline btn-primary'}>Sub Categories</NavLink>
                        </div>
                        {/* Mobile menu Navbar */}
                        <div className="w-full flex lg:hidden justify-center items-center">
                            <div className="flex-none  ">
                                <label htmlFor="my-drawer-3" aria-label="open sidebar" >
                                    <FaBars className="text-xl" />
                                </label>
                            </div>

                            <div className="flex justify-center items-center  ps-1">
                                <div className='relative z-10'>
                                    <div className="bg-white w-[90px]  h-[90px]  rounded-full">

                                    </div>
                                    <div className='w-[82px] h-[82px]  absolute top-1 md:top-[2px] left-1 md:left-[2px] border-2 border-dotted border-violet-800 rounded-full animate-spin p-4'>
                                    </div>
                                    <img src={julogo} className='w-14 absolute top-3 left-4  opacity-85' alt="ju-logo" />
                                </div>
                                <div className="flex -ms-9">
                                    <div className="parallelogram-clip-path w-[280px]  ps-10 py-1 font-bold align-middle">
                                        <p className="text-lg  text-violet-800">Jahangirnagar University</p>
                                        <p className="">Inventory Management</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Mobile menu */}

                    <div className="drawer-side z-50 md:hidden">
                        <label htmlFor="my-drawer-3" aria-label="close sidebar" className="drawer-overlay"></label>
                        <ul className="flex flex-col gap-3 p-4 w-80 min-h-full bg-violet-700">
                            {/* Sidebar content here */}

                            {navLink}
                        </ul>
                    </div>
                </div>
            </header>

        </>
    );
};

export default Header;
