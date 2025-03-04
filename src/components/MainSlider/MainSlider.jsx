import React from "react";
import Style from "./MainSlider.module.css";
import mainSlider1 from "../../assets/home-page1.jpg";
import mainSlider2 from "../../assets/home-page2.jpg";
import mainSlider3 from "../../assets/home-page3.jpg";
import mainSlider4 from "../../assets/home-page4.jpg";
import mainSlider5 from "../../assets/home-page5.jpg";
import Slider from "react-slick";

const MainSlider = () => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 1500,
    autoplay: true,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const sliderImages = [mainSlider3, mainSlider4, mainSlider5];

  return (
    <div className="row g-0 mb-5 mt-5">
      <div className=" col-md-9">
        <Slider {...settings}>
          {sliderImages.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`Main Slider ${index + 1}`}
              className={`img-fluid rouned ${Style.mainImage}`}
            />
          ))}
        </Slider>
      </div>

      <div className=" col-md-3 d-flex flex-column">
        <img
          src={mainSlider2}
          alt="Main Slider 2"
          className={`img-fluid ${Style.halfImage}`}
        />
        <img
          src={mainSlider1}
          alt="Main Slider 1"
          className={`img-fluid ${Style.halfImage}`}
        />
      </div>
    </div>
  );
};

export default MainSlider;
