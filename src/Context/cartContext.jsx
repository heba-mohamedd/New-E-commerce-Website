import axios from "axios";
import React, { createContext } from "react";

export const cartContext = createContext(null);

export default function CartContextProvider(props) {
  let headers = {
    token: localStorage.getItem("userToken"),
  };

  function getLoggedUserCart() {
    return axios
      .get(`https://ecommerce.routemisr.com/api/v1/cart`, { headers })
      .then((response) => console.log(response))
      .catch((error) => error);
  }
  return (
    <cartContext.Provider value={{ getLoggedUserCart }}>
      {props.children}
    </cartContext.Provider>
  );
}
