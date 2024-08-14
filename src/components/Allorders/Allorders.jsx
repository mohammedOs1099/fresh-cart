import React, { useContext, useEffect, useState } from "react";

import { cartContext } from "../../Cartcontext/Cartcontext";
import Loding from "../Loding/Loding";
import { Helmet } from "react-helmet";

export default function Allorders() {
  const [isLoding, setIsLoding] = useState(false);
  const [allOrders, setAllOrders] = useState([]);
  const { getAllOrders,tokendecode } = useContext(cartContext);
  document.title = " fresh cart | All orders ";

  async function getUserOrders(id) {
    try {
      setIsLoding(true);
      let { data } = await getAllOrders(id);

      setAllOrders(data);

      setIsLoding(false);
    } catch (error) {
      setIsLoding(false);
    }
  }
  useEffect(() => {
    getUserOrders(tokendecode.id);
  }, []);

  return (<>
  
 
    <div className="container shadow my-5 py-5 ">
      
      <h3 className=" text-center text-main "> Your Orders </h3>

      {isLoding ? (
        <Loding />
      ) : (
        allOrders?.map((order) => (
          <div
            key={order.id}
            className="row  shadow align-items-center border-bottom my-5 py-3  "
          >
            <div className=" d-flex justify-content-between my-2  ">
              <p className="  ">
                Total Of Price:
                <span className=" text-main">{order.totalOrderPrice}</span> EGP
              </p>
              <p className="  ">
                Total Of Older items :
                <span className=" text-main">{order.cartItems.length}</span>
              </p>
            </div>
            <div className="   my-2">
              <p className="  ">
                Created At :
                <span className=" m-1 text-main ">
                  {order.createdAt
                    .split(":")
                    .slice(0, 2)
                    .join(":")
                    .split("T")
                    .join(" at ")}
                </span>
              </p>
              <p className="  ">
                Paid At :
                <span className=" m-1 text-main ">
                  {order.paidAt
                    .split(":")
                    .slice(0, 2)
                    .join(":")
                    .split("T")
                    .join(" at ")}
                </span>
              </p>
            </div>
            <div className=" d-flex m-2">
              {order.cartItems?.map((item) => (
                <div key={item._id} className="col-md-2 shadow m-1  ">
                  <img
                    className=" w-100 "
                    src={item.product.imageCover}
                    alt={item.product.title}
                  />
                  <p className=" text-center font-sm   ">
                    Price:
                    <span className=" text-main">{item.price}</span> EGP
                  </p>
                </div>
              ))}
            </div>
          </div>
        ))
      )}
    </div>
    </> );
}
