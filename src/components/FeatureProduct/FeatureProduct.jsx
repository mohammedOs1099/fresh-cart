import axios from "axios";

import { useQuery } from "react-query";

import Loding from "./../Loding/Loding";

import { cartContext } from "../../Cartcontext/Cartcontext";
import { useContext, useState } from "react";
import toast from "react-hot-toast";
import DisplayProduct from "../Display_Product/Display_Product";
import { useEffect } from "react";

export default function FeatureProduct({ searchValue }) {
  // add product to cART
  const { addToCart, addTowishlist, getUserWishlist, deletewishProdct } =
    useContext(cartContext);

  async function addProductToCart(id) {
    let { data } = await addToCart(id);

    if (data.status === "success") {
      toast.success(" product added successfully  ");
    } else {
      toast.error("failed!");
    }
  }
  // add product to cART

  function getAllProduct() {
    return axios.get("https://ecommerce.routemisr.com/api/v1/products");
  }

  let { isLoading, data } = useQuery("AllProduct", getAllProduct, {});
  let { data: wishProducts } = useQuery("wishlist", getUserWishlist, {});
  const [wisharr, setWisharr] = useState([]);
  // let wisharr = wishProducts?.data?.data?.map((item) => item._id);

  async function addProductTowishList(id) {
    let { data } = await addTowishlist(id);

    if (data?.status === "success") {
      toast.success(" product added successfully  ");

      setWisharr(data.data);
    } else {
      toast.error("failed!");
    }
  }
  async function deleteWishpro(id) {
    let { data } = await deletewishProdct(id);

    if (data?.status === "success") {
      toast.error(" deleted is  successfully  ");
      setWisharr(data?.data);
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
  useEffect(() => {
    setWisharr(wishProducts?.data?.data?.map((item) => item._id));
  }, [wishProducts?.data?.data]);

  return (
    <>
      {isLoading ? (
        <Loding />
      ) : (
        <div className=" container ">
          <div className="row">
            {searchValue
              ? data?.data?.data.map(
                  (product) =>
                    product?.title
                      .toLowerCase()
                      ?.includes(searchValue.toLowerCase()) && (
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
                    ),
                )
              : data?.data?.data.map((product) => (
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
                ))}
          </div>
        </div>
      )}
    </>
  );
}
