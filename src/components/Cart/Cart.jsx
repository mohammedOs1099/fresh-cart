import React, { useContext, useEffect, useState } from "react";
import { cartContext } from "../../Cartcontext/Cartcontext";
import Loding from "../Loding/Loding";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";

export default function Cart() {
  const [cartData, setCartdata] = useState({});
  let { getCart, deleteProduct, updateQuantity } = useContext(cartContext);
  const [isloding, setisloding] = useState(false);
  const [dataLoding, setDataLoding] = useState(false);
  const [cartId, setCartId] = useState({});
  const [errormass, seterrormass] = useState(false);
  
  async function getCartProduct() {
    try {
      setDataLoding(true);
      let { data } = await getCart();
      setCartdata(data);
      setCartId(data.data._id);
      setDataLoding(false);
    } catch (error) {
      setDataLoding(false);
      seterrormass(true)
    }
  }
  async function removeSpecificProduct(id) {
    setisloding(true);
    let { data } = await deleteProduct(id);
    setCartdata(data);
    setisloding(false);
  }
  async function updateProductCount(id, count) {
    try {
      let { data } = await updateQuantity(id, count);

      count === 0 ? removeSpecificProduct(id) : setCartdata(data);
    } catch (error) {
     
     
    }
  }


  

  useEffect(() => {
    getCartProduct();
  }, []);

  return (
    <>
 
    
      <div className=" container  my-5   ">
        <div className=" mx-auto bg-main-light rounded-2 shadow  p-5 ">
          <h2 className="text-center mb-2 "> Cart Shop </h2>
          <div className=" d-flex justify-content-between my-3 p-2   border-bottom  ">
            <h3 className="h6">
              Total price :
              <span className=" text-main h6">
                {cartData?.data?.totalCartPrice} EGP
              </span>
            </h3>

            <h3 className="h6">
              Total Of Cart Items :
              <span className=" text-main h6">{cartData?.numOfCartItems}</span>
            </h3>
          </div>

          {dataLoding ? (
            <Loding />
          ) : cartData ? (
            cartData.data?.products.length >= 1 ? (
              cartData.data?.products.map((product) => (
                <div
                  key={product._id}
                  className=" row shadow align-items-center border-bottom my-4 "
                >
                  <div className="col-md-1 my-3 ">
                    <img
                      src={product.product.imageCover}
                      className="w-100"
                      alt={product.product.title}
                    />
                  </div>
                  <div className="col-md-11">
                    <div className=" d-flex justify-content-between ">
                      <div className=" d-flex flex-column  align-items-start  ">
                        <Link
                          className=" link-success  border-0    "
                          to={"/productdetails/" + product.product._id}
                        >
                          <h4 className="h6 my-2 ">
                            {product.product.title
                              .split(" ")
                              .slice(0, 2)
                              .join(" ")}{" "}
                          </h4>
                        </Link>
                        <h4 className="h6 my-2 ">
                          {" "}
                          Price: {product.price} EGP{" "}
                        </h4>
                        <h4 className="h6 my-2 ">
                          {" "}
                          Total Price: {product.price * product.count} EGP{" "}
                        </h4>
                      </div>
                      <div className=" d-flex align-items-center ">
                        <button
                          disabled={isloding}
                          onClick={() =>
                            updateProductCount(
                              product.product._id,
                              product.count + 1,
                            )
                          }
                          className="btn btn-success  "
                        >
                          +
                        </button>
                        <span className=" m-2 "> {product.count} </span>
                        <button
                          disabled={isloding}
                          onClick={() =>
                            updateProductCount(
                              product.product._id,
                              product.count - 1,
                            )
                          }
                          className="btn btn-success "
                        >
                          -
                        </button>
                      </div>
                    </div>
                    <button
                      disabled={isloding}
                      onClick={() => removeSpecificProduct(product.product._id)}
                      className=" btn btn-danger d-inline-block my-2 "
                    >
                      <i className="fa fa-trash-can   ">
                        <span className="m-1 font-monospace   ">Remove</span>
                      </i>
                    </button>
                  </div>
                  
                </div>
                
              ))
              
            ) :  (
              <div className=" alert alert-success d-flex justify-content-center align-items-center my-5  ">
                <h3> No Product In Your Cart </h3>
              </div>
            )
          )
           
           : <div className=" alert alert-success d-flex justify-content-center align-items-center my-5  ">
           <h3> No Product In Your Cart </h3>
         </div>
           
          }

           <button  disabled={cartData?.data?.products.length===0||errormass} className=" btn btn-success my-4   " > <Link to={"/usercartdetails/" + cartId} > Check Out </Link>  </button>
         
        </div>
        
      </div>
  
  </>);
}
