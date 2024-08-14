import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { authContext } from "../../Authcontext/Authcontext";
import { cartContext } from "./../../Cartcontext/Cartcontext";


export default function Profile() {
  document.title = " fresh cart | Profile ";

  const { setIsUserLoding } = useContext(authContext);
  const navigate = useNavigate();
  let { tokendecode } = useContext(cartContext);
 

  function Logout() {
    setIsUserLoding(false);
    localStorage.removeItem("token");
    navigate("/login");
  }

  return (
    <>
  
      <div className="continer my-5 py-5">
        <h3 className="text-center text-main "> Hello {tokendecode?.name} !! </h3>
        <div className="py-5 my-3 text-center    ">
          <Link className=" m-3 btn btn-outline-success " to={"/favorite"}>
            {" "}
            Your Wish List{" "}
          </Link>
          <Link className=" m-3 btn btn-outline-success " to={"/cart"}>
            {" "}
            Your cart{" "}
          </Link>
          <Link className=" m-3 btn btn-outline-success " to={"/updateuserdata"}>
            {" "}
            Change Password
          </Link>
          <button onClick={Logout} className="btn btn-outline-danger m-3 ">
            {" "}
            Logout{" "}
          </button>
        </div>
      </div>
    </>
  );
}
