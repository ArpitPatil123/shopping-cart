import {
  Badge,
  Button,
  Container,
  Dropdown,
  FormControl,
  Nav,
  Navbar,
} from "react-bootstrap";
import { FaShoppingCart } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { CartContext } from "../context/Context";
import { AiFillDelete } from "react-icons/ai";
import { BiRupee } from "react-icons/bi";

function Header() {
  const {
    state: { cart },
    dispatch,
    filterDispatch,
  } = useContext(CartContext);

  return (
    <Navbar bg="dark" variant="dark" style={{ height: 80 }} sticky="top">
      <Container>
        <Navbar.Brand>
          <Link to="/cart"> Shopping Cart </Link>
        </Navbar.Brand>
        <Navbar.Text className="search">
          <FormControl
            style={{ width: 500 }}
            placeholder="Search a product"
            className="m-auto search"
            onChange={(e) =>
              filterDispatch({
                type: "FILTER_BY_SEARCH",
                payload: e.target.value,
              })
            }
          ></FormControl>
        </Navbar.Text>
        <Nav>
          <Dropdown align="end">
            <Dropdown.Toggle variant="success">
              <FaShoppingCart color="white" fontSize="25px" />
              <Badge>{cart.length}</Badge>
            </Dropdown.Toggle>
            <Dropdown.Menu style={{ minWidth: 370 }}>
              {cart.length > 0 ? (
                <>
                  {cart.map((product) => (
                    <span className="cartItem" key={product.id}>
                      <img src={product.image} alt="" />
                      <div className="cartItemDetails">
                        <span>{product.name}</span>
                        <span>
                          <BiRupee />
                          {product.price}
                        </span>
                      </div>
                      <AiFillDelete
                        fontSize="20px"
                        style={{ cursor: "pointer" }}
                        onClick={() =>
                          dispatch({
                            type: "REMOVE_FROM_CART",
                            payload: product,
                          })
                        }
                      />
                    </span>
                  ))}
                  <Link to="/cart">
                    <Button style={{ width: "95%", margin: "0 10px" }}>
                      Go To Cart
                    </Button>
                  </Link>
                </>
              ) : (
                <span style={{ padding: 10 }}>Cart is empty</span>
              )}
            </Dropdown.Menu>
          </Dropdown>
        </Nav>
      </Container>
    </Navbar>
  );
}

export default Header;
