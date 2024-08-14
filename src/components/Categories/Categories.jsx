import React from "react";

import axios from "axios";
import { useQuery } from "react-query";
import Loding from "./../Loding/Loding";
import { Link } from 'react-router-dom';
import { Helmet } from "react-helmet";

export default function Categories() {
  document.title = " fresh cart | Categories ";
  
  function getAllCategories() {
    return axios.get("https://ecommerce.routemisr.com/api/v1/categories");
  }
  let { data, isLoading } = useQuery("Categories", getAllCategories);

  return (
    <>
 
      <div className=" container my-3">
        <div className="row">
          {isLoading ? (
            <Loding />
          ) : (
            data?.data?.data.map((category) => (
              <div key={category._id} className=" col-md-4 product rounded-2  px-2 py-3 cursor-pointer  ">
           <Link to={"/specificcategory/"+category._id}  >
           
                  <img
                    src={category.image}
                    className="w-100 "
                    height={400}
                    alt=""
                  />
                  <h4 className="font-sm text-main text-center m-2">
                    {" "}
                    {category.name}{" "}
                  </h4>
               
           </Link>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
}
