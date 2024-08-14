import React from "react";
import { Link, useLocation } from "react-router-dom";
import Praice from "../Praice/Praice";

export default function DisplayProduct({
  hart,
  addProductToCart,
  product_Title,
  category_Name,
  name,
  id,
  image,
  price,
  ratingsAverage,
  addTowishlist,
}) {
  return (
    <>
      <div className=" product overflow-hidden px-2 py-3 cursor-pointer ">
        <Link className="  mb-3" to={"/productdetails/" + id}>
          <img src={image} className="w-100" alt={product_Title.split(" ").slice(0, 2).join(" ")}/>
          <h5 className=" font-sm text-main my-1">{category_Name}</h5>
          <h4 className="  text-dark my-1 h5 ">
            {product_Title.split(" ").slice(0, 2).join(" ")}
          </h4>
        </Link>
        <i
          onClick={() => addTowishlist(id)}
          className={`cursor-pointer  ${
            useLocation().pathname==="/favorite"?"fa fa-trash-can btn btn-outline-danger border-0   " :
            hart?.includes(id)
              ? "fa-solid fa-heart text-main"
              : "fa-regular fa-heart"
          }`}
        ></i>
        <Praice
          CartFunction={addProductToCart}
          id={id}
          Price={price}
          average={ratingsAverage}
        />
      </div>
    </>
  );
}
