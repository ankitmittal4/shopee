import React from "react";
import logo from "../../../Assets/logo1.png";
import profile_icon from "../../../Assets/profile.svg";
import notificaion_iocn from "../../../Assets/notification.svg";
import logout1 from "../../../Assets/logout.svg";
import search1 from "..//..//./../Assets/search.png";
import { FaBell, FaUser } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../../../features/Admin/adminAuthSlice";
import { useDispatch } from "react-redux";

const AdminNavbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = () => {
    dispatch(logout());
    navigate("/adminlogin");
  };
  return (
    <nav className="bg-white  fixed w-full z-10 font-custom flex justify-between items-center p-4">
      <div className="flex items-center">
        <img src={logo} alt="Logo" className="w-44 h-6 mb-2 ml-3" />
      </div>
      <div className="flex items-center space-x-5">
        <div className="relative w-full">
          <img
            src={search1}
            alt="Logo"
            className="absolute left-3 top-1/2 transform -translate-y-1/2 w-3 h-3"
          />
          <input
            type="text"
            placeholder="Search"
            className="border rounded-full pl-7 pr-3 py-2 focus:outline-none w-96 border-gray-300"
          />
        </div>
        <img src={notificaion_iocn} alt="" className="w-10 h-10" />
        <img src={profile_icon} alt="" className="w-10 h-10" />
        <img
          src={logout1}
          alt=""
          onClick={handleLogout}
          className="w-10 h-10 cursor-pointer"
        />
        {/* <button
          className="bg-green-600 text-white px-4 py-2 rounded-full"
          onClick={handleLogout}
        >
          Logout
        </button> */}
      </div>
    </nav>
  );
};

export default AdminNavbar;
