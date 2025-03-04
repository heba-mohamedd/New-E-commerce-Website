import React from "react";
import { useEffect, useState } from "react";
import Style from "./Home.module.css";
import RecentProducts from "./../RecentProducts/RecentProducts";
import CategoriesSlider from "../CategoriesSlider/CategoriesSlider";
import MainSlider from "../MainSlider/MainSlider";

const Home = () => {
  const [count, setCount] = useState(0);
  useEffect(() => {}, []);
  return (
    <div className="container-fluid">
      <MainSlider />
      <CategoriesSlider />
      <RecentProducts />
    </div>
  );
};

export default Home;
