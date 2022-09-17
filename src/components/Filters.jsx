import { useContext } from "react";
import { Button, Form } from "react-bootstrap";
import Rating from "./Rating";
import { CartContext } from "../context/Context";

const Filters = () => {
  const {
    filterState: { byStock, byFastDelivery, byRating, sort },
    filterDispatch,
  } = useContext(CartContext);

  return (
    <div className="filters">
      <span className="title">Filter Products</span>
      <span>
        <Form.Check
          inline
          label="Ascending"
          name="group1"
          type="radio"
          id={`inline-1`}
          onChange={() => {
            filterDispatch({
              type: "SORT_BY_PRICE",
              payload: "lowToHigh",
            });
          }}
          checked={sort === "lowToHigh" ? true : false}
        />
      </span>
      <span>
        <Form.Check
          inline
          label="Descending"
          name="group1"
          type="radio"
          id={`inline-2`}
          onChange={() => {
            filterDispatch({
              type: "SORT_BY_PRICE",
              payload: "highToLow",
            });
          }}
          checked={sort === "highToLow" ? true : false}
        />
      </span>
      <span>
        <Form.Check
          inline
          label="Include Out Of Stock"
          name="group1"
          type="checkbox"
          id={`inline-3`}
          onChange={() => {
            filterDispatch({
              type: "FILTER_BY_STOCK",
            });
          }}
          checked={byStock}
        />
      </span>
      <span>
        <Form.Check
          inline
          label="Fast Delivery Only"
          name="group1"
          type="checkbox"
          id={`inline-4`}
          onChange={() => {
            filterDispatch({
              type: "FILTER_BY_DELIVERY",
            });
          }}
          checked={byFastDelivery}
        />
      </span>
      <span>
        <label style={{ padingRight: 10 }}>Rating: </label>
        <Rating
          rating={byRating}
          onClick={(i) =>
            filterDispatch({
              type: "FILTER_BY_RATING",
              payload: i + 1,
            })
          }
          style={{ cursor: "pointer" }}
        />
      </span>
      <Button
        variant="light"
        onClick={() => {
          filterDispatch({
            type: "RESET_FILTERS",
          });
        }}
      >
        Clear Filters
      </Button>
    </div>
  );
};

export default Filters;
