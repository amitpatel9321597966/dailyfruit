import { createContext, useState } from "react";

export const CartContext = createContext();

export default function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  const addToCart = (fruit) => {
    setCart((prev) => {
      const exists = prev.find((item) => item.id === fruit.id);


      
      if (exists) {
        return prev.map((item) =>
          item.id === fruit.id && item.qty < 10
            ? { ...item, qty: item.qty + 1 }
            : item
        );
      } else {
        return [...prev, { ...fruit, qty: 1 }];
      }    });
  };
  const increaseQty = (id) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === id && item.qty < 10
          ? { ...item, qty: item.qty + 1 }
          : item
      )  );
  };
 const decreaseQty = (id) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === id && item.qty > 1
          ? { ...item, qty: item.qty - 1 }
          : item
      ) );
  };
  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <CartContext.Provider
      value={{ cart, addToCart, increaseQty, decreaseQty, removeFromCart }}
    >
      {children}
    </CartContext.Provider>
  );
}
