/**
 * Creado por: Hernan Nuñez.
 * Fecha: 2025-12-27.
 * Descripción: Componente que muestra un item del carrito de compras.
 * @returns componente CartItem
 */

import { useCart } from '../context/CartContext';
import 'bootstrap-icons/font/bootstrap-icons.css';

export const CartItem = ({ item }) => {
  const { updateQuantity, removeFromCart } = useCart();

  const handleIncrement = () => {
    updateQuantity(item.id_book, item.modalidad, item.cantidad + 1);
  };

  const handleDecrement = () => {
    if (item.cantidad > 1) {
      updateQuantity(item.id_book, item.modalidad, item.cantidad - 1);
    }
  };

  const handleRemove = () => {
    removeFromCart(item.id_book, item.modalidad);
  };

  const subtotal = item.price * item.cantidad;

  return (
    <div className="row align-items-center py-3 border-bottom text-black">
      <div className="col-lg-2 col-md-3 col-4">
        <img src={item.img_url} alt={item.title} className="img-fluid rounded-border" style={{ maxHeight: '120px' }} />
      </div>
      <div className="col-lg-3 col-md-4 col-8">
        <h6 className="mb-1">{item.title}</h6>
        <small className="text-muted">{item.author}</small>
        <div className="mt-1">
          <span className="badge bg-secondary">
            {item.modalidad === 'F' ? 'Físico' : 'Digital'}
          </span>
        </div>
      </div>
      <div className="col-lg-2 col-md-2 col-4 text-center">
        <strong>${item.price}</strong>
      </div>
      <div className="col-lg-3 col-md-2 col-4">
        <div className="d-flex align-items-center justify-content-center">
          <button
            className="btn btn-sm btn-outline-secondary"
            onClick={handleDecrement}
            disabled={item.cantidad <= 1}
          >
            <i className="bi bi-dash"></i>
          </button>
          <span className="mx-3 fw-bold">{item.cantidad}</span>
          <button
            className="btn btn-sm btn-outline-secondary"
            onClick={handleIncrement}
          >
            <i className="bi bi-plus"></i>
          </button>
        </div>
      </div>
      <div className="col-lg-1 col-md-1 col-3 text-center">
        <strong>${subtotal.toFixed(2)}</strong>
      </div>
      <div className="col-lg-1 col-md-12 col-1 text-center">
        <button
          className="btn btn-sm btn-danger"
          onClick={handleRemove}
          title="Eliminar del carrito"
        >
          <i className="bi bi-trash-fill"></i>
        </button>
      </div>
    </div>
  );
};
