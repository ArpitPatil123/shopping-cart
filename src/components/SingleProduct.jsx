import React, { useContext } from "react";
import { Button, Card } from "react-bootstrap";
import { CartContext } from "../context/Context";
import Rating from "./Rating";
import { BiRupee } from "react-icons/bi";

const SingleProduct = ({ product }) => {
  const {
    state: { cart },
    dispatch,
  } = useContext(CartContext);

  return (
    <div className="products">
      <Card>
        <Card.Img variant="top" src={product.image} alt={product.name} />
        <Card.Body>
          <Card.Title>{product.name}</Card.Title>
          <Card.Subtitle>
            <span>
              <BiRupee />
              {product.price.split(".")[0]}
            </span>
            {product.fastDelivery ? (
              <div>Fast Delivery</div>
            ) : (
              <div>4 Days Delivery</div>
            )}
            <Rating rating={product.ratings} />
          </Card.Subtitle>

          {cart.some((p) => p.id === product.id) ? (
            <Button
              variant="danger"
              size="sm"
              onClick={() => {
                dispatch({
                  type: "REMOVE_FROM_CART",
                  payload: product,
                });
              }}
            >
              Remove From Cart
            </Button>
          ) : (
            <Button
              disabled={!product.inStock}
              size="sm"
              style={{ marginLeft: "8px" }}
              onClick={() => {
                dispatch({
                  type: "ADD_TO_CART",
                  payload: product,
                });
              }}
            >
              {!product.inStock ? "Out of Stock" : "Add to Cart"}
            </Button>
          )}
        </Card.Body>
      </Card>
    </div>
  );
};

export default SingleProduct;
