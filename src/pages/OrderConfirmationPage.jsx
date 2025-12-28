/**
 * Creado por: Hernan Nuñez
 * Fecha: 2025-12-27
 * Descripción: Página de confirmación de pedido exitoso
 * @returns componente OrderConfirmationPage
*/

import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import 'bootstrap-icons/font/bootstrap-icons.css';

export const OrderConfirmationPage = () => {
  const navigate = useNavigate();
  const { cartItems, getSubtotal, clearCart } = useCart();
  const [orderNumber, setOrderNumber] = useState('');
  const [orderData, setOrderData] = useState(null);
  
  useEffect(() => {
    //Si hay items en el carrito, guardar los datos del pedido.
    if (cartItems.length > 0) {
      const subtotal = getSubtotal();
      const envio = subtotal >= 50 ? 0 : 5;
      const total = subtotal + envio;
      
      //Generar número de orden.
      const orderNum = 'RP-' + Date.now() + '-' + Math.floor(Math.random() * 1000);
      setOrderNumber(orderNum);
      
      //Guardar datos del pedido.
      setOrderData({
        items: [...cartItems],
        subtotal,
        envio,
        total,
        fecha: new Date().toLocaleDateString('es-ES', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        })
      });
      
      //Limpiar el carrito.
      clearCart();
    } else if (!orderData) {
      //Si no hay items y tampoco hay datos guardados, redirigir al inicio.
      navigate('/');
    }
  }, []);
  
  if (!orderData) {
     return null;
  }
  
  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <div className="back-gray rounded-border p-4 text-center text-black">
            {/* Icono de éxito */}
            <div className="mb-4">
              <i
                className="bi bi-check-circle-fill"
                style={{ fontSize: '5rem', color: '#28a745' }}
              ></i>
            </div>
            
            {/*Mensaje de confirmación.*/}
            <h2 className="mb-3">¡Pedido realizado con éxito!</h2>
            <p className="text-muted mb-4">
              Gracias por tu compra. Hemos recibido tu pedido y lo estamos procesando.
            </p>
            
            {/*Número de orden.*/}
            <div className="bg-white rounded p-3 mb-4">
              <h5 className="mb-2">Número de orden</h5>
              <h3 style={{ color: '#80B6D8' }}>{orderNumber}</h3>
              <small className="text-muted">Guarda este número para seguimiento</small>
            </div>
            
            {/*Fecha del pedido.*/}
            <div className="mb-4">
              <small className="text-muted">
                <i className="bi bi-calendar-fill"></i> Fecha del pedido: {orderData.fecha}
              </small>
            </div>
            
            <hr />
            
            {/*Resumen del pedido.*/}
            <div className="text-start mt-4">
              <h5 className="mb-3">
                <i className="bi bi-bag-check-fill"></i> Resumen del pedido
              </h5>
              
              {/*Lista de productos.*/}
              <div className="mb-3">
                {orderData.items.map((item, index) => (
                  <div key={index} className="d-flex justify-content-between align-items-center mb-2 pb-2 border-bottom">
                    <div className="d-flex align-items-center">
                      <img
                        src={item.img_url}
                        alt={item.title}
                        style={{ width: '50px', height: '70px', objectFit: 'cover' }}
                        className="me-3 rounded"
                      />
                      <div>
                        <div className="fw-bold">{item.title}</div>
                        <small className="text-muted">
                          {item.modalidad === 'F' ? 'Físico' : 'Digital'} - Cantidad: {item.cantidad}
                        </small>
                      </div>
                    </div>
                    <div className="text-end">
                      <strong>${(item.price * item.cantidad).toFixed(2)}</strong>
                    </div>
                  </div>
                ))}
              </div>
              
              {/*Totales.*/}
              <div className="bg-white rounded p-3">
                <div className="d-flex justify-content-between mb-2">
                  <span>Subtotal:</span>
                  <span>${orderData.subtotal.toFixed(2)}</span>
                </div>
                <div className="d-flex justify-content-between mb-2">
                  <span>Envío:</span>
                  <span>{orderData.envio === 0 ? 'GRATIS' : `$${orderData.envio.toFixed(2)}`}</span>
                </div>
                <hr />
                <div className="d-flex justify-content-between">
                  <strong>Total pagado:</strong>
                  <strong style={{ fontSize: '1.3rem', color: '#80B6D8' }}>
                    ${orderData.total.toFixed(2)}
                  </strong>
                </div>
              </div>
            </div>
            
            <hr />
            
            {/*Información adicional.*/}
            <div className="alert alert-info mt-4">
              <i className="bi bi-info-circle-fill"></i> Te hemos enviado un correo de confirmación con los detalles de tu pedido.
            </div>
            
            {/*Botones de acción.*/}
            <div className="mt-4">
              <button className="button-blue me-2" onClick={() => navigate('/')}>
                <i className="bi bi-house-fill"></i> Volver al inicio
              </button>
              <button className="btn btn-outline-secondary" onClick={() => window.print()}>
                <i className="bi bi-printer-fill"></i> Imprimir comprobante
              </button>
            </div>
            
            {/*Mensaje de seguimiento.*/}
            <div className="mt-4 text-center">
              <small className="text-muted">
                <i className="bi bi-truck"></i> Recibirás tu pedido en 3-5 días hábiles
              </small>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
