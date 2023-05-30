import { createContext, useContext, useReducer, ReactElement } from "react";

type ChildrenType = {
  children: ReactElement | ReactElement[];
};

export type CartItemType = {
  id: string;
  price: number;
  qty: number;
};

type StateType = {
  cart: CartItemType[];
  totalItems: number;
  totalPrice: number;
};

const initState: StateType = {
  cart: [],
  totalItems: 0,
  totalPrice: 0,
};

type ActionType = {
  type: string;
  payload?: CartItemType;
};

const ACTIONS = {
  ADDITEM: "ADDITEM",
  REMOVEITEM: "REMOVEITEM",
  UPDATEQTY: "UPDATEQTY",
};

type InitContextStateType = {
  state: StateType;
  dispatch: React.Dispatch<ActionType>;
  ACTIONS: typeof ACTIONS;
};

const initContextState: InitContextStateType = {
  state: {
    cart: [],
    totalItems: 0,
    totalPrice: 0,
  },
  dispatch: (action: ActionType) => {},
  ACTIONS: {
    ADDITEM: "",
    REMOVEITEM: "",
    UPDATEQTY: "",
  },
};

const reducer = (state: StateType, action: ActionType): StateType => {
  switch (action.type) {
    case ACTIONS.ADDITEM: {
      if (!action.payload) {
        throw new Error("No payload provided");
      }
      const { id, price }: { id: string; price: number } = action.payload;
      const itemExists: CartItemType | undefined = state.cart.find(
        (item) => item.id === id
      );
      const qty: number = itemExists ? itemExists.qty + 1 : 1;
      const newItem: CartItemType = {
        id: id,
        price: price,
        qty: qty,
      };
      if (itemExists) {
        return {
          ...state,
          cart: state.cart.map((item) => (item.id === id ? newItem : item)),
        };
      } else {
        return { ...state, cart: [...state.cart, newItem] };
      }
    }
    case ACTIONS.REMOVEITEM: {
      if (!action.payload) {
        throw new Error("No paylaod provided for remove item");
      }
      const { id }: { id: string } = action.payload;

      const newCart: CartItemType[] = state.cart.filter(
        (item) => item.id !== id
      );

      return { ...state, cart: newCart };
    }
    case ACTIONS.UPDATEQTY: {
      if (!action.payload) {
        throw new Error("No payload provided in ACTIONS.UPDATEQTY");
      }
      const { id, qty }: { id: string; qty: number } = action.payload;
      const updatedItem = state.cart.find(
        (item) => item.id === id
      ) as CartItemType;
      updatedItem.qty = qty;
      return {
        ...state,
        cart: state.cart.map((item) => (item.id === id ? updatedItem : item)),
      };
    }
    default:
      throw new Error("Unidentified reducer action type");
  }
};

const CartContext = createContext(initContextState);

const CartProvider = ({ children }: ChildrenType) => {
  const [state, dispatch] = useReducer(reducer, initState);
  return (
    <CartContext.Provider value={{ state, dispatch, ACTIONS }}>
      {children}
    </CartContext.Provider>
  );
};

export const useTotalItemsAndQty = (): CartItemType => {
  const {
    state: { cart },
  } = useCartGlobalContext();

  const initialValue: CartItemType = {
    id: "itemTotal",
    price: 0,
    qty: 0,
  };
  const totalItems: CartItemType = cart.reduce(
    (acc: CartItemType, curr: CartItemType) => {
      const indivItemTotalPrice = curr.qty * curr.price;
      acc.price += indivItemTotalPrice;
      acc.qty += curr.qty;
      return acc;
    },
    initialValue
  );

  return totalItems;
};

export const useCartGlobalContext = () => useContext(CartContext);
export default CartProvider;
