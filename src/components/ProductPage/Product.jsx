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
import ReviewItem from "./ReviewItem";

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
  const [dealers, setDealers] = useState([]);
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
    console.log("detail: ", detail);
    console.log("id: ", id);
    if (detail && detail.data && id) {
      const newdata = detail.data;
      console.log("#newdata: ", newdata);
      setSearchResult(newdata);
      // setDealers(newdata.dealer);
      setDealers([
        {
          _id: "66fec2b4f28543012429974b",
          firstName: "Amit Dealer",
          lastName: "+2",
          phoneNumber: "9806098960",
          city: "Kuk",
          state: "Haryana",
          country: "India",
          addressLine1: "Haryana",
          dealerServiceLocations: [
            {
              _id: "67002d87185d5f7ae8c8f9c5",
              dealerRef: "66fec2b4f28543012429974b",
              pincode: 132001,
              locationName: "Kurukshetra",
              state: "haryana",
              deleted: false,
              createdAt: "2024-10-04T18:01:43.869Z",
              updatedAt: "2024-10-04T18:01:43.869Z",
              __v: 0,
            },
            {
              _id: "6700d95ca2e6f8549565477b",
              dealerRef: "66fec2b4f28543012429974b",
              pincode: 132001,
              locationName: "Kurukshetra",
              state: "haryana",
              deleted: false,
              createdAt: "2024-10-05T06:14:52.480Z",
              updatedAt: "2024-10-05T06:14:52.480Z",
              __v: 0,
            },
          ],
        },
      ]);
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

  //FIXME: builder
  const deliveryInfos = [
    {
      storeName: "Manish Paints store",
      phoneNumber: "9865478965",
      address: "1/23B, Pillayar kovil street, Saidapet, Chennai,621806",
      isSelected: false,
    },
    {
      storeName: "Manish Paints store",
      phoneNumber: "9865478965",
      address: "1/23B, Pillayar kovil street, Saidapet, Chennai,621806",
      isSelected: true,
    },
  ];

  const productFeatures = [
    {
      name: "Purification",
      icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/c4af362965c7307dcc385082edcbe7557eb977089482ee5d642edb0a0241c730?placeholderIfAbsent=true&apiKey=50465c6614934414afb216301fa69ff8",
    },
    {
      name: "Taste & Odour",
      icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/e23ce1dfaee485cba54d678a12b963ae7c7f76e7292243420da808b91c9226ae?placeholderIfAbsent=true&apiKey=50465c6614934414afb216301fa69ff8",
    },
    {
      name: "Design & Features",
      icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/328f93d33cf51468957885de75add1d04b680bb50d1fe96e6423fb27d116583c?placeholderIfAbsent=true&apiKey=50465c6614934414afb216301fa69ff8",
    },
    {
      name: "Capacity",
      icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/420efba5c002d6d3ef25092326d8413a83c510554d961a1d15e74642f11f6913?placeholderIfAbsent=true&apiKey=50465c6614934414afb216301fa69ff8",
    },
  ];
  const ratings = [
    { stars: 5, count: 10638, percentage: 100 },
    { stars: 4, count: 3067, percentage: 29 },
    { stars: 3, count: 1086, percentage: 10 },
    { stars: 2, count: 513, percentage: 0 },
    { stars: 1, count: 2467, percentage: 23 },
  ];
  return (
    <>
      {detailStatus === "loading" && <Loader1 />}
      {detailStatus === "succeeded" ? (
        <div className="  p-4 px-8 pt-24 mx-10 ml-0">
          <div className="grid grid-cols-1 md:flex  gap-8">
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
              <div className="flex justify-between items-center text-gray-600 text-sm mb-3">
                <span className="text-sm">Deliver by Monday July 22</span>
              </div>
              <h1 className=" font-custom text-2xl font-semibold mb-2">
                {searchResult?.name}
              </h1>
              {/* <p className="text-gray-700 mb-4">
                {searchResult?.shortDescription}
              </p> */}
              <div className="flex items-center mb-4">
                <IoIosStar className="text-sm text-orange-500" />
                <IoIosStar className="text-sm text-orange-500" />
                <IoIosStar className="text-sm text-orange-500" />
                <IoIosStar className="text-sm text-orange-500" />
                <IoIosStar className="text-sm text-orange-500" />
                <span className="text-black font-custom text-sm ">
                  {/* {searchResult?.rating} */}( {searchResult?.ratingCount}{" "}
                  Ratings )
                </span>
                <span className="text-gray-600 ml-2 font-custom text-sm">
                  {/* ({searchResult?.ratingCount} Ratings) */}
                </span>
                <span className="ml-4">
                  Warranty: {searchResult?.warranty} Year's
                </span>
                <div className="flex items-center text-green-500 text-md ml-7">
                  <img
                    src={deliveryIcon}
                    alt="Free Delivery"
                    className="w-4 h-4 mr-1"
                  />
                  Free Delivery
                </div>
              </div>
              <div className="text-zinc-500 text-base font-normal mb-4">
                <span className="text-lg font-semibold">
                  {/* {searchResult?.quantity}L */}
                </span>
              </div>
              <div className="flex mt-4">
                <span className="text-4xl font-semibold  text-black">
                  <span className="font-sans ">₹</span>
                  {searchResult?.sellingPrice}
                </span>
                <div className="mt-2">
                  <span className="text-xl text-gray-500 line-through ml-4">
                    <span className="font-sans">₹</span>
                    {searchResult?.mrp}
                  </span>
                </div>
                <div className="border border-green-700 bg-green-50 text-green-600 rounded-full px-4 py-2 text-md  font-bold ml-6">
                  <span className="">
                    {searchResult?.discountPercentage}% off
                  </span>
                </div>
              </div>
              <hr className="mt-4 mb-0"></hr>
              <div className="flex items-center mb-4 md:gap-10">
                {/* <span className="text-base text-zinc-600 font-custom ">
                  Color & Textures
                </span> */}
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
                {/* <button
                  onClick={() => setIsPopupOpen(true)}
                  className="px-4 py-2 border outline-none font-semibold text-xs rounded-full bg-black text-white font-custom"
                >
                  Select Colour
                </button> */}
              </div>
              {/* <div className="mb-8">
                <span className="text-base text-zinc-600 font-custom">
                  Delivered By
                </span>
              </div> */}
              {/* <div className="mb-8 flex gap-2">
                {searchResult?.dealer.map((sellers) => {
                  return (
                    <div
                      key={sellers.id}
                      className="md:w-72 border rounded-xl p-6 relative font-custom text-black flex flex-col gap-4 flex-wrap"
                    >
                      <p className="text-base font-medium">
                        {searchResult?.dealer.firstName}{" "}
                        {searchResult?.dealer.lastName}
                        {sellers.firstName} {sellers.lastName}
                      </p>
                      <p className="text-base font-medium">
                        {searchResult?.dealer.phoneNumber}
                      </p>
                      <p className="underline text-zinc-600 text-sm">
                        {searchResult?.dealer.addressLine1}
                        {sellers.addressLine1}
                      </p>
                      <input
                        type="checkbox"
                        name=""
                        id=""
                        className="absolute top-2 right-2 accent-green-500 outline-none border border-green-500 rounded-lg"
                      />
                    </div>
                  );
                })}
              </div> */}
              <div className="mb-7">
                <div className="text-md font-bold mt-5">
                  <span>
                    Category:{" "}
                    <span className="text-gray-600">{searchResult?.group}</span>
                  </span>
                </div>
                <div className=" pt-4">
                  <div className="overflow-x-auto w-80  font-custom">
                    <table className="min-w-full  rounded-lg border-none">
                      <tbody>
                        <tr className="">
                          <th className="py-2 px-4 text-left text-zinc-600">
                            Brand:
                          </th>
                          <td className="py-2 px-4">{searchResult?.brand}</td>
                        </tr>
                        <tr className="">
                          <th className="py-2 px-4 text-left text-zinc-600">
                            Colour:
                          </th>
                          <td className="py-2 px-4">
                            {searchResult?.colour[0].hexCode}
                          </td>
                        </tr>
                        <tr className="">
                          <th className="py-2 px-4 text-left text-zinc-600">
                            Storage Capacity:
                          </th>
                          <td className="py-2 px-4">
                            {searchResult?.quantity}
                          </td>
                        </tr>
                        <tr className="">
                          <th className="py-2 px-4 text-left text-zinc-600">
                            Technology
                          </th>
                          <td className="py-2 px-4">
                            {/* {searchResult?.technology} */}
                          </td>
                        </tr>
                        <tr className="">
                          <th className="py-2 px-4 text-left text-zinc-600">
                            Material Type:
                          </th>
                          <td className="py-2 px-4">
                            {searchResult?.finishType}
                          </td>
                        </tr>

                        {/* <tr className="">
                          <th className="py-2 px-4 text-left text-zinc-600 ">
                            Special Features
                          </th>
                          <td className="py-2 px-4">
                            {searchResult?.specialFeature}
                          </td>
                        </tr> */}
                      </tbody>
                    </table>
                  </div>

                  {/* <ul className="list-disc ml-6 px-4 font-custom">
                  {searchResult?.about.map((feature, index) => (
                    <li key={index} className="mb-4">
                      {feature}
                    </li>
                  ))}
                </ul> */}
                </div>
              </div>
              <div className="flex space-x-4">
                <button
                  className="font-custom flex px-9 py-3 bg-[#A70024] text-white rounded-md text-sm font-semibold"
                  onClick={() => addtocart()}
                >
                  <img src={buyNowIcon} alt="" className="pr-2" />
                  ADD CART
                </button>
                <button className="font-custom flex px-9 py-3  text-white rounded-md bg-orange-400 font-semibold text-sm">
                  <img src={addToCartIcon} alt="" className="pr-2" />
                  BUY NOW
                </button>
              </div>
              <div className=" pt-4">
                <h4 className="text-base font-bold mt-4  text-zinc-700 px-4 font-custom mb-4">
                  About
                </h4>
                <ul className="list-disc ml-6 px-4 font-custom">
                  {searchResult?.about.map((feature, index) => (
                    <li key={index} className="mb-4">
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
              {/* //FIXME: Builder */}
              <div className="flex flex-col w-full max-md:max-w-full">
                <h2 className="gap-6 self-start text-base text-zinc-600">
                  Delivered by
                </h2>
                <div className="flex flex-wrap gap-6 items-start mt-3 w-1/2 text-base font-medium text-zinc-900 max-md:max-w-full">
                  {dealers.map((info, index) => (
                    <div
                      // className={`flex relative flex-col flex-1 shrink justify-center p-4 rounded-md basis-0 min-w-[240px] rotate-[-1.734723475976807e-18rad] border-red-400 outline-red-500 ${
                      //   info.isSelected ? "bg-neutral-200 bg-opacity-20" : ""
                      // }`}
                      className="flex relative flex-col flex-1 shrink justify-center p-4 rounded-md basis-0 min-w-[240px] rotate-[-1.734723475976807e-18rad]  bg-neutral-200 bg-opacity"
                    >
                      <h3 className="gap-2 self-start rotate-[1.734723475976807e-18rad]">
                        {info.firstName}
                        {info.lastName}
                      </h3>
                      <p className="z-0 mt-2 uppercase rotate-[1.734723475976807e-18rad]">
                        {info.phoneNumber}
                      </p>
                      <p className="gap-2 mt-2 w-full text-sm leading-5 rotate-[1.734723475976807e-18rad] text-zinc-600">
                        {info.addressLine1},{info.city},{info.state},
                        {info.dealerServiceLocations[0].pincode}
                      </p>
                      {/* <img
                        loading="lazy"
                        src={
                          info.isSelected
                            ? "https://cdn.builder.io/api/v1/image/assets/TEMP/73fe2c8d64780094fc2b8a82d3fd6790e8235f1b9372f4a3fee77f129e2236a8?placeholderIfAbsent=true&apiKey=50465c6614934414afb216301fa69ff8"
                            : "https://cdn.builder.io/api/v1/image/assets/TEMP/8fd33ce5eba65410e244e66d2ce7820a87595d0d0948a5cf3c79b883f51df738?placeholderIfAbsent=true&apiKey=50465c6614934414afb216301fa69ff8"
                        }
                        className="object-contain absolute top-4 right-4 z-0 w-4 h-4 aspect-square"
                        alt=""
                      /> */}
                    </div>
                  ))}
                </div>
                {/* <div className="flex flex-col pt-6 mt-3 w-full max-md:max-w-full">
                  <header className="flex justify-between w-full text-neutral-800 max-md:max-w-full">
                    <h1 className="pt-6 pl-6 text-2xl leading-snug">
                      Ratings & Reviews
                    </h1>
                    <button className="flex flex-col items-end pt-4 pr-4 text-sm text-center">
                      <span className="px-8 py-4 bg-white rounded-sm shadow-[0px_1px_2px_rgba(0,0,0,0.26)] max-md:px-5">
                        Rate Product
                      </span>
                    </button>
                  </header>
                  <div className="flex flex-wrap p-6 w-full max-md:px-5 max-md:max-w-full">
                    <div className="flex flex-col grow shrink min-w-[240px] w-[250px]">
                      <div className="flex flex-wrap w-full min-h-[111px]">
                        <div className="flex flex-col grow shrink leading-snug text-center text-zinc-500 w-[83px]">
                          <div className="flex flex-wrap justify-center w-full whitespace-nowrap text-neutral-800">
                            <div className="flex flex-1 shrink gap-px items-start px-2 py-0.5 basis-0 size-full">
                              <div className="self-start text-3xl">4.1</div>
                              <div className="my-auto text-2xl">★</div>
                            </div>
                          </div>
                          <div className="flex flex-wrap justify-center w-full text-sm">
                            <div className="flex-1 shrink w-full">
                              17,771 Ratings &
                            </div>
                          </div>
                          <div className="flex flex-wrap justify-center w-full text-sm">
                            <div className="flex-1 shrink w-full">
                              2,128 Reviews
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-col grow shrink justify-center pr-px pl-3 w-[187px]">
                          <div className="flex flex-1 justify-center size-full">
                            <div className="flex flex-col self-start pt-px text-xs leading-snug text-center whitespace-nowrap h-[93px] text-neutral-800 w-[33px]">
                              {ratings.map(({ stars }) => (
                                <div
                                  key={stars}
                                  className="flex gap-0.5 justify-center items-start py-px pr-1.5 pl-2 w-full"
                                >
                                  <div>{stars}</div>
                                  <div>★</div>
                                </div>
                              ))}
                            </div>
                            <div className="flex flex-col  pl-1.5 w-[114px]">
                              {ratings.map(({ stars, percentage }) => (
                                <div
                                  key={stars}
                                  className="flex flex-col items-start mt-3.5 max-w-full bg-zinc-100 rounded-[93px] w-[107px] max-md:pr-5"
                                >
                                  <div
                                    className={`flex shrink-0 h-1 ${
                                      stars === 1
                                        ? "bg-red-400"
                                        : "bg-green-700"
                                    } rounded-[93px]`}
                                    style={{ width: `${percentage}%` }}
                                  />
                                </div>
                              ))}
                            </div>
                            <div className="flex flex-col pt-px pb-0.5 text-xs leading-snug whitespace-nowrap text-zinc-500 w-[49px]">
                              {ratings.map(({ count }) => (
                                <div key={count} className="pl-3 w-full">
                                  {count}
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col grow shrink w-80 min-w-[240px]">
                      <div className="flex flex-wrap w-full">
                        {productFeatures.map((feature, index) => (
                          <div
                            key={index}
                            className="flex flex-col flex-1 shrink basis-0"
                          >
                            <div className="flex flex-col w-full">
                              <div className="flex flex-col items-center px-5 pt-3 pb-1.5 w-full">
                                <img
                                  loading="lazy"
                                  src={feature.icon}
                                  className="object-contain aspect-[0.98] w-[58px]"
                                  alt={`${feature.name} icon`}
                                />
                              </div>
                              <div className="pb-px w-full text-sm leading-snug text-center text-neutral-800">
                                {feature.name.includes("&") ? (
                                  <>
                                    {feature.name.split("&")[0]}&<br />
                                    {feature.name.split("&")[1]}
                                  </>
                                ) : (
                                  feature.name
                                )}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  <ReviewItem
                    author="Faisal khan Khan"
                    date="6 months ago"
                    rating={5}
                    review="When I order this product I was nervous because I was thinking aqua fresh water filter condition will be good or not etc. but when I received this product I saw quality is good and installation service very fast after installation drinking water quality totally change I like this product for this price thank you Flipkart."
                  />
                  <footer className="px-6 pt-6 pb-6 w-full text-base leading-snug text-blue-600 border-t border-zinc-100 max-md:px-5 max-md:max-w-full">
                    All 2128 reviews
                  </footer>
                  <div className="flex w-full min-h-[1px] max-md:max-w-full" />
                </div> */}
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
          </div>

          {isPopupOpen && (
            <ColorPickerPopup onClose={() => setIsPopupOpen(false)} />
          )}
        </div>
      ) : (
        <Loader1 />
      )}
    </>
  );
};

export default ProductDetail;

//FIXME: searchResult?.dealer.map((sellers))
{
  /* <div className="border rounded-lg p-4">
              <h3 className="text-lg font-bold mb-2">Seller Information</h3>
              <p>Name: {product.seller.name}</p>
              <p>Contact: {product.seller.contact}</p>
              <p>Address: {product.seller.address}</p>
              <button className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-lg">
                Choose Seller
              </button>
            </div> */
}
