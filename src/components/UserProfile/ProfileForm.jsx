import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { getUserDetails, updateUserDetails } from "../../features/authSlice";
import { IoIosArrowDown } from "react-icons/io";
import Toast from "../Tost/Tosts";

const ProfileForm = () => {
  const dispatch = useDispatch();

  const {
    userData,
    userStatus,
    updateUserStatus,
    updateUserSuccess,
    updatedData,
    updateUserMsg,
  } = useSelector((state) => state.auth);

  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    email: "",
    password: "",
    gender: "",
  });

  const [isEditable, setIsEditable] = useState({
    firstName: false,
    lastName: false,
    phoneNumber: false,
    email: false,
    password: false,
  });

  useEffect(() => {
    if (userStatus === "idle") {
      dispatch(getUserDetails());
    }
  }, [dispatch, userStatus]);

  useEffect(() => {
    if (userData) {
      setUser({
        firstName: userData.data.firstName || "",
        lastName: userData.data.lastName || "",
        phoneNumber: userData.data.phoneNumber || "",
        email: userData.data.email || "",
        password: "**********", // Set a placeholder password or handle it differently
        gender: userData.data.gender || "",
      });
    }
  }, [userData]);

  const [toast, setToast] = useState({
    visible: false,
    message: "",
    type: "",
  });

  useEffect(() => {
    if (updateUserStatus === "succeeded") {
      setToast({
        visible: true,
        message: updateUserMsg,
        type: updateUserSuccess ? "success" : "danger",
      });

      if (updateUserSuccess) {
        setTimeout(() => {
          setToast({ visible: false, message: "", type: "" });
        }, 3000);
      } else {
        setTimeout(() => {
          setToast({ visible: false, message: "", type: "" });
        }, 3000);
      }
    } else if (updateUserStatus === "failed") {
      setToast({
        visible: true,
        message: updateUserMsg,
        type: "danger",
      });
    }
  }, [updateUserStatus, updateUserSuccess, updateUserMsg]);

  const closeToast = () => {
    setToast({ visible: false, message: "", type: "" });
  };

  const profileSchema = Yup.object({
    firstName: Yup.string().required("Required"),
    lastName: Yup.string().required("Required"),
    phoneNumber: Yup.string().required("Required"),
    email: Yup.string().email("Invalid email address").required("Required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Required"),
  });

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: user,
      validationSchema: profileSchema,
      onSubmit: (values) => {
        const userdata = {
          phoneNumber: values.phoneNumber,
          gender: values.gender,
          password: values.password,
        };
        dispatch(updateUserDetails(userdata));
      },
      enableReinitialize: true,
    });

  const handleEditClick = (field) => {
    setIsEditable((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };
  console.log(updateUserMsg);
  return (
    <div>
      {userStatus === "succeeded" ? (
        <form
          onSubmit={handleSubmit}
          className="bg-white p-4 space-y-4 mx-20 font-custom"
        >
          {toast.visible && (
            <Toast 
              message={toast.message}
              type={toast.type}
              onClose={closeToast}
            />
          )}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="firstName"
                className="block text-sm text-green-600/80"
              >
                FIRST NAME
              </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                className="w-full px-3 py-2 border border-green-600/30 bg-green-600/5 outline-green-600 rounded-md"
                value={values.firstName}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.firstName && touched.firstName ? (
                <p className="text-red-500 text-xs italic">
                  {errors.firstName}
                </p>
              ) : null}
            </div>

            <div>
              <label
                htmlFor="lastName"
                className="block text-sm text-green-600/80"
              >
                LAST NAME
              </label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                className="w-full px-3 py-2 border border-green-600/30 bg-green-600/5 outline-green-600 rounded-md"
                value={values.lastName}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.lastName && touched.lastName ? (
                <p className="text-red-500 text-xs italic">{errors.lastName}</p>
              ) : null}
            </div>

            <div>
              <div className="flex justify-between">
                <label
                  htmlFor="phoneNumber"
                  className="block text-sm text-green-600/80"
                >
                  PHONE NUMBER
                </label>
                <button
                  type="button"
                  className="text-sm text-orange-500 "
                  onClick={() => handleEditClick("phoneNumber")}
                >
                  {isEditable.phoneNumber ? "Save" : "Edit"}
                </button>
              </div>

              <input
                type="text"
                id="phoneNumber"
                name="phoneNumber"
                className="w-full px-3 py-2 border border-green-600/30 bg-green-600/5 outline-green-600 rounded-md"
                value={values.phoneNumber}
                onChange={handleChange}
                onBlur={handleBlur}
                readOnly={!isEditable.phoneNumber}
              />
              {errors.phoneNumber && touched.phoneNumber ? (
                <p className="text-red-500 text-xs italic">
                  {errors.phoneNumber}
                </p>
              ) : null}
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm text-green-600/80"
              >
                EMAIL
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="w-full px-3 py-2 border border-green-600/30 bg-green-600/5 outline-green-600 rounded-md"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.email && touched.email ? (
                <p className="text-red-500 text-xs italic">{errors.email}</p>
              ) : null}
            </div>

            <div>
              <div className="flex justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm text-green-600/80"
                >
                  PASSWORD
                </label>
                <button
                  type="button"
                  className="text-sm text-orange-500 "
                  onClick={() => handleEditClick("password")}
                >
                  {isEditable.password ? "Save" : "Edit"}
                </button>
              </div>
              <input
                type="password"
                id="password"
                name="password"
                className="w-full px-3 py-2 border border-green-600/30 bg-green-600/5 outline-green-600 rounded-md"
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
                readOnly={!isEditable.password}
              />
              {errors.password && touched.password ? (
                <p className="text-red-500 text-xs italic">{errors.password}</p>
              ) : null}
            </div>

            <div>
              <label className="block text-sm text-green-600/80">GENDER</label>
              <div className="flex items-center mt-3">
                <input
                  type="radio"
                  id="male"
                  name="gender"
                  value="M"
                  checked={values.gender === "M"}
                  onChange={handleChange}
                  className="mr-2  h-4 w-4 "
                />
                <label htmlFor="male" className="mr-4">
                  Male
                </label>
                <input
                  type="radio"
                  id="female"
                  name="gender"
                  value="F"
                  checked={values.gender === "F"}
                  onChange={handleChange}
                  className="mr-2 h-4 w-4"
                />
                <label htmlFor="female">Female</label>
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="mt-4 px-4 py-2 bg-green-500 text-white rounded-md font-custom"
          >
            {updateUserStatus === "loading" ? (
              <p>Loading...</p>
            ) : (
              <p>Save Changes</p>
            )}
          </button>
        </form>
      ) : (
        <p>loading......</p>
      )}
    </div>
  );
};

export default ProfileForm;
