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

const AdminSidebar = () => {
  const [sidebars, setSidebars] = useState({
    dashboard: false,
    projectmanagement: true,
    ordermanagement: false,
    dealermanagement: false,
    customermanagement: false,
    setting: false,
  });

  const [selectedCategory, setSelectedCategory] = useState("");

  const handleSelectCategory = (selected) => {
    setSelectedCategory(selected);
  };

  return (
    <div
      className="text-white w-[21rem] space-y-6 py-7 fixed h-full font-custom top-16 left-0 px-3 bg-[#A70024]"
      // style={{ backgroundColor: "#A70024" }}
    >
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
              <TbSmartHome className="inline-block mr-2 text-2xl" />
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
              <IoPersonAddOutline className="inline-block mr-2 text-2xl font-light" />
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
              <HiArrowsUpDown className="inline-block mr-2 text-2xl" />
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
              <IoPersonAddOutline className="inline-block mr-2 text-2xl" />
              Dealer Management
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
              <IoPersonAddOutline className="inline-block mr-2 text-2xl" />
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
          <IoSettingsOutline className="inline-block mr-2 text-2xl" />
          Settings
        </Link>
      </nav>
    </div>
  );
};

export default AdminSidebar;
