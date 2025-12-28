/**
 * Creado por: Gabby Zapata
 * Modificado por: Hernan Nuñez
 * Fecha: 2025-12-27
 * Descripción: Componente que contiene la información del libro recibido como parámetro
 * Contiene varios divs estructurados con breakpoints, márgenes y paddings de Bootstrap
 * @returns componente BookInfo
 */

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Categories, BooksPerCategory } from "../data/Data";
import { useCart } from '../context/CartContext';
import 'bootstrap-icons/font/bootstrap-icons.css';

export const BookInfo = ({ book }) => {
  //State para inicializar la modalidad
  const [modalidad, setModalidad] = useState("");
  //State para inicializar la cantidad
  const [cantidad, setCantidad] = useState(1);
  //State para mostrar error de modalidad
  const [error, setError] = useState(false);
  //State para mostrar mensaje de éxito
  const [success, setSuccess] = useState(false);
  //Se coloca el navigate para ir hacia atrás
  const navigate = useNavigate();
  //Contexto del carrito
  const { addToCart } = useCart();
  //Estos filtros son para extraer todas las categorías a las que pertenece el libro para imprimirlas
  const categoriesOfThisBook = BooksPerCategory
    .filter(item => item.id_book === book.id_book)
    .map(item => item.id_category);
  const categories = Categories.filter(item => categoriesOfThisBook.includes(item.id_category))
  const listado = categories
    .map(cat => cat.name_category)
    .toString();

  // Función para manejar agregar al carrito
  const handleAddToCart = () => {
    if (!modalidad) {
      setError(true);
      setSuccess(false);
      return;
    }

    const cantidadNum = parseInt(cantidad);
    if (cantidadNum <= 0) {
      setError(true);
      setSuccess(false);
      return;
    }

    addToCart(book, modalidad, cantidadNum);
    setError(false);
    setSuccess(true);

    // Limpiar mensaje de éxito después de 3 segundos
    setTimeout(() => {
      setSuccess(false);
    }, 3000);
  };

  return (
    <div className="row justify-content-center">
      <div className="col-auto p-lg-4 rounded-border back-gray">
        <img src={book.img_url} height="250" alt="" />
      </div>
      <div className='d-none d-sm-block col-lg-auto'></div>
      <div className="col-6 p-4 rounded-border back-gray text-dark">
        <div className='mb-4'>
          <a href="#" onClick={() => navigate(-1)}>
            <i className="bi bi-skip-backward-fill"></i>
            &nbsp;&nbsp;Regresar
          </a>
        </div>
        <h3>{book.title}</h3><br />
        <span className='small'>
          <b>Autor:</b> {book.author} |
          <b>Categoría:</b> {listado} |
          <b>Año publicación:</b> {book.publication_year}
        </span><br />
        <p className='mt-2'>
          {book.synopsis}
        </p>
        {/* Campos para la compra */}
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
            {error && <span className='small text-danger'>Por favor seleccione una modalidad</span>}
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
              onChange={(e)=>setCantidad(e.target.value)}
            />
          </div>
        </div>
        <div className='row container-fluid align-items-center mt-2'>
          <div className="col-lg-6 text-end fw-bold">
            <label>${book.price}</label>
          </div>
          <div className="col-lg-6">
            <button type="button" className='button-blue' onClick={handleAddToCart}>
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
      </div>
    </div>
  );
}