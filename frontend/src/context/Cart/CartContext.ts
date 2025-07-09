import { createContext, useContext } from "react";
import type { CartItem } from "../../types/CartItem";

interface CartContextType {
  cartItems: CartItem[];
  totalAmount: number;
  addItemToCart: (productId: string) => void;
  updateItemInCart: (productId: string, quantity: number) => void;
  removeItemInCart: (productId: string) => void;
  clearCart: () => void;
  fetchCart: () => void;
}

export const CartContext = createContext<CartContextType>({
  cartItems: [],
  totalAmount: 0,
  addItemToCart: () => {},
  updateItemInCart: () => {},
  removeItemInCart: () => {},
  clearCart: () => {},
  fetchCart: () => {},
});

export const useCart = () => useContext(CartContext);
