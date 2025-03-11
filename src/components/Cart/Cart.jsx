import React, { useContext, useEffect, useState } from "react";
import Style from "./Cart.module.css";
import { cartContext } from "../../Context/cartContext";
import { Card, Button, Table } from "react-bootstrap";

const Cart = () => {
  const [caryDetails, setcaryDetails] = useState(null);
  let { getLoggedUserCart } = useContext(cartContext);

  async function getCartItems() {
    let response = await getLoggedUserCart();
    console.log(response.data.data);
    setcaryDetails(response.data.data);
  }

  useEffect(() => {
    getCartItems();
  }, []);

  return (
    <div className="container mt-4">
      <h3 className="mb-4">Shopping Cart</h3>

      {caryDetails?.products.map((product) => (
        <Card key={product.product.id} className="mb-3 p-3 shadow-sm">
          <div className="d-flex align-items-center">
            <img
              src={product.product.imageCover}
              alt={product.product.title}
              className="me-3 rounded"
              width="100"
            />
            <div className="flex-grow-1">
              <h5>{product.product.title}</h5>
              <h6 className="fw-bold text-primary">${product.price}</h6>
            </div>

            <div className="d-flex align-items-center quantity-controls">
              <Button
                variant="outline-secondary"
                className="rounded-circle mx-1"
              >
                −
              </Button>
              <span className="px-3 py-1 border rounded text-center">
                {product.count}
              </span>
              <Button
                variant="outline-secondary"
                className="rounded-circle mx-1"
              >
                +
              </Button>
            </div>

            <Button variant="outline-danger" className="ms-3">
              Remove
            </Button>
          </div>
        </Card>
      ))}

      {caryDetails && (
        <Table striped bordered hover className="mt-4 text-center">
          <thead>
            <tr>
              <th>Total Cart Price</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="fw-bold text-success">
                ${caryDetails.totalCartPrice}
              </td>
            </tr>
          </tbody>
        </Table>
      )}
    </div>
  );
};

export default Cart;
