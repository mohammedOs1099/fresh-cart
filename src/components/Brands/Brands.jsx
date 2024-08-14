import React from "react";

import axios from "axios";
import { useQuery } from "react-query";

import Loding from "../Loding/Loding";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";

export default function Brands() {
  document.title = " fresh cart | Brands ";

  function getAllBrands() {
    return axios.get("https://ecommerce.routemisr.com/api/v1/brands");
  }

  let { data, isLoading } = useQuery("allBrands", getAllBrands);

  return (
    <>
   
      <div className=" container my-5 ">
        <div className=" row ">
          {isLoading ? (
            <Loding />
          ) : (
            data?.data?.data.map((brand) => (
              <Link key={brand._id} className="col-md-3 my-2 product " to={"/soecificbrand/"+brand._id}>

                  <img className="w-100" src={brand.image} alt={brand.name} />
                  
               
              </Link>
            ))
          )}
        </div>
      </div>
    </>
  );
}
