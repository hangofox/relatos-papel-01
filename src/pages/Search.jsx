/**
 * Creado por: Gabby Zapata
 * Modificado por: Maria Parraga, David Paez
 * Fecha: 2025-12-29
 * Descripción: Componente que contiene la página de búsqueda funcional
 * Contiene filtros por título, autor y categoría con resultados en tiempo real
 * @returns componente Search
 */

import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Books} from '../data/Data';
import 'bootstrap-icons/font/bootstrap-icons.css';

export const Search = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  
  // Estados para los filtros
  const [searchText, setSearchText] = useState(searchParams.get('q') || '');
  const [filteredBooks, setFilteredBooks] = useState(Books);

  // Actualiza searchText cuando cambia la URL
  useEffect(() => {
    setSearchText(searchParams.get('q') || '');
  }, [searchParams]);


  // Aplicar filtros
  useEffect(() => {
    let result = Books;

  
  //  Filtrar por título con búsqueda acumulativa por palabras (AND)
    if (searchText.trim()) {
      const tokens = searchText
        .toLowerCase()
        .split(/\s+/)
        .filter(Boolean);

      result = result.filter(book => {
        const title = (book.title || '').toLowerCase();
        return tokens.every(tok => title.includes(tok)); // AND
        // Si prefieres OR: return tokens.some(tok => title.includes(tok));
      });
    }

    setFilteredBooks(result);
  }, [searchText]);

  return (
    <div className="text-black">
      {/* Resultados */}
      <div className="container py-4">
        {/* Header de resultados + botón */}
        <div className="row mb-3">
          <div className="col-12">
            <div className="bg-white border rounded-3 shadow-sm p-3 d-flex justify-content-between align-items-center">
              {/* Conteo de resultados */}
              <h5 className="mb-0 fw-semibold">
                {filteredBooks.length}{' '}
                <span className="text-muted">
                  {filteredBooks.length === 1
                    ? 'resultado encontrado'
                    : 'resultados encontrados'}
                </span>
              </h5>                  
              {/* Botón limpiar */}
              {searchText && (
                <button
                  className="btn btn-sm btn-outline-danger d-flex align-items-center gap-2 px-3"
                  onClick={() => setSearchText('')}
                >
                  <i className="bi bi-x-circle"></i>
                  Limpiar filtros
                </button>
              )}
            </div>
          </div>
        </div>
        {/* Lista de libros */}
        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-5 gx-3 gy-4">
          {filteredBooks.length === 0 ? (
            <div className="col-12 text-center py-5 no-found-search">
              <i className="bi bi-search icon-search"></i>
              <h4 className="mt-3">No se encontraron resultados</h4>
              <p className="text-muted">Intenta con otros filtros de búsqueda</p>
            </div>
          ) : (
            filteredBooks.map((book) => (
              <div key={book.id_book} className="col">
                    <div className="card  book-card h-100" >
                   <div className="image-box">
                    <img  className="card-img-top rounded shadow-sm" src={book.img_url} alt={book.title} loading="lazy" />
                  </div>
                  <div className="card-body d-flex flex-column">
                    <h6 className="card-title text-truncate" title={book.title}>
                      {book.title}
                    </h6>
                    <p className="card-text small text-muted mb-2">{book.author}</p>
                    <div className="mt-auto">
                      <p className="card-text fw-bold mb-2">${book.price}</p>
                      <button className="button-details w-100"
                      onKeyDown={(e) => { if (e.key === 'Enter') navigate(`/book/${book.id_book}`); }}
                      onClick={() => navigate(`/book/${book.id_book}`)}
                      >
                        Ver detalles
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}