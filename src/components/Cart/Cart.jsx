import React, { useEffect, useState } from "react";
import deliveryIcon from "..//../Assets/delieveryIcon.svg";
import container from "..//../Assets/Container.png";
import { useDispatch, useSelector } from "react-redux";
import {
  getcartItemList,
  updateItemQuantity,
} from "../../features/CartCred/cartSlice";
import Loader1 from "../Loaders/Loader1";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [image, setImage] = useState();
  const dispatch = useDispatch();
  const { cartProducts, cartLaoding, error, cartStatus } = useSelector(
    (state) => state.cartItemlist
  );
  const { updatedData, quantityStatus } = useSelector(
    (state) => state.updateCartItem
  );

  // useEffect(() => {
  //   if (quantityStatus === "idle") {
  //     updateItemQuantity({
  //       cartProductId: "66a690101b6717e65d73c883",
  //       quantity: 14,
  //     });
  //   }
  // }, [quantityStatus]);

  // console.log(updatedData);

  const customer = {
    name: "John Doe",
    pincode: "123456",
    address: "123 Main St, City, Country",
  };

 

  const handleQuantityChange = (id, delta) => {
    setCartItems((prevItems) =>
      prevItems.map((item) => {
        if (item._id === id) {
          const newQuantity = item.quantity + delta;
          if (newQuantity >= 1) {
            dispatch(
              updateItemQuantity({
                cartProductId: id,
                quantity: newQuantity,
              })
            );
            return { ...item, quantity: newQuantity };
          }
        }
        return item;
      })
    );
  };

  // const handlePlusMius = (item, delta) => {
  //   if (item.quantity > 0) {
  //     handleQuantityChange(item.id, delta);
  //   }
  //   return;
  // };

  const calculateTotalPrice = () => {
    return cartItems.reduce(
      (total, item) => total + item?.sellingPrice * item?.quantity,
      0
    );
  };

  const calculateTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  {
    /*searching the particular item for cart with id */
  }

  useEffect(() => {
    if (cartStatus === "idle") {
      dispatch(getcartItemList());
    }
  }, [dispatch, cartStatus]);

  
  // console.log(cartStatus);

  useEffect(() => {
    if (cartProducts && cartProducts?.data?.products) {
      const newdata = cartProducts?.data?.products;
      setCartItems(newdata);

      const newImages = newdata.map((item) => item.images?.[0]);
      // setImage(newImages);

      // console.log(image);
    }
  }, [dispatch, cartStatus,cartProducts?.data?.products?.quantity]);

  // useEffect(() => {
  //   if (cartProducts && cartProducts?.data?.products?.images) {
  //     const newdata = cartProducts?.data?.products;

  //     setImage(newdata?.images[0]);
  //   }
  // }, [dispatch, cartStatus]);

  
  

  return (
    <>
      {cartStatus === "succeeded" ? (
        <div className="flex flex-col lg:flex-row lg:justify-between p-4 bg-gray-10 pt-24">
          <div className="w-full lg:w-3/4">
            <div className="flex items-center justify-between py-2 px-4 bg-zinc-300/40 rounded-full mb-4 font-custom">
              <span>
                Deliver to {customer.name} - {customer.pincode}
              </span>
              <button className="bg-green-500 text-white px-3 py-2 rounded-full">
                CHANGE
              </button>
            </div>

            {cartItems.map((item) => (
              <div
                key={item?._id}
                className="bg-white p-4 rounded-lg shadow-md mb-4"
              >
                <div className="flex">
                  <div className="w-2/5 md:w-1/4 md:p-6">
                    <img
                      src={item?.images[0]}
                      alt={item?.name}
                      className="w-full rounded-lg"
                    />
                    <div className="flex justify-center items-center md:mt-2 space-x-4 h-full md:h-auto ">
                      <button
                        onClick={() => {
                          handleQuantityChange(item?._id, -1);
                        }}
                        className="bg-zinc-200 text-zinc-600 rounded-full px-3 py-1"
                        disabled={item.quantity <= 1}
                      >
                        -
                      </button>
                      <span>{item.quantity}</span>
                      <button
                        onClick={() => {
                          handleQuantityChange(item?._id, 1);
                        }}
                        className="bg-green-500 text-white rounded-full px-3 py-1"
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <div className="w-3/4 pl-4 font-custom md:p-4">
                    <h3 className="text-xl font-semibold">{item?.name}</h3>
                    <table className="table-auto text-left mt-2 mb-4 text-zinc-600 w-full md:w-96 ">
                      <tbody>
                        <tr>
                          <td className="pr-4 font-semibold">Brand</td>
                          <td>{item.brand}</td>
                        </tr>
                        <tr>
                          <td className="pr-4 font-semibold">Color</td>
                          <td>{item.colour}</td>
                        </tr>
                        <tr>
                          <td className="pr-4 font-semibold">Finish Type</td>
                          <td>{item.finishType}</td>
                        </tr>
                        <tr>
                          <td className="pr-4 font-semibold">Size</td>
                          <td>{item.quantity}</td>
                        </tr>
                      </tbody>
                    </table>
                    <div className="flex md:justify-between items-center">
                      <div className="md:gap-0 flex ">
                        <p className="text-base line-through text-red-600 ">
                          ₹{item.mrp}
                        </p>
                        <p className="text-2xl font-semibold text-zinc-600 ml-6">
                          ₹{item.sellingPrice}
                        </p>
                      </div>
                      <span className="hidden md:block border border-amber-400 bg-amber-50 text-amber-400 rounded-full px-2 py-1 text-sm font-bold">
                        {item.discountPercentage}% off
                      </span>
                    </div>
                    <div className="flex flex-col md:justify-between md:items-center md:flex-row mt-2">
                      <p className="text-sm text-gray-600">Delivered By:</p>
                      <div className="flex items-center text-green-500">
                        <img
                          src={deliveryIcon}
                          alt="Free Delivery"
                          className="w-4 h-4 mr-1"
                        />
                        Free Delivery
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="w-full lg:w-1/4  mt-4 lg:mt-0 lg:ml-4 space-y-4 font-custom">
            <div className="bg-zinc-300/40 p-6 rounded-lg shadow-md space-y-3">
              <h3 className="text-lg mb-4 text-zinc-600 border-b-2 border-zinc-300 pb-2">
                PRICE DETAILS
              </h3>
              <div className="flex justify-between text-base mb-2">
                <span className="text-zinc-600">
                  Price ({calculateTotalItems()} items)
                </span>
                <span className="text-xl font-semibold text-zinc-600">
                  ₹{calculateTotalPrice()}
                </span>
              </div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-zinc-600">Discount</span>
                <span className="text-xl font-medium text-green-600">
                  - ₹{calculateTotalItems() * 500}
                </span>{" "}
                {/* Example discount calculation */}
              </div>
              <div className="flex justify-between text-sm mb-2 border-b-2 border-zinc-300 pb-2">
                <span className="text-zinc-600 ">Delivery Charges</span>
                <span className="text-xl font-medium text-green-600">Free</span>
              </div>
              <div className="flex justify-between text-xl font-semibold mb-4 text-zinc-600">
                <span>TOTAL AMOUNT</span>
                <span>
                  ₹{calculateTotalPrice() - calculateTotalItems() * 500}
                </span>
              </div>
            </div>
            <button className=" bg-orange-400 text-xl font-semibold text-white py-3 rounded-full w-full">
              PROCEED TO PAY
            </button>
          </div>
        </div>
      ) : (
        <div className="flex justify-center items-center h-96">
          <Loader1 />
        </div>
      )}
    </>
  );
};

export default Cart;
