import axios from "axios";
import React, { createContext } from "react";

export const cartContext = createContext(null);

export default function CartContextProvider(props) {
  let headers = {
    token: localStorage.getItem("userToken"),
  };

  function addProductToCart(productId) {
    return axios
      .post(
        `https://ecommerce.routemisr.com/api/v1/cart`,
        { productId: productId },
        { headers }
      )
      .then((response) => response)
      .catch((error) => {
        console.error("Error adding product to cart:", error);
        return error.response?.data || error.message;
      });
  }

  function updataCartItemCount(productId, count) {
    return axios
      .put(
        `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
        { count: count },
        { headers }
      )
      .then((response) => response)
      .catch((error) => {
        console.error("Error adding product to cart:", error);
        return error.response?.data || error.message;
      });
  }
  function deleteCartItem(productId) {
    return axios
      .delete(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`, {
        headers,
      })
      .then((response) => response)
      .catch((error) => {
        console.error("Error adding product to cart:", error);
        return error.response?.data || error.message;
      });
  }

  function clearCart() {
    return axios
      .delete(`https://ecommerce.routemisr.com/api/v1/cart`, {
        headers,
      })
      .then((response) => response)
      .catch((error) => {
        console.error("Error adding product to cart:", error);
        return error.response?.data || error.message;
      });
  }

  function getLoggedUserCart() {
    return axios
      .get(`https://ecommerce.routemisr.com/api/v1/cart`, { headers })
      .then((response) => response)
      .catch((error) => error);
  }

  return (
    <cartContext.Provider
      value={{
        getLoggedUserCart,
        addProductToCart,
        updataCartItemCount,
        deleteCartItem,
        clearCart,
      }}
    >
      {props.children}
    </cartContext.Provider>
  );
}
