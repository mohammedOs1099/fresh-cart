import axios from "axios";
import React, { useState } from "react";

import { useFormik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";

export default function ResetPasswordCode() {
  document.title = " fresh cart | Reset Password ";

  const [isloding, setisloding] = useState(false);
  let navigate = useNavigate();

  const [errormessage, seterrormessage] = useState("");

  async function onSubmit(value) {
    setisloding(true);
    seterrormessage("");
    try {
      await axios.post(
        `https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode/`,
        value,
      );
      navigate("/setnewpassword");
      setisloding(false);

      formik.resetForm({ values: "" });

      // window.open(data.session.url,"_self");
    } catch (error) {
      seterrormessage(error.response.data.message);
      setisloding(false);
    }
  }

  let validationScheme = yup.object({
    resetCode: yup.number().required("code is Required !"),
  });
  let formik = useFormik({
    initialValues: {
      resetCode: "",
    },
    onSubmit,
    validationSchema: validationScheme,
  });

  return (
    <>
      <div className="container my-5 py-5 ">
        <h2 className=" text-center text-main">Reset Code </h2>
        <form className="w-75 mx-auto" onSubmit={formik.handleSubmit}>
          <label htmlFor="details" className="m-1">
            resetCode :
          </label>
          <input
            type="text"
            name="resetCode"
            id="resetCode"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.resetCode}
            className="form-control"
          />
          {formik.errors.resetCode && formik.touched.resetCode ? (
            <div className=" alert alert-danger m-2 p-2">
              {formik.errors.resetCode}
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
