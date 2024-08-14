import { useQuery } from "react-query";

import Loding from "./../Loding/Loding";

import { cartContext } from "../../Cartcontext/Cartcontext";
import { useContext } from "react";
import toast from "react-hot-toast";
import DisplayProduct from "../Display_Product/Display_Product";
import { Helmet } from "react-helmet";

export default function Favorite() {
  // add product to cART
  document.title = " fresh cart | Favorite ";

  const { addToCart, getUserWishlist, deletewishProdct } =
    useContext(cartContext);

  async function addProductToCart(id) {
    let { data } = await addToCart(id);

    if (data.status === "success") {
      toast.success(" product added successfully  ");
    } else {
      toast.error("failed!");
    }
  }

  let {
    data: wishProducts,
    refetch,
    isLoading,
  } = useQuery("wishlist", getUserWishlist, {});
  let wisharr = wishProducts?.data?.data?.map((item) => item._id);

  async function deleteWishpro(id) {
    let { data } = await deletewishProdct(id);

    if (data?.status === "success") {
      toast.error(" deleted is  successfully  ");
      await refetch();
    } else {
      toast.error("failed!");
    }
  }

  return (
    <>

   
      {isLoading ? (
        <Loding />
      ) : (
        <div className=" container  my-5 ">
          <div className="row pb-5 ">
            {wisharr?.length >= 1 ? (
              wishProducts?.data?.data.map((product) => (
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
                      deleteWishpro(product.id);
                    }}
                  />
                </div>
              ))
            ) : (
              <div className=" alert alert-success d-flex justify-content-center align-items-center my-5 py-5 ">
                <h3> your Wish List Is Empty </h3>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
