import Item from "./Item";
import { useProductsGlobalContext } from "../context/ProductsProvider";
import { ProductsType } from "../context/ProductsProvider";

const Main = () => {
  const { products, loading } = useProductsGlobalContext();

  return (
    <main className="main">
      {loading && "Loading..."}
      {!loading && (
        <ul className="items-container">
          {products.map((item: ProductsType) => (
            <Item key={item.id} {...item} />
          ))}
        </ul>
      )}
    </main>
  );
};

export default Main;
