import axios from "axios";
import React, { useContext, useEffect } from "react";
import Loding from "../Loding/Loding";

import { useParams } from "react-router-dom";
import { useState } from "react";
import { cartContext } from "../../Cartcontext/Cartcontext";
import toast from "react-hot-toast";
import DisplayProduct from "../Display_Product/Display_Product";
import { useQuery } from "react-query";


export default function SpecificBrand() {
  document.title = " fresh cart | Specific Brand ";
  
  const [isLoading, SetisLoading] = useState(false);

  const [arr, setarr] = useState([]);

  let parme = useParams();

  async function getAllProduct(id) {
    SetisLoading(true);
    let { data } = await axios.get(
      "https://ecommerce.routemisr.com/api/v1/products",
    );

    setarr(data.data.filter((ele) => ele.brand._id === id));
    SetisLoading(false);
  }
  useEffect(() => {
    getAllProduct(parme.id);
  }, [parme.id]);

  // add Product to cart
  const { addToCart, addTowishlist, getUserWishlist, deletewishProdct } =
    useContext(cartContext);
  async function addProductToCart (id){
    let {data} = await addToCart(id);
    if(data.status === "success"){
      toast.success(" product added successfully  ")
    }else{toast.error("failed!")}
  } 




// add Product to cart
let { data: wishProducts, refetch } = useQuery
(
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
      
      {isLoading ? (
        <Loding />
      ) : (
        <div className=" container  my-5 ">
          <div className="row pb-5 ">
            {arr?.length >= 1 ? (
              arr?.map((product) => (
                <div key={product.id} className="col-md-3  p-2 my-2">
            <DisplayProduct
                    ratingsAverage={product.ratingsAverage}
                    price={product.price}
                    addProductToCart={addProductToCart}
                    product_Title={product.title}
                    category_Name={product.category.name}
                    name={product.name}
                    id={product.id}
                    image={product.imageCover}
                    hart={wisharr}
                    addTowishlist={() => {
                      chiking(product.id);
                    }}
                  />
                </div>
              ))
            ) : (
              <div className=" alert alert-success d-flex justify-content-center align-items-center my-5 py-5 ">
                <h3> No items found </h3>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
