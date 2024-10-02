import React from "react";
import deliveryIcon from "..//..//Assets/delieveryIcon.svg";
import { IoIosStar } from "react-icons/io";
import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
  return (
    <div className="bg-white flex w-full h-64 md:h-64 lg:h-auto p-4  border-gray-200  mb-6 shadow-[0_-5px_10px_rgba(0,0,0,0.1),_0_5px_10px_rgba(0,0,0,0.1)]">
      {/* Left: Product Image */}
      <div className="flex-shrink-0 w-1/3">
        <img
          src={product?.images[0]}
          alt={product.name}
          className="w-full h-full object-cover rounded-md p-6"
        />
      </div>

      {/* Right: Product Details */}
      <div className="flex flex-col justify-between w-2/3">
        {/* Product Info */}
        <div>
          <div className="flex justify-between items-center mb-2"></div>

          <div className="flex justify-between items-center text-gray-600 text-sm mb-0">
            <span className="text-sm">Deliver by Monday July 22</span>
            <div className="flex items-center text-green-500 text-md">
              <img
                src={deliveryIcon}
                alt="Free Delivery"
                className="w-4 h-4 mr-1"
              />
              Free Delivery
            </div>
          </div>
          <p className="text-zinc-900 font-bold mb-1 mt-3  text-2xl ">
            {product.name.length > 90
              ? product.name.slice(0, 90) + `...`
              : product.name}
          </p>
          <div className="flex items-center">
            <IoIosStar className="text-lg text-orange-500" />
            <IoIosStar className="text-lg text-orange-500" />
            <IoIosStar className="text-lg text-orange-500" />
            <IoIosStar className="text-lg text-orange-500" />
            <IoIosStar className="text-lg text-orange-500" />
            <span className="text-black text-sm pl-2 py-1 font-semibold">
              {product.rating}
            </span>
            <span className="text-gray-600 text-xs">
              ( {product.ratingCount} Ratings )
            </span>
            <span className="ml-4">Warranty: {product.warranty} Year's</span>
          </div>
          <div className="flex mt-4">
            <span className="text-4xl font-semibold  text-black">
              <span className="font-sans ">₹</span>
              {product.sellingPrice}
            </span>
            <div className="mt-2">
              <span className="text-xl text-gray-500 line-through ml-4">
                <span className="font-sans">₹</span>
                {product.mrp}
              </span>
            </div>
            <div className="border border-green-700 bg-green-50 text-green-600 rounded-full px-4 py-2 text-md  font-bold ml-6">
              <span className="">{product.discountPercentage}% off</span>
            </div>
          </div>
          <div>
            <div className="text-md font-bold mb-3 mt-5">
              <span>Category: {product.group}</span>
            </div>
            <div className="flex flex-col">
              <span>Brand: {product.brand}</span>
              <span>Color: {product.colour[0]}</span>
              <span>Storage Capacity: {product.weight}L</span>
              <span>Technology: {product.technology}</span>
              <span>Material Type: {product.finishType}</span>
            </div>
          </div>
        </div>

        {/* View Details Button */}
        <div className="text-right mt-4 ">
          <Link
            to={`/products/${product._id}`}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#A70024] text-white px-4 py-2 rounded hover:bg-red-700"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
