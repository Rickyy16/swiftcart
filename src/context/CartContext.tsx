import React, { createContext, useReducer, useContext, useEffect } from 'react';
import type { Product } from '../types/product';


export interface CartItem extends Product {
  quantity: number;
}

type CartAction =

  | { type: 'ADD_TO_CART'; payload: Product }
  | { type: 'REMOVE_FROM_CART'; payload: number }
  | { type: 'UPDATE_QUANTITY'; payload: { id: number; quantity: number } }

  | { type: 'CLEAR_CART' };

interface CartContextType {
  cart: CartItem[];
  totalItems: number;
  totalValue: number;
  dispatch: React.Dispatch<CartAction>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const cartReducer = (state: CartItem[], action: CartAction): CartItem[] => {
  switch (action.type) {
    case 'ADD_TO_CART':
      const existingItem = state.find(item => item.id === action.payload.id);
      if (existingItem) {
        return state.map(item =>
          item.id === action.payload.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...state, { ...action.payload, quantity: 1 }];

    case 'REMOVE_FROM_CART':
      return state.filter(item => String(item.id) !== String(action.payload));

    case 'UPDATE_QUANTITY':
      return state.map(item =>
        String(item.id) === String(action.payload.id) 
          ? { ...item, quantity: Math.max(1, action.payload.quantity) } 
          : item
      );

    case 'CLEAR_CART':
      return [];

    default:
      return state;
  }
};

const getInitialState = (): CartItem[] => {
  const savedCart = localStorage.getItem("cart_data");
  return savedCart ? JSON.parse(savedCart) : [];
};

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cart, dispatch] = useReducer(cartReducer, [],getInitialState);

   useEffect(() => {
    localStorage.setItem("cart_data", JSON.stringify(cart));
  }, [cart]);

  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
  const totalValue = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <CartContext.Provider value={{ cart, dispatch, totalItems, totalValue }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
