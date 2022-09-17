import { createContext, useReducer } from "react";
import { faker } from "@faker-js/faker";
import { reducer, filterReducer } from "./Reducers";

export const CartContext = createContext();
const arr = [0, 3, 5, 6, 8];
const arr1 = [1, 2, 3, 4, 5];
faker.seed(99);
const Context = ({ children }) => {
  const products = [...Array(18)].map(() => ({
    id: faker.datatype.uuid(),
    name: faker.commerce.productName(),
    price: faker.commerce.price(),
    image: faker.image.image(),
    inStock: arr[Math.floor(Math.random() * arr.length)],
    fastDelivery: faker.datatype.boolean(),
    ratings: arr1[Math.floor(Math.random() * arr1.length)],
  }));

  const initialState = {
    products: products,
    cart: [],
  };

  const filterInitialState = {
    byStock: false,
    byFastDelivery: false,
    byRating: 0,
    searchQuery: "",
    sort: "",
  };
  const [state, dispatch] = useReducer(reducer, initialState);

  const [filterState, filterDispatch] = useReducer(
    filterReducer,
    filterInitialState
  );

  const total = () => {
    return state.cart.reduce(
      (total, product) => total + Number(product.price) * product.qty,
      0
    );
  };

  return (
    <CartContext.Provider
      value={{ state, dispatch, total, filterState, filterDispatch }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default Context;
