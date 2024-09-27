import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  FaTachometerAlt,
  FaProductHunt,
  FaListAlt,
  FaUsers,
  FaCog,
} from "react-icons/fa";
import { TbSmartHome } from "react-icons/tb";
import { IoPersonAddOutline } from "react-icons/io5";
import { LuArrowUpDown } from "react-icons/lu";
import { IoSettingsOutline } from "react-icons/io5";
import { HiArrowsUpDown } from "react-icons/hi2";
import down from "..//..//./../Assets/downArrow.png";
import home from "..//..//./../Assets/home.png";
import product from "..//..//./../Assets/product.png";
import customer from "..//..//./../Assets/customer.png";
import dealer from "..//..//./../Assets/dealer.png";
import order from "..//..//./../Assets/order.png";
import setting from "..//..//./../Assets/setting.png";
import profile from "..//..//./../Assets/profile.png";
import logout1 from "../../../Assets/logout.svg";
import { useNavigate } from "react-router-dom";
import { logout } from "../../../features/Admin/adminAuthSlice";
import { useDispatch } from "react-redux";

const AdminSidebar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [sidebars, setSidebars] = useState({
    dashboard: false,
    projectmanagement: true,
    ordermanagement: false,
    dealermanagement: false,
    customermanagement: false,
    setting: false,
  });
  const handleLogout = () => {
    dispatch(logout());
    navigate("/adminlogin");
  };

  const [selectedCategory, setSelectedCategory] = useState("");

  const handleSelectCategory = (selected) => {
    setSelectedCategory(selected);
  };

  return (
    <div className="text-white w-[21rem] space-y-6 py-7 fixed h-full font-custom top-16 left-0 px-3 bg-[#A70024] flex flex-col justify-between">
      <div>
        <nav>
          <Link
            to="/admin-dashboard"
            className={`text-white block py-2.5 px-6 transition duration-200 hover:bg-[#7F0019] hover:rounded-lg mb-2 ${
              selectedCategory === "dashboard" &&
              "bg-[#7F0019] rounded-lg text-white"
            }`}
            onClick={() => handleSelectCategory("dashboard")}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                {/* <TbSmartHome className="inline-block mr-2 text-2xl" /> */}
                <img
                  src={home}
                  alt="Logo"
                  className="inline-block mr-2 text-2xl"
                />
                Dashboard
              </div>
            </div>
          </Link>

          <Link
            to="/product-management"
            className={`text-white block py-2.5 px-6  transition duration-200 hover:bg-[#7F0019] hover:rounded-lg mb-2 ${
              selectedCategory === "projectmanagement" &&
              "bg-[#7F0019] rounded-lg text-white"
            }`}
            onClick={() => handleSelectCategory("projectmanagement")}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                {/* <IoPersonAddOutline className="inline-block mr-2 text-2xl font-light" /> */}
                <img
                  src={product}
                  alt="Logo"
                  className="inline-block mr-2 text-2xl"
                />
                Product Management
              </div>
              <img src={down} alt="Logo" className="w-6 h-6" />
            </div>
          </Link>
          <Link
            to="/order-management"
            className={`text-white block py-2.5 px-6  transition duration-200 hover:bg-[#7F0019] hover:rounded-lg mb-2 ${
              selectedCategory === "ordermanagement" &&
              "bg-[#7F0019] rounded-lg text-white"
            }`}
            onClick={() => handleSelectCategory("ordermanagement")}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                {/* <HiArrowsUpDown className="inline-block mr-2 text-2xl" /> */}
                <img
                  src={order}
                  alt="Logo"
                  className="inline-block mr-2 text-2xl"
                />
                Order Management
              </div>
              <img src={down} alt="Logo" className="w-6 h-6" />
            </div>
          </Link>
          <Link
            to="/dealer-management"
            className={`text-white block py-2.5 px-6  transition duration-200 hover:bg-[#7F0019] hover:rounded-lg mb-2 ${
              selectedCategory === "dealermanagement" &&
              "bg-[#7F0019] rounded-lg text-white"
            }`}
            onClick={() => handleSelectCategory("dealermanagement")}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                {/* <IoPersonAddOutline className="inline-block mr-2 text-2xl" /> */}
                <img
                  src={dealer}
                  alt="Logo"
                  className="inline-block mr-2 text-2xl"
                />
                Dealer/Franchise Management
              </div>
              <img src={down} alt="Logo" className="w-6 h-6" />
            </div>
          </Link>
          <Link
            to="/customer-management"
            className={`text-white block py-2.5 px-6  transition duration-200 hover:bg-[#7F0019] hover:rounded-lg mb-2 ${
              selectedCategory === "customermanagement" &&
              "bg-[#7F0019] rounded-lg text-white"
            }`}
            onClick={() => handleSelectCategory("customermanagement")}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                {/* <IoPersonAddOutline className="inline-block mr-2 text-2xl" /> */}
                <img
                  src={customer}
                  alt="Logo"
                  className="inline-block mr-2 text-2xl"
                />
                Customer Management
              </div>
              <img src={down} alt="Logo" className="w-6 h-6" />
            </div>
          </Link>
          <Link
            to="/settings"
            className={`text-white block py-2.5 px-6  transition duration-200 hover:bg-[#7F0019] hover:rounded-lg mb-2 ${
              selectedCategory === "setting" &&
              "bg-[#7F0019] rounded-lg text-white"
            }`}
            onClick={() => handleSelectCategory("setting")}
          >
            {/* <IoSettingsOutline className="inline-block mr-2 text-2xl" /> */}
            <img
              src={setting}
              alt="Logo"
              className="inline-block mr-2 text-2xl"
            />
            Settings
          </Link>
        </nav>
      </div>
      <div className="relative flex items-center px-6 py-3 border-t border-[#7F0019]">
        <img
          src={profile}
          alt="Profile"
          className="w-12 h-12 rounded-md mr-4 mb-8"
        />
        <div className="text-white mb-8">
          <p className="font-semibold">Smith John</p>
          <p className="text-sm text-red-300">Admin Account</p>
        </div>

        <div className="absolute bottom-3 right-3 mb-9">
          <img
            src={logout1}
            alt="Logout"
            onClick={handleLogout}
            className="w-10 h-10 cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
};

export default AdminSidebar;
