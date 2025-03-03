import React, { use, useContext } from "react";
import { useEffect, useState } from "react";
import Style from "./Login.module.css";
import { useFormik } from "formik";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import * as jose from "jose";
import { UserContext } from "../../Context/UserContext";
const SECRET_KEY = "secret";
const jwtKey = new TextEncoder().encode("your_secret_key");
const Login = () => {
  const navigate = useNavigate();
  const [isLoading, setLoading] = useState(false);
  const [apiError, setError] = useState("");
  const { userLogin, setUserLogin } = useContext(UserContext);

  let loginSchema = Yup.object().shape({
    email: Yup.string().email("Email Invaild").required("email is Required"),

    password: Yup.string()
      .matches(
        /^[A-Z][a-z0-9]{5,10}$/,
        "Password must start uppercase letter then lowercase letter and one number"
      )
      .required("Password is Required"),
  });

  const handleLogin = async (formValues) => {
    setLoading(true);

    axios
      .post(`https://ecommerce.routemisr.com/api/v1/auth/signin`, formValues)
      .then((apiResponse) => {
        if (apiResponse.data.message === "success") {
          localStorage.setItem("userToken", apiResponse.data.token);
          setUserLogin(apiResponse.data.token);
          navigate("/");
          setLoading(false);
        }
      })
      .catch((error) => {
        setLoading(false);
        setError(error.response?.data?.message);
      });
  };

  let formik = useFormik({
    initialValues: {
      email: "",

      password: "",
    },
    validationSchema: loginSchema,
    onSubmit: (values) => {
      handleLogin(values);
    },
  });

  return (
    <>
      <form className={`m-5 ${Style.login}`} onSubmit={formik.handleSubmit}>
        {apiError && (
          <div className="alert alert-danger" role="alert">
            {apiError}
          </div>
        )}
        <h1 className="mb-4">Login Now</h1>

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
        <div className="d-flex ">
          <button type="submit" className="btn btn-primary">
            {isLoading ? <i className="fa-solid fa-spinner"></i> : "Login"}
          </button>

          <p className="ml-3">
            Don't have an account?{" "}
            <span>
              <b>
                <Link to="/register">Sign up</Link>
              </b>
            </span>
          </p>
        </div>
      </form>
    </>
  );
};

export default Login;
