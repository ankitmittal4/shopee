import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import Homepage from "./components/Homepage/Homepage";
import FilterSidebar from "./components/ProductList/Filter";
import Footer from "./components/Footer";
import Filter from "./components/ProductList/Filter";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ProductDetail from "./components/ProductPage/Product";
import Cart from "./components/Cart/Cart";
import SignUp from "./components/Userloginlogout/Signup";
import SignIn from "./components/Userloginlogout/Signin";
import ProductList from "./Productlist";
import AdminSignIn from "./components/Admin/AdminSignin";
import AdminDashboard from "./components/Admin/AdminDashboard/AdminDashboard";
import MainLayout from "./components/MainLayout";
import { Protected } from "./components/Protected/Protected";
import AdminMainlayout from "./components/Admin/AdminDashboard/AdminMainlayout";
import ProductManagement from "./components/Admin/AdminDashboard/ProductManagement";
import Dashboard from "./components/Admin/AdminDashboard/AdminDashboard";
import DealerForm from "./components/Admin/AdminDashboard/DealerManagement";
import Tosts from "./components/Tost/Tosts";
import Profile from "./components/UserProfile/Profile";
import DealerLinking from "./components/Admin/AdminDashboard/DealerLinking";
import CustomerManagements from "./components/Admin/AdminDashboard/CustomerMngmnt";
import OrderManagement from "./components/Admin/AdminDashboard/OrderManagement";
import OrderDetails from "./components/Admin/AdminDashboard/OrderDetails";
import OrderManagementLayout from "./components/Admin/AdminDashboard/OrderManagementLayout";

function App() {
  const withLayout = (Component) => (
    <MainLayout>
      <Component />
    </MainLayout>
  );
  const withoutLayout = (Component) => <Component />;

  return (
    <BrowserRouter>
      <Routes>
        {/* <Route path="/" element={withLayout(Homepage)} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/products/:id" element={withLayout(ProductDetail)} />
        <Route path="/products" element={withLayout(Filter)} />
        <Route path="/productlist" element={<ProductList />} />
        <Route path="/cart" element={withLayout(Cart)} /> */}
        <Route path="/adminlogin" element={<AdminSignIn />} />
        {/* <Route path="/tost" element={<Tosts />} />
        <Route path="/dealerlink" element={<DealerLinking />} />
        <Route path="profile/*" element={withLayout(Profile)} />  */}
        <Route element={<Protected />}>
          {/* <Route path="/admin-dashboard" element={<AdminDashboard />} /> */}
          <Route
            path="/admin-dashboard"
            element={<AdminMainlayout component={<Dashboard />} />}
          />
          {/* <Route path="/admin-dashboard/home" exact component={Dashboard} /> */}
          <Route
            path="/product-management"
            element={<AdminMainlayout component={<ProductManagement />} />}
          />
          <Route
            path="/dealer-management"
            element={<AdminMainlayout component={<DealerForm />} />}
          />
          <Route
            path="/customer-management"
            element={<AdminMainlayout component={<CustomerManagements />} />}
          />
          <Route
            path="order-management/*"
            element={<AdminMainlayout component={<OrderManagementLayout />} />}
          />
        </Route>
        {/* <Route path="/buyproducts" element={<ProductDetail/>}/> */}
        {/* <Route path="/aboutus" element={<Aboutus/>}/> */}
        {/* <Route path="/contactus" element={<Contactus/>}/> */}
        {/* <Route path="/applyjobs/:id" element={<Applyjobs/>}/> */}
        {/* <Route element={<Protected/>}>
        <Route path="/createjobs" element={<Createjob/>}/>
        <Route path="/createjobs/:id" element={<Createjob/>}/>
        <Route path="/jobslist" element={<Jobslist/>}/>
    </Route> */}
        {/* <Route path="/adminlogin" element={<Adminlogin/>}/> */}
        {/* <Route path="/applyjobs" element={<Applyjobs/>}/> */}
      </Routes>
      {/* <Footer/> */}
    </BrowserRouter>
  );
}

export default App;
