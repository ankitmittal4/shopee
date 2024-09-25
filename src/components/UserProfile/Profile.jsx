// import React, { useState } from 'react';
// import { useFormik } from 'formik';
// import * as Yup from 'yup';
// import { useDispatch } from 'react-redux';
// // import { login } from './authSlice'; // Adjust the import based on your project structure
// import { useNavigate } from 'react-router-dom';

// const Profile = () => {
//   const [activeTab, setActiveTab] = useState('profile');
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const profileSchema = Yup.object({
//     firstName: Yup.string().required('Required'),
//     lastName: Yup.string().required('Required'),
//     phoneNumber: Yup.string().required('Required'),
//     email: Yup.string().email('Invalid email address').required('Required'),
//     password: Yup.string().min(6, 'Password must be at least 6 characters').required('Required'),
//   });

//   const {
//     values,
//     errors,
//     touched,
//     handleBlur,
//     handleChange,
//     handleSubmit,
//   } = useFormik({
//     initialValues: {
//       firstName: '',
//       lastName: '',
//       phoneNumber: '',
//       email: '',
//       password: '',
//       gender: '',
//     },
//     validationSchema: profileSchema,
//     onSubmit: (values) => {
//     //   dispatch(login(values)).then(() => {
//     //     navigate('/');
//     //   });
//     },
//   });

//   const handleTabChange = (tab) => {
//     setActiveTab(tab);
//   };

//   return (
//     <div className="flex min-h-screen">
        
//       {/* Sidebar */}
//       <div className="w-64 bg-gray-100 p-4">
//         <ul>
//           <li
//             className={`flex items-center cursor-pointer p-2 ${activeTab === 'profile' && 'bg-green-200'}`}
//             onClick={() => handleTabChange('profile')}
//           >
//             <span className="mr-2">👤</span> Profile
//           </li>
//           <li
//             className={`cursor-pointer p-2 ${activeTab === 'orders' && 'bg-green-200'}`}
//             onClick={() => handleTabChange('orders')}
//           >
//             My Orders
//           </li>
//           <li
//             className={`cursor-pointer p-2 ${activeTab === 'payments' && 'bg-green-200'}`}
//             onClick={() => handleTabChange('payments')}
//           >
//             Payment
//           </li>
//           <li
//             className={`cursor-pointer p-2 ${activeTab === 'wishlist' && 'bg-green-200'}`}
//             onClick={() => handleTabChange('wishlist')}
//           >
//             Wish List
//           </li>
//           <li
//             className={`cursor-pointer p-2 ${activeTab === 'address' && 'bg-green-200'}`}
//             onClick={() => handleTabChange('address')}
//           >
//             Address
//           </li>
//           <li
//             className={`cursor-pointer p-2 ${activeTab === 'logout' && 'bg-green-200'}`}
//             onClick={() => handleTabChange('logout')}
//           >
//             Logout
//           </li>
//         </ul>
//       </div>

//       {/* Main Content */}
//       <div className="flex-1 p-6">
//         {activeTab === 'profile' && (
//           <div>
//             <form onSubmit={handleSubmit}>
//               <div className="grid grid-cols-2 gap-4">
//                 <div>
//                   <label htmlFor="firstName" className="block text-sm text-green-600/80">
//                     FIRST NAME
//                   </label>
//                   <input
//                     type="text"
//                     id="firstName"
//                     name="firstName"
//                     className="w-full px-3 py-2 border border-green-600/30 bg-green-600/5 outline-green-600 rounded-md"
//                     value={values.firstName}
//                     onChange={handleChange}
//                     onBlur={handleBlur}
//                   />
//                   {errors.firstName && touched.firstName ? (
//                     <p className="text-red-500 text-xs italic">{errors.firstName}</p>
//                   ) : null}
//                 </div>

//                 <div>
//                   <label htmlFor="lastName" className="block text-sm text-green-600/80">
//                     LAST NAME
//                   </label>
//                   <input
//                     type="text"
//                     id="lastName"
//                     name="lastName"
//                     className="w-full px-3 py-2 border border-green-600/30 bg-green-600/5 outline-green-600 rounded-md"
//                     value={values.lastName}
//                     onChange={handleChange}
//                     onBlur={handleBlur}
//                   />
//                   {errors.lastName && touched.lastName ? (
//                     <p className="text-red-500 text-xs italic">{errors.lastName}</p>
//                   ) : null}
//                 </div>

//                 <div>
//                   <label htmlFor="phoneNumber" className="block text-sm text-green-600/80">
//                     PHONE NUMBER
//                   </label>
//                   <input
//                     type="text"
//                     id="phoneNumber"
//                     name="phoneNumber"
//                     className="w-full px-3 py-2 border border-green-600/30 bg-green-600/5 outline-green-600 rounded-md"
//                     value={values.phoneNumber}
//                     onChange={handleChange}
//                     onBlur={handleBlur}
//                   />
//                   {errors.phoneNumber && touched.phoneNumber ? (
//                     <p className="text-red-500 text-xs italic">{errors.phoneNumber}</p>
//                   ) : null}
//                   <button type="button" className="text-sm text-blue-600">Edit</button>
//                 </div>

//                 <div>
//                   <label htmlFor="email" className="block text-sm text-green-600/80">
//                     EMAIL
//                   </label>
//                   <input
//                     type="email"
//                     id="email"
//                     name="email"
//                     className="w-full px-3 py-2 border border-green-600/30 bg-green-600/5 outline-green-600 rounded-md"
//                     value={values.email}
//                     onChange={handleChange}
//                     onBlur={handleBlur}
//                   />
//                   {errors.email && touched.email ? (
//                     <p className="text-red-500 text-xs italic">{errors.email}</p>
//                   ) : null}
//                 </div>

//                 <div>
//                   <label htmlFor="password" className="block text-sm text-green-600/80">
//                     PASSWORD
//                   </label>
//                   <input
//                     type="password"
//                     id="password"
//                     name="password"
//                     className="w-full px-3 py-2 border border-green-600/30 bg-green-600/5 outline-green-600 rounded-md"
//                     value={values.password}
//                     onChange={handleChange}
//                     onBlur={handleBlur}
//                   />
//                   {errors.password && touched.password ? (
//                     <p className="text-red-500 text-xs italic">{errors.password}</p>
//                   ) : null}
//                   <button type="button" className="text-sm text-blue-600">Change</button>
//                 </div>

//                 <div>
//                   <label className="block text-sm text-green-600/80">GENDER</label>
//                   <div className="flex items-center">
//                     <input
//                       type="radio"
//                       id="male"
//                       name="gender"
//                       value="male"
//                       checked={values.gender === 'male'}
//                       onChange={handleChange}
//                       className="mr-2"
//                     />
//                     <label htmlFor="male" className="mr-4">Male</label>
//                     <input
//                       type="radio"
//                       id="female"
//                       name="gender"
//                       value="female"
//                       checked={values.gender === 'female'}
//                       onChange={handleChange}
//                       className="mr-2"
//                     />
//                     <label htmlFor="female">Female</label>
//                   </div>
//                 </div>
//               </div>

//               <button type="submit" className="mt-4 px-4 py-2 bg-green-600 text-white rounded-md">
//                 Save Changes
//               </button>
//             </form>
//           </div>
//         )}

//         {activeTab === 'orders' && (
//           <div>
//             <div className="flex justify-between items-center mb-4">
//               <h2 className="text-lg">Account / My Orders</h2>
//               <select className="border px-2 py-1 rounded-md">
//                 <option>Sort by</option>
//                 <option>On the way</option>
//                 <option>Delivered</option>
//                 <option>Cancelled</option>
//                 <option>Returned</option>
//               </select>
//             </div>
//             <div className="grid gap-4">
//               {/* Mock order list */}
//               <div className="border p-4 rounded-md flex justify-between items-center">
//                 <div>
//                   <h3 className="text-lg">Product Name</h3>
//                   <p>Status: Delivered</p>
//                 </div>
//                 <div className="text-right">
//                   <p>Date: 2023-08-04</p>
//                   <button className="text-sm text-blue-600">Rate</button>
//                 </div>
//               </div>
//               {/* Repeat above div for each order */}
//             </div>
//           </div>
//         )}

//         {activeTab === 'payments' && <div>Payment content goes here</div>}
//         {activeTab === 'wishlist' && (
//           <div>
//             <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
//               {/* Mock wishlist items */}
//               <div className="border p-4 rounded-md">
//                 <h3 className="text-lg">Product Name</h3>
//                 <button className="text-sm text-red-600 mt-2">Remove</button>
//               </div>
//               {/* Repeat above div for each wishlist item */}
//             </div>
//           </div>
//         )}
//         {activeTab === 'address' && <div>Address content goes here</div>}
//         {activeTab === 'logout' && <div>Logout content goes here</div>}
//       </div>
//     </div>
//   );
// };

// export default Profile;


import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Sidebar from './Sidebar';
import ProfileForm from './ProfileForm';
import MyOrders from './MyOrders';
import Payment from './Payment';
import Wishlist from './Wishlist';
import Address from './Address';
// import Logout from './Logout';

const Profile = () => {
  return (
    <div className="flex flex-col lg:flex-row pt-20">
      <Sidebar />
      <main className="flex-1 p-4">
        <Routes>
          <Route path="" element={<ProfileForm/>} />
          <Route path="orders" element={<MyOrders />} />
          <Route path="payment" element={<Payment />} />
          <Route path="wishlist" element={<Wishlist />} />
          <Route path="address" element={<Address />} />
          {/* <Route path="logout" element={<Logout />} /> */}
        </Routes>
      </main>
    </div>
  );
};

export default Profile;

// import React, { useState } from 'react';
// import Sidebar from './Sidebar';
// import ProfileForm from './ProfileForm';
// import MyOrders from './MyOrders';
// import Payment from './Payment';
// import Wishlist from './Wishlist';
// import Address from './Address';
// // import Logout from './Logout';

// const Profile = () => {
//   const [activeTab, setActiveTab] = useState('profile');

//   const renderContent = () => {
//     switch (activeTab) {
//       case 'profile':
//         return <ProfileForm />;
//       case 'orders':
//         return <MyOrders />;
//       case 'payments':
//         return <Payment />;
//       case 'wishlist':
//         return <Wishlist />;
//       case 'address':
//         return <Address />;
//     //   case 'logout':
//     //     return <Logout />;
//       default:
//         return <ProfileForm />;
//     }
//   };

//   return (
//     <div className="flex min-h-screen">
//       <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
//       <div className="flex-1 p-6">
//         {renderContent()}
//       </div>
//     </div>
//   );
// };

// export default Profile;

// import React, { useState } from 'react';
// import { FaUser, FaShoppingBag, FaCreditCard, FaHeart, FaMapMarkerAlt, FaSignOutAlt } from 'react-icons/fa';
// import ProfileForm from './ProfileForm';
// import MyOrders from './MyOrders';
// import Payment from './Payment';
// import Wishlist from './Wishlist';
// import Address from './Address';
// // import Logout from './Logout';

// const Profile = () => {
//   const [activeTab, setActiveTab] = useState('profile');

//   const handleTabChange = (tab) => {
//     setActiveTab(tab);
//   };

//   const renderTabContent = () => {
//     switch (activeTab) {
//       case 'profile':
//         return <ProfileForm />;
//       case 'orders':
//         return <MyOrders />;
//       case 'payments':
//         return <Payment />;
//       case 'wishlist':
//         return <Wishlist />;
//       case 'address':
//         return <Address />;
//     //   case 'logout':
//     //     return <Logout />;
//       default:
//         return <ProfileForm />;
//     }
//   };

//   return (
//     <div className="flex min-h-screen">
//       {/* Sidebar */}
//       <div className="w-64 bg-gray-100 p-4">
//         <ul>
//           <li
//             className={`flex items-center cursor-pointer p-2 ${activeTab === 'profile' && 'bg-green-200'}`}
//             onClick={() => handleTabChange('profile')}
//           >
//             <FaUser className="mr-2" /> Profile
//           </li>
//           <li
//             className={`flex items-center cursor-pointer p-2 ${activeTab === 'orders' && 'bg-green-200'}`}
//             onClick={() => handleTabChange('orders')}
//           >
//             <FaShoppingBag className="mr-2" /> My Orders
//           </li>
//           <li
//             className={`flex items-center cursor-pointer p-2 ${activeTab === 'payments' && 'bg-green-200'}`}
//             onClick={() => handleTabChange('payments')}
//           >
//             <FaCreditCard className="mr-2" /> Payment
//           </li>
//           <li
//             className={`flex items-center cursor-pointer p-2 ${activeTab === 'wishlist' && 'bg-green-200'}`}
//             onClick={() => handleTabChange('wishlist')}
//           >
//             <FaHeart className="mr-2" /> Wish List
//           </li>
//           <li
//             className={`flex items-center cursor-pointer p-2 ${activeTab === 'address' && 'bg-green-200'}`}
//             onClick={() => handleTabChange('address')}
//           >
//             <FaMapMarkerAlt className="mr-2" /> Address
//           </li>
//           <li
//             className={`flex items-center cursor-pointer p-2 ${activeTab === 'logout' && 'bg-green-200'}`}
//             onClick={() => handleTabChange('logout')}
//           >
//             <FaSignOutAlt className="mr-2" /> Logout
//           </li>
//         </ul>
//       </div>

//       {/* Main Content */}
//       <div className="flex-1 p-6">
//         {renderTabContent()}
//       </div>
//     </div>
//   );
// };

// export default Profile;


