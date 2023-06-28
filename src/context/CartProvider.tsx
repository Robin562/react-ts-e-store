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
  dispatch: () => {},
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
      const updatedItem: CartItemType | undefined = state.cart.find(
        (item) => item.id === id
      );
      if (!updatedItem) {
        throw new Error("Item to update doesn't exist");
      }
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
const CartContext = createContext<InitContextStateType>(initContextState);

const CartProvider = ({ children }: ChildrenType): ReactElement => {
  const [state, dispatch] = useReducer(reducer, initState);
  return (
    <CartContext.Provider value={{ state, dispatch, ACTIONS }}>
      {children}
    </CartContext.Provider>
  );
};

export const useTotalItemsAndQty = () => {
  const {
    state: { cart },
  } = useCartGlobalContext();

  const totalItems: number = cart.reduce((acc, curr) => {
    return acc + curr.qty;
  }, 0);
  const totalPrice: string = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "INR",
  }).format(
    cart.reduce((acc, curr) => {
      return acc + curr.price * curr.qty;
    }, 0)
  );

  return { totalItems, totalPrice };
};

export const useCartGlobalContext = () =>
  useContext<InitContextStateType>(CartContext);
export default CartProvider;
