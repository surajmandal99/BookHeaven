import React, { createContext, useContext, useState, useEffect } from 'react';
import { Book, CartItem } from '../types';

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (book: Book, quantity?: number) => void;
  removeFromCart: (bookId: string) => void;
  updateQuantity: (bookId: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  
  useEffect(() => {
    // Load cart from localStorage on initial load
    const savedCart = localStorage.getItem('bookstore_cart');
    if (savedCart) {
      setCartItems(JSON.parse(savedCart));
    }
  }, []);
  
  useEffect(() => {
    // Save cart to localStorage whenever it changes
    localStorage.setItem('bookstore_cart', JSON.stringify(cartItems));
  }, [cartItems]);
  
  const addToCart = (book: Book, quantity = 1) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.bookId === book.id);
      
      if (existingItem) {
        // If item already exists in cart, update quantity
        return prevItems.map(item => 
          item.bookId === book.id 
            ? { ...item, quantity: item.quantity + quantity } 
            : item
        );
      } else {
        // If item doesn't exist in cart, add it
        return [...prevItems, { bookId: book.id, quantity, book }];
      }
    });
  };
  
  const removeFromCart = (bookId: string) => {
    setCartItems(prevItems => prevItems.filter(item => item.bookId !== bookId));
  };
  
  const updateQuantity = (bookId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(bookId);
      return;
    }
    
    setCartItems(prevItems => 
      prevItems.map(item => 
        item.bookId === bookId ? { ...item, quantity } : item
      )
    );
  };
  
  const clearCart = () => {
    setCartItems([]);
  };
  
  const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);
  
  const totalPrice = cartItems.reduce(
    (total, item) => total + item.quantity * item.book.price, 
    0
  );
  
  return (
    <CartContext.Provider value={{
      cartItems,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      totalItems,
      totalPrice
    }}>
      {children}
    </CartContext.Provider>
  );
};