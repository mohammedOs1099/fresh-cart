import React, { Fragment, useContext, useState } from "react";

import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";

import { useNavigate } from "react-router-dom";

// import { Helmet } from "react-helmet";
import { cartContext } from "../../Cartcontext/Cartcontext";
import toast from "react-hot-toast";

import { authContext } from "../../Authcontext/Authcontext";

export default function UpdateUserData() {
  document.title = " fresh cart | Update User Data ";

 
    const { setIsUserLoding} = useContext(authContext);
  const { token } = useContext(cartContext);
  const regexPassword =
    /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,16}$/;
  const [isloding, setisloding] = useState(false);

  const [errormessage, seterrormessage] = useState("");
  const navigate = useNavigate();

  let validationScheme = yup.object({
    currentPassword: yup
      .string()
      .required("current Password is Required !")
      .matches(
        regexPassword,
        "Invalid Password! Enter password starts with a capital letter,includes numbers,symbols & minimum 8 chars !",
      ),
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
  });

  let formik = useFormik({
    initialValues: {
      currentPassword: "",
      password: "",
      rePassword: "",
    },
    validationSchema: validationScheme,
    onSubmit: async (value) => {
      seterrormessage("");
      setisloding(true);
      axios
        .put(
          "https://ecommerce.routemisr.com/api/v1/users/changeMyPassword",
          value,
          {
            headers: {
              "Content-Type": "application/json",
              token: token,
            },
          },
        )

        .then((res) => {
        
          if (res?.data?.message === "success") {
            toast.success(res?.data?.message +" Login Agin Now !!");
            // console.log(token );
            // localStorage.setItem("token",res?.data?.token);
            // console.log(localStorage.getItem("token"));
            // setToken(res?.data?.toke);
         
            navigate("/login");
            localStorage.removeItem("token");
            setIsUserLoding(false);
          
            formik.resetForm({ values: "" });
           
          }
        })
        .catch((err) => {
        
            if(err?.response?.data?.errors?.msg){
                toast.error(err?.response?.data?.errors?.msg);

            }else{toast.error(err?.response?.data?.message);
            }
          
        });
      setisloding(false);
    },
  });

  return (
    <Fragment>
      <div className=" container    ">
        <h2 className="text-center text-success m-4 h1 ">Change Password </h2>

        <form onSubmit={formik.handleSubmit} className=" m-5 ">
          <div className="col-md-8 my-2 mx-auto  "></div>
          <div className="col-md-8 my-2 mx-auto  ">
            <label htmlFor="currentPassword" className="m-1">
            current Password :
            </label>
            <input
              type="Password"
              name="currentPassword"
              id="currentPassword"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.currentPassword}
              className="form-control"
            />
            {formik.errors.currentPassword && formik.touched.currentPassword ? (
              <div className=" alert alert-danger p-2 m-2 ">
                {" "}
                {formik.errors.currentPassword}
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
              RePassword :
            </label>
            <input
              type="Password"
              name="rePassword"
              id="rePassword"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.rePassword}
              className="form-control"
            />
            {formik.errors.rePassword && formik.touched.rePassword ? (
              <div className=" alert alert-danger p-2 m-2 ">
                {" "}
                {formik.errors.rePassword}
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
                  "send"
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </Fragment>
  );
}



