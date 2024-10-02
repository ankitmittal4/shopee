import React, { useEffect, useState } from "react";
import logo from "../../Assets/logo1.png";
// import logo from "../../Assets/logo1.png";
import logout1 from "../../Assets/logout.svg";

import cartlogo from "../../Assets/Button.svg";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../features/authSlice";
import { HiOutlineMenuAlt2 } from "react-icons/hi";
import { AiOutlineUser } from "react-icons/ai";

import { CiSearch } from "react-icons/ci";
import { HashLink } from "react-router-hash-link";

const Navbar = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(
    !!localStorage.getItem("auth-token")
  );

  const navigate = useNavigate();
  const logout = () => {
    localStorage.removeItem("auth-token");
    setIsAuthenticated(false);
  };

  useEffect(() => {
    setIsAuthenticated(!!localStorage.getItem("auth-token"));
  }, [navigate]);

  const [dropdownOpen, setDropdownOpen] = useState({
    products: false,
    services: false,
    accessories: false,
  });
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleDropdown = (dropdown) => {
    setDropdownOpen((prevState) => ({
      ...prevState,
      [dropdown]: !prevState[dropdown],
    }));
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <nav className="bg-white shadow-md fixed w-full z-10 font-custom">
      <div className="container mx-auto px-4 flex justify-between items-center h-20">
        <div className="md:hidden">
          <button onClick={toggleSidebar} className="focus:outline-none">
            <HiOutlineMenuAlt2 className="text-2xl" />
          </button>
        </div>
        <div className="flex items-center">
          <img src={logo} alt="Logo" className="w-44 h-6 mb-2 ml-0" />
        </div>
        <div className="hidden md:flex space-x-6">
          <HashLink smooth to="/#home" className="hover:text-blue-600">
            Home
          </HashLink>
          <div className="relative">
            <button
              onClick={() => handleDropdown("products")}
              className="flex items-center space-x-2 hover:text-blue-600"
            >
              <Link to="/products">Products</Link>
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
              </svg>
            </button>
            {dropdownOpen.products && (
              <div className="absolute bg-white shadow-md mt-2 w-48 rounded-md">
                <a
                  href="#"
                  className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                >
                  Interior Paints
                </a>
                <a
                  href="#"
                  className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                >
                  Exterior Paints
                </a>
                <a
                  href="#"
                  className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                >
                  Enamels
                </a>
                <a
                  href="#"
                  className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                >
                  Wall Putty
                </a>
                <a
                  href="#"
                  className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                >
                  Water Proofing
                </a>
                <a
                  href="#"
                  className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                >
                  Wood Polish
                </a>
                <a
                  href="#"
                  className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                >
                  Tools and Accessories
                </a>
              </div>
            )}
          </div>
          <div className="relative">
            <button
              onClick={() => handleDropdown("services")}
              className="flex items-center space-x-2 hover:text-blue-600"
            >
              <HashLink smooth to="/#services">
                Services
              </HashLink>
              {/* <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
              </svg> */}
            </button>
            {/* {dropdownOpen.services && ( */}
            {/* <div className="absolute bg-white shadow-md mt-2 w-48 rounded-md"> */}
            {/* <HashLink smooth to="/#services">Services</HashLink> */}
            {/* <a
                  href="#"
                  className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                >
                  Accessories
                </a>
                <a
                  href="#"
                  className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                >
                  Brushes
                </a>
                <a
                  href="#"
                  className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                >
                  Rollers
                </a> */}
            {/* </div> */}
            {/* )} */}
          </div>
          <div className="relative">
            <button
              onClick={() => handleDropdown("accessories")}
              className="flex items-center space-x-2 hover:text-blue-600"
            >
              <span>Accessories</span>
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
              </svg>
            </button>
            {dropdownOpen.accessories && (
              <div className="absolute bg-white shadow-md mt-2 w-48 rounded-md">
                {/* <a
                  href="#"
                  className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                >
                  Accessories
                </a> */}
                <a
                  href="#"
                  className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                >
                  Brushes
                </a>
                <a
                  href="#"
                  className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                >
                  Rollers
                </a>
              </div>
            )}
          </div>
        </div>
        <div className="flex items-center space-x-4">
          {/* <div className="relative w-full max-w-sm">
                <input
                  className="w-4/5 sm:w-2/3 p-2 px-8 border border-white rounded-full bg-transparent outline-none"
                  placeholder="City search and select"
                />
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <SlLocationPin className="text-white" />
                </div>
              </div> */}

          <input
            type="text"
            placeholder="Search"
            className="border rounded-full px-3 py-2 focus:outline-none hidden md:block"
          />

          <Link to="/cart" className="relative">
            <img src={cartlogo} alt="" />
          </Link>
          {!isAuthenticated ? (
            <Link
              to="/signin"
              className="bg-[#A70024] text-white px-4 py-2 rounded-full hidden md:block"
            >
              Login
            </Link>
          ) : (
            <Link
              to="/profile"
              className="bg-gray-400 text-white  p-3 rounded-full"
              // onClick={() =>navigate('/profile')}
            >
              <AiOutlineUser className="text-2xl" />
            </Link>
            // <Link
            //   to="/"
            //   className="bg-green-600 text-white px-4 py-2 rounded-full"
            //   onClick={() => logout()}
            // >
            //   Logout
            // </Link>
          )}
        </div>
      </div>

      {/* Mobile Sidebar */}
      {sidebarOpen && (
        <div className="md:hidden fixed inset-0 bg-gray-800 bg-opacity-75 z-20 font-custom">
          <div className="fixed inset-y-0 left-0 bg-white w-64 p-4 z-30">
            <button onClick={toggleSidebar} className="focus:outline-none">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                ></path>
              </svg>
            </button>
            <div className="mt-4">
              <Link
                to="/"
                className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                onClick={toggleSidebar}
              >
                Home
              </Link>
              <Link
                to="/products"
                className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                onClick={toggleSidebar}
              >
                Products
              </Link>
              <Link
                to="/services"
                className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
              >
                Services
              </Link>
              <Link
                to="/accessories"
                className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
              >
                Accessories
              </Link>
              {!isAuthenticated ? (
                <Link
                  to="/signin"
                  className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                  onClick={toggleSidebar}
                >
                  Login
                </Link>
              ) : (
                <img
                  src={logout1}
                  alt=""
                  onClick={() => navigate("/profile")}
                  className="w-10 h-10 cursor-pointer"
                />
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

{
  /* <Link
  to="/"
  className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
  onClick={() => navigate("/profile")}
>
  Logout
</Link>; */
}
export default Navbar;
