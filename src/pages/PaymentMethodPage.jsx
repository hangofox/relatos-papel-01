/**
 * Creado por: Hernan Nuñez
 * Fecha: 2025-12-27
 * Descripción: Página de selección de método de pago (PayPal o Tarjeta de Crédito)
 * @returns componente PaymentMethodPage
*/

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import 'bootstrap-icons/font/bootstrap-icons.css';

export const PaymentMethodPage = () => {
  const navigate = useNavigate();
  const { cartItems, getSubtotal } = useCart();
  const [selectedMethod, setSelectedMethod] = useState('');
  const [showPayPalSimulation, setShowPayPalSimulation] = useState(false);
  const [paypalStep, setPaypalStep] = useState(1); // 1: login, 2: confirmar, 3: procesando
  const [paypalEmail, setPaypalEmail] = useState(''); // Email o teléfono para PayPal

  //Si el carrito está vacío, redirigir al carrito.
  if (cartItems.length === 0) {
     navigate('/shopping');
     return null;
  }

  const subtotal = getSubtotal();
  const envio = subtotal >= 50 ? 0 : 5;
  const total = subtotal + envio;

  const handleContinue = () => {
    if (!selectedMethod) {
       alert('Por favor seleccione un método de pago');
       return;
    }

    if (selectedMethod === 'paypal') {
       //Mostrar simulación de PayPal
       setShowPayPalSimulation(true);
       setPaypalStep(1);
    }
    else if (selectedMethod === 'credit-card') {
         //Navegar a la página de tarjeta de crédito.
         navigate('/credit-card-payment');
    }
  };

  const handlePayPalLogin = () => {
    // Validar que se haya ingresado un email o teléfono
    if (!paypalEmail.trim()) {
      alert('Por favor ingresa tu correo electrónico o teléfono móvil');
      return;
    }
    // Simular paso de login
    setPaypalStep(2);
  };

  const handlePayPalConfirm = () => {
    // Simular procesamiento
    setPaypalStep(3);

    // Después de 2 segundos, ir a confirmación
    setTimeout(() => {
      navigate('/order-confirmation');
    }, 2000);
  };

  const handleCancelPayPal = () => {
    setShowPayPalSimulation(false);
    setPaypalStep(1);
    setPaypalEmail(''); // Limpiar el email al cancelar
  };
  
  // Si está mostrando la simulación de PayPal
  if (showPayPalSimulation) {
    return (
      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-lg-6">
            <div className="bg-white rounded-border p-4 text-black paypal-border">
              {/* Header de PayPal */}
              <div className="text-center mb-4 pb-3 border-bottom">
                <i className="bi bi-paypal paypal-icon-large"></i>
                <h3 className="paypal-title">PayPal</h3>
              </div>

              {/* Paso 1: Login simulado */}
              {paypalStep === 1 && (
                <div>
                  <h5 className="mb-3">Inicia sesión en tu cuenta PayPal</h5>
                  <p className="text-muted small mb-3">
                    Ingresa tu correo electrónico o teléfono móvil
                  </p>

                  <div className="mb-3">
                    <label className="form-label">Correo electrónico o teléfono móvil</label>
                    <input
                      type="text"
                      className="form-control field"
                      placeholder="correo@ejemplo.com"
                      value={paypalEmail}
                      onChange={(e) => setPaypalEmail(e.target.value)}
                    />
                  </div>

                  <div className="d-grid gap-2">
                    <button
                      className="btn btn-primary paypal-btn-primary"
                      onClick={handlePayPalLogin}
                    >
                      Continuar
                    </button>
                    <button
                      className="btn btn-outline-secondary"
                      onClick={handleCancelPayPal}
                    >
                      Cancelar
                    </button>
                  </div>
                </div>
              )}

              {/* Paso 2: Confirmar pago */}
              {paypalStep === 2 && (
                <div>
                  <div className="alert alert-info mb-3">
                    <i className="bi bi-info-circle-fill"></i> Conectado como: {paypalEmail}
                  </div>

                  <h5 className="mb-3">Revisar tu compra</h5>

                  <div className="mb-3 p-3 bg-light rounded">
                    <div className="d-flex justify-content-between mb-2">
                      <span>Relatos de Papel</span>
                      <strong>${total.toFixed(2)} USD</strong>
                    </div>
                    <small className="text-muted">
                      Pedido con {cartItems.length} {cartItems.length === 1 ? 'libro' : 'libros'}
                    </small>
                  </div>

                  <div className="d-grid gap-2">
                    <button
                      className="btn btn-primary paypal-btn-pay"
                      onClick={handlePayPalConfirm}
                    >
                      <i className="bi bi-shield-check"></i> Pagar ahora
                    </button>
                    <button
                      className="btn btn-outline-secondary"
                      onClick={handleCancelPayPal}
                    >
                      Cancelar y volver
                    </button>
                  </div>
                </div>
              )}

              {/* Paso 3: Procesando */}
              {paypalStep === 3 && (
                <div className="text-center py-5">
                  <div className="spinner-border text-primary mb-3 spinner-large" role="status">
                    <span className="visually-hidden">Cargando...</span>
                  </div>
                  <h5>Procesando tu pago...</h5>
                  <p className="text-muted">Por favor espera un momento</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-5">
       <div className="row justify-content-center">
          <div className="col-lg-8">
             <div className="back-gray rounded-border p-4 text-dark">
                <h2 className="mb-4">
                  <i className="bi bi-credit-card-fill"></i> Método de pago
                </h2>
                <div className="mb-4">
                   <a href="#" onClick={(e) => {
                       e.preventDefault();
                       navigate('/shopping');
                    }}
                      className="text-decoration-none"
                   >
                     <i className="bi bi-arrow-left"></i> Volver al carrito
                   </a>
                </div>
                {/*Resumen del pedido.*/}
                <div className="mb-4 p-3 bg-white rounded">
                   <h5>Resumen del pedido</h5>
                   <div className="d-flex justify-content-between">
                      <span>Subtotal:</span>
                      <span>${subtotal.toFixed(2)}</span>
                   </div>
                   <div className="d-flex justify-content-between">
                      <span>Envío:</span>
                      <span>{envio === 0 ? 'GRATIS' : `$${envio.toFixed(2)}`}</span>
                   </div>
                   <hr />
                   <div className="d-flex justify-content-between">
                      <strong>Total:</strong>
                      <strong className="total-price-highlight">${total.toFixed(2)}</strong>
                   </div>
                </div>
                
                {/*Opciones de pago.*/}
                <h5 className="mb-3">Seleccione su método de pago:</h5>
                
                <div className="row g-3">
                   {/*Opción PayPal.*/}
                   <div className="col-md-6">
                      <div className={`p-4 border rounded payment-method-card ${ selectedMethod === 'paypal' ? 'border-primary bg-light' : ''}`} onClick={() => setSelectedMethod('paypal')}>
                         <div className="form-check">
                            <input className="form-check-input" type="radio" name="paymentMethod" id="paypal" value="paypal" checked={selectedMethod === 'paypal'} onChange={(e) => setSelectedMethod(e.target.value)} />
                            <label className="form-check-label w-100" htmlFor="paypal">
                              <div className="d-flex align-items-center justify-content-between">
                                 <div>
                                    <h5 className="mb-1">PayPal</h5>
                                    <small className="text-muted">
                                      Pago rápido y seguro con tu cuenta PayPal
                                    </small>
                                 </div>
                                 <i className="bi bi-paypal paypal-icon-medium"></i>
                              </div>
                            </label>
                         </div>
                      </div>
                   </div>
                   
                   {/*Opción Tarjeta de Crédito.*/}
                   <div className="col-md-6">
                      <div className={`p-4 border rounded payment-method-card ${ selectedMethod === 'credit-card' ? 'border-primary bg-light' : '' }`} onClick={() => setSelectedMethod('credit-card')}>
                         <div className="form-check">
                            <input className="form-check-input" type="radio" name="paymentMethod" id="credit-card" value="credit-card" checked={selectedMethod === 'credit-card'} onChange={(e) => setSelectedMethod(e.target.value)} />
                            <label className="form-check-label w-100" htmlFor="credit-card">
                              <div>
                                 <h5 className="mb-1">Tarjeta de Crédito/Débito</h5>
                                 <small className="text-muted">
                                   Visa, Mastercard, American Express, Discover, Diners Club
                                 </small>
                                 <div className="mt-2">
                                    <i className="bi bi-credit-card-fill me-2 card-icon-medium"></i>
                                    <i className="bi bi-credit-card-2-front-fill me-2 card-icon-medium"></i>
                                    <i className="bi bi-credit-card-2-back-fill card-icon-medium"></i>
                                 </div>
                              </div>
                            </label>
                         </div>
                      </div>
                   </div>
                </div>
                
                {/*Botón continuar.*/}
                <div className="mt-4">
                  <button className="button-blue w-100" onClick={handleContinue} disabled={!selectedMethod}>
                    Continuar con el pago <i className="bi bi-arrow-right"></i>
                  </button>
                </div>
                
                {/*Mensaje de seguridad.*/}
                <div className="text-center mt-3">
                   <small className="text-muted">
                    <i className="bi bi-shield-lock-fill"></i> Todas las transacciones son seguras y encriptadas
                   </small>
                </div>
             </div>
          </div>
       </div>
    </div>
  );
};
