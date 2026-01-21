import Login from "./Components/Login.tsx";
import { Routes, Route, Navigate } from "react-router-dom";
import Header from "./Components/Header.tsx";
import Category from "./Components/Category.tsx";
import ProductCard from "./Components/ProductCard.tsx";
import CategoryTable from "./Components/CategoryTable.tsx";
import SignUp from "./Components/SignUp.tsx";
import ProductTable from "./Components/ProductTable.tsx";
import ProductDetail from "./Components/ProductDetail.tsx";
import Cart from "./Components/Cart.tsx";
import axios from "axios";
import { AuthService } from "./Services/AuthService.ts";

function App() {
  axios.interceptors.request.use(async(config) => {
    config.headers.Authorization = `Bearer ${await AuthService.GetToken()}`;
    return config;
  });
  
  return (
   <>
   <Routes>
    <Route path="/" element={<Login/>}/>
    <Route path="/SignUp" element={<SignUp/>}/>
    <Route path="/Header" element={<Header/>}/>
    <Route path="/Category" element={<Category/>}/>
    <Route path="/CategoryTable" element={<CategoryTable/>}/>
    <Route path="/ProductCard" element={<ProductCard/>}/>
    <Route path="/ProductTable" element={<ProductTable/>}/>
    <Route path="/Cart" element={<Cart/>}/>
    <Route path="/ProductDetail/:id" element={<ProductDetail/>}/>
   </Routes>
   </>
  );
}

export default App;
