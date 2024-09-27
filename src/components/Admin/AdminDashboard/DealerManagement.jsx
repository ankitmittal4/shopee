// import React, { useEffect, useState } from "react";
// import { useFormik } from "formik";
// import * as Yup from "yup";
// import { FaEdit, FaPlus, FaTrash } from "react-icons/fa";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   dealerDelete,
//   dealerRegistration,
// } from "../../../features/Admin/Dealer/dealerAddSlice";
// import box_iocn from "..//..//./../Assets/box-time.svg";
// import Loader1 from "../../Loaders/Loader1";
// import Toast from "../../Tost/Tosts";
// import CuntrysData from "../../Data/CountrysData.json";
// import { dealersList } from "../../../features/Admin/adminProductlistSlice";
// import Pagination from "../../Pagination/Pagination";
// import DealerServiceLocations from "./DealerServiceLoactions";
// import { stateChange } from "../../../features/Admin/Dealer/DealerServiceLocations";
// import { useHistory, useNavigate } from "react-router-dom";
// import axios from "axios";
// import { data } from "autoprefixer";

// // Sample data for countries and states
// const countryStateData = CuntrysData;

// const validationSchema = Yup.object({
//   firstName: Yup.string().required("Required"),
//   lastName: Yup.string().required("Required"),
//   dob: Yup.date().required("Required"),
//   gender: Yup.string().required("Required"),
//   occupation: Yup.string().required("Required"),
//   pincode: Yup.string()
//     .required("Required")
//     .matches(/^[0-9]+$/, "Pincode must be only numbers"),
//   password: Yup.string().required("Required"),
//   repassword: Yup.string()
//     .required("Required")
//     .oneOf([Yup.ref("password"), null], "Passwords must match"),
//   // countryCode: Yup.string()
//   //   .matches(/^\+[1-9]{1}[0-9]{1,3}$/, "Invalid country code")
//   //   .required("Required"),
//   email: Yup.string().email("Invalid email").required("Required"),
//   phoneNumber: Yup.string()
//     .matches(/^[0-9]{10}$/, "Phone number must be 10 digits")
//     .required("Required"),
//   alternatePhoneNumber: Yup.string()
//     .matches(/^[0-9]{10}$/, "Alternate phone number must be 10 digits")
//     .required("Required"),
//   pincode: Yup.string()
//     .matches(/^[0-9]+$/, "Pincode must be only numbers")
//     .required("Pincode is required"),
//   //   dateOfJoining: Yup.date().required("Required"),
//   addressLine1: Yup.string().required("Required"),
//   addressLine2: Yup.string(),
//   landmark: Yup.string().required("Required"),
//   city: Yup.string().required("Required"),
//   country: Yup.string().required("Required"),
//   state: Yup.string().required("Required"),
//   //   pincode: Yup.string().required("Required"),
//   geoLocationCode: Yup.string().required("Required"),
//   status: Yup.string().required("Required"),
//   shopImage: Yup.mixed().required("Required"),
//   // .test(
//   //   "fileSize",
//   //   "File Size is too large",
//   //   (value) => !value || (value && value.size <= 1024 * 1024)
//   // ) // 1MB
//   // .test(
//   //   "fileFormat",
//   //   "Unsupported Format",
//   //   (value) =>
//   //     !value || (value && ["image/jpeg", "image/png"].includes(value.type))
//   // ),
// });

// const DealerForm = () => {
//   const [imageObj, setImageObj] = useState();
//   const [image, setImage] = useState({});
//   const [dealerEditId, setDealerEditId] = useState(null);
//   const [shouldFetch, setShouldFetch] = useState(false);
//   const [number, setNumber] = useState(0);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [states, setStates] = useState([]);
//   const dispatch = useDispatch();
//   const [loading, setLoading] = useState(false);
//   const [initialDealer, setInitialDeaeler] = useState({});
//   const [dealers, setDealers] = useState([]);
//   const { dealersItems, dealersStatus, dealersSuccess } = useSelector(
//     (state) => state.adminproducts
//   );
//   const { dealerStatus, dealer, message } = useSelector(
//     (state) => state.dealerAdd
//   );

//   const navigate = useNavigate();

//   useEffect(() => {
//     if (dealersStatus === "idle") {
//       dispatch(dealersList(1));
//     }
//   }, [dispatch, dealersStatus, dealersItems, dealerStatus, currentPage]);

//   useEffect(() => {
//     if (dealersItems && dealersItems.data) {
//       setDealers(dealersItems.data.dealers);
//     }
//   }, [dispatch, dealersStatus, dealersItems, dealerStatus, currentPage]);

//   const [toast, setToast] = useState({
//     visible: false,
//     message: "",
//     type: "",
//   });

//   const closeToast = () => {
//     setToast({ visible: false, message: "", type: "" });
//   };

//   const [includeId, setIncludeId] = useState(false);
//   const [dealerForm, setDealerForm] = useState({
//     ...(includeId && { _id: "" }),
//     firstName: "",
//     lastName: "",
//     dob: "",
//     gender: "",
//     occupation: "",
//     password: "",
//     email: "",
//     countryCode: "+91",
//     phoneNumber: "",
//     alternatePhoneNumber: "",
//     //   dateOfJoining: "",
//     addressLine1: "",
//     addressLine2: "",
//     landmark: "",
//     city: "",
//     country: "",
//     state: "",
//     pincode: "",
//     geoLocationCode: "",
//     status: "A",
//     repassword: "",
//     shopImage: null,
//     //   serviceLocations: [],
//   });

//   const formatDate = (dateString) => {
//     const date = new Date(dateString);
//     const year = date.getFullYear();
//     const month = String(date.getMonth() + 1).padStart(2, "0");
//     const day = String(date.getDate()).padStart(2, "0");
//     return `${year}-${month}-${day}`;
//   };

//   {
//     /******function for checking are valuses changing or not before submitting the form for dealer Edit*******/
//   }
//   const getChangedValues = (initialDealer, currentValues) => {
//     const changedValues = {};
//     console.log(currentValues);
//     for (const key in currentValues) {
//       if (key !== "_id") {
//         if (key === "shopImage") {
//           if (
//             typeof currentValues.shopImage === "string" &&
//             currentValues.shopImage === initialDealer.shopImage
//           ) {
//             continue; // No change, do not include in the changed values
//           }
//           // If it's a File object or URL has changed, include in the changed values
//           changedValues[key] = currentValues[key];
//         } else if (currentValues[key] !== initialDealer[key]) {
//           changedValues[key] = currentValues[key];
//         }
//       }
//     }
//     return changedValues;
//   };
//   {
//     /******-----------------------------------------------------------------------------------*******/
//   }

//   const handleAdddealer = async (data) => {
//     // await dispatch(dealerRegistration(data));
//     try {
//       const headers = {
//         Authorization: localStorage.getItem("admin-token"),
//         "Content-Type": "multipart/form-data",
//       };

//       let reqOptions = {
//         url: "http://3.6.127.143/api/admin/dealer/add",
//         method: "POST",
//         headers: headers,
//         data: data,
//       };

//       const response = await axios.request(reqOptions);
//       // console.log(response);

//       if (response.data.success) {
//         setToast({
//           visible: true,
//           message: response.data.message,
//           type: "success",
//         });
//       } else if (!response.data.success) {
//         setToast({
//           visible: true,
//           message: response.data.message,
//           type: "danger",
//         });
//       }
//       setLoading(false);
//     } catch (error) {
//       setLoading(false);
//       console.log("errors are occuring during creating product", error);
//       setToast({
//         visible: true,
//         message: "Internal occurred while creating product",
//         type: "danger",
//       });
//     }
//     dispatch(dealersList());
//   };

//   const {
//     values,
//     errors,
//     touched,
//     handleBlur,
//     handleChange,
//     handleSubmit,
//     setFieldValue,
//     setErrors,
//     validateForm,
//     validateField,
//     setTouched,
//   } = useFormik({
//     initialValues: dealerForm,
//     validationSchema: validationSchema,
//     enableReinitialize: true,

//     onSubmit: async (values, actions, initialValues) => {
//       // console.log(values);
//       setLoading(true);

//       if (includeId) {
//         const changedValues = getChangedValues(initialDealer, values);
//         if (Object.keys(changedValues).length > 0) {
//           const formData = new FormData();
//           for (const [key, value] of Object.entries(values)) {
//             if (key === "_id") {
//               formData.append("dealerId", value);
//             }
//           }
//           for (const key in changedValues) {
//             if (key === "shoImage" && key !== "_id") {
//               formData.append("shoImage", changedValues.shopImage);
//             } else if (key !== "_id") {
//               formData.append(key, changedValues[key]);
//             }
//           }
//           handleAdddealer(formData);
//         } else {
//           setLoading(false);
//           console.log("nothing to change");
//         }
//       } else {
//         const formData = new FormData();

//         for (const [key, value] of Object.entries(values)) {
//           formData.append(key, value);
//         }

//         if (imageObj instanceof File) {
//           formData.append("shopImage", imageObj);
//         }
//         handleAdddealer(formData);
//       }

//       actions.resetForm();
//       // actions.setErrors();
//     },
//   });

//   const handleInputChangen = (event) => {
//     const file = event.target.files[0]; // Get the first file (single image)
//     setFieldValue("shopImage", file); // Update Formik field value
//     setImageObj(file); // Update state with the file object
//     setImage(URL.createObjectURL(file)); // Update state with the preview URL

//     console.log("handle input change is running");
//     // const files = Array.from(event.target.files);
//     // setImages((prevImages) => [...prevImages, ...files]);
//     // setImagePreviews((prevPreviews) => [
//     //   ...prevPreviews,
//     //   ...files.map((file) => URL.createObjectURL(file)),
//     // ]);
//   };
//   //   console.log(values)
//   console.log("validation errors", errors);

//   const handleCountryChange = (e) => {
//     const selectedCountry = e.target.value;
//     setFieldValue("country", selectedCountry);
//     setFieldValue("state", "");
//     setStates(countryStateData[selectedCountry] || []);
//   };

//   const [showAddDealer, setShowAddDealer] = useState();

//   const handleShowDealer = () => {
//     setShowAddDealer(!showAddDealer);
//   };
//   const handleCloseButton = () => {
//     setIncludeId(false);
//     setShouldFetch(false);
//     setShowAddDealer(!showAddDealer);
//     setDealerForm({
//       firstName: "",
//       lastName: "",
//       dob: "",
//       gender: "",
//       occupation: "",
//       password: "",
//       email: "",
//       countryCode: "+91",
//       phoneNumber: "",
//       alternatePhoneNumber: "",
//       //   dateOfJoining: "",
//       addressLine1: "",
//       addressLine2: "",
//       landmark: "",
//       city: "",
//       country: "",
//       state: "",
//       pincode: "",
//       geoLocationCode: "",
//       status: "A",
//       repassword: "",
//       shopImage: null,
//     });
//     setImage({});
//     setDealerEditId(null);
//     setInitialDeaeler(null);
//   };
//   console.log(values);

//   const handleEditDealer = (dealer) => {
//     setIncludeId(true);
//     setShouldFetch(true);
//     setDealerForm({
//       ...dealer,
//       password: "",
//       repassword: "",
//       status: dealer.status,
//     });
//     setInitialDeaeler(dealer);
//     setImage(dealer.shopImage);
//     setDealerEditId(dealer._id);
//     setShowAddDealer(true);
//     setStates(countryStateData[dealer.country] || []);

//     // console.log(dealer);
//   };
//   //  console.log("dealer form",dealerForm)
//   const handlePageChange = (pageNumber) => {
//     setCurrentPage(pageNumber);
//     dispatch(dealersList(pageNumber));
//   };

//   {
//     /*********************************handeling-deleting-dealer******************************************/
//   }

//   const [deleteDealerId, setDeleteDealerId] = useState(null);
//   const [deletePopup, setShowDeletePopup] = useState(false);

//   const handleDeleteButton = (id) => {
//     setShowDeletePopup(!deletePopup);
//     setDeleteDealerId(id);
//   };

//   const handleDeleteDealer = () => {
//     dispatch(dealerDelete(deleteDealerId));
//     dispatch(dealersList(1));
//     setDeleteDealerId(null);
//     setShowDeletePopup(false);
//   };

//   const handleNoButton = () => {
//     setShowDeletePopup(false);
//   };

//   {
//     /*********************************handeling-deleting-dealer******************************************/
//   }

//   return (
//     <div className="ml-[20rem] p-3 pl-6 pr-6 font-custom bg-[#F0F0F0] min-h-svh">
//       {toast.visible && (
//         <Toast message={toast.message} type={toast.type} onClose={closeToast} />
//       )}
//       {!showAddDealer && (
//         <div className="flex justify-between items-center mb-4">
//           <div className="text-2xl  flex gap-2">
//             <img src={box_iocn} alt="box icon" />
//             Dealer List
//           </div>
//           <div className="space-x-4">
//             <button
//               onClick={handleShowDealer}
//               className="bg-orange-400 text-white px-4 py-2 rounded-lg hover:bg-green-500"
//             >
//               Add Dealer
//             </button>
//           </div>
//         </div>
//       )}
//       {showAddDealer && (
//         <div className="flex justify-between items-center mb-4  ">
//           <div className="text-2xl  flex gap-2">
//             <img src={box_iocn} alt="box icon" />
//             {dealerForm.firstName ? "Edit Dealer" : "Add Dealer"}
//           </div>
//           <div className="space-x-4 ">
//             <button
//               className=" text-green-500 px-4 py-2 rounded "
//               onClick={handleCloseButton}
//             >
//               Cancel
//             </button>
//             <button
//               type="submit"
//               onClick={handleSubmit}
//               className="bg-orange-400 text-white px-4 py-2 rounded-lg hover:bg-green-500"
//             >
//               {/* <FaPlus className="inline-block mr-2" /> */}
//               {loading ? (
//                 <Loader1 />
//               ) : (
//                 <p>{dealerForm.firstName ? "Save Changes" : "Save"}</p>
//               )}
//             </button>
//           </div>
//         </div>
//       )}

//       {showAddDealer ? (
//         <></>
//       ) : (
//         <div className="bg-white rounded-lg shadow overflow-x-auto">
//           <table className="min-w-full divide-y divide-gray-200 bg-neutral-200">
//             <thead>
//               <tr className="bg-[#5C5C5C]">
//                 {/* <th className="px-6 py-3 text-left text-xs  text-white font-bold uppercase tracking-wider">
//                 <input type="checkbox" name="" id="" />
//               </th> */}
//                 <th className="px-6 py-3 text-left text-xs  text-white font-bold uppercase tracking-wider">
//                   No
//                 </th>
//                 <th className="px-6 py-3 text-left text-xs  text-white font-bold uppercase tracking-wider">
//                   Id
//                 </th>
//                 <th className="px-6 py-3 text-left text-xs  text-white font-bold uppercase tracking-wider">
//                   Name & Phone No
//                 </th>
//                 <th className="px-6 py-3 text-left text-xs  text-white font-bold uppercase tracking-wider">
//                   Address
//                 </th>
//                 <th className="px-6 py-3 text-left text-xs  text-white font-bold uppercase tracking-wider">
//                   Serviceable Pincode
//                 </th>
//                 <th className="px-6 py-3 text-left text-xs  text-white font-bold uppercase tracking-wider">
//                   Qty
//                 </th>
//                 <th className="px-6 py-3 text-left text-xs  text-white font-bold uppercase tracking-wider">
//                   Status
//                 </th>
//                 <th className="px-6 py-3 text-left text-xs  text-white font-bold uppercase tracking-wider">
//                   Action
//                 </th>
//               </tr>
//             </thead>
//             <tbody className="bg-white divide-y divide-gray-200">
//               {dealers.map((dealer, index) => (
//                 <tr
//                   key={dealer._id}
//                   className={index % 2 === 0 ? "" : "bg-zinc-100"}
//                 >
//                   {/* <td className="px-6 py-4 whitespace-nowrap outline-none bg-transparent">
//                   <input type="checkbox" name="" id="" />
//                 </td> */}

//                   <td className="px-6 py-4 whitespace-nowrap">
//                     {index + 1 + (currentPage - 1) * 10}
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap">
//                     {dealer._id.slice(0, 6)}
//                   </td>
//                   <td className="px-6 py-4 ">
//                     {dealer.firstName} {dealer.lastName} {dealer.phoneNumber}
//                   </td>
//                   <td className="px-6 py-4 ">{dealer.addressLine2}</td>
//                   <td className="px-6 py-4 whitespace-nowrap">
//                     <p>serviceLocations</p>
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap">
//                     {dealer.quantity}
//                   </td>

//                   <td className="px-6 py-4 whitespace-nowrap">
//                     <span
//                       className={`text-${
//                         dealer.status === "A" ? "green" : "red"
//                       }-500`}
//                     >
//                       {dealer.status === "A" ? <p>Active</p> : <p>Inative</p>}
//                     </span>
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap">
//                     <button
//                       onClick={() => handleEditDealer(dealer)}
//                       className="text-blue-500 mr-2"
//                     >
//                       <FaEdit />
//                     </button>
//                     <button
//                       onClick={() => handleDeleteButton(dealer._id)}
//                       className="text-red-500"
//                     >
//                       <FaTrash />
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//           {dealersStatus === "succeeded" && (
//             <Pagination
//               totalProducts={dealersItems.data.total}
//               productsPerPage={dealersItems.data.limit}
//               onPageChange={handlePageChange}
//               currentPage={currentPage}
//             />
//           )}
//         </div>
//       )}
//       {dealerEditId && (
//         <DealerServiceLocations
//           shouldFetch={shouldFetch}
//           dealerId={dealerEditId}
//         />
//       )}
//     </div>
//   );
// };

// export default DealerForm;

//FIXME: copy of dealer
import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { FaEdit, FaPlus, FaTrash } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import {
  dealerDelete,
  dealerRegistration,
} from "../../../features/Admin/Dealer/dealerAddSlice";
import box_iocn from "..//..//./../Assets/box-time.svg";
import Loader1 from "../../Loaders/Loader1";
import Toast from "../../Tost/Tosts";
import CuntrysData from "../../Data/CountrysData.json";
import {
  dealersList,
  adminProductslist,
} from "../../../features/Admin/adminProductlistSlice";
import Pagination from "../../Pagination/Pagination";
import DealerServiceLocations from "./DealerServiceLoactions";
import { stateChange } from "../../../features/Admin/Dealer/DealerServiceLocations";
import { useHistory, useNavigate } from "react-router-dom";
import axios from "axios";
import delete1 from "../../../Assets/delete.svg";
import edit from "../../../Assets/edit.svg";
import { data } from "autoprefixer";

// Sample data for countries and states
const countryStateData = CuntrysData;

const validationSchema = Yup.object({
  firstName: Yup.string().required("Required"),
  lastName: Yup.string().required("Required"),
  dob: Yup.date().required("Required"),
  gender: Yup.string().required("Required"),
  occupation: Yup.string().required("Required"),
  pincode: Yup.string()
    .required("Required")
    .matches(/^[0-9]+$/, "Pincode must be only numbers"),
  password: Yup.string().required("Required"),
  repassword: Yup.string()
    .required("Required")
    .oneOf([Yup.ref("password"), null], "Passwords must match"),
  // countryCode: Yup.string()
  //   .matches(/^\+[1-9]{1}[0-9]{1,3}$/, "Invalid country code")
  //   .required("Required"),
  email: Yup.string().email("Invalid email").required("Required"),
  phoneNumber: Yup.string()
    .matches(/^[0-9]{10}$/, "Phone number must be 10 digits")
    .required("Required"),
  alternatePhoneNumber: Yup.string()
    .matches(/^[0-9]{10}$/, "Alternate phone number must be 10 digits")
    .required("Required"),
  pincode: Yup.string()
    .matches(/^[0-9]+$/, "Pincode must be only numbers")
    .required("Pincode is required"),
  //   dateOfJoining: Yup.date().required("Required"),
  addressLine1: Yup.string().required("Required"),
  addressLine2: Yup.string(),
  landmark: Yup.string().required("Required"),
  city: Yup.string().required("Required"),
  country: Yup.string().required("Required"),
  state: Yup.string().required("Required"),
  //   pincode: Yup.string().required("Required"),
  geoLocationCode: Yup.string().required("Required"),
  status: Yup.string().required("Required"),
  shopImage: Yup.mixed().required("Required"),
  // .test(
  //   "fileSize",
  //   "File Size is too large",
  //   (value) => !value || (value && value.size <= 1024 * 1024)
  // ) // 1MB
  // .test(
  //   "fileFormat",
  //   "Unsupported Format",
  //   (value) =>
  //     !value || (value && ["image/jpeg", "image/png"].includes(value.type))
  // ),
});

const DealerForm = () => {
  const [imageObj, setImageObj] = useState();
  const [image, setImage] = useState({});
  const [dealerEditId, setDealerEditId] = useState(null);
  const [shouldFetch, setShouldFetch] = useState(false);
  const [number, setNumber] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [states, setStates] = useState([]);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [initialDealer, setInitialDeaeler] = useState({});
  const [dealers, setDealers] = useState([]);
  const { dealersItems, dealersStatus, dealersSuccess } = useSelector(
    (state) => state.adminproducts
  );
  const { dealerStatus, dealer, message } = useSelector(
    (state) => state.dealerAdd
  );

  const navigate = useNavigate();

  useEffect(() => {
    if (dealersStatus === "idle") {
      dispatch(dealersList(1));
    }
  }, [dispatch, dealersStatus, dealersItems, dealerStatus, currentPage]);

  useEffect(() => {
    if (dealersItems && dealersItems.data) {
      setDealers(dealersItems.data.dealers);
    }
  }, [dispatch, dealersStatus, dealersItems, dealerStatus, currentPage]);

  const [toast, setToast] = useState({
    visible: false,
    message: "",
    type: "",
  });

  const closeToast = () => {
    setToast({ visible: false, message: "", type: "" });
  };

  const [includeId, setIncludeId] = useState(false);
  const [dealerForm, setDealerForm] = useState({
    ...(includeId && { _id: "" }),
    firstName: "",
    lastName: "",
    dob: "",
    gender: "",
    occupation: "",
    password: "",
    email: "",
    countryCode: "+91",
    phoneNumber: "",
    alternatePhoneNumber: "",
    //   dateOfJoining: "",
    addressLine1: "",
    addressLine2: "",
    landmark: "",
    city: "",
    country: "",
    state: "",
    pincode: "",
    geoLocationCode: "",
    status: "A",
    repassword: "",
    shopImage: null,
    //   serviceLocations: [],
  });

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  {
    /******function for checking are valuses changing or not before submitting the form for dealer Edit*******/
  }
  const getChangedValues = (initialDealer, currentValues) => {
    const changedValues = {};
    console.log(currentValues);
    for (const key in currentValues) {
      if (key !== "_id") {
        if (key === "shopImage") {
          if (
            typeof currentValues.shopImage === "string" &&
            currentValues.shopImage === initialDealer.shopImage
          ) {
            continue; // No change, do not include in the changed values
          }
          // If it's a File object or URL has changed, include in the changed values
          changedValues[key] = currentValues[key];
        } else if (currentValues[key] !== initialDealer[key]) {
          changedValues[key] = currentValues[key];
        }
      }
    }
    return changedValues;
  };
  {
    /******-----------------------------------------------------------------------------------*******/
  }

  const handleAdddealer = async (data) => {
    // await dispatch(dealerRegistration(data));
    try {
      const headers = {
        Authorization: localStorage.getItem("admin-token"),
        "Content-Type": "multipart/form-data",
      };

      let reqOptions = {
        url: "http://3.6.127.143/api/admin/dealer/add",
        method: "POST",
        headers: headers,
        data: data,
      };

      const response = await axios.request(reqOptions);
      // console.log(response);

      if (response.data.success) {
        setToast({
          visible: true,
          message: response.data.message,
          type: "success",
        });
        setTimeout(() => {
          handleCloseButton();
        }, 2000);
        dispatch(dealersList());
      } else if (!response.data.success) {
        setToast({
          visible: true,
          message: response.data.message,
          type: "danger",
        });
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log("errors are occuring during creating product", error);
      setToast({
        visible: true,
        message: "Internal occurred while creating product",
        type: "danger",
      });
    }
    dispatch(dealersList());
  };

  const {
    values,
    errors,
    touched,
    handleBlur,
    handleChange,
    handleSubmit,
    setFieldValue,
    setErrors,
    validateForm,
    validateField,
    setTouched,
  } = useFormik({
    initialValues: dealerForm,
    validationSchema: validationSchema,
    enableReinitialize: true,

    onSubmit: async (values, actions, initialValues) => {
      // console.log(values);
      setLoading(true);

      if (includeId) {
        const changedValues = getChangedValues(initialDealer, values);
        if (Object.keys(changedValues).length > 0) {
          const formData = new FormData();
          for (const [key, value] of Object.entries(values)) {
            if (key === "_id") {
              formData.append("dealerId", value);
            }
          }
          for (const key in changedValues) {
            if (key === "shoImage" && key !== "_id") {
              formData.append("shoImage", changedValues.shopImage);
            } else if (key !== "_id") {
              formData.append(key, changedValues[key]);
            }
          }
          handleAdddealer(formData);
        } else {
          setLoading(false);
          console.log("nothing to change");
        }
      } else {
        const formData = new FormData();

        for (const [key, value] of Object.entries(values)) {
          formData.append(key, value);
        }

        if (imageObj instanceof File) {
          formData.append("shopImage", imageObj);
        }
        handleAdddealer(formData);
      }
      setTimeout(() => {
        actions.resetForm();
      }, 1500);
      // actions.setErrors();
    },
  });

  const handleInputChangen = (event) => {
    const file = event.target.files[0]; // Get the first file (single image)
    setFieldValue("shopImage", file); // Update Formik field value
    setImageObj(file); // Update state with the file object
    setImage(URL.createObjectURL(file)); // Update state with the preview URL

    console.log("handle input change is running");
    // const files = Array.from(event.target.files);
    // setImages((prevImages) => [...prevImages, ...files]);
    // setImagePreviews((prevPreviews) => [
    //   ...prevPreviews,
    //   ...files.map((file) => URL.createObjectURL(file)),
    // ]);
  };
  //   console.log(values)
  console.log("validation errors", errors);

  const handleCountryChange = (e) => {
    const selectedCountry = e.target.value;
    setFieldValue("country", selectedCountry);
    setFieldValue("state", "");
    setStates(countryStateData[selectedCountry] || []);
  };

  const [showAddDealer, setShowAddDealer] = useState();

  const handleShowDealer = () => {
    setShowAddDealer(!showAddDealer);
  };
  const handleCloseButton = () => {
    setIncludeId(false);
    setShouldFetch(false);
    setShowAddDealer(!showAddDealer);
    setDealerForm({
      firstName: "",
      lastName: "",
      dob: "",
      gender: "",
      occupation: "",
      password: "",
      email: "",
      countryCode: "+91",
      phoneNumber: "",
      alternatePhoneNumber: "",
      //   dateOfJoining: "",
      addressLine1: "",
      addressLine2: "",
      landmark: "",
      city: "",
      country: "",
      state: "",
      pincode: "",
      geoLocationCode: "",
      status: "A",
      repassword: "",
      shopImage: null,
    });
    setImage({});
    setDealerEditId(null);
    setInitialDeaeler(null);
  };
  console.log(values);

  const handleEditDealer = (dealer) => {
    setIncludeId(true);
    setShouldFetch(true);
    setDealerForm({
      ...dealer,
      password: "",
      repassword: "",
      status: dealer.status,
    });
    setInitialDeaeler(dealer);
    setImage(dealer.shopImage);
    setDealerEditId(dealer._id);
    setShowAddDealer(true);
    setStates(countryStateData[dealer.country] || []);

    // console.log(dealer);
  };
  //  console.log("dealer form",dealerForm)
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    dispatch(dealersList(pageNumber));
  };

  {
    /*********************************handeling-deleting-dealer******************************************/
  }

  const [deleteDealerId, setDeleteDealerId] = useState(null);
  const [deletePopup, setShowDeletePopup] = useState(false);

  const handleDeleteButton = (id) => {
    setShowDeletePopup(!deletePopup);
    setDeleteDealerId(id);
  };

  const handleDeleteDealer = () => {
    dispatch(dealerDelete(deleteDealerId));
    dispatch(dealersList());
    setDeleteDealerId(null);
    setShowDeletePopup(false);
  };

  const handleNoButton = () => {
    setShowDeletePopup(false);
  };

  {
    /*********************************handeling-deleting-dealer******************************************/
  }

  return (
    <div className="ml-[20rem] p-3 pl-6 pr-6 font-custom bg-[#F0F0F0] min-h-svh">
      {toast.visible && (
        <Toast message={toast.message} type={toast.type} onClose={closeToast} />
      )}
      {!showAddDealer && (
        <div className="flex justify-between items-center mb-8 mt-3">
          <div className="text-2xl font-medium flex gap-2">
            <img src={box_iocn} alt="box icon" />
            Associated Dealers
          </div>
          <div className="space-x-4">
            <button
              onClick={handleShowDealer}
              className=" text-white px-4 py-2 rounded-md bg-[#A70024] hover:bg-red-700"
            >
              Add Dealer
            </button>
          </div>
        </div>
      )}
      {showAddDealer && (
        <div className="flex justify-between items-center mb-4  ">
          <div className="text-2xl  flex gap-2 font-semibold">
            <img src={box_iocn} alt="box icon" />
            {dealerForm.firstName ? "Edit Dealer" : "Dealer Registration"}
          </div>
          <div className="space-x-4 ">
            <button
              className=" px-4 py-2 rounded text-[#A70024] "
              onClick={handleCloseButton}
            >
              Cancel
            </button>
            <button
              type="submit"
              onClick={handleSubmit}
              className="text-white px-4 py-2 rounded-lg bg-[#A70024] hover:bg-red-700"
            >
              {/* <FaPlus className="inline-block mr-2" /> */}
              {loading ? (
                <Loader1 />
              ) : (
                <p>{dealerForm.firstName ? "Save Changes" : "Save"}</p>
              )}
            </button>
          </div>
        </div>
      )}
      {deletePopup && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg p-9 max-w-md mx-2 font-custom ">
            <h2 className="text-xl font-semibold  mb-3 text-center">
              Are you sure{" "}
            </h2>
            <h2 className="text-sm  mb-5 text-center">
              You want to delete this Dealer?{" "}
            </h2>

            <div className="flex justify-between">
              <button
                onClick={() => handleNoButton()}
                className="bg-zinc-200 text-black px-6 py-2 rounded-md hover:bg-zinc-400 cursor-pointer"
              >
                No
              </button>
              <button
                onClick={() => handleDeleteDealer()}
                className="bg-red-800 text-white px-6 py-2 rounded-md hover:bg-red-700 cursor-pointer"
              >
                Yes
              </button>
            </div>
          </div>
        </div>
      )}

      {showAddDealer ? (
        <>
          <form className=" p-4 rounded-lg  space-y-4 mr-60">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-20">
              <div>
                <label className="block text-sm  text-zinc-600">
                  Dealer First Name
                  <spanc className="text-red-500 text-lg text-center">*</spanc>
                </label>
                <input
                  type="text"
                  name="firstName"
                  value={values.firstName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="mt-1 block w-full border rounded-md px-2 py-2 text-gray-600 focus:outline-blue-900"
                />
                {errors.firstName && touched.firstName && (
                  <p className="text-red-500 text-sm">{errors.firstName}</p>
                )}
              </div>
              <div>
                <label className="block text-sm  text-zinc-600">
                  Dealer Last Name
                  <spanc className="text-red-500 text-lg text-center">*</spanc>
                </label>
                <input
                  type="text"
                  name="lastName"
                  value={values.lastName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="mt-1 block w-full border rounded-md px-2 py-2 text-gray-600 focus:outline-blue-900"
                />
                {errors.lastName && touched.lastName && (
                  <p className="text-red-500 text-sm">{errors.lastName}</p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-20">
              <div>
                <label className="block text-sm  text-zinc-600">
                  Date of Birth
                  <spanc className="text-red-500 text-lg text-center">*</spanc>
                </label>
                <input
                  type="date"
                  name="dob"
                  value={formatDate(values.dob)}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="mt-1 block w-full border rounded-md px-2 py-2 text-gray-600 focus:outline-blue-900"
                />
                {errors.dob && touched.dob && (
                  <p className="text-red-500 text-sm">{errors.dob}</p>
                )}
              </div>
              <div>
                <label className="block text-sm  text-zinc-600">
                  Gender
                  <spanc className="text-red-500 text-lg text-center">*</spanc>
                </label>
                <select
                  name="gender"
                  value={values.gender}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="mt-1 block w-full rounded-md px-2 py-2 text-gray-600 border border-zinc-200 focus:border-blue-900 focus:ring-blue-900 outline-none"
                >
                  <option value="">Select Gender</option>
                  <option value="M">Male</option>
                  <option value="F">Female</option>
                  <option value="O">Other</option>
                </select>
                {errors.gender && touched.gender && (
                  <p className="text-red-500 text-sm">{errors.gender}</p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-20">
              <div>
                <label className="block text-sm  text-zinc-600">
                  Occupation
                  <spanc className="text-red-500 text-lg text-center">*</spanc>
                </label>
                <input
                  type="text"
                  name="occupation"
                  value={values.occupation}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="mt-1 block w-full border rounded-md px-2 py-2 text-gray-600 focus:outline-blue-900"
                />
                {errors.occupation && touched.occupation && (
                  <p className="text-red-500 text-sm">{errors.occupation}</p>
                )}
              </div>
              <div>
                <label className="block text-sm  text-zinc-600">
                  Dealer's Shop Pincode
                  <spanc className="text-red-500 text-lg text-center">*</spanc>
                </label>
                <input
                  type="text"
                  name="pincode"
                  value={values.pincode}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="mt-1 block w-full border rounded-md px-2 py-2 text-gray-600 focus:outline-blue-900"
                />
                {errors.pincode && touched.pincode && (
                  <p className="text-red-500 text-sm">{errors.pincode}</p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-20">
              <div>
                <label className="block text-sm  text-zinc-600">
                  Password
                  <span className="text-red-500 text-lg text-center">*</span>
                </label>
                <input
                  type="password"
                  name="password"
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="mt-1 block w-full border rounded-md px-2 py-2 text-gray-600 focus:outline-blue-900"
                />
                {errors.password && touched.password && (
                  <p className="text-red-500 text-sm">{errors.password}</p>
                )}
              </div>
              <div>
                <label className="block text-sm  text-zinc-600">
                  Confirm Password
                  <spanc className="text-red-500 text-lg text-center">*</spanc>
                </label>
                <input
                  placeholder=""
                  type="password"
                  name="repassword"
                  value={values.repassword}
                  // disabled
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="mt-1 block w-full border rounded-md px-2 py-2 text-gray-600 focus:outline-blue-900"
                />
                {errors.repassword && touched.repassword && (
                  <p className="text-red-500 text-sm">{errors.repassword}</p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-20">
              <div>
                <label className="block text-sm  text-zinc-600">
                  Email
                  <spanc className="text-red-500 text-lg text-center">*</spanc>
                </label>
                <input
                  type="email"
                  name="email"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="mt-1 block w-full border rounded-md px-2 py-2 text-gray-600 focus:outline-blue-900"
                />
                {errors.email && touched.email && (
                  <p className="text-red-500 text-sm">{errors.email}</p>
                )}
              </div>
              <div>
                <label className="block text-sm  text-zinc-600">
                  Phone Number
                  <spanc className="text-red-500 text-lg text-center">*</spanc>
                </label>
                <input
                  type="text"
                  name="phoneNumber"
                  value={values.phoneNumber}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="mt-1 block w-full border rounded-md px-2 py-2 text-gray-600 focus:outline-blue-900"
                />
                {errors.phoneNumber && touched.phoneNumber && (
                  <p className="text-red-500 text-sm">{errors.phoneNumber}</p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-20">
              <div>
                <label className="block text-sm  text-zinc-600">
                  Alternate Phone Number
                  <spanc className="text-red-500 text-lg text-center">*</spanc>
                </label>
                <input
                  type="text"
                  name="alternatePhoneNumber"
                  value={values.alternatePhoneNumber}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="mt-1 block w-full border rounded-md px-2 py-2 text-gray-600 focus:outline-blue-900"
                />
                {errors.alternatePhoneNumber &&
                  touched.alternatePhoneNumber && (
                    <p className="text-red-500 text-sm">
                      {errors.alternatePhoneNumber}
                    </p>
                  )}
              </div>
              <div>
                <label className="block text-sm  text-zinc-600">
                  Date of Joining
                </label>
                <input
                  type="date"
                  name="dateOfJoining"
                  value={values.dateOfJoining}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="mt-1 block w-full border rounded-md px-2 py-2 text-gray-600 focus:outline-blue-900"
                />
                {errors.dateOfJoining && touched.dateOfJoining && (
                  <p className="text-red-500 text-sm">{errors.dateOfJoining}</p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-20">
              <div>
                <label className="block text-sm  text-zinc-600">
                  Address 1
                  <spanc className="text-red-500 text-lg text-center">*</spanc>
                </label>
                <input
                  type="text"
                  name="addressLine1"
                  value={values.addressLine1}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="mt-1 block w-full border rounded-md px-2 py-2 text-gray-600 focus:outline-blue-900"
                />
                {errors.addressLine1 && touched.addressLine1 && (
                  <p className="text-red-500 text-sm">{errors.addressLine1}</p>
                )}
              </div>
              <div>
                <label className="block text-sm  text-zinc-600">
                  Address 2
                </label>
                <input
                  type="text"
                  name="addressLine2"
                  value={values.addressLine2}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="mt-1 block w-full border rounded-md px-2 py-2 text-gray-600 focus:outline-blue-900"
                />
                {errors.addressLine2 && touched.addressLine2 && (
                  <p className="text-red-500 text-sm">{errors.addressLine2}</p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-20">
              <div>
                <label className="block text-sm  text-zinc-600">
                  Landmark
                  <spanc className="text-red-500 text-lg text-center">*</spanc>
                </label>
                <input
                  type="text"
                  name="landmark"
                  value={values.landmark}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="mt-1 block w-full border rounded-md px-2 py-2 text-gray-600 focus:outline-blue-900"
                />
                {errors.landmark && touched.landmark && (
                  <p className="text-red-500 text-sm">{errors.landmark}</p>
                )}
              </div>
              <div>
                <label className="block text-sm  text-zinc-600">
                  City
                  <spanc className="text-red-500 text-lg text-center">*</spanc>
                </label>
                <input
                  type="text"
                  name="city"
                  value={values.city}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="mt-1 block w-full border rounded-md px-2 py-2 text-gray-600 focus:outline-blue-900"
                />
                {errors.city && touched.city && (
                  <p className="text-red-500 text-sm">{errors.city}</p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-20">
              <div>
                <label className="block text-sm  text-zinc-600">
                  Country
                  <spanc className="text-red-500 text-lg text-center">*</spanc>
                </label>
                <select
                  name="country"
                  value={values.country}
                  onChange={handleCountryChange}
                  onBlur={handleBlur}
                  className="mt-1 block w-full rounded-md px-2 py-2 text-gray-600 border border-zinc-200 focus:border-blue-900 focus:ring-blue-900 outline-none"
                >
                  <option value="">Select Country</option>
                  {Object.keys(countryStateData).map((country) => (
                    <option key={country} value={country}>
                      {country}
                    </option>
                  ))}
                </select>
                {errors.country && touched.country && (
                  <p className="text-red-500 text-sm">{errors.country}</p>
                )}
              </div>
              <div>
                <label className="block text-sm  text-zinc-600">
                  State
                  <spanc className="text-red-500 text-lg text-center">*</spanc>
                </label>
                <select
                  name="state"
                  value={values.state}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="mt-1 block w-full rounded-md px-2 py-2 text-gray-600 border border-zinc-200 focus:border-blue-900 focus:ring-blue-900 outline-none"
                >
                  <option value="">Select State</option>
                  {states.map((state) => (
                    <option key={state} value={state}>
                      {state}
                    </option>
                  ))}
                </select>
                {errors.state && touched.state && (
                  <p className="text-red-500 text-sm">{errors.state}</p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-20">
              <div>
                <label className="block text-sm  text-zinc-600">
                  Service Able Pincode
                  <spanc className="text-red-500 text-lg text-center">*</spanc>
                </label>
                <input
                  type="text"
                  name="pincode"
                  value={values.pincode}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="mt-1 block w-full border rounded-md px-2 py-2 text-gray-600 focus:outline-blue-900"
                />
                {errors.pincode && touched.pincode && (
                  <p className="text-red-500 text-sm">{errors.pincode}</p>
                )}
              </div>
              <div>
                <label className="block text-sm  text-zinc-600">
                  Geo Location Code
                  <spanc className="text-red-500 text-lg text-center">*</spanc>
                </label>
                <input
                  type="text"
                  name="geoLocationCode"
                  value={values.geoLocationCode}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="mt-1 block w-full border rounded-md px-2 py-2 text-gray-600 focus:outline-blue-900"
                />
                {errors.geoLocationCode && touched.geoLocationCode && (
                  <p className="text-red-500 text-sm">
                    {errors.geoLocationCode}
                  </p>
                )}
              </div>
            </div>

            {/* selecting shop image */}
            <div className="relative grid grid-cols-1 md:grid-cols-2 gap-20">
              <div className="flex gap-2 mb-4">
                {/* <label className="block text-sm  text-zinc-600">
                Shop Image
                <spanc className="text-red-500 text-lg text-center">*</spanc>
              </label> */}
                {/* <div className="mt-1 block w-full border rounded-md px-2 py-2 text-red-600 focus:outline-blue-900 cursor-pointer"
            onClick={() => document.getElementById("shopimage").click()}
            >{shopimage?"Select Shop Image"}</div> */}
                {/* <input
                type="file"
                name="shopImage"
                value={dealer?.shopImage}
                onChange={(event) => {
                  setFieldValue("shopImage", event.target.files[0]);
                }}
                onBlur={handleBlur}
                className="mt-1 block w-full border rounded-md px-2 py-2 text-red-600 focus:outline-blue-900 cursor-pointer"
              />
              {errors.shopImage && touched.shopImage && (
                <p className="text-red-500 text-sm">{errors.shopImage}</p>
              )} */}
                <div
                  className="mt-1 w-40 h-40 border rounded-md flex items-center justify-center cursor-pointer bg-gray-100 text-red-400 border-neutral-200  hover:border-blue-900"
                  onClick={() => document.getElementById("imageUpload").click()}
                >
                  Shop Image
                  <spanc className="text-red-500 text-lg text-center">*</spanc>
                </div>

                <input
                  type="file"
                  id="imageUpload"
                  onChange={(e) => handleInputChangen(e)}
                  className="hidden"
                />

                {values.shopImage && (
                  <div className="mt-2 flex flex-wrap gap-2">
                    <div className="relative w-40 h-40 border rounded-md p-4 border-neutral-200">
                      <img
                        src={image}
                        // alt={`Product ${index}`}
                        className="object-cover w-full h-full rounded-md"
                      />
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          setFieldValue("shopImage", "");
                          setImage({});
                        }}
                        className="absolute top-1 right-1 text-white  rounded-md p-2  bg-green-500 text-xs"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                )}
              </div>
              <div className="absolute bottom-0 mt-2">
                {" "}
                {errors.shopImage && touched.shopImage && (
                  <p className="text-red-500 text-sm">{errors.shopImage}</p>
                )}{" "}
              </div>
            </div>

            {/* Status */}
            <div className="flex items-center gap-20 mt-4">
              <label className="block text-sm  text-zinc-600">Status</label>
              <div className="flex items-center gap-4">
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    name="status"
                    value="A"
                    checked={values.status === "A"}
                    onChange={handleChange}
                    className="form-radio"
                  />
                  <span className="ml-2">Active</span>
                </label>
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    name="status"
                    value="D"
                    onChange={handleChange}
                    className="form-radio"
                    checked={values.status === "D"}
                  />
                  <span className="ml-2">DeActive</span>
                </label>
              </div>
              {errors.status && touched.status && (
                <p className="text-red-500 text-sm">{errors.status}</p>
              )}
            </div>
          </form>

          <div className="flex justify-between items-center mb-4">
            <div className="text-2xl  flex gap-2"></div>
            <div className="space-x-4">
              <button
                className=" px-4 py-2 rounded text-[#A70024]"
                onClick={handleCloseButton}
              >
                Cancel
              </button>
              <button
                type="submit"
                onClick={handleSubmit}
                className="text-white px-4 py-2 rounded-lg bg-[#A70024] hover:bg-red-700"
              >
                {/* <FaPlus className="inline-block mr-2" /> */}
                {loading ? (
                  <Loader1 />
                ) : (
                  <p>{dealerForm.firstName ? "Save Changes" : "Save"}</p>
                )}
              </button>
            </div>
          </div>
        </>
      ) : (
        <div className="bg-white rounded-lg shadow overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 bg-neutral-200">
            <thead className="bg-[#5C5C5C]">
              <tr>
                {/* <th className="px-6 py-3 text-left text-xs  text-white font-bold uppercase tracking-wider">
                <input type="checkbox" name="" id="" />
              </th> */}
                <th className="px-6 py-3 text-left text-xs  text-white font-bold  tracking-wider">
                  No
                </th>
                <th className="px-6 py-3 text-left text-xs  text-white font-bold  tracking-wider">
                  Id
                </th>
                <th className="px-6 py-3 text-left text-xs  text-white font-bold  tracking-wider">
                  Name & Phone No
                </th>
                <th className="px-6 py-3 text-left text-xs  text-white font-bold  tracking-wider">
                  Address
                </th>
                <th className="px-6 py-3 text-left text-xs  text-white font-bold  tracking-wider">
                  Serviceable Pincode
                </th>
                <th className="px-6 py-3 text-left text-xs  text-white font-bold  tracking-wider">
                  Inventory
                </th>
                <th className="px-6 py-3 text-left text-xs  text-white font-bold  tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs  text-white font-bold  tracking-wider">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {dealers.map((dealer, index) => (
                <tr
                  key={dealer._id}
                  className={index % 2 === 0 ? "" : "bg-[#F0F0F0]"}
                >
                  {/* <td className="px-6 py-4 whitespace-nowrap outline-none bg-transparent">
                  <input type="checkbox" name="" id="" />
                </td> */}

                  <td className="px-6 py-4 whitespace-nowrap">
                    {index + 1 + (currentPage - 1) * 10}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {dealer._id.slice(0, 6)}
                  </td>
                  <td className="px-6 py-4 ">
                    {dealer.firstName} {dealer.lastName} {dealer.phoneNumber}
                  </td>
                  <td className="px-6 py-4 ">{dealer.addressLine2}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <p>serviceLocations</p>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {dealer.quantity}
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`text-${
                        dealer.status === "A" ? "green" : "red"
                      }-500`}
                    >
                      {dealer.status === "A" ? <p>Active</p> : <p>DeActive</p>}
                    </span>
                  </td>
                  <td className="px-1  py-4 whitespace-nowrap">
                    <button
                      onClick={() => handleEditDealer(dealer)}
                      className="text-blue-500 mr-2"
                    >
                      <img src={edit} alt="" className="h-7 w-10" />
                    </button>
                    <button
                      onClick={() => {
                        handleDeleteButton(dealer._id);
                      }}
                      className="text-red-500"
                    >
                      <img src={delete1} alt="" className="h-7 w-10" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {dealersStatus === "succeeded" && (
            <Pagination
              totalProducts={dealersItems.data.total}
              productsPerPage={dealersItems.data.limit}
              onPageChange={handlePageChange}
              currentPage={currentPage}
            />
          )}
        </div>
      )}
      {dealerEditId && (
        <DealerServiceLocations
          shouldFetch={shouldFetch}
          dealerId={dealerEditId}
        />
      )}
    </div>
  );
};

export default DealerForm;
