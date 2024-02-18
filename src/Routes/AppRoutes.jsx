import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../Home";
import ProductPage from "../ProductPage";
import NavBar from "../Components/NavBar";
import DashboardContext from "../Context/DashboardContext";
import CreateProduct from "../ProductComponents/CreateProduct";
import ProductInformation from "../ProductInformation";
import Footer from "../Components/Footer";
import CartPage from "../CartPage";
import CartContext from "../Context/CartContext";
import Login from "../UsersPage/Login";
import SignUp from "../UsersPage/CreateUser";
import ForgotPassword from "../UsersPage/ForgotPassword";
import ResetPassword from "../UsersPage/ResetPassword";
import UserProfile from "../UsersPage/UserProfile";
import ProductByCategory from "../ProductByCategory";

function AppRoutes() {
  return (
    <DashboardContext> 
      <CartContext>
    <NavBar /> 
    <Routes>
      <Route path="/productpage" element={<ProductPage />} /> 
      <Route path="/allproducts" element={<ProductByCategory />} /> 
      <Route path="/productInformation/:id" element={<ProductInformation />} /> 
      <Route path="/CartPage" element={<CartPage />} /> 
      <Route path="/addproduct" element={<CreateProduct />} /> 
      <Route path="/login" element={<Login />} /> 
      <Route path="/signUp" element={<SignUp />} /> 
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password/:token" element={<ResetPassword />} /> 
      <Route path="/profile" element={<UserProfile />} /> 
      <Route path="/" element={<Home />} /> 
    </Routes>
    <Footer />
    </CartContext>
  </DashboardContext>
  );
}

export default AppRoutes;
