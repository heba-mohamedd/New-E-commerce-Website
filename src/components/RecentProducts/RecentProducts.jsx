import React, { useContext, useEffect, useState } from "react";
import Style from "./RecentProducts.module.css";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import useProducts from "../../Hooks/useProducts";
import { cartContext } from "../../Context/cartContext";
import toast from "react-hot-toast";

const RecentProducts = () => {
  // function getRecentProducts() {
  //   return axios.get(`https://ecommerce.routemisr.com/api/v1/products`);
  // }

  // let { data, isError, isFetching, isLoading, error } = useQuery({
  //   queryKey: ["recentProducts"],
  //   queryFn: getRecentProducts,
  // });

  let { addProductToCart } = useContext(cartContext);
  let { data, isError, isLoading, error } = useProducts();
  let [loading, setLoading] = useState(false);
  let [currentProductId, setCurrentProductId] = useState(0);

  async function addProduct(productId) {
    setLoading(true);
    setCurrentProductId(productId);
    let response = await addProductToCart(productId);

    if (response.data.status === "success") {
      setLoading(false);
      toast.success("Product added to cart successfully!");
    } else {
      setLoading(false);
      toast.error("Failed to add product. Please try again.");
    }
    console.log(response);
  }
  // console.log(inform);
  if (isLoading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="d-flex justify-content-center text-danger">
        {error?.message || "An error occurred while fetching products."}
      </div>
    );
  }

  return (
    <div className="container my-5">
      <h2 className="text-center mb-4">Recent Products</h2>
      <div className="row">
        {data.map((product) => (
          <div key={product.id} className={`col-md-3 mb-4 ${Style.product}`}>
            <div className={`card shadow-sm ${Style.productCard}`}>
              <Link
                className="linkClass"
                to={`/productsdetails/${product.id}/${product.category.name}`}
              >
                <img
                  src={product.imageCover}
                  alt={product.title}
                  className={`img-fluid rounded  ${Style.cardImage}`}
                />
                <div className="p-3">
                  <h5 className="mt-2 text-primary">{product.category.name}</h5>
                  <p className="text-muted">
                    {product.title.split(" ").slice(0, 2).join(" ")}
                  </p>
                  <div className="d-flex justify-content-between align-items-center">
                    <span className="fw-bold">${product.price}</span>
                    <span>
                      <b>{product.ratingsAverage}</b>
                      <i className="text-warning fa-solid fa-star"></i>
                    </span>
                  </div>
                </div>
              </Link>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  e.preventDefault();
                  addProduct(product.id);
                }}
                className={`btn btn-primary w-100 ${Style.x}`}
              >
                {currentProductId === product.id && loading ? (
                  <i className="fas fa-spinner fa-spin"></i>
                ) : (
                  "Add to Cart"
                )}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentProducts;
