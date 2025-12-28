/**
 * Creado por: Hernan Nuñez
 * Fecha: 2025-12-27
 * Descripción: Context API para la gestión del carrito de compras
 * @returns CartContext y CartProvider
 */

import { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    // Cargar carrito desde localStorage al iniciar
    const savedCart = localStorage.getItem('relatosPapelCart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  // Guardar carrito en localStorage cada vez que cambie
  useEffect(() => {
    localStorage.setItem('relatosPapelCart', JSON.stringify(cartItems));
  }, [cartItems]);

  // Agregar item al carrito
  const addToCart = (book, modalidad, cantidad) => {
    setCartItems(prevItems => {
      // Verificar si el libro ya existe en el carrito con la misma modalidad
      const existingItemIndex = prevItems.findIndex(
        item => item.id_book === book.id_book && item.modalidad === modalidad
      );

      if (existingItemIndex > -1) {
        // Si existe, incrementar la cantidad
        const updatedItems = [...prevItems];
        updatedItems[existingItemIndex].cantidad += cantidad;
        return updatedItems;
      } else {
        // Si no existe, agregar nuevo item
        return [...prevItems, { ...book, modalidad, cantidad }];
      }
    });
  };

  // Eliminar item del carrito
  const removeFromCart = (id_book, modalidad) => {
    setCartItems(prevItems =>
      prevItems.filter(item => !(item.id_book === id_book && item.modalidad === modalidad))
    );
  };

  // Actualizar cantidad de un item
  const updateQuantity = (id_book, modalidad, cantidad) => {
    if (cantidad <= 0) {
      removeFromCart(id_book, modalidad);
      return;
    }

    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id_book === id_book && item.modalidad === modalidad
          ? { ...item, cantidad }
          : item
      )
    );
  };

  // Vaciar carrito
  const clearCart = () => {
    setCartItems([]);
  };

  // Obtener total de items en el carrito
  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.cantidad, 0);
  };

  // Obtener subtotal del carrito
  const getSubtotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.cantidad), 0);
  };

  const value = {
    cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getTotalItems,
    getSubtotal
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
