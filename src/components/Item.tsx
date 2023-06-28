import { FaLongArrowAltRight } from "react-icons/fa";
import { ProductsType } from "../context/ProductsProvider";
import { useState, useEffect } from "react";
import { useCartGlobalContext } from "../context/CartProvider";

const Item = ({ price, name, id }: ProductsType) => {
  const displayImageURL: string = new URL(
    `../images/${id}.jpg`,
    import.meta.url
  ).href;

  const {
    dispatch,
    ACTIONS: { ADDITEM },
    state: { cart },
  } = useCartGlobalContext();

  let inCart: boolean = cart.some((item) => item.id === id);
  const notif = inCart ? ` ⮕ In cart : ✔️` : null;

  const formattedPrice: string = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "INR",
  }).format(price);

  return (
    <li className="item">
      <h3>{name}</h3>
      <img src={displayImageURL} className="item__img" />
      <div>
        <span className="item__price">{formattedPrice}</span>
        <span className="item__notif">{notif}</span>
      </div>
      <button
        onClick={() => {
          dispatch({ type: ADDITEM, payload: { id, price, qty: 0 } });
        }}
      >
        Add to Cart
      </button>
    </li>
  );
};

export default Item;
