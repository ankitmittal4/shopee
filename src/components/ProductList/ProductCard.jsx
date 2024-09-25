import React from "react";
// import productImage from '..//../Assets/Container.png'; // Replace with actual path to product image
// import offerTag from '../path/to/offerTag.svg'; // Replace with actual path to offer tag image
import deliveryIcon from "..//..//Assets/delieveryIcon.svg";
import { IoIosStar } from "react-icons/io"; // Replace with actual path to delivery icon image
import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
  return (
    <div className="bg-white  p-2 max-w-xs md:max-w-sm lg:max-w-md font-custom">
      <Link
        to={`/products/${product._id}`}
        // state={{ product }}
        // key={index}
        target="_blank"
        rel="noopener noreferrer"
      >
        <div className="relative bg-neutral-100 rounded-lg border border-zinc-200 ">
          <img
            src={product?.images[0]}
            alt={product.name}
            className="w-full object-cover"
          />
        </div>

        <div className="p-2">
          <div className="flex justify-between items-center mb-2">
            <div className="border border-amber-400 bg-amber-50 text-amber-400 rounded-full px-2 py-1 text-xs font-bold">
              {product.discountPercentage}% off
            </div>
            <div className="flex items-center">
              <IoIosStar className="text-sm text-green-600" />
              <span className=" text-black text-sm pl-2 py-1 rounded-full mr-2 font-semibold">
                {product.rating}
              </span>
              <span className="text-gray-600 text-xs">
                ( {product.ratingCount} Ratings )
              </span>
            </div>
          </div>

          <p className="text-zinc-900 font-semibold mb-1 truncate">
            {product.name}
          </p>
          <div className="flex justify-between items-center text-gray-600 text-sm mb-2">
            <span>{product.quantity} L</span>
            <div className="flex items-center text-green-500">
              <img
                src={deliveryIcon}
                alt="Free Delivery"
                className="w-4 h-4 mr-1"
              />
              Free Delivery
            </div>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-2xl font-semibold text-zinc-900">
            ₹{product.sellingPrice}
            </span>
            <span className="text-sm text-red-600 line-through ">
            ₹{product.mrp}
            </span>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;
