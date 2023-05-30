import CartItem from "./CartItem";
import { useCartGlobalContext } from "../context/CartProvider";
import { CartItemType } from "../context/CartProvider";

const Cart = () => {
  const { state } = useCartGlobalContext();

  return (
    <section className="cartView">
      <ul className="cartList">
        {state.cart.map((item: CartItemType) => (
          <CartItem key={item.id} {...item} />
        ))}
      </ul>
    </section>
  );
};

export default Cart;
