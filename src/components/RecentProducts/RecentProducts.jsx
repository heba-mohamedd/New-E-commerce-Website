import React, { useEffect, useState } from "react";
import Style from "./RecentProducts.module.css";
import axios from "axios";
import { Link } from "react-router-dom";

const RecentProducts = () => {
  const [recentProducts, setRecentProducts] = useState([]);

  const getRecentProducts = async () => {
    try {
      const { data } = await axios.get(
        `https://ecommerce.routemisr.com/api/v1/products`
      );
      setRecentProducts(data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getRecentProducts();
  }, []);

  return (
    <div className="container my-5">
      <h2 className="text-center mb-4">Recent Products</h2>
      <div className="row">
        {recentProducts.map((product) => (
          <div key={product.id} className={`col-md-3 mb-4 ${Style.product}`}>
            <Link to={`/productsdetails/${product.id}`}>
              <div className={`card p-3 shadow-sm ${Style.productCard}`}>
                <img
                  src={product.imageCover}
                  alt={product.title}
                  className="img-fluid rounded"
                />
                <h5 className="mt-2 text-primary">{product.category.name}</h5>
                <p className="text-muted">
                  {product.title.split(" ").slice(0, 2).join(" ")}
                </p>
                <div className="d-flex justify-content-between align-items-center">
                  <span className="fw-bold">${product.price}</span>
                  <span>
                    <b>{product.ratingsAverage}</b>
                    <i className=" text-warning fa-solid fa-star"></i>
                  </span>
                </div>
                <button className={`btn btn-primary w-100  ${Style.x}`}>
                  Add to Cart
                </button>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentProducts;
