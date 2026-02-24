/**
 * Creado por: Gabby Zapata
 * Fecha: 2025-12-29
 * Descripción: Se descompone esta parte del formulario del detalle del libro para dividir un poco la programación
 * Contiene: El formlario del detalle del libro para añadir al carrito de compras
 * @returns componente BookForm
 */

import { useState } from 'react';
import { useCart } from '../context/CartContext';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { IngresaLibroCarrito } from '../services/VentasService';

export const BookForm = ({ book }) => {
  //State para inicializar la modalidad
  const [modalidad, setModalidad] = useState("");
  //State para inicializar la cantidad
  const [cantidad, setCantidad] = useState(1);
  //State para mostrar error de modalidad
  const [error, setError] = useState("");
  //State para mostrar mensaje de éxito
  const [success, setSuccess] = useState(false);
  //Contexto del carrito
  const { addToCart } = useCart();

  // Función para manejar agregar al carrito
  const handleAddToCart = async () => {
    if (!modalidad) {
      setError("Error seleccione modalidad");
      setSuccess(false);
      return;
    }

    const cantidadNum = parseInt(cantidad);
    if (cantidadNum <= 0) {
      setError("Error coloque una cantidad mayor a cero");
      setSuccess(false);
      return;
    }

    const ventaSuccess = await IngresaLibroCarrito(book, 1, cantidad);

    if (ventaSuccess) {
      addToCart(book, modalidad, cantidadNum);
      setError("");
      setSuccess(true);
    } else {
      setError("Ha ocurrido un error");
      setSuccess(false);
    }

    // Limpiar mensaje de éxito después de 3 segundos
    setTimeout(() => {
      setSuccess(false);
    }, 3000);
  };

  return (
    <>
      <div className='row container-fluid'>
        <div className='col-lg-3 text-end'>
          <label htmlFor="id_modalidad">Modalidad:</label>
        </div>
        <div className="col-lg-3">
          <select
            className='field form-select'
            name="id_modalidad"
            id="id_modalidad"
            value={modalidad}
            onChange={(e) => {
              setModalidad(e.target.value);
              setError(false);
            }}
          >
            <option value="">Escoja</option>
            <option value="F">Físico</option>
            <option value="D">Digital</option>
          </select>
        </div>
        <div className="col-lg-3 text-end">
          <label htmlFor="cantidad">Cantidad:</label>
        </div>
        <div className="col-lg-3">
          <input
            type="number"
            className='field form-control text-end'
            name="cantidad"
            id="cantidad"
            min="1"
            value={cantidad}
            onChange={(e) => setCantidad(e.target.value)}
          />
        </div>
      </div>
      <div className="d-flex justify-content-center align-items-center">
        <span className='small text-danger' name="errorMessage">{error}</span>
      </div>
      <div className='row container-fluid align-items-center mt-2'>
        <div className="col-lg-6 text-end fw-bold">
          <label>${book.precioLibro}</label>
        </div>
        <div className="col-lg-6">
          <button type="button" name='btnAddCar' className='button-blue' onClick={handleAddToCart}>
            <i className="bi bi-cart-fill p-2"></i>
            Añadir al carrito
          </button>
        </div>
      </div>
      {success && (
        <div className='row container-fluid mt-2'>
          <div className="col-12 text-center">
            <span className='text-success fw-bold'>
              <i className="bi bi-check-circle-fill"></i> Producto añadido al carrito correctamente
            </span>
          </div>
        </div>
      )}
    </>
  );
}