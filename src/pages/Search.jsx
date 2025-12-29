/**
 * Creado por: Gabby Zapata
 * Modificado por: Maria Parraga, David Paez
 * Fecha: 2025-12-28
 * Descripción: Componente que contiene la página de búsqueda funcional
 * Contiene filtros por título, autor y categoría con resultados en tiempo real
 * @returns componente Search
 */

import { useState, useEffect, useEffectEvent } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Books, Categories, BooksPerCategory } from '../data/Data';
import 'bootstrap-icons/font/bootstrap-icons.css';

export const Search = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  
  // Estados para los filtros
  const [searchText, setSearchText] = useState(searchParams.get('q') || '');
  const [selectedAuthor, setSelectedAuthor] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [filteredBooks, setFilteredBooks] = useState(Books);

  // Actualiza searchText cuando cambia la URL
  useEffect(() => {
    setSearchText(searchParams.get('q') || '');
  }, [searchParams]);

  // Obtener lista única de autores
  const authors = [...new Set(Books.map(book => book.author))].sort();

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

    // Filtrar por autor
    if (selectedAuthor) {
      result = result.filter(book => book.author === selectedAuthor);
    }

    // Filtrar por categoría
    if (selectedCategory) {
      const booksInCategory = BooksPerCategory
        .filter(item => item.id_category === parseInt(selectedCategory))
        .map(item => item.id_book);
      result = result.filter(book => booksInCategory.includes(book.id_book));
    }

    setFilteredBooks(result);
  }, [searchText, selectedAuthor, selectedCategory]);

  return (
    <div className="text-black">
      {/* Resultados */}
      <div className="container py-4">
        <div className="row mb-3">
          <div className="col-12">
            <h4>
              {filteredBooks.length} {filteredBooks.length === 1 ? 'resultado encontrado' : 'resultados encontrados'}
            </h4>
            {(searchText || selectedAuthor || selectedCategory) && (
              <button
                className="btn btn-sm btn-outline-secondary mt-2"
                onClick={() => {
                  setSearchText('');
                  setSelectedAuthor('');
                  setSelectedCategory('');
                }}
              >
                <i className="bi bi-x-circle"></i> Limpiar filtros
              </button>
            )}
          </div>
        </div>

        {/* Lista de libros */}
        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-5 gx-3 gy-4">
          {filteredBooks.length === 0 ? (
            <div className="col-12 text-center py-5">
              <i className="bi bi-search" style={{ fontSize: '3rem', color: '#80B6D8' }}></i>
              <h4 className="mt-3">No se encontraron resultados</h4>
              <p className="text-muted">Intenta con otros filtros de búsqueda</p>
            </div>
          ) : (
            filteredBooks.map((book) => (
              <div key={book.id_book} className="col">

                    <div
                      className="card h-100"
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) => { if (e.key === 'Enter') navigate(`/book/${book.id_book}`); }}
                      onClick={() => navigate(`/book/${book.id_book}`)}
                    >
           
                   <div className="image-box">
                    <img src={book.img_url} alt={book.title} loading="lazy" />
                  </div>
                  <div className="card-body d-flex flex-column">
                    <h6 className="card-title text-truncate" title={book.title}>
                      {book.title}
                    </h6>
                    <p className="card-text small text-muted mb-2">{book.author}</p>
                    <div className="mt-auto">
                      <p className="card-text fw-bold mb-2">${book.price}</p>
                      <button className="button-blue w-100">
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