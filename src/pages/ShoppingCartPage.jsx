/**
 * Creado por: Hernan Nuñez
 * Fecha: 2025-12-27
 * Descripción: Página del carrito de compras que muestra los items agregados
 * @returns componente ShoppingCartPage
*/

import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { CartItem } from '../components/Components';
import 'bootstrap-icons/font/bootstrap-icons.css';

export const ShoppingCartPage = () => {
  const navigate = useNavigate();
  const { cartItems, getSubtotal, getTotalItems } = useCart();
  
  const subtotal = getSubtotal();
  const envio = subtotal > 0 ? (subtotal >= 50 ? 0 : 5) : 0; // Envío gratis si el subtotal es mayor o igual a $50
  const total = subtotal + envio;
  
  if (cartItems.length === 0) {
    return (
      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-lg-6 text-center">
            <div className="back-gray rounded-border p-5 text-black">
              <i className="bi bi-cart-x empty-cart-icon"></i>
              <h3 className="mt-4">Tu carrito está vacío</h3>
              <p className="text-muted">¡Explora nuestro catálogo y encuentra tu próxima lectura!</p>
              <button className="button-blue mt-3" onClick={() => navigate('/')}>
                <i className="bi bi-book-fill"></i> Explorar libros
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="container py-4 text-black">
      <div className="row">
        <div className="col-12">
          <h2 className="mb-4">
            <i className="bi bi-cart-fill"></i>Carrito de compras
          </h2>
        </div>
      </div>
      
      <div className="row">
        <div className="col-lg-8">
          <div className="back-gray rounded-border p-4">
            {/* Encabezados de la tabla */}
            <div className="row fw-bold pb-4 border-bottom d-none d-lg-flex">
              <div className="col-lg-2">Imagen</div>
              <div className="col-lg-3">Producto</div>
              <div className="col-lg-2 text-center">Precio</div>
              <div className="col-lg-3 text-center">Cantidad</div>
              <div className="col-lg-1 text-center">Subtotal</div>
              <div className="col-lg-1 text-center"></div>
            </div>
            
            {/* Items del carrito */}
            {cartItems.map((item, index) => (
              <CartItem key={`${item.id_book}-${item.modalidad}-${index}`} item={item} />
            ))}
          </div>
          
          <div className="mt-3">
            <button
              className="btn btn-outline-secondary"
              onClick={() => navigate('/')}
            >
              <i className="bi bi-arrow-left"></i> Continuar comprando
            </button>
          </div>
        </div>
        
        {/* Resumen del pedido */}
        <div className="col-lg-4">
          <div className="back-gray rounded-border p-4">
            <h4 className="mb-4">Resumen del pedido</h4>
            
            <div className="d-flex justify-content-between mb-2">
              <span>Productos ({getTotalItems()}):</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            
            <div className="d-flex justify-content-between mb-2">
              <span>Envío:</span>
              <span>{envio === 0 ? 'GRATIS' : `$${envio.toFixed(2)}`}</span>
            </div>
            
            {subtotal < 50 && subtotal > 0 && (
              <div className="alert alert-info small mt-2 mb-2">
                <i className="bi bi-info-circle"></i> Agrega ${(50 - subtotal).toFixed(2)} más para envío gratis
              </div>
            )}
            
            <hr />
            
            <div className="d-flex justify-content-between mb-4">
              <strong>Total:</strong>
              <strong className="cart-total-price">${total.toFixed(2)}</strong>
            </div>
            
            <button className="button-blue w-100" onClick={() => navigate('/payment-method')}>
              Proceder al pago <i className="bi bi-arrow-right"></i>
            </button>
            
            <div className="text-center mt-3">
              <small className="text-muted">
                <i className="bi bi-shield-check"></i> Compra segura
              </small>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}