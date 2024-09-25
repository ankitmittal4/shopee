// store/store.js
import { configureStore } from '@reduxjs/toolkit';
import {productReducer,productDetailReducer } from '../features/productSlice'
import authReducer from'../features/authSlice'
import adminAuthReducer from '../features/Admin/adminAuthSlice'
import adminproductsReducer from '../features/Admin/adminProductlistSlice'
import addProductReducer from '../features/Admin/addProductSlice';
import  {addItemReducer, cartItemsReducer, updateItemsReducer } from '../features/CartCred/cartSlice';
import {dealerAddReducer,dealerDeleteReducer,dealerLinkReducer} from '../features/Admin/Dealer/dealerAddSlice';
import { locationListReducer } from '../features/Admin/Dealer/DealerServiceLocations';
import  customerReducer from '../features/Admin/Customer/customerSlice';
import orderReducer from '../features/Admin/Order/orderSlice';


export const store = configureStore({
  reducer: {
    products: productReducer,
    productDetails: productDetailReducer,
    auth: authReducer,
    adminAuth:adminAuthReducer,
    adminproducts:adminproductsReducer,
    addproducts:addProductReducer,
    addcartItem:addItemReducer,
    cartItemlist:cartItemsReducer,
    updateCartItem:updateItemsReducer,
    dealerAdd:dealerAddReducer,
    dealerLink:dealerLinkReducer,
    // dealerDelete:dealerDeleteReducer,
    locationlist:locationListReducer,
    customer:customerReducer,
    order:orderReducer,



    },
});

export default store;
