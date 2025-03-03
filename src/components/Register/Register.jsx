import React, { use, useContext } from "react";
import { useEffect, useState } from "react";
import Style from "./Register.module.css";
import { useFormik } from "formik";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { UserContext } from "../../Context/UserContext";

const Register = () => {
  const navigate = useNavigate(); //proggramatic routing
  const [isLoading, setLoading] = useState(false);
  const [apiError, setError] = useState("");
  const { userLogin, setUserLogin } = useContext(UserContext);

  let registerSchema = Yup.object().shape({
    name: Yup.string()
      .min(3, "Name must be at least 3 characters long")
      .max(20, "Name must not exceed 20 characters")
      .required("Name is Required"),
    email: Yup.string().email("Email Invaild").required("email is Required"),
    phone: Yup.string()
      .matches(/^01[0-2,5]{1}[0-9]{8}$/, "Invalid Egyptian phone number")
      .required("Phone number  is Required"),
    password: Yup.string()
      .matches(
        /^[A-Z][a-z0-9]{5,10}$/,
        "Password must start uppercase letter then lowercase letter and one number"
      )
      .required("Password is Required"),
    rePassword: Yup.string()
      .oneOf([Yup.ref("password")], "Passwords must match")
      .required("Confirm password is required"),
  });

  const handleRegister = async (formValues) => {
    setLoading(true);
    axios
      .post(`https://ecommerce.routemisr.com/api/v1/auth/signup`, formValues)
      .then((apiResponse) => {
        if (apiResponse.data.message === "success") {
          localStorage.setItem("userToken", apiResponse.data.token);
          setUserLogin(apiResponse.data.token);
          navigate("/");
        }

        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);

        setError(error.response?.data?.message);
      });
  };

  let formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      phone: "",
      password: "",
      rePassword: "",
    },
    validationSchema: registerSchema,
    onSubmit: (values) => {
      handleRegister(values);
    },
  });

  return (
    <>
      <form className={`m-5 ${Style.register}`} onSubmit={formik.handleSubmit}>
        {apiError ? (
          <div className="alert alert-danger" role="alert">
            {apiError}
          </div>
        ) : null}
        <h1 className="mb-4">Register Now</h1>

        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Enter your name :
          </label>
          <input
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            type="text"
            className="form-control"
            id="name"
            name="name"
            value={formik.values.name}
            aria-describedby="emailHelp"
          />
        </div>

        {formik.errors.name && formik.touched.name ? (
          <div className="alert alert-danger" role="alert">
            {formik.errors.name}
          </div>
        ) : null}

        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Enter your Email address
          </label>
          <input
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            type="email"
            className="form-control"
            id="email"
            name="email"
            value={formik.values.email}
            aria-describedby="emailHelp"
          />
        </div>
        {formik.errors.email && formik.touched.email ? (
          <div className="alert alert-danger" role="alert">
            {formik.errors.email}
          </div>
        ) : null}

        <div className="mb-3">
          <label htmlFor="phone" className="form-label">
            Enter your Phone number :
          </label>
          <input
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            type="tel"
            className="form-control"
            id="phone"
            name="phone"
            value={formik.values.phone}
            aria-describedby="emailHelp"
          />
        </div>
        {formik.errors.phone && formik.touched.phone ? (
          <div className="alert alert-danger" role="alert">
            {formik.errors.phone}
          </div>
        ) : null}

        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Enter your password
          </label>
          <input
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            type="password"
            className="form-control"
            id="password"
            name="password"
            value={formik.values.password}
            aria-describedby="emailHelp"
          />
        </div>

        {formik.errors.password && formik.touched.password ? (
          <div className="alert alert-danger" role="alert">
            {formik.errors.password}
          </div>
        ) : null}

        <div className="mb-3">
          <label htmlFor="rePassword" className="form-label">
            Enter your rePassword
          </label>
          <input
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            type="password"
            className="form-control"
            id="rePassword"
            name="rePassword"
            value={formik.values.rePassword}
            aria-describedby="emailHelp"
          />
        </div>

        {formik.errors.rePassword && formik.touched.rePassword ? (
          <div className="alert alert-danger" role="alert">
            {formik.errors.rePassword}
          </div>
        ) : null}

        <button type="submit" className="btn btn-primary">
          {isLoading ? <i className="fa-solid fa-spinner"></i> : "Submit"}
        </button>
      </form>
    </>
  );
};

export default Register;
