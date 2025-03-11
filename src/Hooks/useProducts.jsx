import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";

function useProducts() {
  function getRecentProducts() {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/products`);
  }

  let responseProducts = useQuery({
    queryKey: ["recentProducts"],
    queryFn: getRecentProducts,
    staleTime: 80000,
    select: (data) => data.data.data,
  });
  return responseProducts;
}

export default useProducts;
