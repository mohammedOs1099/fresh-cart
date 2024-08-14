import axios from "axios";
import React from "react";
import { useQuery } from "react-query";
import Slider from "react-slick";

export default function CategoriesSlider() {
  function getAllCategories() {
    return axios.get("https://ecommerce.routemisr.com/api/v1/categories");
  }
  let { data } = useQuery("AlCategories", getAllCategories,{});
  let settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    cssEase: "linear",
    arrows: false,
  };

  return (
    <>
      <div className=" container my-3  ">
        <Slider className=" mx-auto mb-4 " {...settings}>
          {data?.data?.data.map((category,index) => 
            
              
                <div key={index} className="  ">
                  <img
                    src={category.image}
                    className=" w-100    "
                    height={300}
                    alt={category.name}
                  />
                  <h4 className=" text-main font-sm">{category.name}</h4>
                </div>
              
            
          )}
        </Slider>
      </div>
    </>
  );
}
