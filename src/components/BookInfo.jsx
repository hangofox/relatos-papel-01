/**
 * Creado por: Gabby Zapata
 * Modificado por: Hernan Nuñez
 * Fecha: 2025-12-27
 * Descripción: Componente que contiene la información del libro recibido como parámetro
 * Contiene varios divs estructurados con breakpoints, márgenes y paddings de Bootstrap
 * @returns componente BookInfo
 */

import { useNavigate } from 'react-router-dom';
import { BookForm } from "./Components";

export const BookInfo = ({ book }) => {
  
  //Se coloca el navigate para ir hacia atrás
  const navigate = useNavigate();

  return (
    <div className="row justify-content-center">
      <div className="col-auto p-lg-4 rounded-border back-gray">
        <img src={book.nombreArchivoImagenLibro} height="250" alt="" />
      </div>
      <div className='d-none d-sm-block col-lg-auto'></div>
      <div className="col-6 p-4 rounded-border back-gray text-dark">
        <div className='mb-4'>
          <a href="#" onClick={() => navigate(-1)}>
            <i className="bi bi-skip-backward-fill"></i>
            &nbsp;&nbsp;Regresar
          </a>
        </div>
        <h3 id='title'>{book.tituloLibro}</h3><br />
        <span className='small'>
          <b>Autor:</b> {book.autor} |
          <b>Categoría:</b> {book.categorias} |
          <b>Fecha publicación:</b> {book.fechaPublicacionLibro}
        </span><br />
        <p className='mt-2'>
          {book.sinopsisLibro}
        </p>
        {/* Campos para la compra */}
        <BookForm
          book={book}
        />
      </div>
    </div>
  );
}