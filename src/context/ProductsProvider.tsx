import axios from "axios";
import {
  createContext,
  useContext,
  ReactElement,
  useState,
  useEffect,
} from "react";

export type ProductsType = {
  id: string;
  name: string;
  price: number;
  imgURL: string;
};

const initState: ProductsType[] = [];

const URL = "http://localhost:3500/products";

type InitContextStateType = {
  products: ProductsType[];
  loading: boolean;
};
const initContextState: InitContextStateType = {
  products: [],
  loading: true,
};

const ProductsContext = createContext(initContextState);

type ChildrenType = {
  children: ReactElement;
};
const ProductsProvider = ({ children }: ChildrenType) => {
  const [products, setProducts] = useState<ProductsType[]>(initState);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchData = async () => {
    try {
      const response = await axios.get<ProductsType[]>(URL);
      setProducts(response.data);
      setLoading(false);
    } catch (err) {
      if (err instanceof Error) console.log(err.message);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <ProductsContext.Provider value={{ products, loading }}>
      {children}
    </ProductsContext.Provider>
  );
};

export const useProductsGlobalContext = () => useContext(ProductsContext);
export default ProductsProvider;
