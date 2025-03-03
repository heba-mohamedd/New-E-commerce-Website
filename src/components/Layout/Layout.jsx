import React from "react";
import { useEffect, useState } from "react";
import Style from "./Layout.module.css";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import { Outlet } from "react-router-dom";

const Layout = () => {
  const [count, setCount] = useState(0);
  useEffect(() => {}, []);
  return (
    <>
      <Navbar />

      <div className="container-fluid">
        <Outlet></Outlet>
      </div>

      <Footer />
    </>
  );
};

export default Layout;
