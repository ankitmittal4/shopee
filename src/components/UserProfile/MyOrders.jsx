import React, { useEffect, useState } from "react";
import productImage from '../../Assets/container2.png'
const products = [
  {
    id: 1,
    name: "Granotone Spray Grade Speaker Cabinet Texture Coating BLACK Functional Wall Paint  (800 ml)Product ",
    image:productImage,
    quantity: 2,
    sellingPrice: 500,
    status: "Delivered",
    date: "2023-08-04",
  },
  {
    id: 2,
    name: "Product Granotone Spray Grade Speaker Cabinet Texture Coating BLACK Functional Wall Paint  (800 ml)",
    image:productImage,
    quantity: 1,
    sellingPrice: 1000,
    status: "On the way",
    date: "2023-08-05",
  },
  {
    id: 3,
    name: "Product Granotone Spray Grade Speaker Cabinet Texture Coating BLACK Functional Wall Paint  (800 ml)",
    image:productImage,
    quantity: 1,
    sellingPrice: 1000,
    status: "Cancelled",
    date: "2023-08-05",
  },
  {
    id: 4,
    name: "Product Granotone Spray Grade Speaker Cabinet Texture Coating BLACK Functional Wall Paint  (800 ml)",
    image:productImage,
    quantity: 1,
    sellingPrice: 1000,
    status: "Returned",
    date: "2023-08-05",
  },
  // Add more products as needed
];

const ProductCard = ({ product }) => {
  return (
    <div className="flex flex-col sm:flex-row border rounded-lg p-4 mb-4 bg-white shadow-md font-custom ">
      <div className="bg-neutral-100 rounded-lg border border-zinc-200 mr-4">

      <img
        src={product.image}
        alt={product.name}
        className="w-32 h-32 object-cover  mb-4 sm:mb-0"
      />
      </div>
      <div className="flex-1">
        <h3 className="text-base font-normal mb-2 lg:w-3/4">{product.name}</h3>
        <div className="flex gap-4">
          <p className="text-zinc-500">{product.quantity}L</p>
          <p className="text-neutral-600 font-semibold ">₹{product.sellingPrice}</p>
        </div>
      </div>
      <div className="flex flex-col justify-between items-end">
        <span
          className={`px-4 py-2 rounded-full hover:scale-105 cursor-pointer  ${getStatusColor(
            product.status
          )}`}
        >
          {product.status}
        </span>
        <p className="text-gray-500 text-sm mt-2">{product.date}</p>
      </div>
    </div>
  );
};

const getStatusColor = (status) => {
  switch (status) {
    case "Delivered":
      return "bg-green-100 border border-green-500 text-green-500";
    case "On the way":
      return "bg-yellow-100 border border-yellow-500 text-yellow-500";
    case "Cancelled":
      return "bg-red-100 border border-red-500 text-red-500";
    case "Returned":
      return "bg-gray-100 border border-gray-500 text-gray-500";
    default:
      return "bg-gray-100 border border-gray-500 text-gray-500";
  }
};

const MyOrders = () => {
  const [filteredProducts, setFilteredProducts] = useState([]);

  const [filter, setFilter] = useState("All");

  useEffect(() => {
    const filteredProductss = products.filter((product) => {
      if (filter === "All") {
        return true;
      }
      return product.status === filter;
    });

    setFilteredProducts(filteredProductss);
  }, [filter, filteredProducts]);

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };
  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        {/* <h2 className="text-lg">Account / My Orders</h2> */}
        <h2 className="text-xl font-semibold mb-4">Account/My Orders</h2>
        <select
          className="border px-2 py-1 rounded-md"
          id="filter"
          value={filter}
          onChange={handleFilterChange}
        >
          <option value="All">Sort by</option>
          <option value="On the way">On the way</option>
          <option value="Delivered">Delivered</option>
          <option value="Cancelled">Cancelled</option>
          <option value="Returned">Returned</option>
        </select>
      </div>
      <div className="grid gap-4">
        {/* Mock order list */}
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
        {/* Repeat above div for each order */}
      </div>
    </div>
  );
};

export default MyOrders;
