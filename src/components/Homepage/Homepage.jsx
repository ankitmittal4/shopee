import React, { useEffect, useRef, useState } from "react";
import Navbar from "../Navbar/Navbar";
import Carousel from "./Carousel";
import Slider from "react-slick";
import CardContainer from "./CardContainer";
import CustomRangeSlider from "./CustomRangeSlider";
import Zigcard from "./Zigcard";
import CardSlider from "./Cardslider";
import Card from "./Card";
import CircularCard from "./CircularCards";
import rec1 from "..//..//Assets/rec1.png";
import rec2 from "..//..//Assets/rec2.png";
import rec3 from "..//..//Assets/rec3.png";
import rec4 from "..//..//Assets/rec4.png";
import rec5 from "..//..//Assets/rec5.png";
import paint1 from "..//..//Assets/paint1.png";
import paint2 from "..//..//Assets/paint2.png";
import card1 from "..//..//Assets/Card.png";
import card2 from "..//..//Assets/Card1.png";
import card3 from "..//..//Assets/Card2.png";
import slideimg from "..//..//Assets/slide.svg";
import productCard from "..//..//Assets/container2.png";
import f1 from "..//..//Assets/f1.svg";
import f2 from "..//..//Assets/f2.svg";
import f3 from "..//..//Assets/f3.svg";
import f4 from "..//..//Assets/f4.svg";
import Footer from "../Footer";
import { FaSearch } from "react-icons/fa";
import { SlLocationPin } from "react-icons/sl";
import FilterProducthomepage from "./FilterProducthomepage";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { stateChange } from "../../features/authSlice";

const circularcards = [
  {
    imageUrl: rec1,
    heading: "Interior Painting",
    description: "Transform Your Living Spaces with Vibrant Colors",
  },
  {
    imageUrl: rec2,
    heading: "Exterior Painting",
    description: "Enhance Your Home’s Curb Appeal with Durable Paints",
  },
  {
    imageUrl: rec3,
    heading: "Commercial Paintings",
    description: "Professional Painting Solutions for Your Business",
  },
  {
    imageUrl: rec4,
    heading: "Industrial Paintings",
    description: "High-Performance Coatings for Industrial Strength",
  },
  {
    imageUrl: rec5,
    heading: "Interior Design Services",
    description: "Creating Beautiful, Functional Interiors Just for You",
  },
];

const zigcards = [
  {
    logo: f1,
    title: "Choose Your Paint",
    subtitle: "Wide range of colors and finishes, with custom mixing options",
  },
  {
    logo: f2,
    title: "Choose Your Shades",
    subtitle:
      "Explore a vast selection of colors and customize your perfect shade",
  },
  {
    logo: f3,
    title: "Pay Online / COD",
    subtitle:
      "Choose convenient payment options: Pay online or Cash on Delivery",
  },
  {
    logo: f4,
    title: "Get Paint Delivered",
    subtitle: "Enjoy hassle-free delivery of your chosen paint to your door",
  },
];

const slides = [
  {
    image: slideimg,
    altText: "Slide 1",
    caption: "This is the first slide",
  },
  {
    image: slideimg,
    altText: "Slide 2",
    caption: "This is the second slide",
  },
  {
    image: slideimg,
    altText: "Slide 3",
    caption: "This is the third slide",
  },
];

const Homepage = () => {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const dispatch = useDispatch();

  const handleVideoClick = () => {
    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  var settings = {
    arrows: false,
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
    ],
  };

  {
    /**8888888888888888888888888888888888888888888 */
  }
  const location = useLocation();
  const navigate = useNavigate();

  // useEffect(() => {
  //   const queryParams = new URLSearchParams(location.search);
  //   const signupSuccess = queryParams.get('signupSuccess');

  //   if (signupSuccess) {
  //     // Handle the successful signup notification here
  //     console.log('Signup successful!'); // You might want to show a toast or message here

  //     // Optionally, remove the query parameter from the URL
  //     navigate('/', { replace: true });
  //   }
  // }, [location, navigate]);

  useEffect(() => {
    dispatch(stateChange());
  }, []);

  {
    /**8888888888888888888888888888888888888888888 */
  }
  return (
    <>
      <div className="flex flex-col min-h-screen" id="home">
        {/* <Navbar /> */}
        <div className="mt-16 " >
          <Link to="/products">
            {" "}
            <Carousel slides={slides} />
          </Link>
        </div>

        {/* Main Content */}
        <div className="min-[1600px]:px-20">

        <div class="2nd-page flex p-4 flex-col items-center justify-center mt-10 md:px-10">
          <h2 className="p-2 font-custom text-xl sm:text-3xl text-black font-semibold">
            Today's Special Offers
          </h2>
          <p className="p-2 font-custom text-zinc-600 text-lg sm:text-xl text-center">
            Grab your favorite colors at amazing discounts!
          </p>
          <div class="items-slider min-h-fit w-full">
            <CardContainer />
            {/* <CustomRangeSlider/> */}
          </div>
        </div>
        <div className="2nd-page flex px-10 py-6 flex-col items-center justify-center w-full">
          <h2 className="p-2 font-custom text-xl sm:text-3xl text-black font-semibold">
            How It Works
          </h2>
          <p className="p-2 font-custom text-zinc-600 text-sm sm:text-xl sm:w-11/12 text-center">
            The Paint Plus stores provides selecting and purchasing paint
            products, either in-store or online. Customers can explore a range
            of colors, types, and finishes, with options for custom color
            mixing. In-store visits offer hands-on selection with staff
            assistance, while online platforms provide digital tools for
            visualizing colors and matching samples. After choosing the desired
            paint, orders can be placed and fulfilled through in-store pickup or
            home delivery, depending on customer preference.
          </p>
          <div className="sm:flex flex-col md:flex-wrap  md:flex-row md:h-80 w-full ">
            <div className="w-full md:w-1/2 grid grid-cols-1 sm:grid-cols-2   md:flex ">
              <div className="md:w-1/2 flex md:justify-center md:items-start  ">
                <Zigcard {...zigcards[0]} />
              </div>
              <div className="md:w-1/2 flex md:justify-center md:items-end">
                <Zigcard {...zigcards[1]} />
              </div>
            </div>
            <div className="w-full md:w-1/2 md:flex grid grid-cols-1 sm:grid-cols-2 ">
              <div className="md:w-1/2 flex md:justify-center md:items-start ">
                <Zigcard {...zigcards[2]} />
              </div>
              <div className="md:w-1/2 flex md:justify-center md:items-end">
                <Zigcard {...zigcards[3]} />
              </div>
            </div>
          </div>
          <div
            className="w-full h-fit sm:h-96 border rounded-xl mt-4   sm:p-4 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: "url('/Banner1.jpg')" }}
          >
            <div className="w-10/12 sm:w-3/4 md:w-5/12 flex flex-col gap-2 p-6 sm:p-8">
              <h2 className="font-custom text-xl sm:text-4xl md:text-5xl font-bold text-white">
                visualise Colors and shades in 3D
              </h2>
              <p className="font-custom text-sm sm:text-xl md:text-[24px] text-white">
                Uncover Exclusive Deals and Premium Paints In-Store
              </p>
              <button className="bg-white text-black rounded-full p-2 font-semibold w-28 text-sm">
                VISUALISE
              </button>
            </div>
          </div>
          {/* <div className="hidden md:block bg-gray-800 text-white rounded-md p-4 w-full max-w-full mx-auto my-4 font-custom">
            <div className="flex justify-between">
              {[
                "Interior Paints",
                "Exterior Paints",
                "Enamels",
                "Wall Putty",
                "Wood Polish",
                "Water Proofing",
                "Tools and Accessories",
              ].map((item, index) => (
                <div
                  key={index}
                  className="px-4 py-2 rounded-md hover:bg-green-600 hover:text-white transition-colors duration-200"
                >
                  {item}
                </div>
              ))}
            </div>
          </div> */}
          <FilterProducthomepage />

          {/* <div className="mx-4 my-8 w-full  bg-neutral-200/40 border border-zinc-400/15 rounded-xl p-2">
            <Slider {...settings2}>
              {cards.map((product, index) => (
                <div key={index} className="w-1/4 p-4">
                  <Card {...product} />
                </div>
              ))}
            </Slider>
          </div> */}
          <div
          className="relative w-full h-auto sm:h-96 rounded-xl mt-4 sm:p-4 mx-6 flex gap-2 justify-center items-center bg-cover bg-no-repeat bg-center"
           style={{ backgroundImage: "url('/Banner2.jpg')", backgroundSize: "cover" }}
          >
            <div className="w-full sm:w-3/4 md::w-1/3 sm:p-8 flex flex-col gap-2 justify-center p-4">
              <h2 className="font-custom text-xl sm:text-4xl md:text-[48px] font-bold text-white">
                Explore our stores
              </h2>
              <p className="font-custom text-sm sm:text-xl md:text-[24px] text-white">
                Uncover Exclusive Deals and Premium Paints In-Store
              </p>
              <div className="relative w-full max-w-sm">
                <input
                  className="w-4/5 sm:w-2/3 p-2 px-8 border border-white rounded-full bg-transparent outline-none"
                  placeholder="City search and select"
                />
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <SlLocationPin className="text-white" />
                </div>
              </div>

              <div className="">
                <button className=" text-white bg-orange-400 outline-none rounded-full py-2 px-6">
                  Search
                </button>
              </div>
            </div>
            <div className="w-1/2">
              <img src="" alt="" />
            </div>
          </div>
          <div className="2nd-page flex px-6 py-6 flex-col items-center justify-center w-full pt-20" id="services">
            <h2 className="p-2 font-custom text-xl text-center sm:text-3xl text-black font-semibold">
              Our Services
            </h2>
            <p className="p-2 font-custom text-zinc-600 text-sm sm:text-xl  sm:w-3/4 text-center">
              One-Stop Shop for Professional Painting and Design should change
            </p>
            <div className="flex flex-wrap justify-center mt-8 items-center gap-2 sm:gap-4">
              {circularcards.map((card, index) => (
                <div
                  key={index}
                  className={`flex ${index < 3 ? "mx-4" : "mx-8"}`}
                >
                  <CircularCard
                    imageUrl={card.imageUrl}
                    heading={card.heading}
                    description={card.description}
                  />
                </div>
              ))}
            </div>
            <button className="outline-none px-6 py-4 font-custon text-sm text-white bg-orange-400 rounded-full font-semibold mt-8">
              GET QUOATION NOW
            </button>
          </div>
          <div className="w-full mt-10 flex items-center justify-center gap-4 flex-col sm:flex-row ">
            <div className="">
              <Link to="/products">
                <img src={paint1} alt="" className="cursor-pointer" />{" "}
              </Link>
            </div>
            <div className="">
              <Link to="/products">
                <img src={paint2} alt="" className="cursor-pointer" />{" "}
              </Link>
            </div>
          </div>
          <div className="w-full mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <div className="">
              <img src={card1} alt="" />
            </div>
            <div className="">
              <img src={card2} alt="" />
            </div>
            <div className="">
              <img src={card3} alt="" />
            </div>
          </div>
        </div>
        <div className="flex px-6 py-6 flex-col items-center justify-center w-full">
          <h2 className="p-2 font-custom text-xl sm:text-3xl text-black font-semibold">
            Experience our store
          </h2>
          <p className="p-2 font-custom text-zinc-600 text-sm sm:text-xl sm:w-3/4 text-center">
            Discover all your painting and design needs in one place
          </p>
        </div>

        <div className="flex items-center justify-center">
          <div className="relative w-3/4 h-fit ">
            <video
              ref={videoRef}
              className="w-full h-full object-cover"
              src="https://paintplus.s3.ap-south-1.amazonaws.com/view.mp4"
              type="video/mp4"
            />
            <button
              onClick={handleVideoClick}
              className="absolute inset-0 flex items-center justify-center w-full h-full bg-black bg-opacity-50"
            >
              <svg
                width="64"
                height="64"
                viewBox="0 0 64 64"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                {isPlaying ? (
                  <path
                    fillRule="evenodd"
                    d="M6 4a1 1 0 011 1v10a1 1 0 11-2 0V5a1 1 0 011-1zm7 0a1 1 0 011 1v10a1 1 0 11-2 0V5a1 1 0 011-1z"
                    clipRule="evenodd"
                  />
                ) : (
                  // <path
                  //   fillRule="evenodd"
                  //   d="M4.293 5.293a1 1 0 011.414 0L10 9.586l4.293-4.293a1 1 0 011.414 1.414l-5 5a1 1 0 01-1.414 0l-5-5a1 1 0 010-1.414z"
                  //   clipRule="evenodd"
                  // />
                  <>
                    <path
                      d="M24.2667 32V28.0533C24.2667 22.96 27.8667 20.9066 32.2667 23.44L35.68 25.4133L39.0933 27.3866C43.4933 29.92 43.4933 34.08 39.0933 36.6133L35.68 38.5866L32.2667 40.56C27.8667 43.0933 24.2667 41.0133 24.2667 35.9466V32Z"
                      stroke="white"
                      stroke-width="2"
                      stroke-miterlimit="10"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M32 58.6668C46.7276 58.6668 58.6667 46.7278 58.6667 32.0002C58.6667 17.2726 46.7276 5.3335 32 5.3335C17.2724 5.3335 5.33334 17.2726 5.33334 32.0002C5.33334 46.7278 17.2724 58.6668 32 58.6668Z"
                      stroke="white"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </>
                )}
              </svg>
            </button>
          </div>
        </div>
        

        </div>
        {/* Main Content */}
      </div>
      {/* <Footer/> */}
    </>
  );
};

export default Homepage;
