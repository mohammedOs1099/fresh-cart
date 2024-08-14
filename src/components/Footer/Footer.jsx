import React from "react";
import image1 from "../../Assets/images/MasterCard-Logo-1990.png";
import image2 from "../../Assets/images/pa4344888-paypal-logo-40-free-paypal-amp-please-donate-images.png";
import image3 from "../../Assets/images/MasterCard-Logo-1990.png";
import image4 from "../../Assets/images/googl play.png";

import image5 from "../../Assets/images/app store.svg";

export default function Footer() {
  return (
    <>
      <footer className="bg-main-light   py-5">
        <div className="container">
          <h4>Get the Frech Cart App</h4>
          <p>
            We will send you a link, open it on your phone to download the app.
          </p>
          <div className="d-flex">
            <div className="col-sm-10">
              <input
                type="text"
                className="form-control py-2"
                placeholder="Email..."
              />
            </div>
            <div className="col-sm-2 ps-3">
              <button className="btn w-100 btn-outline-success ">
                Share App Link
              </button>
            </div>
          </div>
          <div className="line border-bottom border-2 my-4"></div>

          <div className="d-flex justify-content-between flex-wrap">
            <div className="d-flex align-items-center">
              <p className="m-0">Payment Partners</p>
              <ul
                className="d-flex m-0 p-0 ms-2 align-items-center flex-wrap"
                style={{ listStyle: "none" }}
              >
                <li>
                  <img src={image1} alt="amazone" style={{ width: "80px" }} />
                </li>
                <li>
                  <img
                    src={image2}
                    alt="american express"
                    style={{ width: "45px" }}
                  />
                </li>
              </ul>
            </div>
            <div className="d-flex align-items-center ">
              <p className="m-0">Get deliveries with FreshCart</p>
              <div className="d-flex align-items-center ms-2 flex-wrap ">
                <img
                  src={image4}
                  alt="app store"
                  style={{ width: "90px" }}
                  className="me-2"
                />
                <img src={image5} alt="google play" style={{ width: "80px" }} />
              </div>
            </div>
            
          </div>
          <p className="text-center mt-3 mb-0">
        <span style={{ fontWeight: "bold" }}>Created by</span> mohammed osama 
        &copy; 2024
      </p>
        </div>
        
      </footer>
    </>
  );
}
