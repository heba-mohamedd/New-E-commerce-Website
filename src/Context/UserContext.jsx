import React, { createContext, useEffect, useState } from "react";

export let UserContext = createContext(null);
export default function UserContextProvider(props) {
  const [userLogin, setUserLogin] = useState(null);
  useEffect(() => {
    const token = localStorage.getItem("userToken");
    if (token) {
      setUserLogin(token);
    }
  }, []);

  return (
    <UserContext.Provider value={{ userLogin, setUserLogin }}>
      {props.children}
    </UserContext.Provider>
  );
}
