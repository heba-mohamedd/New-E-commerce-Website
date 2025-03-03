import React from "react";
import { useEffect, useState } from "react";
import Style from "./ProductDetails.module.css";
import { useParams } from "react-router-dom";

const ProductDetails = () => {
  const [count, setCount] = useState(0);
  const params = useParams();

  useEffect(() => {}, []);
  return <></>;
};

export default ProductDetails;
