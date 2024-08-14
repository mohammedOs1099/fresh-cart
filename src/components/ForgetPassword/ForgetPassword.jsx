import axios from "axios";
import React, { useState } from "react";

import { useFormik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";

export default function ForgetPassword() {
  const [isloding, setisloding] = useState(false);
 let navigate= useNavigate();
 document.title = " fresh cart | Forget Password ";

  const [errormessage, seterrormessage] = useState("");

  async function onSubmit(value) {
    setisloding(true);
    seterrormessage("");
    try {
     
       await axios.post(
       `https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords/`,
        value,
      );
      navigate("/resetpasswordcod");
      setisloding(false);
      
      formik.resetForm({ values: "" });

      // window.open(data.session.url,"_self");
    } catch (error) {
      seterrormessage(error.response.data.message);
      setisloding(false);
    }
  }

  let validationScheme = yup.object({
    email: yup.string().email("Invalid Email!").required("Email is Required !"),
  });
  let formik = useFormik({
    initialValues: {
      email: "",
    },
    onSubmit,
    validationSchema: validationScheme,
  });

  return (
    <>
  
      <div className="container my-5 py-5 ">
        <h2 className=" text-center text-main">   Forget Password </h2>
        <form className="w-75 mx-auto" onSubmit={formik.handleSubmit}>
          <label htmlFor="details" className="m-1">
            email :
          </label>
          <input
            type="text"
            name="email"
            id="email"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
            className="form-control"
          />
          {formik.errors.email && formik.touched.email ? (
            <div className=" alert alert-danger m-2 p-2">
              {formik.errors.email}
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
              "send"
            )}
          </button>
        </form>
      </div>
    </>
  );
}
