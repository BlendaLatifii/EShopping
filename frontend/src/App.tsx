import Login from "./Components/Login.tsx";
import { Routes, Route, Outlet } from "react-router-dom";
import SignUp from "./Components/SignUp.tsx";
import Cart from "./Components/Cart.tsx";
import axios from "axios";
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
import AdminRoute from "./Components/AdminRoute.tsx";
import {AuthService} from "./Services/AuthService.ts"
import AuthenticatedRoute from "./Components/AuthenticatedRoute.tsx";

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
    <Route path="/HomePage" element={<AuthenticatedRoute component={HomePage}/>}/>
    <Route path="/Category" element={<AuthenticatedRoute component={Category}/>}/>
    <Route path="/CategoryTable" element={<AdminRoute component = {CategoryTable}/>}/>
    <Route path="/ProductTable" element={<AdminRoute component = {ProductTable}/>}/>
    <Route path="/UserTable" element={<AdminRoute component = {UserTable}/>}/>
    <Route path="/Cart" element={<AuthenticatedRoute component={Cart}/>}/>
    <Route path="/ProductDetail/:id" element={<AuthenticatedRoute component={ProductDetail}/>}/>
    <Route path="/Order" element={<AuthenticatedRoute component={Order}/>}/>
    <Route path="/MyProfile" element={<AuthenticatedRoute component={MyProfile}/>}/>
    <Route path="/OrderStatusTable" element={< AdminRoute component = {OrderStatusTable}/>}/>
    <Route path="/PaymentMethodTable" element={<AdminRoute component = {PaymentMethodTable}/>}/>
    <Route path="/Payment" element={<AuthenticatedRoute component={Payment}/>}/>
    <Route path="/PaymentTable" element={<AdminRoute component = {PaymentTable}/>}/>
    <Route path="/Dashboard" element={<AdminRoute component={Dashboard}/>}/>
    </Route>
   </Routes>
   </>
  );
}

export default App;
