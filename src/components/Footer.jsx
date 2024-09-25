import React from "react";
import logo from "../Assets/logo.svg";
import facebook from '../Assets/facebook.svg';
import Twitter from '../Assets/twitter.svg';
import LinkedIn from '../Assets/linkedin.svg';

const Footer = () => {
  return (
    <footer className="bg-white py-10 font-custom text-neutral-500">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-[35%_65%] gap-4 md:gap-0">
          {/* First Section */}
          <div className="border border-neutral-200 p-4 flex items-center justify-center">
            <div>
              <img src={logo} alt="Logo" className="w-24 mb-4 mx-auto md:mx-0" />
              <div className="flex flex-col md:flex-row items-center mb-4 gap-4">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="p-2 rounded-full focus:outline-none border border-neutral-200 w-full md:w-auto"
                />
                <button className="bg-green-500 text-white py-2 px-4 rounded-full w-full md:w-auto">
                  Subscribe
                </button>
              </div>
              <div className="text-center md:text-left">
                <h4 className="font-bold mb-2">Contact</h4>
                <div className="flex flex-col md:flex-row gap-6">
                  <p>123-456-7890</p>
                  <p>info@paintplus.com</p>
                </div>
              </div>
            </div>
          </div>

          {/* Second Section */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 p-4 md:p-10 border border-neutral-200">
            <div>
              <h4 className="font-bold mb-2">Home</h4>
              <ul>
                <li>
                  <a href="#" className="hover:underline">About Us</a>
                </li>
                <li>
                  <a href="#" className="hover:underline">Contact Us</a>
                </li>
                <li>
                  <a href="#" className="hover:underline">Blog</a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-2">Categories</h4>
              <ul>
                <li>
                  <a href="#" className="hover:underline">Interior Paints</a>
                </li>
                <li>
                  <a href="#" className="hover:underline">Exterior Paints</a>
                </li>
                <li>
                  <a href="#" className="hover:underline">Primers</a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-2">Categories</h4>
              <ul>
                <li>
                  <a href="#" className="hover:underline">Interior Paints</a>
                </li>
                <li>
                  <a href="#" className="hover:underline">Exterior Paints</a>
                </li>
                <li>
                  <a href="#" className="hover:underline">Primers</a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-2">Service</h4>
              <ul>
                <li>
                  <a href="#" className="hover:underline">Consultation</a>
                </li>
                <li>
                  <a href="#" className="hover:underline">Color Matching</a>
                </li>
                <li>
                  <a href="#" className="hover:underline">Delivery</a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Third Section */}
        <div className="mt-8 border-t border-neutral-200 pt-4">
          <div className="flex flex-col md:flex-row justify-between items-center mb-4 px-4 md:px-24">
            <div className="mb-4 md:mb-0">
              <a href="#" className="hover:underline">Terms & Conditions</a>{" "}
              |
              <a href="#" className="hover:underline"> Privacy Policy</a>
            </div>
            <div className="flex space-x-4 mb-4 md:mb-0">
              <a href="#">
                <img src={facebook} alt="Facebook" className="w-8 h-8" />
              </a>
              <a href="#">
                <img src={Twitter} alt="Twitter" className="w-8 h-8" />
              </a>
              <a href="#">
                <img src={LinkedIn} alt="LinkedIn" className="w-8 h-8" />
              </a>
            </div>
            <div>
              <p className="text-sm text-center md:text-left">© 2024 Paintplus. All rights reserved.</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
