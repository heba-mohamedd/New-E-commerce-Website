import React, { useContext, useEffect, useState } from "react";
import Style from "./ProductDetails.module.css";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

import Slider from "react-slick";
import index from "./../../../node_modules/resize-observer-polyfill/dist/ResizeObserver.es";
import RecentProducts from "./../RecentProducts/RecentProducts";
import { cartContext } from "../../Context/cartContext";
import toast from "react-hot-toast";

const ProductDetails = () => {
  const { id, category } = useParams();
  const [productDetails, setProductDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [relatedLoading, setRelatedLoading] = useState(true);
  let { addProductToCart } = useContext(cartContext);
  let [currentProductId, setCurrentProductId] = useState(0);
  const [loadingForButton, setloadingForButton] = useState(false);

  async function addProduct(productId) {
    setloadingForButton(true);
    setCurrentProductId(productId);
    let response = await addProductToCart(productId);

    if (response.data.status === "success") {
      setloadingForButton(false);
      toast.success("Product added to cart successfully!");
    } else {
      setloadingForButton(false);
      toast.error("Failed to add product. Please try again.");
    }
    console.log(response);
  }
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  async function getProductDetails(productId) {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `https://ecommerce.routemisr.com/api/v1/products/${productId}`
      );
      setProductDetails(data.data);
      console.log(data.data);
    } catch (err) {
      setError("Failed to fetch product details.");
    } finally {
      setLoading(false);
    }
  }

  async function getRelatedProducts(categoryName) {
    try {
      setRelatedLoading(true);
      const { data } = await axios.get(
        `https://ecommerce.routemisr.com/api/v1/products`
      );
      const related = data.data.filter(
        (product) => product.category.name === categoryName
      );
      setRelatedProducts(related);
    } catch (error) {
      console.log(error);
    } finally {
      setRelatedLoading(false);
    }
  }

  useEffect(() => {
    getProductDetails(id);
    getRelatedProducts(category);
  }, [id, category]);

  if (loading) {
    return <h4 className="text-center my-5">Loading product details...</h4>;
  }

  if (error) {
    return <h4 className="text-center my-5 text-danger">{error}</h4>;
  }

  return (
    <div className="container mt-3">
      <div className="row">
        <div className="col-md-4">
          {productDetails?.images?.length > 1 ? (
            <Slider {...settings}>
              {productDetails?.images.map((src, index) => (
                <img
                  key={index}
                  src={src}
                  alt={productDetails?.title}
                  className="img-fluid rounded w-100"
                />
              ))}
            </Slider>
          ) : (
            <img
              key={productDetails?.id}
              src={productDetails.imageCover}
              alt={productDetails?.title}
              className="img-fluid rounded w-100"
            />
          )}
        </div>
        <div className="col-md-8 ">
          <h5 className="mt-2 text-primary">
            {productDetails?.category?.name}
          </h5>
          <h4 className="fw-bold">{productDetails?.title}</h4>
          <p className="text-muted">{productDetails?.description}</p>
          <p className="fw-bold">Price: ${productDetails?.price}</p>
          <button
            className={`btn btn-primary  w-100`}
            onClick={() => addProduct(productDetails?.id)}
          >
            {currentProductId === productDetails.id && loadingForButton ? (
              <i className="fas fa-spinner fa-spin"></i>
            ) : (
              "Add to Cart"
            )}
          </button>
        </div>
      </div>

      <h3 className="mt-5">Related Products</h3>
      {relatedLoading ? (
        <h5 className="text-center my-3">Loading related products...</h5>
      ) : (
        <div className="row">
          {relatedProducts.length > 0 ? (
            relatedProducts.map((product) => (
              <div
                key={product.id}
                className={`col-md-2 mb-4 ${Style.productCard}`}
              >
                <Link
                  className="linkClass"
                  to={`/productsdetails/${product.id}/${product.category.name}`}
                >
                  <div className={`card p-3 shadow-sm ${Style.productCard}`}>
                    <img
                      src={product.imageCover}
                      alt={product.title}
                      className="img-fluid rounded"
                    />
                    <h5 className="mt-2 text-primary">
                      {product.category.name}
                    </h5>
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
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        e.preventDefault();
                        addProduct(product.id);
                      }}
                      className={`btn btn-primary w-100 ${Style.x}`}
                    >
                      {currentProductId === product.id && loadingForButton ? (
                        <i className="fas fa-spinner fa-spin"></i>
                      ) : (
                        "Add to Cart"
                      )}
                    </button>
                  </div>
                </Link>
              </div>
            ))
          ) : (
            <h5 className="text-center my-3 text-muted">
              No related products found.
            </h5>
          )}
        </div>
      )}
    </div>
  );
};

export default ProductDetails;
