import React from "react";
import { useEffect, useState } from "react";
import Style from "./Categories.module.css";

const Categories = () => {
  const [count, setCount] = useState(0);
  useEffect(() => {}, []);
  return (
    <>
      <h2>Categories</h2>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid
        molestias illo quos nobis repellat perferendis sit, atque eius optio
        harum dicta aperiam nihil ipsam molestiae laudantium doloribus voluptas
        commodi vero.
      </p>
    </>
  );
};

export default Categories;
