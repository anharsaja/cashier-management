import { Product } from '@/data/types/model/product';
import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  SetStateAction,
  Dispatch,
} from 'react';

interface CartContextProps {
  setCartItems: Dispatch<SetStateAction<Product[]>>;
  cartItems: Product[];
  incrementItem: (product: Product) => void;
  decrementItem: (product: Product) => void;
}

interface CartProviderProps {
  children: ReactNode;
}

const CartContext = createContext<CartContextProps | undefined>(undefined);

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [cartItems, setCartItems] = useState<Product[]>([]);

  const incraseToCart = (product: Product) => {
    setCartItems((prevCartItems) => {
      const existingItem = prevCartItems.find((item) => item.id === product.id);

      if (existingItem) {
        return prevCartItems.map((item) =>
          item.id === product.id ? { ...item, count: item.count + 1 } : item
        );
      }

      return [...prevCartItems, { ...product, count: 1 }];
    });
  };

  const decreaseFromCart = (product: Product) => {
    setCartItems((prevCartItems) => {
      const existingItem = prevCartItems.find((item) => item.id === product.id);

      if (existingItem && existingItem.count <= 1) {
        return prevCartItems.filter((item) => item.id !== product.id);
      } else {
        return prevCartItems.map((item) => {
          if (item.id === product.id && item.count > 0) {
            return { ...item, count: item.count - 1 };
          }

          return item;
        });
      }
    });
  };
  return (
    <CartContext.Provider
      value={{
        cartItems,
        incrementItem: incraseToCart,
        decrementItem: decreaseFromCart,
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
