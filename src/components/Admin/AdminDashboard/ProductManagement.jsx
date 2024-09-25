import { Form, useFormik } from "formik";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { FaProductHunt, FaPlus, FaEdit, FaTrash } from "react-icons/fa";
import box_iocn from "..//..//./../Assets/box-time.svg";
import container from "..//..//./../Assets/container2.png";
import { useDispatch, useSelector } from "react-redux";
import { adminLogin } from "../../../features/Admin/adminAuthSlice";
import delete1 from "../../../Assets/delete.svg";
import edit from "../../../Assets/edit.svg";
import {
  adminProductslist,
  dealersList,
} from "../../../features/Admin/adminProductlistSlice";
import {
  addProduct,
  deleteProduct,
} from "../../../features/Admin/addProductSlice";
import * as Yup from "yup";
import Toast from "../../Tost/Tosts";
import Loader1 from "../../Loaders/Loader1";
import { fetchProductDetails } from "../../../features/productSlice";
import Pagination from "../../Pagination/Pagination";
import { current } from "@reduxjs/toolkit";
import DealerLinking from "./DealerLinking";
import axios from "axios";
import chroma from "chroma-js";
import Select from "react-select";
import { useNavigate } from "react-router-dom";
import { Loader } from "rsuite";

const ProductManagement = () => {
  const [laodingDealerId, setLoadingDeaelerId] = useState(null);
  const [dealers, setDealers] = useState([]);
  const [showLinkDealer, setShowLinkDealer] = useState(false);
  const [clearSelectedPopUp, setClearSelectedPopUp] = useState(false);
  const [displayColors, setDisplayColors] = useState([]);
  const [colorss, setColorss] = useState([]);
  const [allColors, setAllColors] = useState([]);
  const [allFilteredColors, setAllFilteredColors] = useState([]);
  const [showingColors, setShowingColors] = useState([]);
  const [selectedColorObjects, setSelectedColorObjects] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [currentColorPage, setCurrentColorPage] = useState(1);
  const [pageNumberForColors, setPageNumberForColors] = useState(null);
  const [filteredColors, setFilteredColors] = useState([]);
  const [colorPopupLoading, setColorPopupLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [colourOptions, setColourOptions] = useState([]);
  const [selectedColors, setSelectedColors] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [includeProductId, setIncludeProductId] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [images, setImages] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [products, setProducts] = useState([]);
  const dispatch = useDispatch();
  const { items, error, status } = useSelector((state) => state.adminproducts);
  const {
    productitems,
    addProductMessage,
    addProductStatus,
    addProductSuccess,
  } = useSelector((state) => state.addproducts);

  const navigate = useNavigate();
  const [toast, setToast] = useState({
    visible: false,
    message: "",
    type: "",
  });

  const closeToast = () => {
    setToast({ visible: false, message: "", type: "" });
  };

  useEffect(() => {
    if (status === "idle") {
      dispatch(adminProductslist(currentPage));
      // console.log("this is current page----",currentPage);
    }
  }, [dispatch, status, addProductStatus, currentPage]);
  //  const [editProductId ,setEditProductId] = useState(null)
  useEffect(() => {
    if (items && items.data) {
      setProducts(items.data.products);
      setFilteredProducts(items.data.products);
      const newDealer = items.data.products.find(
        (product) => product._id === form._id
      );
      console.log("newDeaeler product--", newDealer);
      setDealers(newDealer?.dealer);
      console.log("newDeaeler product--", dealers);
    }
  }, [dispatch, status, addProductStatus, currentPage]);

  /////////////////color list fetching ////////////////////////////////

  useEffect(() => {
    const fetchAllColors = async () => {
      try {
        const headers = {
          Authorization: localStorage.getItem("admin-token"),
        };

        let reqOptions = {
          url: "http://3.6.127.143/api/admin/colorList",
          method: "POST",
          headers: headers,
          data: {
            page: 1,
            limit: 2000,
          },
        };

        const response = await axios.request(reqOptions);
        // console.log("all colors are fetched", response);

        const colorData = response.data.data.products.map((color) => ({
          value: color._id,
          label: color.name, // Name of the color
          color: color.hexCode,
          ncsCode: color.ncsCode, // The hex color code
        }));

        setAllColors(colorData);
        setAllFilteredColors(colorData);
        // console.log("colorData", colorData);

        // setFilteredColors(response.data.data); // Initially, show all colors
      } catch (error) {
        console.log("error", error);
      }
    };

    fetchAllColors();
  }, []);

  const [fetchColorsLoading, setFetchColorsLoading] = useState(false);
  const fetchColorData = async (currentColorPage, limit) => {
    setFetchColorsLoading(true);
    try {
      const headers = {
        Authorization: localStorage.getItem("admin-token"),
      };

      let reqOptions = {
        url: "http://3.6.127.143/api/admin/colorList",
        method: "POST",
        headers: headers,
        data: {
          page: currentColorPage,
          limit: limit,
        },
      };

      const response = await axios.request(reqOptions);
      // console.log(response);

      const colorData = response.data.data.products.map((color) => ({
        value: color._id, // Store the color's ID
        label: color.name, // Name of the color
        color: color.hexCode,
        ncsCode: color.ncsCode, // The hex color code
      }));

      setColorss(response.data.data);
      // console.log("ccolor-data",colorData);
      setFilteredColors(colorData);
      setColourOptions(colorData);
      setFetchColorsLoading(false);
    } catch (error) {
      console.error("Error fetching color data:", error);
      setFetchColorsLoading(false);
    }
  };
  //  console.log(colourOptions)

  useEffect(() => {
    fetchColorData(currentColorPage, 10);
  }, [currentColorPage]);

  useEffect(() => {
    const displayData = isSearching ? paginatedSearchResults : filteredColors;
    setDisplayColors(displayData);
  }, [isSearching, fetchColorData, currentColorPage]);

  const togglePopup = (e) => {
    setColorPopupLoading(true);
    e.preventDefault();
    setIsOpen(!isOpen);
    setColorPopupLoading(false);
  };

  const handelCandle = (e) => {
    e.preventDefault();
    setSelectedColors([]);
    setShowingColors([]);
    setIsOpen(false);
    setFieldValue("colour", []);
    setSelectedColorObjects([]);
    setClearSelectedPopUp(false);
  };
  // console.log(colorss);
  // const filteredColors = colourOptions.filter((color) =>
  //   color?.name?.toLowerCase().includes(search.toLowerCase())
  // );

  const [currentSearchPage, setCurrentSearchPage] = useState(1);
  const itemsPerPage = 10;

  // Calculate the items to display for the current search page
  const paginatedSearchResults = useMemo(() => {
    const start = (currentSearchPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    return allFilteredColors?.slice(start, end);
  }, [currentSearchPage, allFilteredColors]);

  const handleSearchPageChange = (pageNumber) => {
    setCurrentSearchPage(pageNumber);
  };

  const handleSearchColors = (e) => {
    const query = e.target.value;
    setSearch(query);
    // setIsSearching(true);
    setIsSearching(true);
    if (query.trim() === "") {
      // If the search query is empty, show all products
      setFilteredColors(colourOptions);
      setIsSearching(false);
    } else {
      // Otherwise, filter the products based on the query
      // setAllColors(colorData);
      // setAllFilteredColors(colorData);
      setAllFilteredColors(
        allColors.filter(
          (color) =>
            color.value.toLowerCase().includes(query.toLowerCase()) ||
            color.label.toLowerCase().includes(query.toLowerCase()) ||
            color.color.toLowerCase().includes(query.toLowerCase()) ||
            color.ncsCode.toLowerCase().includes(query.toLowerCase())
        )
      );
    }
    // setIsSearching(false);
  };

  // console.log("isSearching is --", isSearching);
  // console.log("paginated data", paginatedSearchResults);
  // console.log("display colors -----", displayColors);

  // const handleCheckboxChange = (colorObj) => {
  //   const { value, color } = colorObj;

  //   // Check if the color is already selected
  //   const isColorSelected = selectedColorObjects?.some(
  //     (colorItem) => colorItem.value === value
  //   );

  //   if (isColorSelected) {
  //     // Remove the color from selectedColorObjects
  //     setSelectedColorObjects((prevColors) =>
  //       prevColors.filter((colorItem) => colorItem.value !== value)
  //     );

  //     // Update showingColors and selectedColors
  //     setShowingColors((prevShowing) =>
  //       prevShowing.filter((code) => code !== color)
  //     );

  //     setSelectedColors((prevSelected) => {
  //       const updatedSelected = prevSelected.filter((id) => id !== value);
  //       setFieldValue("colour", updatedSelected); // Use the updated array
  //       return updatedSelected;
  //     });
  //   } else {
  //     // Add the color to selectedColorObjects
  //     setSelectedColorObjects((prevColors) => [...prevColors, colorObj]);
  //     setShowingColors((prevShowing) => [...prevShowing, color]);

  //     // Use the callback form to ensure you work with the updated array
  //     setSelectedColors((prevSelected) => {
  //       const updatedSelected = [...prevSelected, value];
  //       setFieldValue("colour", updatedSelected); // Use the updated array
  //       return updatedSelected;
  //     });
  //   }
  // };

  const handleCheckboxChange = (colorObj) => {
    // console.error("colorObj: ", colorObj);
    const { value, color } = colorObj;

    // Check if the color is already selected
    const isColorSelected = selectedColorObjects?.some(
      (color) => color.value === value
    );

    if (isColorSelected) {
      // Remove the color from selectedColorObjects
      setSelectedColorObjects((prevColors) =>
        prevColors.filter((color) => color.value !== value)
      );
      setShowingColors((prevShowing) =>
        prevShowing.filter((code) => code !== color)
      );
      setSelectedColors((prevSelected) =>
        prevSelected.filter((id) => id !== value)
      );
      setFieldValue(
        "colour",
        selectedColors.filter((id) => id !== value)
      );
      console.error("Selected Colours", selectedColors);
    } else {
      // Add the color to selectedColorObjects
      setSelectedColorObjects((prevColors) => [...prevColors, colorObj]);
      setShowingColors((prevShowing) => [...prevShowing, color]);
      setSelectedColors((prevSelected) => [...prevSelected, value]);
      setFieldValue("colour", [...selectedColors, value]);
    }
  };

  // const handleCheckboxChange = (colorId, hexCode) => {
  //   if (selectedColors.includes(colorId) && showingColors.includes(hexCode)) {
  //     setShowingColors(showingColors.filter((value) => value !== hexCode));
  //     setSelectedColors(selectedColors.filter((value) => value !== colorId));
  //     setFieldValue(
  //       "colour",
  //       selectedColors.filter((value) => value !== colorId)
  //     );
  //   } else {
  //     setSelectedColors([...selectedColors, colorId]);
  //     setShowingColors([...showingColors, hexCode]);
  //     setFieldValue("colour", [...selectedColors, colorId]);
  //   }
  // };

  const removeSelectedColors = (colorObj) => {
    const { value, color } = colorObj;

    // Remove the color object from selectedColorObjects
    setSelectedColorObjects((prevColors) =>
      prevColors.filter((colorItem) => colorItem.value !== value)
    );

    // Remove from the showingColors array (based on color hex code)
    setShowingColors((prevShowing) =>
      prevShowing.filter((hexCode) => hexCode !== color)
    );

    // Remove from the selectedColors array (based on value)
    setSelectedColors((prevSelected) =>
      prevSelected.filter((id) => id !== value)
    );

    // Update Formik field value for "colour"
    setFieldValue(
      "colour",
      selectedColors.filter((id) => id !== value)
    );
  };
  const removeShowingColors = (hexCode) => {
    setSelectedColorObjects((prevColors) =>
      prevColors.filter(
        (colorItem) => chroma(colorItem.color).hex() !== chroma(hexCode).hex()
      )
    );

    setShowingColors((prevShowing) =>
      prevShowing.filter((color) => color !== hexCode)
    );

    setSelectedColors((prevSelected) =>
      prevSelected.filter((color) => color !== hexCode)
    );
    console.log("selectedColors: ", selectedColors);

    setFieldValue(
      "colour",
      selectedColors.filter((color) => color !== hexCode)
    );
  };

  // console.log("selected colors hexCode", showingColors);
  // const handleCheckboxChange = (color) => {
  //   if (selectedColors.some((selected) => selected.id === color.id)) {
  //     // Remove the color object if it is already selected
  //     setSelectedColors(selectedColors.filter((selected) => selected.id !== color.id));
  //   } else {
  //     // Add the color object to the selected colors
  //     setSelectedColors([...selectedColors, color]);
  //   }
  // };
  // console.log('form-values after adding new dealer',values)
  // console.log("selected Colors IDs ", selectedColors);

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      // Get selected color IDs and color codes from the current page
      const newSelectedColorIds = filteredColors.map((color) => color.value);
      const newShowingColors = filteredColors.map((color) => color.color);

      // Merge new selected colors with previously selected colors
      setSelectedColors((prevSelectedColors) => {
        const updatedSelectedColors = [
          ...new Set([...prevSelectedColors, ...newSelectedColorIds]),
        ];
        return updatedSelectedColors;
      });

      setShowingColors((prevShowingColors) => {
        const updatedShowingColors = [
          ...new Set([...prevShowingColors, ...newShowingColors]),
        ];
        return updatedShowingColors;
      });
    } else {
      // If deselecting, remove the colors from the current page only
      const currentPageColorIds = displayColors.map((color) => color.value);

      setSelectedColors((prevSelectedColors) =>
        prevSelectedColors.filter((id) => !currentPageColorIds.includes(id))
      );

      setShowingColors((prevShowingColors) =>
        prevShowingColors.filter(
          (color) => !filteredColors.some((item) => item.color === color)
        )
      );
    }
  };

  /////////////rect-select///////////////////////////
  const handleColorChange = (selectedOptions) => {
    setSelectedColors(selectedOptions); // Store the selected options
    const selectedColorIds = selectedOptions.map((option) => option.value); // Extract the selected IDs
    // console.log("Selected Color IDs:", selectedColorIds); // Log or use these IDs as needed
  };

  const colourStyles = {
    control: (styles) => ({ ...styles, backgroundColor: "white" }),
    option: (styles, { data, isDisabled, isFocused, isSelected }) => {
      const hex = data.color;
      const color = chroma(hex);
      return {
        ...styles,
        backgroundColor: isDisabled
          ? undefined
          : isSelected
          ? data.color
          : isFocused
          ? color.alpha(1).css()
          : undefined,
        color: isDisabled
          ? "#ccc"
          : isSelected
          ? chroma.contrast(color, "white") > 2
            ? "white"
            : "black"
          : data.color,
        cursor: isDisabled ? "not-allowed" : "default",
        ":active": {
          ...styles[":active"],
          backgroundColor: !isDisabled
            ? isSelected
              ? data.color
              : color.alpha(1).css()
            : undefined,
        },
      };
    },
    multiValue: (styles, { data }) => {
      const color = chroma(data.color);
      return {
        ...styles,
        backgroundColor: color.alpha(1).css(),
      };
    },
    multiValueLabel: (styles, { data }) => {
      const color = chroma(data.color);
      return {
        ...styles,
        color: color.alpha(1).css(),
      };
    },
    multiValueRemove: (styles, { data }) => {
      const color = chroma(data.color);
      return {
        ...styles,
        color: color.alpha(1).css(),
        ":hover": {
          backgroundColor: color.alpha(1).css(),
          color: "white",
        },
      };
    },
  };
  ///////////////setting---colorr--list--end/////////////////////////////////////

  const handlePageChangeForColors = async (pageNumber) => {
    setCurrentColorPage(pageNumber);
    await fetchColorData(pageNumber);
  };

  const [form, setForm] = useState({
    _id: "",
    name: "",
    productType: "",
    shortDescription: "",
    longDescription: "",
    quantity: "",
    group: "",
    subGroup: "",
    brand: "",
    weight: "",
    length: "",
    width: "",
    height: "",
    manufacturingDate: "",
    expiryDate: "",
    specialFeature: "",
    mrp: "",
    sellingPrice: "",
    warranty: "",
    colour: [],
    finishType: "",
    images: [],

    about: "",
    tax: "",
  });

  {
    /****validation schema***** */
  }

  const FILE_SIZE = 5 * 1024 * 1024; // 5 MB limit per file
  const SUPPORTED_FORMATS = ["image/jpg", "image/jpeg", "image/png"];
  const validationSchema = Yup.object().shape({
    images: Yup.array()
      .of(
        Yup.mixed().required("A file is required")
        // .test(
        //   "fileSize",
        //   "File size is too large. Max size is 5MB",
        //   (file) => file && file.size <= FILE_SIZE
        // )
        // .test(
        //   "fileFormat",
        //   "Unsupported file format",
        //   (file) => file && SUPPORTED_FORMATS.includes(file.type)
        // )
      )
      .min(1, "At least one image is required") // Ensure there's at least 1 image
      .max(5, "You can upload a maximum of 5 images"),
    name: Yup.string().required("Name is required"),
    productType: Yup.string().required("Product Type is required"),
    shortDescription: Yup.string().required("Short Description is required"),
    longDescription: Yup.string().required("Long Description is required"),
    quantity: Yup.number()
      .required("Quantity is required")
      .positive("Quantity must be a positive number"),
    group: Yup.string().required("Group is required"),
    subGroup: Yup.string().required("Sub Group is required"),
    brand: Yup.string().required("Brand is required"),
    weight: Yup.number()
      .required("Weight is required")
      .positive("Weight must be a positive number"),
    length: Yup.number()
      .required("Length is required")
      .positive("Length must be a positive number"),
    width: Yup.number()
      .required("Width is required")
      .positive("Width must be a positive number"),
    height: Yup.number()
      .required("Height is required")
      .positive("Height must be a positive number"),
    manufacturingDate: Yup.date().required("Manufacturing Date is required"),
    expiryDate: Yup.date()
      .required("Expiry Date is required")
      .min(
        Yup.ref("manufacturingDate"),
        "Expiry Date must be after Manufacturing Date"
      ),
    about: Yup.string().required("Enter about product"),
    specialFeature: Yup.string().required("Special Feature is required"),
    mrp: Yup.number()
      .required("MRP is required")
      .positive("MRP must be a positive number")
      .test(
        "is-greater",
        "MRP must be greater than Selling Price",
        function (value) {
          const { sellingPrice } = this.parent;
          return value > sellingPrice;
        }
      ),
    sellingPrice: Yup.number()
      .required("Selling Price is required")
      .positive("Selling Price must be a positive number"),
    warranty: Yup.string().required("Warranty is required"),
    // colour: Yup.string().required("Colour is required"),

    colour: Yup.array()
      .of(
        Yup.string()
          // .matches(/^#([0-9A-F]{3}){1,2}$/i, "Invalid hex color") // checks if valid hex color
          .required("Color is required")
      )
      .min(1, "At least one color is required"),
    // You can adjust min/max as needed

    finishType: Yup.string().required("Finish Type is required"),
    // about: Yup.array().of(Yup.string().required("About is required")),
    tax: Yup.number()
      .required("Tax is required")
      .positive("Tax must be a positive number"),
  });

  {
    /****validation schema***** */
  }

  const [loading, setLoading] = useState(false);
  const [initialProduct, setInitialProduct] = useState({});

  // Function to compare initial and current values including image files
  const getChangedValues = (
    initialProduct,
    currentValues,
    initialImageFiles
  ) => {
    const changedValues = {};
    for (const key in currentValues) {
      if (key === "about") {
        if (currentValues[key] !== initialProduct[key].join(",")) {
          changedValues[key] = currentValues[key].split(",");
          // console.log("about values is changed", changedValues[key]);
        }
      } else if (key === "images") {
        const newImages = initialImageFiles.filter((file, index) => {
          // Check if the current file is not a string (which implies it's a file object)
          // and compare it with the initial product images
          if (typeof file === "string") {
            return false; // Do nothing for string values (image URLs)
          }

          // Compare file objects with initialProduct[key] (images array)
          return file !== initialProduct[key][index];
        });

        // If there are new file objects (not URLs), add them to changed values
        if (newImages.length > 0) {
          changedValues[key] = newImages;
        }
      } else if (key === "colour") {
        // Check if the color IDs array has changed
        const hasColoursChanged = !(
          initialProduct.colour.length === currentValues.colour.length &&
          initialProduct.colour.every(
            (id, index) => id === currentValues.colour[index]
          )
        );

        if (hasColoursChanged) {
          changedValues[key] = currentValues[key];
          // console.log("colours values are changed", changedValues[key]);
        }
      } else if (currentValues[key] !== initialProduct[key]) {
        changedValues[key] = currentValues[key];
      }
    }
    return changedValues;
  };

  const handleAddprouducts = async (data) => {
    setLoading(true);
    try {
      const headers = {
        Authorization: localStorage.getItem("admin-token"),
        "Content-Type": "multipart/form-data",
      };

      let reqOptions = {
        url: "http://3.6.127.143/api/admin/product/add",
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
    dispatch(adminProductslist());
  };

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
    initialValues: form,
    validationSchema: validationSchema,
    enableReinitialize: true,

    onSubmit: (values, Action) => {
      const productData = {
        ...(includeProductId && { productId: values._id }),

        name: values.name,
        productType: values.productType,
        shortDescription: values.shortDescription,
        longDescription: values.longDescription,
        quantity: values.quantity,
        group: values.group,
        subGroup: values.subGroup,
        brand: values.brand,
        weight: values.weight,
        length: values.length,
        width: values.width,
        height: values.height,
        manufacturingDate: values.manufacturingDate,
        expiryDate: values.expiryDate,
        specialFeature: values.specialFeature,
        mrp: values.mrp,
        sellingPrice: values.sellingPrice,
        warranty: values.warranty,
        colour: selectedColors,
        finishType: values.finishType,
        // images: [],

        about: values.about.split(","),
        tax: values.tax,
      };

      if (includeProductId) {
        const changedValues = getChangedValues(initialProduct, values, images);
        if (Object.keys(changedValues).length > 0) {
          const formData = new FormData();
          for (const [key, value] of Object.entries(values)) {
            if (key === "_id") {
              formData.append("productId", value);
            }
          }
          for (const key in changedValues) {
            if (key === "about") {
              formData.append("about", JSON.stringify(changedValues[key]));
            } else if (key === "colour") {
              formData.append("colour", JSON.stringify(changedValues[key]));
            } else if (key === "images") {
              changedValues[key].forEach((file, index) => {
                formData.append(`image${index + 1}`, file);
              });
            } else {
              formData.append(key, changedValues[key]);
            }
          }
          // console.log("these are changed values"+changedValues)
          // setInitialProduct(changedValues);
          handleAddprouducts(formData);
          // console.log(initialProduct)
        } else {
          setToast({
            visible: true,
            message: "Nothing to change !",
            type: "warning",
          });
        }
      }
      // setInitialProduct(values)
      // setForm(values);
      // console.log(productData);
      else {
        let data = new FormData();
        data.append("data", JSON.stringify(productData));
        Object.keys(productData).forEach((key) => {
          if (key !== "about" && key !== "colour") {
            if (Array.isArray(productData[key])) {
              productData[key].forEach((item, index) => {
                data.append(`${key}[${index}]`, item);
              });
            } else {
              data.append(key, productData[key]);
            }
          }
        });

        data.append("about", JSON.stringify(productData.about));
        data.append("colour", JSON.stringify(productData.colour));

        images.forEach((image, index) => {
          if (image instanceof File) {
            data.append(`image${index + 1}`, image);
          } else {
            console.error(`Item at index ${index} is not a File instance`);
          }
        });
        // dispatch(addProduct(data));

        handleAddprouducts(data);

        // Action.resetForm();
      }
    },
  });
  // console.log(values);

  const [imagesError, setImagesError] = useState(
    "At least one image is required"
  );
  const handleInputChangen = (event) => {
    const files = Array.from(event.target.files);
    setImages((prevImages) => {
      const updatedImages = [...prevImages, ...files];

      // Immediately update Formik's field value with the updated images
      setFieldValue("images", updatedImages);

      return updatedImages;
    });

    setImagePreviews((prevPreviews) => [
      ...prevPreviews,
      ...files.map((file) => URL.createObjectURL(file)),
    ]);
  };

  const handleRemoveImage = (index, event) => {
    event.preventDefault();
    setImages((prevImages) => {
      const updatedImages = prevImages.filter((_, i) => i !== index);

      // Immediately update Formik's field value with the updated images
      setFieldValue("images", updatedImages);

      return updatedImages;
    });
    setImagePreviews((prev) => prev.filter((_, i) => i !== index));
  };

  const [showAddProduct, setShowAddProduct] = useState(false);

  const handleAddProduct = () => {
    setShowAddProduct(!showAddProduct);
  };

  const handleCloseButton = () => {
    setLoading(false);
    setShowAddProduct(!showAddProduct);
    setShowingColors([]);
    setSelectedColors([]);
    setIncludeProductId(false);
    setImagePreviews([]);
    setImages([]);
    setFieldValue("colour", []);
    setFieldValue("images", []);
    setForm({
      _id: "",
      name: "",
      productType: "",
      shortDescription: "",
      longDescription: "",
      quantity: "",
      group: "",
      subGroup: "",
      brand: "",
      weight: "",
      length: "",
      width: "",
      height: "",
      manufacturingDate: "",
      expiryDate: "",
      specialFeature: "",
      mrp: "",
      sellingPrice: "",
      warranty: "",
      colour: "",
      finishType: "",
      // images: [],
      image1: "",
      image2: "",
      image3: "",
      image4: "",
      image5: "",
      about: [],
      tax: "",
    });
  };

  const handleEditProduct = (product) => {
    setIncludeProductId(true);

    setForm({
      ...product,
      _id: product._id,
      manufacturingDate: formatDate(product.manufacturingDate),
      expiryDate: formatDate(product.expiryDate),
      about: product.about.join(","),
      colour: product.colour.map((color) => color._id),
    });
    setShowingColors(product.colour.map((color) => color.hexCode));
    setSelectedColors(product.colour.map((color) => color._id));
    const transformedColors = product.colour.map((color) => ({
      value: color._id, // _id as value
      color: color.hexCode,
      label: color.name,
      ncsCode: color.ncsCode, // hexCode as color
      // name: color.NcsCode       // NcsCode as name
    }));
    setSelectedColorObjects(transformedColors);
    setImagePreviews(product.images);
    setInitialProduct({
      ...product,
      colour: product.colour.map((color) => color._id),
      manufacturingDate: formatDate(product.manufacturingDate),
      expiryDate: formatDate(product.expiryDate),
    });
    setDealers(product.dealer);
    setShowAddProduct(true);
    setImages(product.images);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };
  // const handleEditProduct = useCallback(
  //   (product) => {
  //     setIncludeProductId(true);

  //     setForm({
  //       ...product,
  //       _id: product._id,
  //       manufacturingDate: formatDate(product.manufacturingDate),
  //       expiryDate: formatDate(product.expiryDate),
  //       about: product.about.join(","), // Join array with comma
  //       colour: product.colour.map((color) => color._id),
  //     });

  //     setShowingColors(product.colour.map((color) => color.hexCode));
  //     setSelectedColors(product.colour.map((color) => color._id));

  //     const transformedColors = product.colour.map((color) => ({
  //       value: color._id, // _id as value
  //       color: color.hexCode,
  //       label: color.name,
  //       ncsCode: color.ncsCode, // ncsCode as name
  //     }));

  //     setSelectedColorObjects(transformedColors);
  //     setImagePreviews(product.images);

  //     setInitialProduct({
  //       ...product,
  //       colour: product.colour.map((color) => color._id),
  //       manufacturingDate: formatDate(product.manufacturingDate),
  //       expiryDate: formatDate(product.expiryDate),
  //     });

  //     setDealers(product.dealer);
  //     setShowAddProduct(true);
  //     setImages(product.images);
  //   },
  //   [
  //     setIncludeProductId,
  //     setForm,
  //     formatDate,
  //     setShowingColors,
  //     setSelectedColors,
  //     setSelectedColorObjects,
  //     setImagePreviews,
  //     setInitialProduct,
  //     setDealers,
  //     setShowAddProduct,
  //     setImages,
  //     laodingDealerId, // If "loading" impacts the logic of this function
  //   ]
  // );
  console.log("linked dealers ---", dealers);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    dispatch(adminProductslist(pageNumber));

    // console.log(Fetching data for page ${pageNumber});
  };

  {
    /*****product-delete-handelin************/
  }

  const [deleteProductId, setDeleteProductId] = useState(null);
  const [deletePopup, setShowDeletePopup] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const handleDeleteButton = (id) => {
    setShowDeletePopup(!deletePopup);
    setDeleteProductId(id);
  };

  const handleDeleteProduct = async () => {
    setDeleteLoading(true);
    const Id = {
      productId: deleteProductId,
    };
    // console.log(Id);

    await dispatch(deleteProduct(Id));
    dispatch(adminProductslist());
    setDeleteProductId(null);
    setShowDeletePopup(false);
    setDeleteLoading(true);
  };

  const handleNoButton = () => {
    setShowDeletePopup(false);
  };

  {
    /*****product-delete-handelin************/
  }

  // console.log(includeProductId);
  // console.log(values.productId);

  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (query.trim() === "") {
      // If the search query is empty, show all products
      setFilteredProducts(products);
    } else {
      // Otherwise, filter the products based on the query
      setFilteredProducts(
        products.filter(
          (product) =>
            product.productId.toLowerCase().includes(query.toLowerCase()) ||
            product.name.toLowerCase().includes(query.toLowerCase())
        )
      );
    }
  };

  const handleUnlinkDealer = async (id) => {
    setLoadingDeaelerId(id);
    try {
      let headersList = {
        Authorization: localStorage.getItem("admin-token"),
      };
      let reqOptions = {
        url: "http://3.6.127.143/api/admin/dealer/unlink",
        method: "POST",
        headers: headersList,
        data: {
          productId: form._id,
          dealerId: id,
        },
      };

      let response = await axios.request(reqOptions);
      // await dispatch(dealerLinking(linkingData));

      setTimeout(async () => {
        if (response.data.success) {
          setToast({
            visible: true,
            message: response.data.message,
            type: "success",
          });
          await dispatch(adminProductslist());

          setLoadingDeaelerId(null);
          setDealers((prevDealers) =>
            prevDealers.filter((dealer) => dealer._id !== id)
          );
        } else if (!response.data.success) {
          setToast({
            visible: true,
            message: response.data.message,
            type: "danger",
          });

          setLoadingDeaelerId(null);
        }
      }, 2000);
    } catch (error) {
      console.log(error);
    }
  };
  console.log("form-values after adding new dealer", form);

  return (
    <div className="ml-[20rem] p-3 pl-6 pr-6 font-custom bg-[#F0F0F0] min-h-svh">
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 font-custom ">
          <div className="relative bg-white w-11/12 max-w-4xl h-screen p-6 rounded-lg shadow-lg overflow-y-auto mt-4">
            {/* Popup header with close button */}
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold font-custom text-gray-600">
                Select Colours
              </h2>
              <button
                onClick={(e) => togglePopup(e)}
                className="text-gray-600 text-lg absolute top-4 right-4 "
              >
                &times;
              </button>
            </div>

            {/* Search Bar */}
            <div className="flex justify-between gap-4">
              <input
                type="text"
                // placeholder="Search for Colours...   By ColourName , HexCode , NcsCode ..."
                placeholder="Search"
                className="px-4  w-full p-2 mb-4 border rounded-full focus:outline-none focus:ring-2 focus:ring-red-700"
                value={search}
                onChange={handleSearchColors}
              />
              {/* Action buttons */}
              <div className="flex h-10">
                <button
                  onClick={(e) => togglePopup(e)}
                  // className="bg-gray-400 text-white px-4 py-2 rounded-full mr-2 hover:bg-gray-500"
                  className=" text-red-700 px-4 py-2 rounded-md mr-2 hover:text-red-600"
                >
                  Cancel
                </button>
                <button
                  onClick={(e) => togglePopup(e)}
                  className="font-custom bg-blue-900 text-white px-4 py-2 rounded-md hover:bg-blue-900"
                >
                  Confirm
                </button>
              </div>
            </div>
            {/************showing-colors********************/}
            {!fetchColorsLoading ? (
              <div className="mb-4">
                {selectedColors.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {selectedColorObjects.map((color) => (
                      <div className="flex flex-col w-32 h-32 bg-gray-100 rounded shadow  ">
                        <div
                          key={color.value}
                          className=" flex flex-row  w-full h-full relative"
                          style={{
                            backgroundColor: chroma(color.color).alpha(1).css(),
                          }}
                        >
                          {/* <div
                          className="w-10 h-6"
                          style={{
                            backgroundColor: chroma(color).alpha(1).css(),
                          }}
                        ></div> */}
                          <button
                            className="absolute right-1 top-0 cursor-pointer text-white"
                            onClick={(e) => {
                              e.preventDefault();
                              removeSelectedColors(color);
                            }}
                          >
                            &times;
                          </button>
                        </div>
                        <div className="mt-1 text-center text-zinc-400">
                          {color.color}
                        </div>
                        <div className="text-center text-zinc-400">
                          {color.ncsCode}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <>
                {/* <div className=""><Loader1/></div> */}
                <p className="text-lg text-zinc-400 mb-2 font-custom text-center w-full">
                  loading...
                </p>
              </>
            )}
            {/* Color Table */}
            <table className="w-full table-auto font-custom">
              <thead>
                <tr className="bg-[#5C5C5C] text-left text-white">
                  <th className="p-2">
                    {/* <input
                      type="checkbox"
                      onChange={handleSelectAll}
                      checked={
                        filteredColors.length > 0 &&
                        filteredColors.every((color) =>
                          selectedColors.includes(color.value)
                        )
                      }
                      className="form-checkbox"
                    /> */}
                  </th>
                  <th className="text-base p-2 font-semibold text-white">
                    Color Name
                  </th>
                  <th className="text-base p-2 font-semibold text-white">
                    NCS Code
                  </th>
                  <th className="text-base p-2 font-semibold text-white">
                    Hex
                  </th>
                  <th className="text-base p-2 font-semibold text-white">
                    Colour
                  </th>
                </tr>
              </thead>
              <tbody>
                {displayColors.map((color) => (
                  <tr
                    key={color.value}
                    className={`border-b hover:bg-gray-50 ${
                      selectedColors.includes(color.value) ? "bg-gray-100" : ""
                    }`}
                  >
                    <td className="p-2">
                      <input
                        type="checkbox"
                        checked={selectedColors.includes(color.value)}
                        onChange={() => handleCheckboxChange(color)}
                        className="form-checkbox"
                      />
                    </td>
                    <td className="p-2">{color.label}</td>
                    <td className="p-2">{color.ncsCode}</td>
                    <td className="p-2">{color.color}</td>
                    <td className="p-2">
                      <div
                        style={{
                          backgroundColor: chroma(color.color).alpha(1).css(),
                        }}
                        className="w-full h-12 rounded-sm"
                      ></div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {/* <Pagination
              totalProducts={colorss.total}
              productsPerPage={colorss.limit}
              onPageChange={handlePageChangeForColors}
              currentPage={currentColorPage}
            /> */}
            {isSearching ? (
              <Pagination
                currentPage={currentSearchPage}
                totalProducts={allFilteredColors.length}
                onPageChange={handleSearchPageChange}
                productsPerPage={10}
              />
            ) : (
              <Pagination
                totalProducts={colorss.total}
                productsPerPage={colorss.limit}
                onPageChange={handlePageChangeForColors}
                currentPage={currentColorPage}
              />
            )}
          </div>
        </div>
      )}
      {!showAddProduct && (
        <div className="flex justify-between items-center mb-8 mt-3">
          <div className="text-2xl font-medium flex gap-2">
            <img src={box_iocn} alt="" srcset="" />
            Product List
          </div>

          <div className="">
            {/* <input
              type="text"
              placeholder="Search by Product Id or Name..."
              className="px-3 py-2 border border-green-600/30 bg-green-600/5 outline-green-600 rounded-lg mr-4"
              value={searchQuery}
              onChange={handleSearch}
            /> */}
            <button
              onClick={handleAddProduct}
              className=" text-white px-4 py-2 rounded-md bg-[#A70024] hover:bg-red-700"
            >
              Add Product
            </button>
          </div>
        </div>
      )}
      {clearSelectedPopUp && selectedColors.length > 0 && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
          <div className="bg-zinc-200 rounded-lg p-6 max-w-md mx-2 font-custom ">
            <h2 className="text-xl font-semibold  mb-3 text-center">
              Are you sure ?{" "}
            </h2>
            <h2 className="text-sm  mb-3 text-center">
              You want to clear colour selection ?{" "}
            </h2>

            <div className="flex justify-between">
              <button
                onClick={(e) => {
                  e.preventDefault();
                  setClearSelectedPopUp(!clearSelectedPopUp);
                }}
                className="bg-blue-900 text-white px-4 py-1 rounded-md hover:bg-blue-900 cursor-pointer"
              >
                No
              </button>
              <button
                onClick={(e) => handelCandle(e)}
                className="bg-blue-900 text-white px-4 py-1 rounded-md hover:bg-red-700 cursor-pointer"
              >
                Yes
              </button>
            </div>
          </div>
        </div>
      )}
      {deletePopup && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg p-9 max-w-md mx-2 font-custom ">
            <h2 className="text-xl font-semibold  mb-3 text-center">
              Are you sure ?{" "}
            </h2>
            <h2 className="text-sm  mb-5 text-center">
              You want to delete this product ?{" "}
            </h2>

            <div className="flex justify-between">
              <button
                onClick={() => handleNoButton()}
                className="bg-zinc-200 text-black px-6 py-2 rounded-sm hover:bg-zinc-400 cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDeleteProduct()}
                className="bg-blue-900 text-white px-6 py-2 rounded-md hover:bg-red-700 cursor-pointer"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
      {showAddProduct ? (
        <div className="mb-6">
          {toast.visible && (
            <Toast
              message={toast.message}
              type={toast.type}
              onClose={closeToast}
            />
          )}
          <div className="flex justify-between items-center mb-4">
            <div className="text-2xl font-medium flex gap-2">
              <img src={box_iocn} alt="" srcset="" />
              {form.name ? "Edit Product" : "Add Product"}
            </div>
            <div className="space-x-4">
              <button
                onClick={handleCloseButton}
                className=" px-4 py-2 rounded "
                style={{ color: "#A70024" }}
              >
                Cancel
              </button>
              <button
                type="submit"
                onClick={handleSubmit}
                className=" text-white px-4 py-2 rounded-lg bg-[#A70024] hover:bg-red-700"
              >
                {loading ? (
                  <Loader1 />
                ) : (
                  <p> {form.name ? "Save Changes" : "Save"}</p>
                )}
              </button>
            </div>
          </div>

          <form className="bg-[#F0F0F0] p-4 rounded-lg  space-y-4 mr-60">
            {/*productname and  product-type */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-20">
              <div>
                <label className="block text-sm font-medium text-zinc-600 ">
                  Product Title
                  <spanc className="text-red-500 text-lg text-center">*</spanc>
                </label>
                <input
                  type="text"
                  name="name"
                  value={values.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="mt-1 block w-full border rounded-md px-2 py-2  text-gray-600 focus:outline-blue-900 "
                />
                {errors.name && touched.name && (
                  <p className="text-red-500 text-sm">{errors.name}</p>
                )}
              </div>
              {/* <div>
                <label className="block text-sm font-medium text-gray-700">Brand</label>
                <input
                  type="text"
                  name="brand"
                  value={form.brand}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border rounded-md px-2 py-1"
                />
              </div> */}
              <div>
                <label className="block text-sm font-medium  text-zinc-600">
                  Product Type
                  <spanc className="text-red-500 text-lg text-center">*</spanc>
                </label>
                <select
                  className="mt-1 block w-full rounded-md px-2 py-2 text-gray-600 border border-zinc-200  focus:border-blue-900 focus:ring-blue-900 outline-none"
                  name="productType"
                  value={values.productType}
                  onChange={handleChange}
                  onBlur={handleBlur}
                >
                  <option value="">Select product Type</option>
                  <option value="paint">Paint</option>
                  <option value="accessories">Accessories</option>
                  <option value="Water Purifiers">Water Purifiers</option>
                  {/* Options */}
                </select>
                {errors.productType && touched.productType && (
                  <p className="text-red-500 text-sm">{errors.productType}</p>
                )}
              </div>
            </div>

            {/*goup and subgroup*/}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-20">
              <div>
                <label className="block text-sm font-medium  text-zinc-600">
                  Group
                  <spanc className="text-red-500 text-lg text-center">*</spanc>
                </label>
                <select
                  className="mt-1 block w-full rounded-md px-2 py-2 text-gray-600 border border-zinc-200  focus:border-blue-900 focus:ring-blue-900 outline-none"
                  name="group"
                  value={values.group}
                  onChange={handleChange}
                  onBlur={handleBlur}
                >
                  <option value="">Select Group</option>
                  <option value="interior">Interior</option>
                  <option value="exterior">Exterior</option>
                  <option value="commercial">Commercial</option>
                  <option value="domestic">Domestic</option>

                  {/* Options */}
                </select>
                {errors.group && touched.group && (
                  <p className="text-red-500 text-sm">{errors.group}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium  text-zinc-600">
                  Sub Group
                  <spanc className="text-red-500 text-lg text-center">*</spanc>
                </label>
                <select
                  className="mt-1 block w-full rounded-md px-2 py-2 text-gray-600 border border-zinc-200  focus:border-blue-900 focus:ring-blue-900 outline-none"
                  name="subGroup"
                  value={values.subGroup}
                  onChange={handleChange}
                  onBlur={handleBlur}
                >
                  <option value="">Select Sub Group</option>
                  <option value="emulsion">Emulsion</option>
                  <option value="enamel">Enamel</option>
                  <option value="functional">Functional</option>
                  <option value="distemper">Distemper</option>
                  <option value="solvent">solvent</option>
                  <option value="commercial">Commercial</option>
                  <option value="domestic">Domestic</option>
                  {/* Options */}
                </select>
                {errors.subGroup && touched.subGroup && (
                  <p className="text-red-500 text-sm">{errors.subGroup}</p>
                )}
              </div>
            </div>

            {/* Brand and weight */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-20">
              <div>
                <label className="block text-sm font-medium  text-zinc-600">
                  Brand
                  <spanc className="text-red-500 text-lg text-center">*</spanc>
                </label>

                <select
                  className="mt-1 block w-full rounded-md px-2 py-2 text-gray-600 border border-zinc-200  focus:border-blue-900 focus:ring-blue-900 outline-none"
                  name="brand"
                  value={values.brand}
                  onChange={handleChange}
                  onBlur={handleBlur}
                >
                  <option value="">Select Brand</option>
                  <option value="nerolac">Nerolac</option>
                  <option value="hextona">Hextona</option>
                  <option value="guher">Guher</option>
                  {/* Options */}
                </select>
                {errors.brand && touched.brand && (
                  <p className="text-red-500 text-sm">{errors.brand}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-zinc-600">
                  Weight(Litres)
                  <spanc className="text-red-500 text-lg text-center">*</spanc>
                </label>
                <input
                  type="text"
                  name="weight"
                  value={values.weight}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="mt-1 block w-full border rounded-md px-2 py-2 text-gray-600 focus:outline-blue-900"
                />
                {errors.weight && touched.weight && (
                  <p className="text-red-500 text-sm">{errors.weight}</p>
                )}
              </div>
            </div>

            {/*length and width */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-20">
              <div>
                <label className="block text-sm font-medium  text-zinc-600">
                  Length(In inches)
                  <spanc className="text-red-500 text-lg text-center">*</spanc>
                </label>
                <input
                  type="text"
                  name="length"
                  value={values.length}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="mt-1 block w-full border rounded-md px-2 py-2 text-gray-600 focus:outline-blue-900"
                />
                {errors.length && touched.length && (
                  <p className="text-red-500 text-sm">{errors.length}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-zinc-600">
                  Width(In inches)
                  <spanc className="text-red-500 text-lg text-center">*</spanc>
                </label>
                <input
                  type="text"
                  name="width"
                  value={values.width}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="mt-1 block w-full border rounded-md px-2 py-2 text-gray-600 focus:outline-blue-900"
                />
                {errors.width && touched.width && (
                  <p className="text-red-500 text-sm">{errors.width}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-zinc-600">
                  Height(in inches)
                  <spanc className="text-red-500 text-lg text-center">*</spanc>
                </label>
                <input
                  type="text"
                  name="height"
                  value={values.height}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="mt-1 block w-full border rounded-md px-2 py-2 text-gray-600 focus:outline-blue-900"
                />
                {errors.height && touched.height && (
                  <p className="text-red-500 text-sm">{errors.height}</p>
                )}
              </div>
            </div>
            {/* dates -- manufacturing datae and expiery date */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-20">
              <div>
                <label className="block text-sm font-medium  text-zinc-600">
                  Manufacturing Date
                  <spanc className="text-red-500 text-lg text-center">*</spanc>
                </label>
                <input
                  type="date"
                  name="manufacturingDate"
                  value={values.manufacturingDate}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="mt-1 block w-full border rounded-md px-2 py-2 text-gray-600 focus:outline-blue-900"
                />
                {errors.manufacturingDate && touched.manufacturingDate && (
                  <p className="text-red-500 text-sm">
                    {errors.manufacturingDate}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-zinc-600">
                  Expiry Date
                  <spanc className="text-red-500 text-lg text-center">*</spanc>
                </label>
                <input
                  type="date"
                  name="expiryDate"
                  value={values.expiryDate}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="mt-1 block w-full border rounded-md px-2 py-2 text-gray-600 focus:outline-blue-900"
                />
                {errors.expiryDate && touched.expiryDate && (
                  <p className="text-red-500 text-sm">{errors.expiryDate}</p>
                )}
              </div>
            </div>

            {/*quantity and warranty */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-20">
              <div>
                <label className="block text-sm font-medium  text-zinc-600">
                  Quantity
                  <spanc className="text-red-500 text-lg text-center">*</spanc>
                </label>
                <input
                  type="number"
                  name="quantity"
                  value={values.quantity}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="mt-1 block w-full border rounded-md px-2 py-2 text-gray-600 focus:outline-blue-900"
                />
                {errors.quantity && touched.quantity && (
                  <p className="text-red-500 text-sm">{errors.quantity}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-zinc-600">
                  Warranty
                  <spanc className="text-red-500 text-lg text-center">*</spanc>
                </label>
                <input
                  type="text"
                  name="warranty"
                  value={values.warranty}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="mt-1 block w-full border rounded-md px-2 py-2 text-gray-600 focus:outline-blue-900"
                />
                {errors.warranty && touched.warranty && (
                  <p className="text-red-500 text-sm">{errors.warranty}</p>
                )}
              </div>
            </div>
            <div className=" grid grid-cols-2 gap-4">
              <div>
                <label className="block mt-6 text-lg font-medium  text-zinc-600">
                  Supported Colours
                  <spanc className="text-red-500 text-lg text-center">*</spanc>
                </label>
                {/* <Select
                  closeMenuOnSelect={false}
                  isMulti
                  options={colourOptions}
                  styles={colourStyles}
                  onChange={handleColorChange}
                /> */}

                {errors.colour && touched.colour && (
                  <p className="text-red-500 text-sm">{errors.colour}</p>
                )}
              </div>
              <div className="mt-5 font-custom">
                <button
                  onClick={(e) => togglePopup(e)}
                  className="bg-blue-900 text-white px-4 py-2 rounded-full hover:bg-blue-700"
                >
                  Add Colours
                </button>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    setClearSelectedPopUp(!clearSelectedPopUp);
                  }}
                  className="bg-red-700 text-white px-4 py-2 rounded-full hover:bg-red-800 ml-2"
                >
                  Clear Selection
                </button>
              </div>

              <div>{/* Color cards and remove functionality */}</div>
            </div>
            <div className="mb-4">
              {selectedColors.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {selectedColorObjects.map((color) => (
                    <div className="flex flex-col w-32 h-32 bg-gray-100 rounded shadow  ">
                      <div
                        key={color.value}
                        className=" flex flex-row  w-full h-full relative"
                        style={{
                          backgroundColor: chroma(color.color).alpha(1).css(),
                        }}
                      >
                        {/* <div
                          className="w-10 h-6"
                          style={{
                            backgroundColor: chroma(color).alpha(1).css(),
                          }}
                        ></div> */}
                        <button
                          className="absolute right-1 top-0 cursor-pointer text-white"
                          onClick={(e) => {
                            e.preventDefault();
                            removeSelectedColors(color);
                          }}
                        >
                          &times;
                        </button>
                      </div>
                      <div className="mt-1 text-center text-zinc-400">
                        {color.color}
                      </div>
                      <div className="text-center text-zinc-400">
                        {color.ncsCode}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/********image-container********/}

            <div className="flex gap-2">
              <label className="block text-sm font-medium  text-zinc-600"></label>
              <div
                className="mt-3 w-40 h-40 border rounded-md flex items-center justify-center cursor-pointer bg-gray-100 text-red-400 border-neutral-200 hover:border-blue-900 flex-shrink-0"
                onClick={() => document.getElementById("imageUpload").click()}
              >
                Add Image
                <spanc className="text-red-500 text-lg text-center">*</spanc>
              </div>
              <input
                type="file"
                id="imageUpload"
                multiple
                onChange={handleInputChangen}
                className="hidden"
              />
              {errors.images && touched.images && (
                <p className="text-red-500 text-sm">{errors.images}</p>
              )}
              <div className="mt-2 flex flex-wrap gap-2">
                {imagePreviews.map((image, index) => (
                  <div
                    key={index}
                    className="relative w-40 h-40 border rounded-md p-4 border-neutral-200"
                  >
                    <img
                      src={image}
                      alt={`Product ${index}`}
                      className="object-cover w-full h-full rounded-md"
                    />
                    <button
                      onClick={(event) => handleRemoveImage(index, event)}
                      className="absolute top-1 right-1 text-white  rounded-md p-2  text-xs hover:bg-blue-900"
                      style={{ backgroundColor: "#A70024" }}
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/******price and offer price *************/}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-20">
              <div>
                <label className="block text-sm font-medium  text-zinc-600">
                  MRP
                  <spanc className="text-red-500 text-lg text-center">*</spanc>
                </label>
                <input
                  type="number"
                  name="mrp"
                  value={values.mrp}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="mt-1 block w-full border rounded-md px-2 py-2 text-gray-600 focus:outline-blue-900"
                />
                {errors.mrp && touched.mrp && (
                  <p className="text-red-500 text-sm">{errors.mrp}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium  text-zinc-600">
                  Selling Price
                  <spanc className="text-red-500 text-lg text-center">*</spanc>
                </label>
                <input
                  type="number"
                  name="sellingPrice"
                  value={values.sellingPrice}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="mt-1 block w-full border rounded-md px-2 py-2 text-gray-600 focus:outline-blue-900"
                />
                {errors.sellingPrice && touched.sellingPrice && (
                  <p className="text-red-500 text-sm">{errors.sellingPrice}</p>
                )}
              </div>
            </div>
            {/******price and offer price *************/}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-20">
              <div>
                <label className="block text-sm font-medium  text-zinc-600">
                  Tax
                  <spanc className="text-red-500 text-lg text-center">*</spanc>
                </label>
                <input
                  type="number"
                  name="tax"
                  value={values.tax}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="mt-1 block w-full border rounded-md px-2 py-2 text-gray-600 focus:outline-blue-900"
                />
                {errors.tax && touched.tax && (
                  <p className="text-red-500 text-sm">{errors.tax}</p>
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium  text-zinc-600">
                Finish Type
                <spanc className="text-red-500 text-lg text-center">*</spanc>
              </label>
              <select
                className="mt-1 block w-full border rounded-md px-2 py-2 text-gray-600 focus:border-blue-900 focus:ring-blue-900 outline-none"
                name="finishType"
                value={values.finishType}
                onChange={handleChange}
              >
                <option value="">Select Finish Type</option>
                <option value="eggshell">Eggshell</option>
                <option value="glassy">Glassy</option>
                <option value="hd">Hd</option>
                <option value="high glass">High Glass</option>
                <option value="matte">Matte</option>
                {/* Options */}
              </select>
              {errors.finishType && touched.finishType && (
                <p className="text-red-500 text-sm">{errors.finishType}</p>
              )}
            </div>

            {/****************/}

            <div>
              <label className="block text-sm font-medium  text-zinc-600">
                Short Description
                <spanc className="text-red-500 text-lg text-center">*</spanc>
              </label>
              <input
                type="text"
                name="shortDescription"
                value={values.shortDescription}
                onChange={handleChange}
                onBlur={handleBlur}
                className="mt-1 block w-full border rounded-md px-2 py-1 text-gray-600 focus:outline-blue-900"
              />
              {errors.shortDescription && touched.shortDescription && (
                <p className="text-red-500 text-sm">
                  {errors.shortDescription}
                </p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium  text-zinc-600">
                Long Description
                <spanc className="text-red-500 text-lg text-center">*</spanc>
              </label>
              <textarea
                type="text"
                name="longDescription"
                value={values.longDescription}
                onChange={handleChange}
                onBlur={handleBlur}
                className="h-12 mt-1 block w-full border rounded-md px-2 py-1 text-gray-600 focus:outline-blue-900"
              />
              {errors.longDescription && touched.longDescription && (
                <p className="text-red-500 text-sm">{errors.longDescription}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium  text-zinc-600">
                Features
                <spanc className="text-red-500 text-lg text-center">*</spanc>
              </label>
              <textarea
                name="specialFeature"
                value={values.specialFeature}
                onChange={handleChange}
                onBlur={handleBlur}
                className="mt-1 block w-full h-32 border rounded-md px-2 py-1 text-gray-600 focus:outline-blue-900"
              ></textarea>
              {errors.specialFeature && touched.specialFeature && (
                <p className="text-red-500 text-sm">{errors.specialFeature}</p>
              )}
            </div>
            <div>
              <label className="block text-sm   font-medium   text-zinc-600">
                About
                <spanc className="text-red-500 text-lg text-center">*</spanc>
              </label>
              <textarea
                name="about"
                value={values.about}
                onChange={handleChange}
                onBlur={handleBlur}
                className="mt-1 block w-full h-48 border rounded-md px-2 py-1 text-gray-600 focus:outline-blue-900"
              ></textarea>
              {errors.about && touched.about && (
                <p className="text-red-500 text-sm">{errors.about}</p>
              )}
            </div>
          </form>
          <div className="flex justify-between items-center mb-4">
            <div className="text-2xl font-medium flex gap-2"></div>
            <div className="space-x-4">
              <button
                onClick={handleCloseButton}
                className=" px-4 py-2 rounded "
                style={{ color: "#A70024" }}
              >
                Cancel
              </button>
              <button
                type="submit"
                onClick={handleSubmit}
                className=" text-white px-4 py-2 rounded-lg bg-[#A70024] hover:bg-red-700"
              >
                {loading ? (
                  <Loader1 />
                ) : (
                  <p> {form.name ? "Save Changes" : "Save"}</p>
                )}
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 bg-neutral-200">
            <thead className="bg-[#5C5C5C]">
              <tr>
                {/* <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <input type="checkbox" name="" id="" />
                </th> */}
                <th className="px-6 py-3 text-left text-xs  text-white uppercase tracking-wider font-bold">
                  Image
                </th>
                <th className="px-6 py-3 text-left text-xs font-bold text-white uppercase tracking-wider">
                  Id
                </th>
                <th className="px-6 py-3 text-left text-xs font-bold text-white uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-bold text-white uppercase tracking-wider">
                  Brand
                </th>
                <th className="px-6 py-3 text-left text-xs font-bold text-white uppercase tracking-wider">
                  Size
                </th>
                <th className="px-6 py-3 text-left text-xs font-bold text-white uppercase tracking-wider">
                  Qty
                </th>
                <th className="px-6 py-3 text-left text-xs font-bold text-white uppercase tracking-wider">
                  Price
                </th>
                <th className="px-6 py-3 text-left text-xs font-bold text-white uppercase tracking-wider">
                  Status
                </th>
                <th className="px-8 py-3 text-left text-sm font-bold text-white uppercase tracking-wider">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredProducts.map((product, index) => (
                <tr
                  key={product._id}
                  className={index % 2 === 0 ? "" : "bg-[#F0F0F0]"}
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <img
                      src={product?.images[0]}
                      alt="Product"
                      className="h-10 w-10 rounded-sm"
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {product.productId}
                  </td>
                  {/* <td className="px-6 py-4 whitespace-nowrap overflow-hidden overflow-ellipsis max-w-xs">
                    {product.shortDescription}
                  </td> */}
                  <td className="px-6 py-4">
                    {product.shortDescription.length > 15
                      ? `${product.shortDescription.substring(0, 14)}...`
                      : product.shortDescription}
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap">
                    {product.brand}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {product.size}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {product.quantity}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="font-sans">₹</span>
                    {product.sellingPrice}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`text-${
                        product.status === "A" ? "green" : "red"
                      }-500`}
                    >
                      {product.status === "A" ? <p>Active</p> : <p>DeActive</p>}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button
                      onClick={() => handleEditProduct(product)}
                      className="text-blue-500 mr-2"
                    >
                      {/* <FaEdit /> */}
                      <img src={edit} alt="" className="h-7 w-10" />
                    </button>
                    <button
                      onClick={() => {
                        handleDeleteButton(product._id);
                      }}
                      className="text-red-500"
                    >
                      <img src={delete1} alt="" className="h-7 w-10" />
                      {/* <FaTrash /> */}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {status === "succeeded" && (
            <Pagination
              totalProducts={items.data.total}
              productsPerPage={items.data.limit}
              onPageChange={handlePageChange}
              currentPage={currentPage}
            />
          )}
        </div>
      )}
      {form.name && <DealerLinking productId={form._id} />}
      {includeProductId && (
        <>
          <div className="flex justify-between items-center my-4">
            <div className="text-2xl font-medium flex gap-2">
              <img src={box_iocn} alt="" srcset="" />
              Linked Dealers
            </div>
          </div>
          <div className="bg-white rounded-lg shadow overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 bg-neutral-200">
              <thead>
                <tr>
                  {/* <th className="px-6 py-3 text-left">
                <input
                  type="checkbox"
                  // onChange={handleSelectAll}
                  // checked={selectedDealerIds.length === filteredDealers.length}
                />
              </th> */}
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    No
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Id
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Name & Phone No
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Address
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Serviceable Pincode
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Qty
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {dealers?.map((dealer, index) => (
                  <tr key={index}>
                    {/* <td className="px-6 py-3">
                  <input
                    type="checkbox"
                    // onChange={(e) => handleSelectDealer(e, dealer._id)}
                    // checked={selectedDealerIds.includes(dealer._id)}
                  />
                </td> */}

                    <td className="px-6 py-4 whitespace-nowrap">{index + 1}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {dealer.dealerId}
                    </td>
                    <td className="px-6 py-4 ">
                      {dealer.firstName} {dealer.lastName} {dealer.phoneNumber}
                    </td>
                    <td className="px-6 py-4 ">{dealer.addressLine1}</td>
                    <td className="px-6 py-4 ">
                      {/* {dealer.pincode} */}
                      {dealer?.serviceLocation
                        ?.map((location) => location.pincode)
                        .join(", ")}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {/* {dealer.quantity} */}
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`text-${
                          dealer.status === "Y" ? "green" : "red"
                        }-500`}
                      >
                        {dealer.status === "Y" ? <p>Active</p> : <p>Inative</p>}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button
                        onClick={() => handleUnlinkDealer(dealer._id)}
                        className=" px-4 py-2 rounded-lg bg-red-500 hover:bg-blue-900 text-sm text-white"
                      >
                        {laodingDealerId === dealer._id ? (
                          <Loader content="Loading..." />
                        ) : (
                          "Remove"
                        )}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {/* {dealersStatus === "succeeded" && (
        <Pagination
          totalProducts={dealersItems.data.total}
          productsPerPage={dealersItems.data.limit}
          onPageChange={handlePageChange}
          currentPage={currentPage}
        />
      )} */}
          </div>
        </>
      )}
    </div>
  );
};

export default ProductManagement;
