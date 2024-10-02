import React, { useEffect, useState } from "react";
// import container from "../../Assets/Container.png";
// import container2 from "../../Assets/Container.png";
// import container3 from "../../Assets/Card1.png";
import deliveryIcon from "../../Assets/delieveryIcon.svg";
import addToCartIcon from "../../Assets/addtocart.svg";
import buyNowIcon from "../../Assets/buynow.svg";
import productCard from "../../Assets/Container.png";

import { IoIosStar } from "react-icons/io";
import CardContainer from "../Homepage/CardContainer";
import { useParams } from "react-router-dom";

import ColorPickerPopup from "./ColorPickerPopup";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProductDetails,
  fetchProducts,
} from "../../features/productSlice";
import { addItem } from "../../features/CartCred/cartSlice";
import Loader1 from "../Loaders/Loader1";

const cards = [
  {
    image: productCard,
    offer: "20% OFF",
    caption: "Product 1",
    rate: "$15.99",
    notOfferedPrice: "$19.99",
  },
  {
    image: productCard,
    offer: "10% OFF",
    caption: "Product 2",
    rate: "$22.99",
    notOfferedPrice: "$24.99",
  },
  // Add more cards as needed
];

const ProductDetail = () => {
  const [searchResult, setSearchResult] = useState(null);
  const [selectedImage, setSelectedImage] = useState(undefined);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const dispatch = useDispatch();
  const { detail, detailError, detailStatus, Images } = useSelector(
    (state) => state.productDetails
  );
  const { cartItems, statusbar } = useSelector((state) => state.addcartItem);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const params = useParams();
  const id = params.id;

  const [cartData, setCartData] = useState({
    productId: "",
    dealerId: "",
    quantity: "",
  });

  const addtocart = () => {
    dispatch(addItem(cartData));
  };

  // Fetch product details when `id` changes
  useEffect(() => {
    if (detailStatus === "idle" && id) {
      dispatch(fetchProductDetails(id));
    }
  }, [dispatch, detailStatus, id]);

  // Update searchResult when `detail` updates
  useEffect(() => {
    if (detail && detail.data && id) {
      const newdata = detail.data;
      setSearchResult(newdata);
    }
  }, [detail, id]);

  // Separate useEffect to log or track changes to searchResult
  useEffect(() => {
    if (searchResult) {
      console.log("Updated searchResult: ", searchResult);
      setSelectedImage(searchResult?.images[0]); // Optionally set the image
    }
  }, [searchResult]);

  // Update cartData when searchResult and detailStatus are available
  useEffect(() => {
    if (detailStatus === "succeeded" && searchResult?.dealer?._id) {
      setCartData({
        productId: id,
        dealerId: searchResult.dealer._id,
        quantity: 6,
      });
    }
  }, [detailStatus, searchResult, id]);

  console.log("Cart Data: ", cartData);
  return (
    <>
      {detailStatus === "loading" && <Loader1 />}
      {detailStatus === "succeeded" ? (
        <div className="container mx-auto p-4 px-8 pt-24">
          <div className="grid grid-cols-1  md:flex  gap-8">
            {/* Left Side: Product Images */}
            <div className="w-[40%]">
              <div className="mb-4 p-4 bg-neutral-100 rounded-2xl">
                <img
                  src={selectedImage}
                  alt="Selected"
                  className="w-full object-cover rounded-lg"
                />
              </div>
              <div className="flex space-x-2 justify-center">
                {searchResult?.images.map((img, index) => (
                  <img
                    key={index}
                    src={img}
                    alt={`Thumbnail ${index + 1}`}
                    className="w-20 h-20 object-cover cursor-pointer rounded-lg"
                    onClick={() => setSelectedImage(img)}
                  />
                ))}
              </div>
            </div>

            {/* Right Side: Product Details */}
            <div className="w-[60%] pr-6">
              <h1 className=" font-custom text-2xl font-semibold mb-2">
                {searchResult?.longDescription}
              </h1>
              <p className="text-gray-700 mb-4">
                {searchResult?.shortDescription}
              </p>
              <div className="flex items-center mb-4">
                <IoIosStar className="text-sm text-green-600" />
                <span className="text-black font-custom text-sm font-semibold">
                  {/* {searchResult?.rating} */}
                </span>
                <span className="text-gray-600 ml-2 font-custom text-sm">
                  {/* ({searchResult?.ratingCount} Ratings) */}
                </span>
              </div>
              <div className="text-zinc-500 text-base font-normal mb-4">
                <span className="text-lg font-semibold">
                  {/* {searchResult?.quantity}L */}
                </span>
              </div>
              <div className="flex justify-between items-center mb-4 font-custom">
                <div class="">
                  <span className="text-2xl font-bold text-neutral-600 mr-4">
                    {/* ₹{searchResult?.sellingPrice} */}
                  </span>
                  <span className="text-base text-red-600 line-through mr-2">
                    {/* ₹{searchResult?.mrp} */}
                  </span>
                </div>
                <span className="border border-amber-400 bg-amber-50 text-amber-400 rounded-full px-2 py-1 text-base font-semibold">
                  {/* {searchResult?.discountPercentage} % off */}
                </span>
              </div>
              <div className="flex items-center text-green-500 mb-4 font-custom text-sm font-medium">
                <img
                  src={deliveryIcon} // Replace with your delivery icon path
                  alt="Free Delivery"
                  className="w-5 h-5 mr-2"
                />
                Free Delivery
              </div>
              <div className="flex items-center mb-4 md:gap-10">
                <span className="text-base text-zinc-600 font-custom ">
                  Color & Textures
                </span>
                {/* <div className="ml-4 flex space-x-2">
              {product.colors.map((color, index) => (
                <div
                  key={index}
                  className={w-6 h-6 rounded-full bg-${color.toLowerCase()}-500}
                ></div>
              ))}
            </div>
            <div className="ml-4 flex space-x-2">
              {product.textures.map((texture, index) => (
                <button
                  key={index}
                  className="px-2 py-1 border border-gray-400 rounded-md"
                >
                  {texture}
                </button>
              ))}
            </div> */}
                <button
                  onClick={() => setIsPopupOpen(true)}
                  className="px-4 py-2 border outline-none font-semibold text-xs rounded-full bg-black text-white font-custom"
                >
                  Select Colour
                </button>
              </div>
              <div className="mb-8">
                <span className="text-base text-zinc-600 font-custom">
                  Delivered By
                  {/* {product.deliveryDate} */}
                </span>
              </div>
              <div className="mb-8 flex gap-2">
                {/* {searchResult?.dealer.map((sellers) => {
              return ( */}
                <div
                  // key={sellers.id}
                  className="md:w-72 border rounded-xl p-6 relative font-custom text-black flex flex-col gap-4 flex-wrap"
                >
                  <p className="text-base font-medium">
                    {/* {searchResult?.dealer.firstName}{" "} */}
                    {/* {searchResult?.dealer.lastName} */}
                    {/* {sellers.firstName}{" "}{sellers.lastName} */}
                  </p>
                  <p className="text-base font-medium">
                    {/* {searchResult?.dealer.phoneNumber} */}
                  </p>
                  <p className="underline text-zinc-600 text-sm">
                    {/* {searchResult?.dealer.addressLine1} */}
                    {/* {sellers.addressLine1} */}
                  </p>
                  <input
                    type="checkbox"
                    name=""
                    id=""
                    className="absolute top-2 right-2 accent-green-500 outline-none border border-green-500 rounded-lg"
                  />
                </div>
                {/* ); */}
                {/* } */}
                {/* )} */}
                {/* <div className="border rounded-lg p-4">
              <h3 className="text-lg font-bold mb-2">Seller Information</h3>
              <p>Name: {product.seller.name}</p>
              <p>Contact: {product.seller.contact}</p>
              <p>Address: {product.seller.address}</p>
              <button className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-lg">
                Choose Seller
              </button>
            </div> */}
              </div>
              <div className="flex space-x-4 mb-8">
                <button
                  className="font-custom flex px-6 py-4 bg-green-600 text-white rounded-full text-sm font-semibold"
                  onClick={() => addtocart()}
                >
                  <img src={buyNowIcon} alt="" className="pr-2" />
                  ADD CART
                </button>
                <button className="font-custom flex px-6 py-4  text-white rounded-full bg-orange-400 font-semibold text-sm">
                  <img src={addToCartIcon} alt="" className="pr-2" />
                  BUY NOW
                </button>
              </div>
              <div className=" pt-4">
                {/* <h3 className="text-lg font-bold mb-2">Product Details</h3>
                <p>Warranty: {product.details.warranty}</p>
                <p>Brand: {product.details.brand}</p>
                <p>Color: {product.details.color}</p>
                <p>Finish Type: {product.details.finishType}</p>
                <p>Size: {product.details.size}</p>
                <p>Special Features: {product.details.specialFeatures}</p> */}
                <div className="overflow-x-auto w-80  font-custom">
                  <table className="min-w-full  rounded-lg border-none">
                    <tbody>
                      <tr className="">
                        <th className="py-2 px-4 text-left text-zinc-600">
                          Warranty
                        </th>
                        {/* <td className="py-2 px-4">{searchResult?.warranty}</td> */}
                      </tr>
                      <tr className="">
                        <th className="py-2 px-4 text-left text-zinc-600">
                          Brand
                        </th>
                        {/* <td className="py-2 px-4">{searchResult?.brand}</td> */}
                      </tr>
                      <tr className="">
                        <th className="py-2 px-4 text-left text-zinc-600">
                          Color
                        </th>
                        {/* <td className="py-2 px-4">{searchResult?.colour}</td> */}
                      </tr>
                      <tr className="">
                        <th className="py-2 px-4 text-left text-zinc-600">
                          Finish
                        </th>
                        <td className="py-2 px-4">
                          {/* {searchResult?.finishType} */}
                        </td>
                      </tr>
                      <tr className="">
                        <th className="py-2 px-4 text-left text-zinc-600">
                          Size
                        </th>
                        <td className="py-2 px-4">{searchResult?.quantity}</td>
                      </tr>
                      <tr className="">
                        <th className="py-2 px-4 text-left text-zinc-600 ">
                          Special Features
                        </th>
                        <td className="py-2 px-4">
                          {/* {searchResult?.specialFeature} */}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <h4 className="text-base font-bold mt-4  text-zinc-600 px-4 font-custom mb-4">
                  About
                </h4>
                {/* <ul className="list-disc ml-6 px-4 font-custom">
                  {searchResult?.about.map((feature, index) => (
                    <li key={index} className="mb-4">
                      {feature}
                    </li>
                  ))}
                </ul> */}
              </div>
            </div>
          </div>
          <div className="font-custom w-full p-4 flex items-center justify-center flex-col gap-2 border-t-2 border-neautral-200 mt-4">
            <p className="text-4xl text-black font-semibold">
              Customers who viewed this item also viewed
            </p>
            <p className="text-zinc-600 text-xl">
              Grab your favorite colors at amazing discounts!
            </p>
          </div>
          <div class="items-slider min-h-fit w-full">
            <CardContainer cards={cards} />
            {/* <CustomRangeSlider/> */}
          </div>

          {isPopupOpen && (
            <ColorPickerPopup onClose={() => setIsPopupOpen(false)} />
          )}
        </div>
      ) : (
        <Loader1 />
      )}
    </>
    // <div className="mb-40 mt-40">{searchResult?.name}</div>
  );
};

export default ProductDetail;
