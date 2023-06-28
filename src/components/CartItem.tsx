import { SlClose } from "react-icons/sl";
import { CartItemType } from "../context/CartProvider";
import { useProductsGlobalContext } from "../context/ProductsProvider";
import { useCartGlobalContext } from "../context/CartProvider";
import { ProductsType } from "../context/ProductsProvider";
import { ReactElement } from "react";

const CartItem = ({ qty, id, price }: CartItemType): ReactElement => {
  const { products } = useProductsGlobalContext();
  const displayImageURL: string = new URL(
    `../images/${id}.jpg`,
    import.meta.url
  ).href;

  const addedItem = products.find((item) => item.id === id) as ProductsType;

  const { name }: ProductsType = addedItem;

  const { dispatch, ACTIONS } = useCartGlobalContext();
  const checkQty = (num: number): void => {
    if (num < 1)
      dispatch({ type: ACTIONS.REMOVEITEM, payload: { id, price, qty } });
  };

  const totalItemsPrice: number = qty * price;

  const formattedTotalItemsPrice: string = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "INR",
  }).format(totalItemsPrice);

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

  const formattedPrice: string = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "INR",
  }).format(price);

  return (
    <li className="cartItem">
      <img src={displayImageURL} className="cartItemImg" />
      <p className="cartItem__name">{name}</p>
      <p className="cartItem__price">{formattedPrice}</p>
      <div className="cartItem__Qty">
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
      <p>{formattedTotalItemsPrice}</p>
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
