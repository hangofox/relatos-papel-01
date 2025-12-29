/**
 * Creado por: Gabby Zapata
 * Fecha: 2025-12-24
 * Descripción: Componente que contiene la información de cada libro que se visualiza en el carrusel
 * Despliega
 * @returns componente BookCard
*/

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const BookCard = ({ book }) => {
  const navigate = useNavigate();
  const [clickedBook, setClickedBook] = useState(null);
    useEffect(() => {
      if (clickedBook !== null) {
        navigate(`/book/${clickedBook}`);
      }
    }, [clickedBook, navigate]);

  return (
    <div className="card h-100 border-0 bg-transparent text-light">
      <img
        src={book.img_url}
        className="card-img-top rounded shadow-sm"
        alt={book.title}
        style={{ aspectRatio: '2/3', objectFit: 'cover' }}
      />
      <div className="card-body px-0 py-2">
        <h6 className="card-title text-dark mb-0 small text-truncate" title={book.title}>{book.title}</h6>
        <p className="card-text small text-secondary text-truncate">{book.author}</p>
        <button 
          type="button"
          className='button-blue w-100'
          onClick={() => setClickedBook(book.id_book)}
        >
          Ver detalles
        </button>
      </div>
    </div>
  );
}