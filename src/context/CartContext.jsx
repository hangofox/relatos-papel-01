import { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart debe ser usado dentro de un CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }) => {

  // 🔥 SOLO el contador persistido
  const [totalItems, setTotalItems] = useState(() => {
    const savedTotal = localStorage.getItem('relatosPapelCartCount');
    return savedTotal ? parseInt(savedTotal) : 0;
  });

  // Persistir contador
  useEffect(() => {
    localStorage.setItem('relatosPapelCartCount', totalItems);
  }, [totalItems]);

  useEffect(() => {
    const cargarTotalDesdeBD = async () => {
      try {
        const idUsuario = localStorage.getItem('idUsuarioConectado');

        if (!idUsuario) return;

        const total = await CuantosItems(idUsuario);

        if (total !== null) {
          setTotalItems(Number(total));
        }
      } catch (error) {
        console.error("Error cargando total del carrito:", error);
      }
    };

    cargarTotalDesdeBD();
  }, []);

  //Agregar item
  const addToCart = (cantidad) => {
    setTotalItems(prev => prev + cantidad);
  };

  // Obtener total de items en el carrito
  const getTotalItems = () => {
    return totalItems;
  };

  //Remover item completamente
  const removeFromCart = (cantidad) => {
    setTotalItems(prev => Math.max(prev - cantidad, 0));
  };

  //Cuando se cambia la cantidad manualmente
  const updateQuantity = (oldCantidad, newCantidad) => {
    const diferencia = newCantidad - oldCantidad;
    setTotalItems(prev => Math.max(prev + diferencia, 0));
  };

  //Vaciar carrito
  const clearCart = () => {
    setTotalItems(0);
  };

  const value = {
    totalItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    getTotalItems,
    clearCart
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};