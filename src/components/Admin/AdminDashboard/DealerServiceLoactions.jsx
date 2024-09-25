import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { dealersList } from "../../../features/Admin/adminProductlistSlice";
import { FaEdit, FaSearch, FaTrash } from "react-icons/fa";
import Select from "react-select";
import { CiSearch } from "react-icons/ci";
import { dealerLinking } from "../../../features/Admin/Dealer/dealerAddSlice";
import * as Yup from "yup";
import Loader1 from "../../Loaders/Loader1";
import { locationList } from "../../../features/Admin/Dealer/DealerServiceLocations";
import { useFormik } from "formik";
import axios from "axios";
import { useLocation } from "react-router-dom";

function DealerServiceLocations({ dealerId, shouldFetch }) {
  const [inputValue, setInputValue] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [states, setStates] = useState([]);
  const [Locations, setLocations] = useState([]);
  const [filteredLocations, setFilteredLocations] = useState([]);

  const dispatch = useDispatch();

  const { isLocationLoading, locations, locationsStatus } = useSelector(
    (state) => state.locationlist
  );

  const [pincode, setPincode] = useState("");
  const [locationData, setLocationData] = useState(null);

  useEffect(() => {
    if (shouldFetch) {
      dispatch(locationList(dealerId));
    }
  }, [dispatch, shouldFetch]);

  console.log("location status: " + locationsStatus);
  console.log(dealerId);

  useEffect(() => {
    if (locations && locations.data) {
      setLocations(locations.data.serviceLocations);
      setFilteredLocations(locations.data.serviceLocations);
    }
  }, [dispatch, locationsStatus, locations, locations.data]);

  // console.log(filteredLocations);
  // console.log(Locations);

  const [selectedOptions, setSelectedOptions] = useState(null);

  const dealerOptions = Locations.map((location) => ({
    value: location._id,
    label: `${location._id.slice(-6)} - ${location.pincode}`,
  }));

  const handleChangeSearch = (selected) => {
    setSelectedOptions(selected || []);
    if (selected === null || selected.length === 0) {
      handleClear();
    }
  };

  const handleSearch = () => {
    if (selectedOptions?.length > 0) {
      const filteredLocations = Locations.filter((location) =>
        selectedOptions.some((option) => location._id === option.value)
      );
      setFilteredLocations(filteredLocations);
      console.log("Selected Dealers:", selectedOptions);
    } else {
      setFilteredLocations(Locations);
    }
  };

  const handleClear = () => {
    setSelectedOptions([]);
    setFilteredLocations(Locations); // Reset to full list on clearing search
  };

  const handleEditDealer = (dealer) => {
    // setDealerForm(dealer);
    // setShowAddDealer(true);
    // console.log(dealer);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    dispatch(dealersList(pageNumber));
  };

  const [showPopup, setShowPopup] = useState(false);
  const [units, setUnits] = useState(null);
  const [addDealerMsg, setAddDealerMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const validationSchema = Yup.object().shape({
    pincode: Yup.number().required("Enter pincode"),
    locationName: Yup.string().required("Enter location name"),
    state: Yup.string().required("Enter state"),
  });

  const locationInfo = {
    pincode: "",
    locationName: "",
    state: "",
    dealerId: dealerId,
  };
  const {
    values,
    errors,
    touched,
    handleBlur,
    handleChange,
    handleSubmit,
    setFieldValue,
  } = useFormik({
    validationSchema: validationSchema,
    initialValues: locationInfo,
    onSubmit: async (values, action) => {
      setLoading(true);
      try {
        let headersList = {
          Authorization: localStorage.getItem("admin-token"),
        };
        let reqOptions = {
          url: "http://3.6.127.143/api/serviceLocation/add",
          method: "POST",
          headers: headersList,
          data: values,
        };

        let response = await axios.request(reqOptions);

        const isSuccess = response.data.success;

        if (isSuccess) {
          setSuccess(true);
        }

        await dispatch(locationList(dealerId));

        console.log("location added successfully", response);
        setLoading(false);
        setTimeout(() => {
          handleCancelButton();
        }, 3000);
      } catch (error) {
        console.log("error while adding location", error);
        setLoading(false);
        handleCancelButton();
      } finally {
        action.resetForm();
        // setSuccess(false);
      }
    },
  });
  console.log(values);

  const handleAddLocationButtonClick = () => {
    setShowPopup(!showPopup);
  };

  const handleCancelButton = () => {
    setShowPopup(false);
    setSuccess(false);
  };

  const handleDeleteLocation = async () => {
    setLoading(true);
    try {
      let headersList = {
        Authorization: localStorage.getItem("admin-token"),
      };
      let reqOptions = {
        url: "http://3.6.127.143/api/serviceLocation/delete",
        method: "POST",
        headers: headersList,
        data: {
          serviceLocationId: deleteLocationId,
        },
      };

      let response = await axios.request(reqOptions);
      const isSuccess = response.data.success;
      if (isSuccess) {
        setSuccess(true);
      }

      await dispatch(locationList(dealerId));

      console.log("location deleted successfully", response);
      setLoading(false);
      setTimeout(() => {
        handleNoButton();
      }, 3000);
    } catch (error) {
      console.log("error while deleting location", error);
      setSuccess(false);
      setLoading(false);
    }
  };
  const [deleteLocationId, setDeleteLocationId] = useState(null);
  const [deletePopup, setShowDeletePopup] = useState(false);

  const handleDeleteButton = (id) => {
    setShowDeletePopup(!deletePopup);
    setDeleteLocationId(id);
  };

  const handleNoButton = () => {
    setShowDeletePopup(false);
    setSuccess(false);
  };

  return (
    // <div className="font-custom mt-4">
    //   {showPopup && (
    //     <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
    //       <div className="bg-zinc-200 rounded-lg p-6   max-w-md mx-4 ">
    //         {!success &&
    //           !loading &&(
    //             <>
    //               <h2 className="text-xl font-semibold font-custom text-center  mb-4">
    //                 Enter Pincode Details
    //               </h2>
    //               <div className="w-full">
    //                 <input
    //                   required
    //                   name="pincode"
    //                   value={values.pincode}
    //                   onChange={handleChange}
    //                   onBlur={handleBlur}
    //                   type="text"
    //                   placeholder="Enter Pincode"
    //                   className="w-full border border-gray-300 rounded-md px-3 py-2 mb-2 outline-none hover:border-green-500 bg-transparent"
    //                 />
    //                 {errors.pincode && touched.pincode && (
    //                   <p className="text-red-500 text-sm">{errors.pincode}</p>
    //                 )}
    //               </div>
    //               <div className="w-full">
    //                 <input
    //                   required
    //                   name="locationName"
    //                   value={values.locationName}
    //                   onChange={handleChange}
    //                   onBlur={handleBlur}
    //                   type="text"
    //                   placeholder="Enter Location Name"
    //                   className="w-full border border-gray-300 rounded-md px-3 py-2 mb-2 outline-none hover:border-green-500 bg-transparent"
    //                 />
    //                 {errors.locationName && touched.locationName && (
    //                   <p className="text-red-500 text-sm">
    //                     {errors.locationName}
    //                   </p>
    //                 )}
    //               </div>
    //               <div className="w-full">
    //                 <input
    //                   required
    //                   name="state"
    //                   value={values.state}
    //                   onChange={handleChange}
    //                   onBlur={handleBlur}
    //                   type="text"
    //                   placeholder="Enter State"
    //                   className="w-full border border-gray-300 rounded-md px-3 py-2 mb-2 outline-none hover:border-green-500 bg-transparent"
    //                 />
    //                 {errors.state && touched.state && (
    //                   <p className="text-red-500 text-sm">{errors.state}</p>
    //                 )}
    //               </div>
    //               <div className="flex justify-between">
    //                 <button
    //                   onClick={handleCancelButton}
    //                   className=" text-red-500 px-3 py-2 rounded-md"
    //                 >
    //                   Cancel
    //                 </button>
    //                 <button
    //                   type="submit"
    //                   onClick={handleSubmit}
    //                   className="bg-green-500 text-white px-3 py-2  ml-20 rounded-md min-w-16"
    //                 >
    //                   {" "}
    //                   Add Location
    //                 </button>
    //               </div>
    //             </>
    //           )}
    //         {loading  &&  (
    //           <div className="flex justify-center items-center">
    //             <Loader1 />
    //           </div>
    //         )}
    //         {!loading && success && (
    //           <div className="text-center">
    //             <p>The location has been added with dealer.</p>
    //           </div>
    //         )}
    //       </div>
    //     </div>
    //   )}
    //   {deletePopup && (
    //     <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
    //       <div className="bg-zinc-200 rounded-lg p-6 max-w-md mx-2 font-custom ">
    //         {!success && !loading && (
    //           <>
    //             <h2 className="text-xl font-semibold  mb-3 text-center">
    //               Are you sure ?{" "}
    //             </h2>
    //             <h2 className="text-sm  mb-3 text-center">
    //               You want to delete this dealer ?{" "}
    //             </h2>
    //             <div className="flex justify-between">
    //               <button
    //                 onClick={() => handleNoButton()}
    //                 className="bg-green-500 text-white px-4 py-1 rounded-md hover:bg-green-600 cursor-pointer"
    //               >
    //                 No
    //               </button>
    //               <button
    //                 onClick={() => handleDeleteLocation()}
    //                 className="bg-red-500 text-white px-4 py-1 rounded-md hover:bg-red-600 cursor-pointer"
    //               >
    //                 yes
    //               </button>
    //             </div>
    //           </>
    //         )}
    //         {loading && (
    //           <div className="flex justify-center items-center">
    //             <Loader1 />
    //           </div>
    //         )}
    //         {!loading && success && (
    //           <p>The location has been deleted successfully</p>
    //         )}
    //       </div>
    //     </div>
    //   )}

    //   <div className="flex justify-between items-center mb-4">
    //     <div className="mb-3 font-medium flex gap-2">
    //       <div className="rounded-full min-w-12 ">
    //         <Select
    //           isMulti
    //           options={dealerOptions}
    //           value={selectedOptions}
    //           onChange={handleChangeSearch}
    //           className="basic-multi-select text-sm"
    //           classNamePrefix="select"
    //           placeholder="Search by ID or Pincode."
    //           styles={{
    //             control: (baseStyles, state) => ({
    //               ...baseStyles,

    //               borderRadius: 18,
    //               minWidth: 200,
    //             }),
    //           }}
    //         />
    //       </div>

    //       {/* <button onClick={handleClear} className=" text-xl hover:scale-125">
    //         clear
    //       </button> */}
    //       <button onClick={handleSearch} className=" text-xl hover:scale-125">
    //         <CiSearch />
    //       </button>
    //     </div>
    //     <div className="space-x-4">
    //       <button
    //         className="bg-orange-400 text-white px-4 py-2 rounded-lg hover:bg-green-500"
    //         onClick={() => handleAddLocationButtonClick()}
    //       >
    //         Add Location
    //       </button>
    //     </div>
    //   </div>
    //   <div className="bg-white rounded-lg shadow overflow-x-auto">
    //     <table className="min-w-full divide-y divide-gray-200 bg-neutral-200">
    //       <thead>
    //         <tr>
    //           <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
    //             No
    //           </th>
    //           <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
    //             PINCODE
    //           </th>
    //           <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
    //             LOCATION NAME
    //           </th>
    //           <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
    //             STATE
    //           </th>
    //           <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
    //             Action
    //           </th>
    //         </tr>
    //       </thead>
    //       <tbody className="bg-white divide-y divide-gray-200">
    //         {filteredLocations.map((location, index) => (
    //           <tr key={location._id}>
    //             <td className="px-6 py-4 whitespace-nowrap">{index + 1}</td>
    //             {/* <td className="px-6 py-4 whitespace-nowrap">
    //               {location._id.slice(0, 6)}
    //             </td>
    //             <td className="px-6 py-4 ">
    //               {dealer.firstName} {dealer.lastName} {dealer.phoneNumber}
    //             </td> */}
    //             <td className="px-6 py-4 ">{location.pincode}</td>

    //             <td className="px-6 py-4 whitespace-nowrap">
    //               {location.locationName}
    //             </td>
    //             <td className="px-6 py-4 whitespace-nowrap">
    //               {location.state}
    //             </td>

    //             <td className="px-6 py-4 whitespace-nowrap">
    //               <button className="text-blue-500 mr-2">
    //                 <FaEdit />
    //               </button>
    //               <button
    //                 className="text-red-500"
    //                 onClick={() => handleDeleteButton(location._id)}
    //               >
    //                 <FaTrash />
    //               </button>
    //             </td>
    //           </tr>
    //         ))}
    //       </tbody>
    //     </table>
    //     {/* {dealersStatus === "succeeded" && (
    //     <Pagination
    //       totalProducts={dealersItems.data.total}
    //       productsPerPage={dealersItems.data.limit}
    //       onPageChange={handlePageChange}
    //       currentPage={currentPage}
    //     />
    //   )} */}
    //   </div>
    // </div>
    <></>
  );
}

export default DealerServiceLocations;
