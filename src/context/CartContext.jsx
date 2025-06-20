import React, { createContext, useState, useEffect, useContext } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  // Məhsulu səbətə əlavə et
  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingProduct = prevCart.find((item) => item.id === product.id);
      if (existingProduct) {
        // Əgər məhsul varsa, miqdarı artır
        return prevCart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      // Əks halda, yeni məhsul əlavə et
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  // Məhsulu səbətdən sil
  const removeFromCart = (productId) => {
    setCart((prevCart) => prevCart.filter(item => item.id !== productId));
  };

  const increaseQuantity = (Id) => {
    setCart((prevItems) =>
      prevItems.map((item) =>
        item.id ===  Id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  }

  const decreaseQuantity = (Id) => {
    setCart((prevItems) =>
      prevItems.map((item) =>
        item.id ===  Id ? { ...item, quantity: item.quantity - 1 } : item
      )
      .filter(item => item.quantity > 0) // Miqdarı 0-dan az olan məhsulları sil
    );
  }

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, increaseQuantity, decreaseQuantity }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
