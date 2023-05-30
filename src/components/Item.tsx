import { FaCheck, FaRupeeSign, FaLongArrowAltRight } from "react-icons/fa";
import { ProductsType } from "../context/ProductsProvider";
import { useState, useEffect } from "react";
import { useCartGlobalContext } from "../context/CartProvider";

const Item = ({ price, name, id }: ProductsType) => {
  const displayImageURL: string = new URL(
    `../images/${id}.jpg`,
    import.meta.url
  ).href;

  const [inCartClass, setInCartClass] = useState("");
  const {
    dispatch,
    ACTIONS: { ADDITEM },
  } = useCartGlobalContext();

  useEffect(() => {
    setTimeout(() => setInCartClass(""), 600);
  }, [inCartClass]);

  return (
    <li className="item">
      <h3>{name}</h3>
      <img src={displayImageURL} className="item__img" />
      <p>
        <FaRupeeSign /> {price}
        <span className={`in-cart ${inCartClass}`}>
          <FaLongArrowAltRight /> Item in Cart :{" "}
          <FaCheck className="fa-check" />{" "}
        </span>
      </p>
      <button
        onClick={() => {
          setInCartClass("show-in-cart");
          dispatch({ type: ADDITEM, payload: { id, price, qty: 0 } });
        }}
      >
        Add to Cart
      </button>
    </li>
  );
};

export default Item;
