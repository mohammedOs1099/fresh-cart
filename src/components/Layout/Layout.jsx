import React from "react";

import Navbar from "./../Navbar/Navbar";
import { Outlet } from "react-router-dom";

import Footer from "./../Footer/Footer";
import { Toaster } from "react-hot-toast";
import { Offline } from "react-detect-offline";

export default function Layout() {
  return (
    <>
      <Navbar />
      <Outlet />
      <Toaster />
      <div className="m-5  text-bg-danger text-center ">
        <Offline className="    bg-body-secondary p-5 my-3   bg-dark-subtle ">
          <i className="fas fa-wifi px-3"></i>
          You're offline right now. Check your connection.
        </Offline>
      </div>

      <Footer />
    </>
  );
}
