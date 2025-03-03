import React, { useContext } from "react";
import { useEffect, useState } from "react";
import Style from "./Navbar.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link, NavLink, useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";
import { UserContext } from "../../Context/UserContext";

const Navbar = () => {
  const { userLogin, setUserLogin } = useContext(UserContext);
  const navigate = useNavigate();

  const handelLogout = () => {
    localStorage.removeItem("userToken");
    setUserLogin(null);
    navigate("/login");
  };

  return (
    // bg-dark
    <nav className={`${Style.x}`}>
      <div className="container-fluid d-flex flex-column flex-lg-row justify-content-between ">
        <div className="d-flex flex-column  flex-lg-row">
          {/* <img width={120} src={logo} alt="logo page" /> */}
          <Link to="/">
            <p className="logo">Heba</p>
          </Link>

          {userLogin && (
            <ul
              className={`d-flex flex-column mt-3 flex-lg-row ${Style.navStyle}`}
            >
              <li className="p-2">
                <NavLink className={Style.navbar} to="">
                  Home
                </NavLink>
              </li>
              <li className="p-2">
                <NavLink className={Style.navbar} to="brands">
                  Brands
                </NavLink>
              </li>

              <li className="p-2">
                <NavLink className={Style.navbar} to="categories">
                  Categories
                </NavLink>
              </li>

              <li className="p-2">
                <NavLink className={Style.navbar} to="products">
                  Products
                </NavLink>
              </li>

              <li className="p-2">
                <NavLink className={Style.navbar} to="About">
                  About
                </NavLink>
              </li>
            </ul>
          )}
        </div>
        <div className="d-flex flex-column flex-lg-row ">
          <ul
            className={`d-flex flex-column mt-3 flex-lg-row  ${Style.navStyle}`}
          >
            <li className="d-flex align-items-center">
              <i className="fab p-2 fa-youtube"></i>
              <i className="fab p-2 fa-twitter"></i>
              <i className="fab p-2 fa-linkedin"></i>
              <i className="fab p-2 fa-facebook"></i>
              <i className="fab p-2 fa-android"></i>
            </li>
            {userLogin === null ? (
              <>
                <li className="p-2">
                  <NavLink className={Style.navbar} to="register">
                    Register
                  </NavLink>
                </li>
                <li className="p-2">
                  <NavLink className={Style.navbar} to="/login">
                    Login
                  </NavLink>
                </li>
              </>
            ) : (
              <li className={`p-2 ${Style.navbar}`} onClick={handelLogout}>
                Log Out
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
