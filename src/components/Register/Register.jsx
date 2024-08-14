import React, { Fragment, useState } from "react";

import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";
import { Link } from "react-router-dom";


export default function Register() {
  document.title = " fresh cart | Register ";

  const regexPhone = /^(?:\+20|0)?1\d{9}$/;
  const regexName = /^[A-Z][a-z0-9]{2,15}$/;
  const regexPassword =
    /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,16}$/;
  const [isloding, setisloding] = useState(false);
  const [message, setmessage] = useState("");
  const [errormessage, seterrormessage] = useState("");

  let validationScheme = yup.object({
    name: yup
      .string()
      .min(3, "Name Minlength is 3 !")
      .max(15, "Name maxlength is 15 !")
      .required("Name is Requierd !")
      .matches(
        regexName,
        "Invalid Name! Name must Start with capital letter with atleast 2 chars",
      ),
    email: yup.string().email("Invalid Email!").required("Email is Required !"),
    password: yup
      .string()
      .required("Password is Required !")
      .matches(
        regexPassword,
        "Invalid Password! Enter password starts with a capital letter,includes numbers,symbols & minimum 8 chars !",
      ),
    rePassword: yup
      .string()
      .required("Re-Passwored is Required !")
      .oneOf([yup.ref("password")], "Re-Password and Password dont matches  !"),
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
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
    },
    validationSchema: validationScheme,
    onSubmit: async () => {
      setmessage("");
      seterrormessage("");

      try {
        setisloding(true);
        let { data } = await axios.post(
          "https://ecommerce.routemisr.com/api/v1/auth/signup",
          formik.values,
        );

        if (data.message === "success") {
          setmessage(data.message);
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
      <div className=" container   ">
        <h2 className="text-center text-success m-4 h1 ">Register Now</h2>

        <form onSubmit={formik.handleSubmit}>
          <div className="col-md-8 my-2 mx-auto  ">
            <label htmlFor="name" className="m-1">
              Name :
            </label>
            <input
              type="text"
              name="name"
              id="name"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.name}
              className="form-control"
            />
            {formik.errors.name && formik.touched.name ? (
              <div className=" alert alert-danger m-2 p-2">
                {formik.errors.name}
              </div>
            ) : null}
          </div>
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
            <label htmlFor="rePassword" className="m-1">
              {" "}
              Re-password :{" "}
            </label>
            <input
              type="password"
              name="rePassword"
              id="rePassword"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.rePassword}
              className="form-control"
            />
            {formik.errors.rePassword && formik.touched.rePassword ? (
              <div className=" alert alert-danger p-2 m-2">
                {formik.errors.rePassword}
              </div>
            ) : null}
          </div>
          <div className="col-md-8 my-2 mx-auto  ">
            <label htmlFor="phone" className="m-1">
              {" "}
              Phone :{" "}
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

            {message || errormessage ? (
              <>
                {message ? (
                  <div className=" alert alert-heading text-center  p-2 m-2">
                    <p className=" my-auto h6 text-success ">
                      {" "}
                      Your registration has been completed successfully. You can{" "}
                      <Link
                        className=" btn btn-outline-success m-0 p-2 cursor-pointer "
                        to={"/login"}
                      >
                        login
                      </Link>{" "}
                      now
                    </p>
                  </div>
                ) : null}
                {errormessage ? (
                  <div className=" alert alert-danger p-2 m-2">
                    {errormessage}
                  </div>
                ) : null}
              </>
            ) : null}
            <div className="   d-flex justify-content-between align-items-center ">
              <button
                disabled={!(formik.isValid && formik.dirty) || isloding}
                type="submit"
                className="btn btn-outline-success my-3 text-black fs-5  "
              >
                {isloding ? (
                  <i className="fa fa-spin fa-spinner py-1 px-4  "></i>
                ) : (
                  "Register"
                )}
              </button>
              <Link
                className="  link link-success link-opacity-50-hover p-2  "
                to={"/login"}
              >
                Login?
              </Link>
            
            </div>
            
          </div>
        </form>
      </div>
    </Fragment>
  );
}
