import React from "react";
import image1 from "../../Assets/images/61cOSbhDIqL._AC_SX679_.jpg";
import image2 from "../../Assets/images/61ckfbfWrfL.__AC_SY300_SX300_QL70_ML2_.jpg";
import image3 from "../../Assets/images/71riMtn-v1L._AC_SL1500_.jpg";
import image4 from "../../Assets/images/71hhyibUmtL._AC_SX679_.jpg";
import Slider from "react-slick";

export default function MinSlider() {
  let settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    cssEase: "linear",
    arrows: false,
  };

  return (
    <>
      <div className=" container my-5 ">
        <div className="row  justify-content-center  gx-0">
          <div className="col-md-8 text-center mb-5 px-3   ">
            <Slider {...settings}>
              <img className="w-75 " src={image3} alt="img_mainslidetv1" />
              <img className="w-75  " src={image4} alt="img_mainslidetv2" />
              <img className="w-75 " src={image1} alt="img_mainslidetv3" />
            </Slider>
          </div>
          <div className="col-md-4 text-center  ">
            <img className="w-75" src={image1} alt="MainImage" />
            <img className="w-75" src={image2} alt="MainImage" />
          </div>
        </div>
      </div>
    </>
  );
}
