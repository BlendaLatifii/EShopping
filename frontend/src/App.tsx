import Login from "./Components/Login.tsx";
import { Routes, Route, Outlet } from "react-router-dom";
import SignUp from "./Components/SignUp.tsx";
import Cart from "./Components/Cart.tsx";
import axios from "axios";
import { AuthService } from "./Services/AuthService.ts";
import Order from "./Components/Order.tsx";
import MyProfile from "./Components/MyProfile.tsx";
import Category from "./Components/Category/Category.tsx";
import CategoryTable from "./Components/Category/CategoryTable.tsx";
import ProductTable from "./Components/Product/ProductTable.tsx";
import UserTable from "./Components/User/UserTable.tsx";
import ProductDetail from "./Components/Product/ProductDetail.tsx";
import OrderStatusTable from "./Components/OrderStatus/OrderStatusTable.tsx";
import PaymentMethodTable from "./Components/PaymentMethod/PaymentMethodTable.tsx";
import HomePage from "./Components/HomePage.tsx";
import ForgetPassword from "./Components/ForgetPassword.tsx";
import ResetPassword from "./Components/ResetPassword.tsx";
import Payment from "./Components/Payment/Payment.tsx";
import PaymentTable from "./Components/Payment/PaymentTable.tsx";
import Layout from "./Components/Layout.tsx";
import Dashboard from "./Components/Dashboard.tsx";

function App() {
  axios.interceptors.request.use(async(config) => {
    config.headers.Authorization = `Bearer ${await AuthService.GetToken()}`;
    return config;
  });

  const isAdmin = AuthService.isAdmin();
  
  return (
   <>
   <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/SignUp" element={<SignUp />} />
      <Route path="/ForgetPassword" element={<ForgetPassword />} />
      <Route path="/reset-password" element={<ResetPassword />} />

    <Route element={<Layout />}>
    <Route path="/HomePage" element={<HomePage/>}/>
    <Route path="/Category" element={<Category/>}/>
    <Route path="/CategoryTable" element={<CategoryTable/>}/>
    <Route path="/ProductTable" element={<ProductTable/>}/>
    <Route path="/UserTable" element={<UserTable/>}/>
    <Route path="/Cart" element={<Cart/>}/>
    <Route path="/ProductDetail/:id" element={<ProductDetail/>}/>
    <Route path="/Order" element={<Order/>}/>
    <Route path="/MyProfile" element={<MyProfile/>}/>
    <Route path="/OrderStatusTable" element={<OrderStatusTable/>}/>
    <Route path="/PaymentMethodTable" element={<PaymentMethodTable/>}/>
    <Route path="/Payment" element={<Payment/>}/>
    <Route path="/PaymentTable" element={<PaymentTable/>}/>
    <Route path="/Dashboard" element={<Dashboard/>}/>
    </Route>
   </Routes>
   </>
  );
}

export default App;
