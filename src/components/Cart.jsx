import React, { useContext, useEffect, useState } from "react";
import { Button, Col, Form, Image, ListGroup, Row } from "react-bootstrap";
import { CartContext } from "../context/Context";
import Rating from "./Rating";
import { BiRupee } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";

const Cart = () => {
  const {
    state: { cart },
    dispatch,
    total,
  } = useContext(CartContext);

  console.log("Cart items are", cart);

  return (
    <div className="home">
      <div className="productsContainer">
        <ListGroup style={{ width: "100%" }}>
          {cart.map((cartItem) => (
            <ListGroup.Item key={cartItem.id}>
              <Row>
                <Col md={2}>
                  <Image
                    src={cartItem.image}
                    alt={cartItem.name}
                    fluid
                    rounded
                  />
                </Col>
                <Col md={2}>
                  <span>{cartItem.name}</span>
                </Col>
                <Col md={2}>
                  <BiRupee />
                  {cartItem.price}
                </Col>
                <Col md={2}>
                  <Rating rating={cartItem.ratings} />
                </Col>
                <Col md={2}>
                  <Form.Select
                    value={cartItem.qty}
                    onChange={(e) =>
                      dispatch({
                        type: "CHANGE_CART_QTY",
                        payload: {
                          id: cartItem.id,
                          qty: e.target.value,
                        },
                      })
                    }
                  >
                    {[...Array(cartItem.inStock).keys()].map((x) => (
                      <option key={x + 1}>{x + 1}</option>
                    ))}
                  </Form.Select>
                </Col>
                <Col md={2}>
                  <AiFillDelete
                    fontSize="20px"
                    style={{ cursor: "pointer" }}
                    onClick={() =>
                      dispatch({
                        type: "REMOVE_FROM_CART",
                        payload: cartItem,
                      })
                    }
                  />
                </Col>
              </Row>
            </ListGroup.Item>
          ))}
        </ListGroup>
      </div>

      <div className="filters summary">
        <span className="title">Subtotal ({cart.length}) items</span>
        <span>
          Total: <BiRupee />
          {total()}
        </span>
        <Button type="button" disabled={cart.length === 0}>
          Proceed to Checkout
        </Button>
      </div>
    </div>
  );
};

export default Cart;
