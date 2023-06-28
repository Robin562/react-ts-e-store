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

// const URL = "http://localhost:3500/products";

type InitContextStateType = {
  products: ProductsType[];
  // loading: boolean;
};
const initContextState: InitContextStateType = {
  products: [],
  // loading: true,
};

const ProductsContext = createContext<InitContextStateType>(initContextState);

type ChildrenType = {
  children: ReactElement;
};

const ProductsProvider = ({ children }: ChildrenType): ReactElement => {
  const sortedProductsArray = (arr: ProductsType[]) => {
    arr.sort((a, b) => {
      const itemAID: number = Number(a.id.slice(-3));
      const itemBID: number = Number(b.id.slice(-3));
      return itemAID - itemBID;
    });
  };

  const [products, setProducts] = useState<ProductsType[]>([
    {
      id: "item002",
      name: "Digital Watch",
      price: 4000,
      imgURL:
        "https://i.dell.com/is/image/DellContent/content/dam/ss2/product-images/peripherals/alienware/peripherals/alienware-320m-mouse/assets/mouse-alienware-aw320m-black-gallery-5.psd?fmt=pjpg&pscan=auto&scl=1&wid=2159&hei=1540&qlt=100,1&resMode=sharp2&size=2159,1540&chrss=full&imwidth=5000",
    },
    {
      id: "item003",
      name: "Smart Watch",
      price: 8000,
      imgURL: "https://m.media-amazon.com/images/I/81QPDCkR-WL._SL1500_.jpg",
    },
    {
      id: "item001",
      name: "Quartz Watch",
      price: 2000,
      imgURL:
        "https://www.cnet.com/a/img/resize/c2fb79b15d18f335e85fc4acd72910059cc9758b/hub/2021/08/20/453e37bf-61cb-4e16-ad90-fd822bdc390a/keychron-k3-mechanical-keyboard.jpg?auto=webp&fit=crop&height=900&width=1200",
    },
  ]);

  sortedProductsArray(products);

  // const [loading, setLoading] = useState<boolean>(true);

  // const fetchData = async (): Promise<void> => {
  //   try {
  //     const response = await axios.get<ProductsType[]>(URL);
  //     setProducts(response.data);
  //     setLoading(false);
  //   } catch (err) {
  //     if (err instanceof Error) console.log(err.message);
  //   }
  // };
  // useEffect(() => {
  //   fetchData();
  // }, []);
  return (
    <ProductsContext.Provider value={{ products }}>
      {children}
    </ProductsContext.Provider>
  );
};

export const useProductsGlobalContext = () =>
  useContext<InitContextStateType>(ProductsContext);

export default ProductsProvider;
