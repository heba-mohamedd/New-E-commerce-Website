import React from "react";
import { useEffect, useState } from "react";
import Style from "./CategoriesSlider.module.css";
import axios from "axios";
import Slider from "react-slick";

const CategoriesSlider = () => {
  const [categories, setCategories] = useState([]);
  const [isLoading, setLoading] = useState(false);
  var settings = {
    dots: false,
    infinite: true,
    speed: 1500,
    autoplay: true,
    slidesToShow: 8,
    slidesToScroll: 3,
  };
  async function getCategories() {
    try {
      setLoading(true);
      let { data } = await axios.get(
        `https://ecommerce.routemisr.com/api/v1/categories`
      );
      setCategories(data.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getCategories();
  }, []);
  return (
    <>
      {isLoading ? (
        <h4 className="text-center my-5">Loading categories...</h4>
      ) : (
        <Slider {...settings}>
          {categories.map((category) => (
            <div key={category._id}>
              <img
                src={category.image}
                alt={category.name}
                style={{ width: "100%", height: "250px" }}
              />
              <p className="mt-2 fw-bold">{category.name}</p>
            </div>
          ))}
        </Slider>
      )}
    </>
  );
};

export default CategoriesSlider;
