import React, { useEffect, useState } from "react";
import {
  FaUser,
  FaShoppingBag,
  FaCreditCard,
  FaHeart,
  FaMapMarkerAlt,
  FaSignOutAlt,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { IoIosArrowDown } from "react-icons/io";
import Wishlist from "./Wishlist";

const Sidebar = () => {
  const navigate = useNavigate();

  const [isAuthenticated, setIsAuthenticated] = useState(
    !!localStorage.getItem("auth-token")
  );
  const logout = () => {
    localStorage.removeItem("auth-token");
    setIsAuthenticated(false);
  };

  useEffect(() => {
    setIsAuthenticated(!!localStorage.getItem("auth-token"));
  }, []);

  const menuItems = [
    { label: "Profile", icon: FaUser, path: "", category: "profile" },
    {
      label: "My Orders",
      icon: FaShoppingBag,
      path: "orders",
      category: "myorder",
    },
    {
      label: "Payment",
      icon: FaCreditCard,
      path: "payment",
      category: "payment",
    },
    {
      label: "Wishlist",
      icon: FaHeart,
      path: "wishlist",
      category: "wishlist",
    },
    {
      label: "Address",
      icon: FaMapMarkerAlt,
      path: "address",
      category: "address",
    },
    { label: "Logout", icon: FaSignOutAlt, path: "/", category: "logout" },
  ];

  // const [sidebars, setSidebars] = useState({
  //   profile:false,
  //   myorders:false,
  //   payment:false,
  //   wishlist:false,
  //   address:false,
  //   logout:false
  // });

  const [selectedCategory, setSelectedCategory] = useState("profile");

  const handleSelectCategory = (selected, path, label) => {
    if (label === "Logout") {
      localStorage.removeItem("auth-token");
      setIsAuthenticated(false);
    }
    setSelectedCategory(selected);
    navigate(path);
  };

  return (
    <div className="w-full lg:w-1/4  p-4 font-custom  border border-zinc-200 h-screen">
      <ul>
        {menuItems.map((item) => (
          <li
            key={item.label}
            className={`flex items-center justify-between p-4 text-base font-normal  cursor-pointer pl-10 rounded-full   ${
              selectedCategory === item.category
                ? "bg-green-600 text-white"
                : "text-zinc-600"
            }`}
            onClick={() =>
              handleSelectCategory(item.category, item.path, item.label)
            }
          >
            <div className="flex items-center">
              <item.icon className="mr-4" />
              <span>{item.label}</span>
            </div>
            {/* <IoIosArrowDown className="mr-5" /> */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
