import { SlClose } from "react-icons/sl";
import { FaRupeeSign } from "react-icons/fa";
import { CartItemType } from "../context/CartProvider";
import { useProductsGlobalContext } from "../context/ProductsProvider";
import { useCartGlobalContext } from "../context/CartProvider";
import { ProductsType } from "../context/ProductsProvider";
import { ReactElement } from "react";

const CartItem = ({ qty, id, price }: CartItemType) => {
  const { products } = useProductsGlobalContext();
  const displayImageURL: string = new URL(
    `../images/${id}.jpg`,
    import.meta.url
  ).href;

  const addedItem = products.find((item) => item.id === id) as ProductsType;

  const { imgURL, name }: ProductsType = addedItem;

  const { dispatch, ACTIONS } = useCartGlobalContext();
  const checkQty = (num: number): void => {
    if (num < 1)
      dispatch({ type: ACTIONS.REMOVEITEM, payload: { id, price, qty } });
  };

  const totalItemsPrice: number = qty * price;

  const getOptions = (maxOptionNumber: number): ReactElement[] => {
    const maxOptionValue: number =
      maxOptionNumber > qty ? maxOptionNumber : qty;
    let options: number[] = [];
    for (let i = 0; i < maxOptionValue; i++) {
      options.push(i + 1);
    }
    return options.map((option) => {
      return <option key={option}>{option}</option>;
    });
  };

  return (
    <li className="cartItem">
      <img src={displayImageURL} className="cartItemImg" />
      <p>{name}</p>
      <p>
        <FaRupeeSign /> {price}
      </p>
      <div className="cartItemQty">
        <label className="offscreen">Qty:</label>
        <select
          className="cartItem__select"
          value={qty}
          onChange={(e) => {
            dispatch({
              type: ACTIONS.UPDATEQTY,
              payload: {
                id,
                price,
                qty: Number(e.target.value),
              },
            });
            checkQty(Number(e.target.value));
          }}
        >
          {getOptions(10)}
        </select>
      </div>
      <p>
        <FaRupeeSign /> {totalItemsPrice}
      </p>
      <button
        className="cart__removeBtn"
        onClick={() => {
          dispatch({ type: ACTIONS.REMOVEITEM, payload: { id, price, qty } });
        }}
      >
        <SlClose />
      </button>
    </li>
  );
};

export default CartItem;
