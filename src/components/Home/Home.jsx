import React from "react";
import { useEffect, useState } from "react";
import Style from "./Home.module.css";
import RecentProducts from "./../RecentProducts/RecentProducts";

const Home = () => {
  const [count, setCount] = useState(0);
  useEffect(() => {}, []);
  return (
    <>
      <h2>Home</h2>
      <RecentProducts />
    </>
  );
};

export default Home;
