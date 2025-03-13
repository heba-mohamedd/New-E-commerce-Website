import React from "react";
import { useEffect, useState } from "react";
import Style from "./Products.module.css";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import useProducts from "../../Hooks/useProducts";
import RecentProducts from "../RecentProducts/RecentProducts";

const Products = () => {
  return <RecentProducts />;
  //   // function getRecentProducts() {
  //   //   return axios.get(`https://ecommerce.routemisr.com/api/v1/products`);
  //   // }

  //   // let { data, isError, isFetching, isLoading, error } = useQuery({
  //   //   queryKey: ["recentProducts"],
  //   //   queryFn: getRecentProducts,
  //   //   // staleTime: 3000,
  //   //   // refetchInterval: 5000,
  //   // });
  //   let { data, isError, isLoading, error } = useProducts();

  //   // console.log(inform);
  //   if (isLoading) {
  //     return (
  //       <div className="d-flex justify-content-center align-items-center vh-100">
  //         <div className="spinner-border text-primary" role="status">
  //           <span className="visually-hidden">Loading...</span>
  //         </div>
  //       </div>
  //     );
  //   }

  //   if (isError) {
  //     return (
  //       <div className="d-flex justify-content-center text-danger">
  //         {error?.message || "An error occurred while fetching products."}
  //       </div>
  //     );
  //   }

  //   return (
  //     // <div className="container my-5">
  //     //   <h2 className="text-center mb-4">Recent Products</h2>
  //     //   <div className="row">
  //     //     {data.map((product) => (
  //     //       <div key={product.id} className={`col-md-3 mb-4 ${Style.product}`}>
  //     //         <Link
  //     //           className="linkClass"
  //     //           to={`/productsdetails/${product.id}/${product.category.name}`}
  //     //         >
  //     //           <div className={`card  shadow-sm ${Style.productCard}`}>
  //     //             <img
  //     //               src={product.imageCover}
  //     //               alt={product.title}
  //     //               className={`img-fluid rounded  ${Style.cardImage}`}
  //     //             />
  //     //             <div className="p-3">
  //     //               <h5 className="mt-2 text-primary">{product.category.name}</h5>
  //     //               <p className="text-muted">
  //     //                 {product.title.split(" ").slice(0, 2).join(" ")}
  //     //               </p>
  //     //               <div className="d-flex justify-content-between align-items-center">
  //     //                 <span className="fw-bold">${product.price}</span>
  //     //                 <span>
  //     //                   <b>{product.ratingsAverage}</b>
  //     //                   <i className=" text-warning fa-solid fa-star"></i>
  //     //                 </span>
  //     //               </div>
  //     //             </div>
  //     //           </div>
  //     //         </Link>
  //     //         <button className={`btn btn-primary w-100  ${Style.x}`}>
  //     //           Add to Cart
  //     //         </button>
  //     //       </div>
  //     //     ))}
  //     //   </div>
  //     // </div>
  //   );
};

export default Products;
