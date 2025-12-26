/**
 * Creado por: Gabby Zapata
 * Fecha: 2025-12-26
 * Descripción: Componente que contiene la información del libro recibido como parámetro
 * Contiene varios divs estructurados con breakpoints, márgenes y paddings de Bootstrap
 * @returns componente BookInfo
 */

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Categories, BooksPerCategory } from "../data/Data";
import 'bootstrap-icons/font/bootstrap-icons.css';

export const BookInfo = ({ book }) => {
  const [modalidad, setModalidad] = useState("");
  //Se coloca el navigate para ir hacia atrás
  const navigate = useNavigate();
  //Estos filtros son para extraer todas las categorías a las que pertenece el libro para imprimirlas
  const categoriesOfThisBook = BooksPerCategory
    .filter(item => item.id_book === book.id_book)
    .map(item => item.id_category);
  const categories = Categories.filter(item => categoriesOfThisBook.includes(item.id_category))
  const listado = categories
    .map(cat => cat.name_category)
    .toString();

  return (
    <div className="row justify-content-center">
      <div className="col-auto p-lg-4 rounded-border back-gray">
        <img src={book.img_url} height="250" alt="" />
      </div>
      <div className='d-none d-sm-block col-lg-auto'></div>
      <div className="col-6 p-4 rounded-border back-gray text-dark">
        <div className='mb-4'>
          <a href="#" onClick={() => navigate(-1)}>
            <i class="bi bi-skip-backward-fill"></i>
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
              onChange={(e) => setModalidad(e.target.value)}
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
            <input type="number" className='field form-control text-end' name="cantidad" id="cantidad" />
          </div>
        </div>
        <div className='row container-fluid align-items-center mt-2'>
          <div className="col-lg-6 text-end fw-bold">
            <label>${book.price}</label>
          </div>
          <div className="col-lg-6">
            <button type="button" className='button-blue'>
              <i className="bi bi-cart-fill p-2"></i>
              Añadir al carrito
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}