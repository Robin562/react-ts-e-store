import { useTotalItemsAndQty } from "../context/CartProvider";
import { FaRupeeSign } from "react-icons/fa";

type HeaderPropsType = {
  viewCart: boolean;
  setViewCart: React.Dispatch<React.SetStateAction<boolean>>;
};

const Header = ({ viewCart, setViewCart }: HeaderPropsType) => {
  const { price, qty } = useTotalItemsAndQty();

  return (
    <header className="header">
      <h1 className="header__heading">STORE BUDDY</h1>
      <div className="header__infoAndBtn">
        <div className="header__info">
          <p className="header__total">Total Items : {qty} </p>
          <p className="header__total">
            Total Price : <FaRupeeSign /> {price}
          </p>
        </div>
        <button
          onClick={() => {
            setViewCart(!viewCart);
          }}
          className="header__viewBtn"
        >
          {viewCart ? "Home" : "View Cart"}
        </button>
      </div>
    </header>
  );
};

export default Header;
