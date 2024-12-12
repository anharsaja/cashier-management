import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  SetStateAction,
  Dispatch,
} from 'react';

export type Product = {
  id: string;
  name: string;
  price: number;
  count: number;
};

interface CartContextProps {
  setCartItems: Dispatch<SetStateAction<Product[]>>;
  cartItems: Product[];
  totalQTY: number;
  totalPrice: number;
  incrementItem: (product: Product) => void;
  decrementItem: (product: Product) => void;
}

interface CartProviderProps {
  children: ReactNode;
}

const CartContext = createContext<CartContextProps | undefined>(undefined);

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [cartItems, setCartItems] = useState<Product[]>([]);
  const [totalQTY, setTotalQTY] = useState<number>(0);
  const [totalPrice, setTotalPrice] = useState<number>(0);

  // const incrementItem = (product: Product) => {
  //   const updatedCart = cartItems.map((item) => {
  //     if (item.id === product.id) {
  //       return { ...item, count: item.count + 1 };
  //     }
  //     return item;
  //   });
  //   if (!cartItems.find((item) => item.id === product.id)) {
  //     updatedCart.push({ ...product, count: 1 });
  //   }

  //   setCartItems(updatedCart);
  //   setTotalQTY(totalQTY + 1);
  //   setTotalPrice(totalPrice + product.price);
  // };
  const addToCart = (product: Product) => {
    setCartItems((prevCartItems) => {
      const existingItem = prevCartItems.find((item) => item.id === product.id);
      if (existingItem) {
        console.log('wes tambah ' + existingItem);
        return prevCartItems.map((item) =>
          item.id === product.id ? { ...item, count: item.count + 1 } : item
        );
      }
      return [...prevCartItems, { ...product, count: 1 }];
    });

    setTotalQTY((prevTotal) => prevTotal + 1);
    setTotalPrice((prevPrice) => prevPrice + product.price);
  };

  const removeFromCart = (product: Product) => {
    setCartItems((prevCartItems) => {
      return prevCartItems.map((item) => {
        if (item.id === product.id && item.count > 0) {
          setTotalQTY((prevTotal) => prevTotal - 1);
          setTotalPrice((prevPrice) => prevPrice - product.price);
          return { ...item, count: item.count - 1 };
        }
        return item;
      });
    });
  };
  return (
    <CartContext.Provider
      value={{
        cartItems,
        totalQTY,
        totalPrice,
        incrementItem: addToCart,
        decrementItem: removeFromCart,
        setCartItems,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCartContext = (): CartContextProps => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCartContext must be used within a CartProvider');
  }
  return context;
};
