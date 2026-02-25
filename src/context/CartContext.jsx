/**
 * Creado por: Hernan Nuñez
 * Fecha: 2025-12-27
 * Descripción: Context API para la gestión del carrito de compras
 * @returns CartContext y CartProvider
 */

import { createContext, useContext, useState, useEffect } from 'react';
import { ActualizaCantidad, EliminaProducto, ListarItemsCarrito } from '../services/VentasService';

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart debe ser usado dentro de un CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }) => {

  const idUsuario = localStorage.getItem("idUsuarioConectado");
  const [cartItems, setCartItems] = useState([]);

  const refrescarCarrito = async () => {
    const data = await ListarItemsCarrito(idUsuario)
    setCartItems(data);
  };

  // Agregar item al carrito
  const addToCart = (cantidad) => {
    
  };

  // Eliminar item del carrito
  const removeFromCart = async (idProductoFacturado) => {
    await EliminaProducto(idProductoFacturado);
    await refrescarCarrito();
  };

  // Actualizar cantidad de un item
  const updateQuantity = async (idProductoFacturado, nuevaCantidad) => {
    await ActualizaCantidad(idProductoFacturado, nuevaCantidad);
    await refrescarCarrito();
  };

  // Vaciar carrito
  const clearCart = () => {
    setCartItems([]);
  };

  // Obtener total de items en el carrito
  const getTotalItems = () => {
    if(!cartItems) return 0;
    return cartItems.reduce((total, item) => total + item.cantidadItem, 0);
  };

  // Obtener subtotal del carrito
  const getSubtotal = () => {
    if(!cartItems) return 0;
    return cartItems.reduce((total, item) => total + (item.precioUnitarioLibro * item.cantidadItem), 0);
  };

  const value = {
    refrescarCarrito,
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
