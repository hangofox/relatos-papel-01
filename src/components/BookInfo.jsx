/**
 * Creado por: Gabby Zapata
 * Fecha: 2025-12-26
 * Descripción: Componente que contiene la información del libro recibido como parámetro
 * Contiene varios divs estructurados con breakpoints, márgenes y paddings de Bootstrap
 * @returns componente BookInfo
 */

import { useState } from 'react';

export const BookInfo = ({book}) => {

  const [modalidad, setModalidad] = useState("");

  return (
    <div className="row justify-content-center">
      <div className="col-auto p-lg-4 rounded-border back-gray">
        <img src={book.img_url} height="250" alt="" />
      </div>
      <div className='d-none d-sm-block col-lg-auto'></div>
      <div className="col-6 p-4 rounded-border back-gray text-dark">
        <h3>{book.title}</h3><br />
        <span className='small'>
          <b>Autor:</b> {book.author} |
          <b>Categoría:</b> {book.id_category} |
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