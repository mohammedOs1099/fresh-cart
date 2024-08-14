import React, { Fragment, useContext, useState } from "react";

import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";

import { useNavigate, Link } from "react-router-dom";
import { authContext } from "../../Authcontext/Authcontext";
import { Helmet } from "react-helmet";
import { cartContext } from "../../Cartcontext/Cartcontext";



export default function Login() {
 document.title = " fresh cart | Login ";

  const { setToken } = useContext(cartContext);
  const { setIsUserLoding } = useContext(authContext);
  const regexPassword =
    /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,16}$/;
  const [isloding, setisloding] = useState(false);

  const [errormessage, seterrormessage] = useState("");
  const navigate = useNavigate();

  let validationScheme = yup.object({
    email: yup.string().email("Invalid Email!").required("Email is Required !"),
    password: yup
      .string()
      .required("Password is Required !")
      .matches(
        regexPassword,
        "Invalid Password! Enter password starts with a capital letter,includes numbers,symbols & minimum 8 chars !",
      ),
  });

  let formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationScheme,
    onSubmit: async () => {
      seterrormessage("");

      try {
        setisloding(true);
        let { data } = await axios.post(
          "https://ecommerce.routemisr.com/api/v1/auth/signin",
          formik.values,
        );

        if (data?.message === "success") {
          localStorage.setItem("token", data?.token);
          setToken(data?.token);
          setIsUserLoding(true);

          if (window.location.pathname === "/login") {
            navigate("/");
          } else {
            navigate(window.location.pathname);
          }
        }

        formik.resetForm({ values: "" });
      } catch (error) {
        seterrormessage(error.response.data.message);
      }

      setisloding(false);
    },
  });

  return (
    <Fragment>
      <div className=" container    ">
        <h2 className="text-center text-success m-4 h1 ">Login Now</h2>

        <form onSubmit={formik.handleSubmit} className=" m-5 ">
          <div className="col-md-8 my-2 mx-auto  ">
            <label htmlFor="email" className="m-1">
              Email :
            </label>
            <input
              type="email"
              name="email"
              id="email"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
              className="form-control "
            />
            {formik.errors.email && formik.touched.email ? (
              <div className=" alert alert-danger m-2 p-2">
                {formik.errors.email}
              </div>
            ) : null}
          </div>
          <div className="col-md-8 my-2 mx-auto  ">
            <label htmlFor="password" className="m-1">
              Password :
            </label>
            <input
              type="Password"
              name="password"
              id="password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
              className="form-control"
            />
            {formik.errors.password && formik.touched.password ? (
              <div className=" alert alert-danger p-2 m-2 ">
                {" "}
                {formik.errors.password}
              </div>
            ) : null}
          </div>

          <div className="col-md-8 my-2 mx-auto  ">
            {errormessage ? (
              <div className=" alert alert-danger p-2 m-2"> {errormessage}</div>
            ) : null}

            <div className=" d-flex justify-content-between align-items-center ">
              <button
                disabled={!(formik.isValid && formik.dirty) || isloding}
                type="submit"
                className="btn btn-outline-success my-3 text-black fs-5  "
              >
                {isloding ? (
                  <i className="fa fa-spin fa-spinner py-1 px-4  "></i>
                ) : (
                  "Log in"
                )}
              </button>
              <div  >
              <Link
                className=" link link-success   link-opacity-50-hover  "
                to={"/forgetpassword"}
              >
                {" "}
                Forget Password?{" "}
              </Link>
              <Link
                className=" link link-success link-opacity-50-hover p-2  "
                to={"/register"}
              >
                
                Register?
              </Link>
              </div>
        
            </div>
          </div>
        </form>
      </div>
    </Fragment>
  );
}
