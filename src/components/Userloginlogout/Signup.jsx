import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import ReactDOM from "react-dom";
import SliderWrapper from "../Homepage/_SlickSliderStyle";
import logo from "..//..//Assets/logo.svg";
import loginBg from "..//..//Assets/Login-BG.jpg";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { signUp } from "../../features/authSlice";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import Toast from "../Tost/Tosts";

const SignUp = () => {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);
  const dispatch = useDispatch();

  const {
    isLoading,
    error,
    token,
    user,
    authStatus,
    signUpmsg,
    signUpSuccess,
  } = useSelector((state) => state.auth);

  const slides = [
    {
      heading: "Get Better with Money 1",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed malesuada nulla id ex condimentum, sit amet blandit metus consectetur. Curabitur enim orci, commodo non ligula sed, rutrum dictum dolor.",
    },
    {
      heading: "Get Better with Money 2",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed malesuada nulla id ex condimentum, sit amet blandit metus consectetur. Curabitur enim orci, commodo non ligula sed, rutrum dictum dolor.",
    },
    ,
    {
      heading: "Get Better with Money 3",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed malesuada nulla id ex condimentum, sit amet blandit metus consectetur. Curabitur enim orci, commodo non ligula sed, rutrum dictum dolor.",
    },
  ];
  var settings = {
    dots: true,
    autoplay: true,
    autoplaySpeed: 5000,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    initialSlide: 0,
    speed: 500,
    arrows: false,
    adaptiveHeight: true,
    appendDots: (dots) => <ul>{dots}</ul>,
    customPaging: (i) => (
      <div className="ft-slick__dots--custom">
        <div className="loading" />
      </div>
    ),
  };

  {
    /*--------------tost-code----------------------------- */
  }
  const [toast, setToast] = useState({
    visible: false,
    message: "",
    type: "",
  });

  // useEffect(() => {
  //   if (localStorage.getItem("signupReload")) {
  //     localStorage.removeItem("signupReload");
  //     navigate("/", { replace: true });
  //   }
  // }, [navigate]);
  // const [success, setSuccess] = useState(signUpSuccess);

  // useEffect(() => {

  //   if(signUpSuccess){
  //     navigate('/?signupSuccess=true');
  //     setSuccess(false);
  //   }
  // }, [success])

  useEffect(() => {
    if (authStatus === "succeeded") {
      setToast({
        visible: true,
        message: signUpmsg,
        type: signUpSuccess ? "success" : "danger",
      });

      if (signUpSuccess) {
        setTimeout(() => {
          setToast({ visible: false, message: "", type: "" });
        }, 3000);
        // Adjust the delay as needed
        // localStorage.setItem("signupReload", "true");
        // window.location.reload();
      } else {
        setTimeout(() => {
          setToast({ visible: false, message: "", type: "" });
        }, 3000); // Adjust the delay as needed
      }
    } else if (authStatus === "failed") {
      setToast({
        visible: true,
        message: signUpmsg,
        type: "danger",
      });
    }
  }, [authStatus, signUpSuccess, signUpmsg]);

  const closeToast = () => {
    setToast({ visible: false, message: "", type: "" });
  };

  {
    /*--------------tost-code--end-------------------------- */
  }

  const [popup, setPopup] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      if (signUpSuccess) {
        navigate("/");
        setPopup(true);
      }
    }, 3000);
  }, [navigate, signUpSuccess]);

  // const location = useLocation();

  // useEffect(() => {
  //   const queryParams = new URLSearchParams(location.search);
  //   const signupSuccess = queryParams.get('signupSuccess');

  //   if (signupSuccess) {
  //     navigate('/?signupSuccess=true');
  //     setSuccess(false);
  //     // Clear or reset signup state here
  //     // Optionally, navigate to a different page or display a message
  //   }
  // }, [location]);

  const validationSchema = Yup.object({
    firstName: Yup.string()
      .required("Enter First Name")
      .matches(
        /^[A-Za-z]+$/,
        "First name should only contain alphabetic characters"
      ),

    lastName: Yup.string()
      .required("Enter Last Name")
      .matches(
        /^[A-Za-z]+$/,
        "Last name should only contain alphabetic characters"
      ),
    phoneNumber: Yup.string()
      .required("Enter Phone Number")
      .matches(/^[0-9]{10}$/, "Phone number should be exactly 10 digits"),
    email: Yup.string()
      // .email("Invalid Email Address")
      .required("Enter Email"),
      // .matches(
      //   /^[a-zA-Z0-9._%+-]+@gmail\.com$/,
      //   "Email must be a Gmail address"
      // ),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Enter Password"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Required"),
  });

  const [isSignUpSuccess, setIsSignUpSuccess] = useState(false);

  const {
    values,
    errors,
    touched,
    handleBlur,
    handleChange,
    handleSubmit,
    setFieldValue,
    setValues,
  } = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      phoneNumber: "",
    },
    validationSchema: validationSchema,

    onSubmit: (values, action) => {
      dispatch(signUp(values));

      // try {
      //   await dispatch(signUp(values)).unwrap(); // Ensure unwrap is used if signUp is an async thunk
      //   setIsSignUpSuccess(signUpSuccess); // Set state to indicate success
      // } catch (error) {
      //   console.error("Signup failed:", error);
      //   setIsSignUpSuccess(false); // Handle failure
      // }
    },
  });

  // useEffect(() => {
  //   if (isSignUpSuccess) {
  //     navigate("/?signupSuccess=true", { replace: true });
  //     setIsSignUpSuccess(false); // Reset state to avoid repeated navigation
  //   }
  // }, [isSignUpSuccess, navigate]);

  // const location = useLocation();

  // useEffect(() => {
  //   const queryParams = new URLSearchParams(location.search);
  //   const signupSuccess = queryParams.get('signupSuccess');

  //   if (signupSuccess) {
  //     // Clear or reset signup state here if needed
  //     // Optionally, navigate to a different page or display a message
  //     console.log('Signup success parameter detected on Signup page');
  //   }
  // }, [location]);

  // useEffect(() => {
  //   setTimeout(() => {
  //     if (homepage) {
  //       navigate("/");
  //     }

  //   },3000);
  // }, [homepage])

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
    }, 3000); // Change slide every 3 seconds

    return () => clearInterval(interval);
  }, [slides.length]);

  return (
    <div className="flex min-h-screen">
      {toast.visible && (
        <Toast message={toast.message} type={toast.type} onClose={closeToast} />
      )}
      {/* Left Section */}
      <div
        className="hidden lg:block w-1/2 bg-cover bg-center relative"
        style={{ backgroundImage: `url(${loginBg})` }} // Adjust the image path
      >
        <div className="absolute bottom-20 w-full text-white text-center p-4">
          <SliderWrapper>
            <Slider {...settings}>
              {slides.map((text, index) => (
                <div className="p-4 mb-4" key={index}>
                  <p className="text-5xl font-semibold font-custom p-3">
                    {text.heading}
                  </p>
                  <p className="text-base py-2 px-10 text-center">
                    {text.description}
                  </p>
                </div>
              ))}
            </Slider>
          </SliderWrapper>
        </div>
      </div>

      {/* Right Section */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center items-center p-8 bg-white font-custom">
        <div className="w-full max-w-md">
          <img
            src={logo} // Adjust the logo path
            alt="Website Logo"
            className="w-20 h-20 mb-4"
          />
          <h2 className="text-4xl font-semibold text-left mb-2 text-neutral-700">
            Hi, welcome
          </h2>
          <p className=" text-left mb-6 text-gray-500">
            Please create your account
          </p>

          <form onSubmit={handleSubmit}>
            <div className="flex space-x-4 mb-4">
              <div className="w-1/2">
                <label
                  htmlFor="firstName"
                  className="block text-sm text-green-600/80"
                >
                  First Name
                </label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.firstName}
                  className={`w-full px-3 py-2 border rounded-md bg-green-600/5 outline-green-600 ${
                    touched.firstName && errors.firstName
                      ? "border-red-500"
                      : "border-green-600/30"
                  }`}
                />
                {touched.firstName && errors.firstName && (
                  <p className="text-red-500 text-xs italic">
                    {errors.firstName}
                  </p>
                )}
              </div>

              <div className="w-1/2">
                <label
                  htmlFor="lastName"
                  className="block text-sm text-green-600/80"
                >
                  Last Name
                </label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.lastName}
                  className={`w-full px-3 py-2 border rounded-md bg-green-600/5 outline-green-600 ${
                    touched.lastName && errors.lastName
                      ? "border-red-500"
                      : "border-green-600/30"
                  }`}
                />
                {touched.lastName && errors.lastName && (
                  <p className="text-red-500 text-xs italic">
                    {errors.lastName}
                  </p>
                )}
              </div>
            </div>

            <div className="mb-4">
              <label
                htmlFor="phoneNumber"
                className="block text-sm text-green-600/80"
              >
                Phone Number
              </label>
              <input
                type="text"
                id="phoneNumber"
                name="phoneNumber"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.phoneNumber}
                className={`w-full px-3 py-2 border rounded-md bg-green-600/5 outline-green-600 ${
                  touched.phoneNumber && errors.phoneNumber
                    ? "border-red-500"
                    : "border-green-600/30"
                }`}
              />
              {touched.phoneNumber && errors.phoneNumber && (
                <p className="text-red-500 text-xs italic">
                  {errors.phoneNumber}
                </p>
              )}
            </div>

            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-sm text-green-600/80"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
                className={`w-full px-3 py-2 border rounded-md bg-green-600/5 outline-green-600 ${
                  touched.email && errors.email
                    ? "border-red-500"
                    : "border-green-600/30"
                }`}
              />
              {touched.email && errors.email && (
                <p className="text-red-500 text-xs italic">{errors.email}</p>
              )}
            </div>

            <div className="flex space-x-4 mb-4">
              <div className="w-1/2">
                <label
                  htmlFor="password"
                  className="block text-sm text-green-600/80"
                >
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.password}
                  className={`w-full px-3 py-2 border rounded-md bg-green-600/5 outline-green-600 ${
                    touched.password && errors.password
                      ? "border-red-500"
                      : "border-green-600/30"
                  }`}
                />
                {touched.password && errors.password && (
                  <p className="text-red-500 text-xs italic">
                    {errors.password}
                  </p>
                )}
              </div>

              <div className="w-1/2">
                <label
                  htmlFor="confirmPassword"
                  className="block text-sm text-green-600/80"
                >
                  Confirm Password
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.confirmPassword}
                  className={`w-full px-3 py-2 border rounded-md bg-green-600/5 outline-green-600 ${
                    touched.confirmPassword && errors.confirmPassword
                      ? "border-red-500"
                      : "border-green-600/30"
                  }`}
                />
                {touched.confirmPassword && errors.confirmPassword && (
                  <p className="text-red-500 text-xs italic">
                    {errors.confirmPassword}
                  </p>
                )}
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-orange-400 text-white p-2 rounded-md hover:bg-green-600"
              onClick={handleSubmit}
            >
              {isLoading === true ? "Loading..." : "Create an Account"}
            </button>
          </form>

          <p className="text-center mt-4 text-green-500">
            Already have an account ?{" "}
            <Link to="/signin" className="underline font-semibold">
              SIGN IN
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
