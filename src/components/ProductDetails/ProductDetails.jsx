import React, { useContext, useState } from "react";
import axios from "axios";
import Praice from "../Praice/Praice";
import Loding from "../Loding/Loding";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import Slider from "react-slick";
import { cartContext } from "../../Cartcontext/Cartcontext";
import toast from "react-hot-toast";
import { useQuery } from "react-query";
import { Helmet } from "react-helmet";

export default function ProductDetails() {
 document.title = " fresh cart | Product Details ";

  const [details, setdetails] = useState({});
  const [isLoding, setIsLoding] = useState(false);
  let param = useParams();
  //
  // add Product to cart
  const { addToCart, addTowishlist, getUserWishlist, deletewishProdct } =
    useContext(cartContext);
  async function addProductToCart(id) {
    let { data } = await addToCart(id);
    if (data?.status === "success") {
      toast.success(" product added successfully  ");
    } else {
      toast.error("failed!");
    }
  }

  // add Product to cart
  // get Product details from ApI

  async function getProductDetails(id) {
    setIsLoding(true);
    let { data } = await axios.get(
      `https://ecommerce.routemisr.com/api/v1/products/${id}`,
    );
    setdetails(data?.data);
    setIsLoding(false);
  }

  useEffect(() => {
    getProductDetails(param.id);
  }, [param.id]);
  // get Product details
  //   slider

  let settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  //   slider

  let { data: wishProducts, refetch } = useQuery(
    "wishlist",
    getUserWishlist,
    {},
  );
  let wisharr = wishProducts?.data?.data?.map((item) => item._id);

  async function addProductTowishList(id) {
    let { data } = await addTowishlist(id);

    if (data?.status === "success") {
      toast.success(" product added successfully  ");
      await refetch();
    } else {
      toast.error("failed!");
    }
  }
  async function deleteWishpro(id) {
    let { data } = await deletewishProdct(id);

    if (data?.status === "success") {
      toast.error(" deleted is  successfully  ");
      await refetch();
    } else {
      toast.error("failed!");
    }
  }
  function chiking(id) {
    if (!wisharr?.includes(id)) {
      addProductTowishList(id);
    } else {
      deleteWishpro(id);
    }
  }

  return (
    <>
  
      <div className=" container my-3  ">
        {isLoding ? (
          <Loding />
        ) : (
          <div className="row align-items-center justify-content-center my-4    ">
            <div className="col-md-4 my-4 slider-container  ">
              <Slider {...settings}>
                {details?.images?.map((image, index) => (
                  <img key={index} className="w-100  " src={image} alt="" />
                ))}
              </Slider>
            </div>

            <div className="col-md-8   ">
              <h2>{details?.title}</h2>
              <i
                onClick={() => chiking(details?.id)}
                className={` cursor-pointer  ${
                  wisharr?.includes(details?.id)
                    ? "fa-solid fa-heart text-main   "
                    : "fa-regular fa-heart text-main   "
                }`}
              ></i>
              <p>{details?.description}</p>
              {/* <h3>{details.category.name}</h3>  */}

              <Praice
                CartFunction={addProductToCart}
                id={details?.id}
                Price={details?.price}
                average={details?.ratingsAverage}
              />
            </div>
          </div>
        )}
      </div>
    </>
  );
}
