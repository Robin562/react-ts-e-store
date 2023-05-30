import { useState } from "react";
import Cart from "./components/Cart";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ProductsProvider from "./context/ProductsProvider";
import CartProvider from "./context/CartProvider";
import Main from "./components/Main";

function App() {
  const [viewCart, setViewCart] = useState<boolean>(false);
  const content = (
    <section className="screen">
      <CartProvider>
        <Header viewCart={viewCart} setViewCart={setViewCart} />
        <ProductsProvider>{viewCart ? <Cart /> : <Main />}</ProductsProvider>
      </CartProvider>
      <Footer />
    </section>
  );
  return content;
}

export default App;
