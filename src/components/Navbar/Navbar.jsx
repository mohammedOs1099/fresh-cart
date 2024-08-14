import React, { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import logo from "../../Assets/images/freshcart-logo.svg";
import { authContext } from "../../Authcontext/Authcontext";

export default function Navbar() {
  const { isUserLogin, setIsUserLoding } = useContext(authContext);
  const navigate = useNavigate();
  function Logout() {
    setIsUserLoding(false);
    localStorage.removeItem("token");
    navigate("/login");
  }

  return (
    <>
      <nav className="  navbar navbar-expand-lg bg-body-tertiary">
        <div className=" container-fluid">
          <NavLink className="navbar-brand" to="/">
            <img src={logo} alt="logo" className="w-100" />
          </NavLink>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            {isUserLogin ? (
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                
                <li className="nav-item">
                  <NavLink
                    className="nav-link active"
                    aria-current="page"
                    to="/"
                  >
                    Home
                  </NavLink>
                </li>
                <li className="nav-item">
                    <NavLink
                      className="nav-link active"
                      aria-current="page"
                      to="/profile"
                    >
                      Profile
                    </NavLink>
                  </li>
                  <li className="nav-item">
                  <NavLink
                    className="nav-link active "
                    aria-current="page"
                    to="/cart"
                  >
                    Cart
                    <i className=" fa fa-shopping-cart text-main px-1  " >
                    
                    </i>
                    
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    className="nav-link active "
                    aria-current="page"
                    to="/favorite"
                  >
                    Favorite
                    <i className="fa-solid fa-heart text-main px-1  " >
                    
                    </i>
                    
                  </NavLink>
                </li>
                  <li className="nav-item">
                    <NavLink
                      className="nav-link active"
                      aria-current="page"
                      to="/allorders"
                    >
                      Orders
                      <i className=" text-main fa-solid px-1 fa-handshake"></i>
                    </NavLink>
                  </li>
                
                <li className="nav-item">
                  <NavLink
                    className="nav-link active"
                    aria-current="page"
                    to="/categories"
                  >
                    Categories
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    className="nav-link active"
                    aria-current="page"
                    to="/brands"
                  >
                    Brands
                  </NavLink>
                </li>
               
                <li className="nav-item">
                  <NavLink
                    className="nav-link active"
                    aria-current="page"
                    to="/products"
                  >
                    Products
                  </NavLink>
                </li>
              </ul>
            ) : null}

            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              

              <li className="nav-item   d-flex align-items-center     ">
                <i className="fa-brands fa-facebook me-2   "></i>
                <i className="fa-brands  fa-tiktok mx-2  "></i>
                <i className="fa-brands fa-instagram mx-2 "></i>
                <i className="fa-brands fa-twitter mx-2 "></i>
                <i className="fa-brands fa-youtube mx-2 "></i>
              </li>
         
              {isUserLogin ? (
                <li className="nav-item">
                  <button
                    onClick={Logout}
                    className="btn btn-outline-success my-2 "
                    aria-current="page"
                  >
                    Logout
                  </button>
                </li>
              ) : (
                <>
                  <li className="nav-item">
                    <NavLink
                      className="nav-link active"
                      aria-current="page"
                      to="/login"
                    >
                      Login
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink
                      className="nav-link active"
                      aria-current="page"
                      to="/register"
                    >
                      Register
                    </NavLink>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
