import axios from "axios";
import { useFormik } from "formik";
import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { useParams } from "react-router-dom";
import * as yup from "yup";
export default function UserCartDetails() {
  const [isloding, setisloding] = useState(false);

  const [errormessage, seterrormessage] = useState("");
  const regexPhone = /^(?:\+20|0)?1\d{9}$/;
  const { cartId } = useParams();
  document.title = " fresh cart | Payment ";

  async function onSubmit(value) {
    try {
      setisloding(true);
      seterrormessage("");
      let { data } = await axios.post(
        `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}`,
        { shippingAddress: value },
        { headers: { token: localStorage.getItem("token") } },
        { params: { url: "http://localhost:3000" } },
      );
      window.open(data.session.url,"_self");
      setisloding(false);
    } catch (error) {
      seterrormessage(error.rsponse.data.message);
      setisloding(false);
    }
  }

  let validationScheme = yup.object({
    details: yup.string().required("details is Requierd !"),
    city: yup.string().required("city is Requierd !"),
    phone: yup
      .string()
      .matches(
        regexPhone,
        "Invalid Phone number , must have Egyptione phone number!",
      )
      .required("Phone is required ! "),
  });
  let formik = useFormik({
    initialValues: {
      details: "",
      city: "",
      phone: "",
    },
    onSubmit,
    validationSchema: validationScheme,
  });

  return (
    <>
  


      <div className="container my-5 py-5 ">
        <h2 className=" text-center text-main"> User Cart Details </h2>
        <form className="w-75 mx-auto" onSubmit={formik.handleSubmit}>
          <label htmlFor="details" className="m-1">
            details :
          </label>
          <input
            type="text"
            name="details"
            id="details"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.details}
            className="form-control"
          />
          {formik.errors.details && formik.touched.details ? (
            <div className=" alert alert-danger m-2 p-2">
              {formik.errors.details}
            </div>
          ) : null}
          <label htmlFor="city" className="m-1">
            city :
          </label>
          <input
            type="text"
            name="city"
            id="city"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.city}
            className="form-control"
          />
          {formik.errors.city && formik.touched.city ? (
            <div className=" alert alert-danger m-2 p-2">
              {formik.errors.city}
            </div>
          ) : null}

          <label htmlFor="phone" className="m-1">
            Phone :
          </label>
          <input
            type="tel"
            name="phone"
            id="phone"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.phone}
            className="form-control"
          />
          {formik.errors.phone && formik.touched.phone ? (
            <div className=" alert alert-danger p-2 m-2">
              {formik.errors.phone}
            </div>
          ) : null}

          {errormessage && (
            <div className=" alert alert-danger ">{errormessage}</div>
          )}
          <button
            disabled={!(formik.isValid && formik.dirty) || isloding}
            type="submit"
            className="btn btn-outline-success my-3 "
          >
            {isloding ? (
              <i className="fa fa-spin fa-spinner py-1 px-4  "></i>
            ) : (
              "Check out"
            )}
          </button>
        </form>
      </div>
    </>
  );
}
