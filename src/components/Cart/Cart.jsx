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
      console.log("newdata: ", newdata);
      setCartItems(newdata);

      const newImages = newdata.map((item) => item.images?.[0]);
      // setImage(newImages);

      // console.log(image);
    }
  }, [dispatch, cartStatus, cartProducts?.data?.products?.quantity]);

  // useEffect(() => {
  //   if (cartProducts && cartProducts?.data?.products?.images) {
  //     const newdata = cartProducts?.data?.products;

  //     setImage(newdata?.images[0]);
  //   }
  // }, [dispatch, cartStatus]);

  const steps = [1, 2, 3];
  const labels = ["Address", "Summary", "Payment"];
  const currentStep = 1;

  return (
    <>
      {cartStatus === "succeeded" ? (
        <div className="flex flex-col lg:flex-row lg:justify-between p-4 bg-gray-10 pt-24">
          <div className="w-full lg:w-3/4">
            <div className="flex items-center justify-between py-2 px-4 rounded-full mb-4 font-custom ml-16">
              <section className="flex flex-col whitespace-nowrap max-w-[849px]">
                <div className="flex flex-wrap gap-2.5 justify-center items-center self-center w-full text-2xl text-white max-w-[824px] min-h-[47px] max-md:max-w-full">
                  {steps.map((step, index) => (
                    <React.Fragment key={index}>
                      <div
                        className={`flex items-center justify-center self-stretch px-5 my-auto rounded-lg h-[47px] rotate-[1.6081230200044232e-16rad] w-[47px] ${
                          index < currentStep ? "bg-[#A70024]" : "bg-zinc-400"
                        }`}
                      >
                        <span>{step}</span>
                      </div>
                      {index < steps.length - 1 && (
                        <div
                          className={`flex grow shrink self-stretch my-auto h-1 rounded-xl min-w-[240px] w-[314px] ${
                            index < currentStep ? "bg-[#A70024]" : "bg-zinc-400"
                          }`}
                        />
                      )}
                    </React.Fragment>
                  ))}
                </div>
                {/* <ProgressLabels labels={labels} /> */}
                <div className="flex flex-wrap gap-5 justify-between mt-1.5 w-full text-lg text-center text-zinc-900 max-md:max-w-full">
                  {labels.map((label, index) => (
                    <div key={index}>{label}</div>
                  ))}
                </div>
              </section>
              {/* <span>
                Deliver to {customer.name} - {customer.pincode}
              </span>
              <button className="bg-green-500 text-white px-3 py-2 rounded-full">
                CHANGE
              </button> */}
            </div>

            {/* <section className="flex relative flex-col items-center pt-2.5 pb-20 bg-white rounded-lg border border-solid border-zinc-400 max-w-[852px]">
              <header className="flex z-0 pr-20 w-full text-xl text-black whitespace-nowrap rounded-none max-md:pr-5 max-md:max-w-full">
                <div className="flex shrink basis-auto grow-0">
                  <div className="ml-10">Product</div>
                  <div className="ml-20">Price</div>
                  <div className="ml-10">Quantity</div>
                  <div className="ml-70">Subtotal</div>
                </div>
              </header>
              <div className="flex z-0 flex-col mt-2.5 max-w-full w-[813px]">
                {cartItems.map((product) => (
                  <article className="flex flex-col w-full rounded-xl max-md:max-w-full">
                    <div className="flex z-10 flex-wrap gap-5 justify-between w-full max-md:-mr-0.5 max-md:max-w-full">
                      <div className="flex gap-3 items-center text-xl text-black">
                        <img
                          loading="lazy"
                          src={product.images[0]}
                          alt={product.name}
                          className="object-contain shrink-0 self-stretch my-auto aspect-[0.99] w-[97px]"
                        />
                        <div className="self-stretch my-auto">
                          {product.name.length > 15
                            ? product.name.slice(0, 15)
                            : product.name}
                        </div>
                      </div>
                      <div className="flex gap-10 items-center my-auto max-md:max-w-full">
                        <div className="gap-1 self-stretch my-auto text-xl text-black whitespace-nowrap">
                          ₹{product.sellingPrice}
                        </div>
                        <div className="flex justify-center items-center self-stretch p-2 text-xl text-center text-black whitespace-nowrap bg-white border border-solid border-zinc-400 rounded-[166px]">
                          <button
                            aria-label="Decrease quantity"
                            className="object-contain shrink-0 self-stretch my-auto rounded-none aspect-square w-[33px]"
                          >
                            <img
                              src="https://cdn.builder.io/api/v1/image/assets/TEMP/f65c720cb9e9fa7e97056b041dd7784d117ef45c079bc699cf19f8e49daaf7e7?placeholderIfAbsent=true&apiKey=50465c6614934414afb216301fa69ff8"
                              alt=""
                              className="w-full h-full"
                            />
                          </button>
                          <div className="self-stretch my-auto w-[39px]">1</div>
                          <button
                            aria-label="Increase quantity"
                            className="object-contain shrink-0 self-stretch my-auto rounded-none aspect-square w-[33px]"
                          >
                            <img
                              src="https://cdn.builder.io/api/v1/image/assets/TEMP/c40249be29c89e94a885654dcdf384ca8e857abe2410b6a904d52c15686514df?placeholderIfAbsent=true&apiKey=50465c6614934414afb216301fa69ff8"
                              alt=""
                              className="w-full h-full"
                            />
                          </button>
                        </div>
                        <div className="gap-1 self-stretch my-auto text-xl text-black whitespace-nowrap">
                          ₹{product.mrp}
                        </div>
                        <button
                          aria-label="Remove item"
                          className="flex gap-3.5 items-center self-stretch py-2 pr-2 pl-2 my-auto bg-rose-800 rounded-md h-[31px] w-[31px]"
                        >
                          <img
                            src="https://cdn.builder.io/api/v1/image/assets/TEMP/a9f633674f0df01065322a67dea6b7c57ce5836d66a0a7508860d670e95e0354?placeholderIfAbsent=true&apiKey=50465c6614934414afb216301fa69ff8"
                            alt=""
                            className="object-contain w-4 aspect-square"
                          />
                        </button>
                      </div>
                    </div>
                    <div className="shrink-0 mt-3 h-px border border-solid border-zinc-400 max-md:max-w-full" />
                  </article>
                ))}
              </div>
              <button className="absolute bottom-3.5 self-start px-8 py-3.5 max-w-full text-xl text-white bg-rose-800 rounded-md h-[57px] right-[18px] w-[242px] max-md:px-5">
                Continue Shopping
              </button>
            </section> */}

            {/* {cartItems.map((item) => (
              <div
                key={item?._id}
                className="bg-white p-4 rounded-lg shadow-md mb-4"
              >
                <div className="flex">
                  <div className="w-2/5 md:w-1/4 md:p-6">

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
                          <td>{item.colour[0].hexCode}</td>
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
            ))} */}
          </div>
          <div className="w-full lg:w-1/4  mt-4 lg:mt-0 lg:ml-4 space-y-4 font-custom">
            <section className="flex flex-col px-6 pt-3.5 pb-20 text-xl bg-white rounded-lg border border-solid border-neutral-200 max-w-[404px]">
              <h2 className="text-zinc-900">Cart Total</h2>
              <div className="flex flex-col mt-8 w-full h-40">
                <div
                  className={`flex gap-10 justify-between items-center py-3 w-full whitespace-nowrap bg-white`}
                >
                  <div className="self-stretch my-auto text-neutral-600">
                    SubTotal
                  </div>
                  <div className="self-stretch my-auto text-zinc-900">
                    <span className="font-sans">₹</span>2150
                  </div>
                </div>
                <div
                  className={`flex gap-10 justify-between items-center py-3 w-full whitespace-nowrap bg-white`}
                >
                  <div className="self-stretch my-auto text-neutral-600">
                    Shipping
                  </div>
                  <div className="self-stretch my-auto text-zinc-900">
                    <span className="font-sans">₹</span>2150
                  </div>
                </div>
                <div
                  className={`flex gap-10 justify-between items-center py-3 w-full whitespace-nowrap bg-white`}
                >
                  <div className="self-stretch my-auto text-neutral-600">
                    Total
                  </div>
                  <div className="self-stretch my-auto text-zinc-900">
                    <span className="font-sans">₹</span>2150
                  </div>
                </div>
                <button className="flex gap-2.5 justify-center items-center px-6 py-2.5 w-full bg-[#A70024] rounded-md mt-3">
                  <img
                    loading="lazy"
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/f0356f9899a54905a5151d259c2fd51a100e96a5bb2fe3c491ead985780307a0?placeholderIfAbsent=true&apiKey=50465c6614934414afb216301fa69ff8"
                    className="object-contain shrink-0 self-stretch my-auto w-7 aspect-square"
                    alt=""
                  />
                  <span className="self-stretch my-auto text-white text-md">
                    Check Out
                  </span>
                </button>
              </div>
            </section>
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

{
  /* <div className="bg-zinc-300/40 p-6 rounded-lg shadow-md space-y-3">
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
            </button> */
}
