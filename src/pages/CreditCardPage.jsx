/**
 * Creado por: Hernan Nuñez
 * Fecha: 2025-12-27
 * Descripción: Página de pago con tarjeta de crédito con validación completa
 * @returns componente CreditCardPage
*/

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import 'bootstrap-icons/font/bootstrap-icons.css';

export const CreditCardPage = () => {
  const navigate = useNavigate();
  const { cartItems, getSubtotal } = useCart();

  // Estados del formulario
  const [cardNumber, setCardNumber] = useState('');
  const [cardName, setCardName] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');

  // Estados de validación
  const [errors, setErrors] = useState({});
  const [cardType, setCardType] = useState('');

  // Si el carrito está vacío, redirigir al carrito
  if (cartItems.length === 0) {
    navigate('/shopping');
    return null;
  }

  const subtotal = getSubtotal();
  const envio = subtotal >= 50 ? 0 : 5;
  const total = subtotal + envio;

  // Detectar tipo de tarjeta por los primeros dígitos
  const detectCardType = (number) => {
    const cleanNumber = number.replace(/\s/g, '');

    // Visa: comienza con 4
    if (/^4/.test(cleanNumber)) return 'visa';

    // Mastercard: comienza con 51-55 o 2221-2720
    if (/^5[1-5]/.test(cleanNumber) || /^2(22[1-9]|2[3-9][0-9]|[3-6][0-9]{2}|7[0-1][0-9]|720)/.test(cleanNumber)) {
      return 'mastercard';
    }

    // American Express: comienza con 34 o 37
    if (/^3[47]/.test(cleanNumber)) return 'amex';

    // Discover: comienza con 6011, 622126-622925, 644-649, o 65
    if (/^(6011|65|64[4-9]|622)/.test(cleanNumber)) return 'discover';

    // Diners Club: comienza con 36 o 38 o 300-305
    if (/^(36|38|30[0-5])/.test(cleanNumber)) return 'diners';

    return '';
  };

  // Formatear número de tarjeta
  const formatCardNumber = (value) => {
    const cleanValue = value.replace(/\s/g, '');
    const type = detectCardType(cleanValue);
    setCardType(type);

    let formatted = '';

    if (type === 'amex') {
      // American Express: 4-6-5
      formatted = cleanValue
        .replace(/\D/g, '')
        .slice(0, 15)
        .replace(/(\d{4})(\d{0,6})(\d{0,5})/, (match, p1, p2, p3) => {
          let result = p1;
          if (p2) result += ' ' + p2;
          if (p3) result += ' ' + p3;
          return result;
        });
    } else if (type === 'diners') {
      // Diners Club: 4-6-4
      formatted = cleanValue
        .replace(/\D/g, '')
        .slice(0, 14)
        .replace(/(\d{4})(\d{0,6})(\d{0,4})/, (match, p1, p2, p3) => {
          let result = p1;
          if (p2) result += ' ' + p2;
          if (p3) result += ' ' + p3;
          return result;
        });
    } else {
      // Visa, Mastercard, Discover: 4-4-4-4
      formatted = cleanValue
        .replace(/\D/g, '')
        .slice(0, 16)
        .replace(/(\d{4})(?=\d)/g, '$1 ');
    }

    return formatted.trim();
  };

  // Manejar cambio en número de tarjeta
  const handleCardNumberChange = (e) => {
    const formatted = formatCardNumber(e.target.value);
    setCardNumber(formatted);
    setErrors({ ...errors, cardNumber: '' });
  };

  // Formatear fecha de expiración
  const handleExpiryChange = (e) => {
    let value = e.target.value.replace(/\D/g, '');

    if (value.length >= 2) {
      value = value.slice(0, 2) + '/' + value.slice(2, 4);
    }

    setExpiryDate(value);
    setErrors({ ...errors, expiryDate: '' });
  };

  // Manejar CVV
  const handleCvvChange = (e) => {
    const maxLength = cardType === 'amex' ? 4 : 3;
    const value = e.target.value.replace(/\D/g, '').slice(0, maxLength);
    setCvv(value);
    setErrors({ ...errors, cvv: '' });
  };

  // Validar número de tarjeta
  const validateCardNumber = () => {
    const cleanNumber = cardNumber.replace(/\s/g, '');
    const type = cardType;

    if (!cleanNumber) {
      return 'El número de tarjeta es requerido';
    }

    // Validar longitud según tipo de tarjeta
    if (type === 'visa' || type === 'mastercard' || type === 'discover') {
      if (cleanNumber.length !== 16) {
        return `${type.charAt(0).toUpperCase() + type.slice(1)} requiere 16 dígitos`;
      }
    } else if (type === 'amex') {
      if (cleanNumber.length !== 15) {
        return 'American Express requiere 15 dígitos';
      }
    } else if (type === 'diners') {
      if (cleanNumber.length !== 14) {
        return 'Diners Club requiere 14 dígitos';
      }
    } else {
      return 'Tipo de tarjeta no reconocido';
    }

    return '';
  };

  // Validar fecha de expiración
  const validateExpiryDate = () => {
    if (!expiryDate) {
      return 'La fecha de expiración es requerida';
    }

    const [month, year] = expiryDate.split('/');

    if (!month || !year || month.length !== 2 || year.length !== 2) {
      return 'Formato inválido (MM/YY)';
    }

    const monthNum = parseInt(month);
    if (monthNum < 1 || monthNum > 12) {
      return 'Mes inválido';
    }

    const currentYear = new Date().getFullYear() % 100;
    const currentMonth = new Date().getMonth() + 1;
    const yearNum = parseInt(year);

    if (yearNum < currentYear || (yearNum === currentYear && monthNum < currentMonth)) {
      return 'Tarjeta expirada';
    }

    return '';
  };

  // Validar CVV
  const validateCvv = () => {
    if (!cvv) {
      return 'El CVV es requerido';
    }

    const expectedLength = cardType === 'amex' ? 4 : 3;
    if (cvv.length !== expectedLength) {
      return `El CVV debe tener ${expectedLength} dígitos`;
    }

    return '';
  };

  // Validar nombre
  const validateCardName = () => {
    if (!cardName.trim()) {
      return 'El nombre es requerido';
    }

    if (cardName.trim().length < 3) {
      return 'El nombre debe tener al menos 3 caracteres';
    }

    return '';
  };

  // Manejar envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault();

    // Validar todos los campos
    const newErrors = {
      cardNumber: validateCardNumber(),
      cardName: validateCardName(),
      expiryDate: validateExpiryDate(),
      cvv: validateCvv(),
    };

    setErrors(newErrors);

    // Si hay errores, no continuar
    if (Object.values(newErrors).some(error => error !== '')) {
      return;
    }

    // Si todo es válido, procesar el pago
    navigate('/order-confirmation');
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <div className="back-gray rounded-border p-4 text-black">
            <h2 className="mb-4">
              <i className="bi bi-credit-card-fill"></i> Pago con Tarjeta
            </h2>

            <div className="mb-4">
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  navigate('/payment-method');
                }}
                className="text-decoration-none"
              >
                <i className="bi bi-arrow-left"></i> Cambiar método de pago
              </a>
            </div>

            {/* Resumen del pedido */}
            <div className="mb-4 p-3 bg-white rounded">
              <h5>Total a pagar</h5>
              <div className="d-flex justify-content-between align-items-center">
                <span>Total:</span>
                <strong className="payment-total-price">${total.toFixed(2)}</strong>
              </div>
            </div>

            {/* Formulario de tarjeta */}
            <form onSubmit={handleSubmit}>
              {/* Número de tarjeta */}
              <div className="mb-3">
                <label htmlFor="cardNumber" className="form-label">
                  Número de tarjeta {cardType && <span className="badge bg-secondary">{cardType.toUpperCase()}</span>}
                </label>
                <input
                  type="text"
                  className={`form-control field ${errors.cardNumber ? 'is-invalid' : ''}`}
                  id="cardNumber"
                  placeholder="1234 5678 9012 3456"
                  value={cardNumber}
                  onChange={handleCardNumberChange}
                />
                {errors.cardNumber && <div className="invalid-feedback">{errors.cardNumber}</div>}
                <small className="text-muted">
                  Aceptamos: Visa, Mastercard, American Express, Discover, Diners Club
                </small>
              </div>

              {/* Nombre en la tarjeta */}
              <div className="mb-3">
                <label htmlFor="cardName" className="form-label">
                  Nombre en la tarjeta
                </label>
                <input
                  type="text"
                  className={`form-control field ${errors.cardName ? 'is-invalid' : ''}`}
                  id="cardName"
                  placeholder="JUAN PÉREZ"
                  value={cardName}
                  onChange={(e) => {
                    setCardName(e.target.value.toUpperCase());
                    setErrors({ ...errors, cardName: '' });
                  }}
                />
                {errors.cardName && <div className="invalid-feedback">{errors.cardName}</div>}
              </div>

              <div className="row">
                {/* Fecha de expiración */}
                <div className="col-md-6 mb-3">
                  <label htmlFor="expiryDate" className="form-label">
                    Fecha de expiración
                  </label>
                  <input
                    type="text"
                    className={`form-control field ${errors.expiryDate ? 'is-invalid' : ''}`}
                    id="expiryDate"
                    placeholder="MM/YY"
                    value={expiryDate}
                    onChange={handleExpiryChange}
                    maxLength="5"
                  />
                  {errors.expiryDate && <div className="invalid-feedback">{errors.expiryDate}</div>}
                </div>

                {/* CVV */}
                <div className="col-md-6 mb-3">
                  <label htmlFor="cvv" className="form-label">
                    CVV {cardType === 'amex' && '(4 dígitos)'}
                  </label>
                  <input
                    type="text"
                    className={`form-control field ${errors.cvv ? 'is-invalid' : ''}`}
                    id="cvv"
                    placeholder={cardType === 'amex' ? '1234' : '123'}
                    value={cvv}
                    onChange={handleCvvChange}
                  />
                  {errors.cvv && <div className="invalid-feedback">{errors.cvv}</div>}
                  <small className="text-muted">
                    Los 3 dígitos en el reverso de la tarjeta {cardType === 'amex' && '(4 para Amex)'}
                  </small>
                </div>
              </div>

              {/* Botón de pago */}
              <button type="submit" className="button-blue w-100 mt-3">
                <i className="bi bi-lock-fill"></i> Pagar ${total.toFixed(2)}
              </button>
            </form>

            {/* Mensaje de seguridad */}
            <div className="text-center mt-3">
              <small className="text-muted">
                <i className="bi bi-shield-lock-fill"></i> Tu información está protegida con encriptación SSL
              </small>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
