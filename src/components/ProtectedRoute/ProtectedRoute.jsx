import React from "react";
import { useEffect, useState } from "react";
import Style from "./ProtectedRoute.module.css";
import { Navigate } from "react-router-dom";

const ProtectedRoute = (props) => {
  if (localStorage.getItem("userToken") !== null) {
    // console.log(props);
    return props.children;
  } else return <Navigate to={"/login"} />;
};

export default ProtectedRoute;
