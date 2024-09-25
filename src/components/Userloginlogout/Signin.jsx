import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import ReactDOM from "react-dom";
import SliderWrapper from "../Homepage/_SlickSliderStyle";
import logo from "..//..//Assets/logo.svg";
import loginBg from "..//..//Assets/Login-BG.jpg";
import { Link, unstable_HistoryRouter, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../features/authSlice";
import { useFormik } from "formik";
import * as Yup from "yup";
import Toast from "../Tost/Tosts";

const SignIn = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [isAuthenticated, setIsAuthenticated] = useState(
    !!localStorage.getItem("auth-token")
  );

  const {
    isLoading,
    status,
    error,
    token,
    user,
    authStatus,
    loginMsg,
    loginSuccess,
  } = useSelector((state) => state.auth);

  {
    /*****************login-taoset*********************/
  }
  const [toast, setToast] = useState({
    visible: false,
    message: "",
    type: "",
  });

 

  useEffect(() => {
    if (status === "succeeded") {
      setToast({
        visible: true,
        message:loginMsg,
        type: loginSuccess ? "success" : "danger",
      });

      if (loginSuccess) {
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
    } else if (status === "failed") {
      setToast({
        visible: true,
        message:loginMsg,
        type: "danger",
      });
    }
  }, [status, loginSuccess, loginMsg]);

  const closeToast = () => {
    setToast({ visible: false, message: "", type: "" });
  };

  {
    /*****************login-taoset-end*********************/
  }

  const loginSchema = Yup.object({
    email: Yup.string()
      // .email("Invalid email")
      // .matches(
      //   /^[a-zA-Z0-9._%+-]+@gmail\.com$/,
      //   "Only Gmail addresses are allowed"
      // )
      .required("Email is required"),
    password: Yup.string().required("password is required..."),
  });

  useEffect(() => {
    setTimeout(() => {
      if (!!localStorage.getItem("auth-token"))
        { 
          navigate("/")
        }
      
    },3000);
  }, [localStorage.getItem("auth-token")]);

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
    initialValues: { email: "", password: "" },
    validationSchema: loginSchema,

    onSubmit: (values, action) => {
      // setHomepage(true);
      dispatch(login(values));
      // action.resetForm();
    },
  });

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
        style={{ backgroundImage: `url(${loginBg})` }}
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
          <img src={logo} alt="Website Logo" className="w-20 h-20 mb-4" />
          <h2 className="text-4xl font-semibold text-left mb-2 text-neutral-700">
            Hi, welcome
          </h2>
          <p className=" text-left mb-6 text-gray-500">Sign in to continue</p>

          <form>
            <div className="flex space-x-4 mb-4">
              {/* <div className="w-1/2">
                <label
                  htmlFor="firstName"
                  className="block text-sm text-green-600/80"
                >
                  FIRST NAME
                </label>
                <input
                  type="text"
                  id="firstName"
                  className="w-full px-3 py-2 border border-green-600/30 rounded-md bg-green-600/5 outline-green-600 "
                />
              </div>

              <div className="w-1/2">
                <label
                  htmlFor="lastName"
                  className="block text-sm  text-green-600/80"
                >
                  LAST NAME
                </label>
                <input
                  type="text"
                  id="lastName"
                  className="w-full px-3 py-2 border border-green-600/30 bg-green-600/5 outline-green-600 rounded-md"
                />
               </div>*/}
            </div>
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-sm  text-green-600/80 "
              >
                Phone / Email
              </label>
              <input
                type="email"
                id="email"
                className="w-full px-3 py-2 border border-green-600/30 bg-green-600/5 outline-green-600 rounded-md"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.email && touched.email ? (
                <p className="text-red-500 text-xs italic">{errors.email}</p>
              ) : null}
            </div>
            <div className="mb-4">
              <label
                htmlFor="password"
                className="block text-sm  text-green-600/80"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                className="w-full px-3 py-2 border border-green-600/30 bg-green-600/5 outline-green-600 rounded-md"
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.password && touched.password ? (
                <p className="text-red-500 text-xs italic">{errors.password}</p>
              ) : null}
            </div>

            <button
              type="submit"
              className="w-full bg-orange-400 text-white p-2 rounded-md hover:bg-green-600"
              onClick={handleSubmit}
            >
              {isLoading === true ? "Loading..." : "Login"}
            </button>
          </form>

          <p className="text-center mt-4 text-green-500">
            Not registered yet ?{" "}
            <Link to="/signup" className="underline font-semibold">
              CREATE AN ACCOUNT
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
