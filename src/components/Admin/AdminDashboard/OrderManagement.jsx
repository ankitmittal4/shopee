import React, { useEffect, useState } from "react";
import box_iocn from "..//..//./../Assets/box-time.svg";
import { orderListing } from "../../../features/Admin/Order/orderSlice";
import { useDispatch, useSelector } from "react-redux";
import { FaEdit, FaTrash } from "react-icons/fa";
import Loader1 from "../../Loaders/Loader1";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const orderDetails = [
  {
    id: 1,
    productInfo: {
      productName: "Wireless Headphones",
    },
    customerInfo: {
      customerName: "Rahul Sharma",
    },
    date: "2024-08-10",
    amount: 2999.99,
    quantity: 1,
    paymentMethod: "Credit Card",
    status: "Delivered",
  },
  {
    id: 2,
    productInfo: {
      productName: "Smartphone Case",
    },
    customerInfo: {
      customerName: "Anjali Verma",
    },
    date: "2024-08-11",
    amount: 499.99,
    quantity: 2,
    paymentMethod: "Debit Card",
    status: "Cancelled",
  },
  {
    id: 3,
    productInfo: {
      productName: "Laptop Stand",
    },
    customerInfo: {
      customerName: "Kunal Kapoor",
    },
    date: "2024-08-12",
    amount: 1999.99,
    quantity: 1,
    paymentMethod: "PayPal",
    status: "In Transit",
  },
  {
    id: 4,
    productInfo: {
      productName: "Bluetooth Speaker",
    },
    customerInfo: {
      customerName: "Sanya Singh",
    },
    date: "2024-08-13",
    amount: 1599.99,
    quantity: 1,
    paymentMethod: "Credit Card",
    status: "Accepted",
  },
  {
    id: 5,
    productInfo: {
      productName: "Gaming Mouse",
    },
    customerInfo: {
      customerName: "Vikram Mehta",
    },
    date: "2024-08-14",
    amount: 799.99,
    quantity: 2,
    paymentMethod: "UPI",
    status: "New Order",
  },
];

function OrderManagement() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [orders, setOrders] = useState([]);
  const dispatch = useDispatch();
  const { orderList, orderListStatus, isLoading } = useSelector(
    (state) => state.order
  );
  const navigate = useNavigate();
  useEffect(() => {
    if (orderListStatus === "idle") {
      dispatch(orderListing());
    }
  }, [dispatch, orderListStatus, orderList]);

  useEffect(() => {
    if (orderList && orderList.data) {
      setOrders(orderList.data.orders);
    }
  }, [dispatch, orderListStatus, orderList]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const [deleteOrderId, setDeleteOrderId] = useState(null);
  const [deletePopup, setShowDeletePopup] = useState(false);

  const handleDeleteButton = (id) => {
    setShowDeletePopup(!deletePopup);
    setDeleteOrderId(id);
  };
  const handleNoButton = () => {
    setShowDeletePopup(false);
    setSuccess(false);
  };

  const handleEditOrder = (id) => {
    navigate(`order-details/${id}`);
  };
  const handleDeleteOrder = async () => {
    setLoading(true);
    try {
      let headersList = {
        Authorization: localStorage.getItem("admin-token"),
      };
      let reqOptions = {
        url: "http://3.6.127.143/api/admin/order/delete",
        method: "POST",
        headers: headersList,
        data: {
          subOrderId: deleteOrderId,
        },
      };

      let response = await axios.request(reqOptions);
      const isSuccess = response.data.success;
      if (isSuccess) {
        setSuccess(true);
      }

      await dispatch(orderList());

      console.log("order deleted successfully", response);
      setLoading(false);
      setTimeout(() => {
        handleNoButton();
      }, 3000);
    } catch (error) {
      console.log("error while deleting order", error);
      setSuccess(false);
      setLoading(false);
    }
  };

  return (
    // <>
    //   <div className="ml-72 font-custom">
    //     <div className="flex justify-between items-center mb-4">
    //       <div className="text-2xl font-medium flex gap-2">
    //         <img src={box_iocn} alt="box icon" />
    //         Recent Orders
    //       </div>
    //     </div>
    //     {deletePopup && (
    //       <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
    //         <div className="bg-zinc-200 rounded-lg p-6 max-w-md mx-2 font-custom ">
    //           {!success && !loading && (
    //             <>
    //               <h2 className="text-xl font-semibold  mb-3 text-center">
    //                 Are you sure ?{" "}
    //               </h2>
    //               <h2 className="text-sm  mb-3 text-center">
    //                 You want to delete this order ?{" "}
    //               </h2>
    //               <div className="flex justify-between">
    //                 <button
    //                   onClick={() => handleNoButton()}
    //                   className="bg-green-500 text-white px-4 py-1 rounded-md hover:bg-green-600 cursor-pointer"
    //                 >
    //                   No
    //                 </button>
    //                 <button
    //                   onClick={() => handleDeleteOrder()}
    //                   className="bg-red-500 text-white px-4 py-1 rounded-md hover:bg-red-600 cursor-pointer"
    //                 >
    //                   Delete
    //                 </button>
    //               </div>
    //             </>
    //           )}
    //           {loading && (
    //             <div className="flex justify-center items-center">
    //               <Loader1 />
    //             </div>
    //           )}
    //           {!loading && success && (
    //             <p>The order has been deleted successfully</p>
    //           )}
    //         </div>
    //       </div>
    //     )}
    //     <div className="bg-white rounded-lg shadow overflow-x-auto">
    //       <table className="min-w-full divide-y divide-gray-200 bg-neutral-200">
    //         <thead>
    //           <tr>
    //             {/* <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
    //             <input type="checkbox" name="" id="" />
    //           </th> */}
    //             <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
    //               Id
    //             </th>
    //             <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
    //               Product Info
    //             </th>
    //             <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
    //               Customer Info
    //             </th>
    //             <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
    //               Date
    //             </th>
    //             <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
    //               Amount
    //             </th>
    //             <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
    //               Qty
    //             </th>
    //             <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
    //               Payment Method
    //             </th>
    //             <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
    //               Status
    //             </th>
    //             <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
    //               Action
    //             </th>
    //           </tr>
    //         </thead>
    //         {orderListStatus === "succeeded" && (
    //           <tbody className="bg-white divide-y divide-gray-200">
    //             {orders.map((order, index) => (
    //               <tr key={order.orderId}>
    //                 <td className="px-6 py-4 whitespace-nowrap">
    //                   {order.orderId.slice(0, 6)}
    //                 </td>
    //                 <td className="px-6 py-4 ">{order.productName}</td>
    //                 <td className="px-6 py-4 ">{order.customerName}</td>
    //                 <td className="px-6 py-4 ">
    //                   {formatDate(order.orderDate)}
    //                 </td>
    //                 <td className="px-6 py-4 ">₹{order.price}</td>
    //                 <td className="px-6 py-4 ">{order.quantity}</td>
    //                 <td className="px-6 py-4 ">{order.paymentMethod}</td>

    //                 <td className="px-6 py-4 whitespace-nowrap">
    //                   <div
    //                     className={`font-custom text-center px-4 py-2 rounded-md  cursor-pointer  text-white ${getStatusColor(
    //                       order.status
    //                     )}`}
    //                   >
    //                     {getStatus(order.status)}
    //                   </div>
    //                 </td>

    //                 <td className="px-6 py-4 whitespace-nowrap">
    //                   <button
    //                     onClick={() => handleEditOrder(order.subOrderId)}
    //                     className="text-blue-500 mr-2"
    //                   >
    //                     <FaEdit />
    //                   </button>
    //                   <button
    //                     onClick={() => handleDeleteButton(order.subOrderId)}
    //                     className="text-red-500"
    //                   >
    //                     <FaTrash />
    //                   </button>
    //                 </td>
    //               </tr>
    //             ))}
    //           </tbody>
    //         )}
    //       </table>
    //       {/* {customerListStatus === "succeeded" && (
    //         <Pagination
    //           totalProducts={customerList.data.total}
    //           productsPerPage={customerList.data.limit}
    //           onPageChange={handlePageChange}
    //           currentPage={currentPage}
    //         />
    //       )} */}
    //     </div>
    //   </div>
    // </>
    <>
      <div className="ml-72">Order</div>
    </>
  );
}

export default OrderManagement;

const getStatusColor = (status) => {
  switch (status) {
    case 4:
      return "bg-green-500  ";
    case 5:
      return "bg-red-500 ";
    case 3:
      return "bg-orange-500 ";
    case 1:
      return "bg-yellow-500  ";
    case 2:
      return "bg-blue-500  ";
    default:
      return "bg-gray-100  ";
  }
};
const getStatus = (status) => {
  switch (status) {
    case 4:
      return "Delivered";
    case 5:
      return "Cancelled";
    case 3:
      return "In Transit";
    case 1:
      return "New Order";
    case 2:
      return "Accepted";
    default:
      return "bg-gray-100  ";
  }
};
