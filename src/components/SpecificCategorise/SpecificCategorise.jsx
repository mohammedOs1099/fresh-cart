import React, { useEffect, useState } from "react";
import axios from "axios";

import Loding from "./../Loding/Loding";

import { Link, useParams } from "react-router-dom";
import { Helmet } from "react-helmet";

export default function SpecificCategorise() {
  document.title = " fresh cart | Specific Categorise ";

  const [details, setdetails] = useState([]);
  const [isLoding, setIsLoding] = useState(false);
  let prame = useParams();
  async function getSpecificCategoriey(id) {
    setIsLoding(true);
    let { data } = await axios.get(
      `https://ecommerce.routemisr.com/api/v1/categories/${id}/subcategories`,
    );
    setdetails(data.data);
    setIsLoding(false);
  }

  useEffect(() => {
    getSpecificCategoriey(prame.id);
  }, [prame.id]);

  return (
    <>
 
      <div className=" container  my-5  ">
        <div className="row mb-5 pb-5 justify-content-center">
          {isLoding ? (
            <Loding />
          ) : details.length === 0 ? (
            <div className=" alert alert-success d-flex justify-content-center align-items-center my-3 py-5 ">
              {" "}
              <h3> No items found </h3>{" "}
            </div>
          ) : (
            details.map((ele) => {
              return (
                <Link key={ele._id} className=" col-md-4 rounded-2 p-5 product my-5 border mx-1 cursor-pointer "  to={"/soecificproduct/"+ele._id }>
                  
                  <h4 className=" text-success text-center">{ele.name}</h4>
                
                </Link>
           
              );
            })
          )}
        </div>
      </div>
    </>
  );
}
