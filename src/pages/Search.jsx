/**
 * Creado por: Gabby Zapata
 * Modificado por: Hernan Nuñez
 * Fecha: 2025-12-27
 * Descripción: Componente que contiene la página de búsqueda funcional
 * Contiene filtros por título, autor y categoría con resultados en tiempo real
 * @returns componente Search
 */

import { useState, useEffect } from 'react';
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

  // Obtener lista única de autores
  const authors = [...new Set(Books.map(book => book.author))].sort();

  // Aplicar filtros
  useEffect(() => {
    let result = Books;

    // Filtrar por título
    if (searchText.trim()) {
      result = result.filter(book =>
        book.title.toLowerCase().includes(searchText.toLowerCase())
      );
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
      {/* Barra de búsqueda */}
      <div className="barra back-black">
        <div className="row p-5">
          <div className="col">
            <input
              type="text"
              className="field form-control"
              name="text_query"
              id="text_query"
              placeholder="Buscar por título"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
          </div>
          <div className="col">
            <select
              className="field form-select"
              name="id_autor"
              id="id_autor"
              value={selectedAuthor}
              onChange={(e) => setSelectedAuthor(e.target.value)}
            >
              <option value="">Todos los autores</option>
              {authors.map((author, index) => (
                <option key={index} value={author}>
                  {author}
                </option>
              ))}
            </select>
          </div>
          <div className="col">
            <select
              className="field form-select"
              name="id_categoria"
              id="id_categoria"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="">Todas las categorías</option>
              {Categories.map((category) => (
                <option key={category.id_category} value={category.id_category}>
                  {category.name_category}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

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
        <div className="row g-3">
          {filteredBooks.length === 0 ? (
            <div className="col-12 text-center py-5">
              <i className="bi bi-search" style={{ fontSize: '3rem', color: '#80B6D8' }}></i>
              <h4 className="mt-3">No se encontraron resultados</h4>
              <p className="text-muted">Intenta con otros filtros de búsqueda</p>
            </div>
          ) : (
            filteredBooks.map((book) => (
              <div key={book.id_book} className="col-lg-3 col-md-4 col-sm-6">
                <div
                  className="card h-100"
                  style={{ cursor: 'pointer' }}
                  onClick={() => navigate(`/book/${book.id_book}`)}
                >
                  <img
                    src={book.img_url}
                    className="card-img-top"
                    alt={book.title}
                    style={{ height: '250px', objectFit: 'cover' }}
                  />
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