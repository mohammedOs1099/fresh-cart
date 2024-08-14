import React from "react";
import {
  RouterProvider,
  createBrowserRouter,
  createHashRouter
} from "react-router-dom";
import Home from "./components/Home/Home";
import Brands from "./components/Brands/Brands";
import Categories from "./components/Categories/Categories";
import Notfound from "./components/Notfound/Notfound";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import Layout from "./components/Layout/Layout";
import Products from "./components/Products/Products";
import Cart from "./components/Cart/Cart";
import AuthcontextProvider from "./Authcontext/Authcontext";
import ProtectedRout from "./components/ProtectedRout/ProtectedRout";
import ProtactedAuth from "./components/ProtectedRout/ProtactedAuth";
import { QueryClient, QueryClientProvider } from "react-query";
import ProductDetails from "./components/ProductDetails/ProductDetails.jsx";
import SpecificCategorise from "./components/SpecificCategorise/SpecificCategorise";
import SpecificProduct from "./components/SpecificProduct/SpecificProduct";
import SpecificBrand from "./components/SpecificBrand/SpecificBrand";
import Cartcontext from "./Cartcontext/Cartcontext.js";
import Profile from "./components/Profile/Profile.jsx";
import UserCartDetails from "./components/UserCartDetails/UserCartDetails";
import Allorders from "./components/Allorders/Allorders";
import Favorite from "./components/Favorite/Favorite";
import ForgetPassword from "./components/ForgetPassword/ForgetPassword";
import ResetPasswordCode from "./components/ResetPasswordCode/ResetPasswordCode";
import SetNewPassword from "./components/SetNewPassword/SetNewPassword.jsx";
import UpdateUserData from "./components/UpdateUserData/UpdateUserData.jsx";

export default function App() {
  let query = new QueryClient();

  const routs = createHashRouter([
    {
      path: "",
      element: <Layout />,
      children: [
        {
          index: true,
          element: (
            <ProtectedRout>
              <Home />
            </ProtectedRout>
          )
        },
        {
          path: "home",
          element: (
            <ProtectedRout>
              <Home />
            </ProtectedRout>
          )
        },

        {
          path: "register",
          element: (
            <ProtactedAuth>
              <Register />
            </ProtactedAuth>
          )
        },
        {
          path: "login",
          element: (
            <ProtactedAuth>
              <Login />
            </ProtactedAuth>
          )
        },
        {
          path: "forgetpassword",
          element: (
            <ProtactedAuth>
              <ForgetPassword />
            </ProtactedAuth>
          )
        },
        {
          path: "resetpasswordcod",
          element: (
            <ProtactedAuth>
              <ResetPasswordCode />
            </ProtactedAuth>
          )
        },
        {
          path: "setnewpassword",
          element: (
            <ProtactedAuth>
              <SetNewPassword />
            </ProtactedAuth>
          )
        },

        {
          path: "updateuserdata",
          element: (
            <ProtectedRout>
              <UpdateUserData />
            </ProtectedRout>
          )
        },

        {
          path: "categories",
          element: (
            <ProtectedRout>
              <Categories />
            </ProtectedRout>
          )
        },
        {
          path: "brands",
          element: (
            <ProtectedRout>
              <Brands />
            </ProtectedRout>
          )
        },

        {
          path: "products",
          element: (
            <ProtectedRout>
              <Products />
            </ProtectedRout>
          )
        },
        {
          path: "cart",
          element: (
            <ProtectedRout>
              <Cart />
            </ProtectedRout>
          )
        },
        {
          path: "productdetails/:id",
          element: (
            <ProtectedRout>
              <ProductDetails />
            </ProtectedRout>
          )
        },
        {
          path: "specificcategory/:id",
          element: (
            <ProtectedRout>
              <SpecificCategorise />
            </ProtectedRout>
          )
        },
        {
          path: "soecificproduct/:id",
          element: (
            <ProtectedRout>
              <SpecificProduct />
            </ProtectedRout>
          )
        },
        {
          path: "profile",
          element: (
            <ProtectedRout>
              <Profile />
            </ProtectedRout>
          )
        },
        {
          path: "profile",
          element: (
            <ProtectedRout>
              <Profile />
            </ProtectedRout>
          )
        },
        {
          path: "usercartdetails/:cartId",
          element: (
            <ProtectedRout>
              <UserCartDetails />
            </ProtectedRout>
          )
        },
        {
          path: "favorite",
          element: (
            <ProtectedRout>
              <Favorite />
            </ProtectedRout>
          )
        },
        {
          path: "allorders",
          element: (
            <ProtectedRout>
              <Allorders />
            </ProtectedRout>
          )
        },

        {
          path: "soecificbrand/:id",
          element: (
            <ProtectedRout>
              <SpecificBrand />
            </ProtectedRout>
          )
        },
        { path: "*", element: <Notfound /> }
      ]
    }
  ]);

  return (
    <>
      <Cartcontext>
        <QueryClientProvider client={query}>
          <AuthcontextProvider>
            <RouterProvider router={routs}></RouterProvider>
          </AuthcontextProvider>
        </QueryClientProvider>
      </Cartcontext>
    </>
  );
}
