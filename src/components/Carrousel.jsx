/**
 * Creado por: Gabby Zapata
 * Fecha: 2025-12-24
 * Descripción: Componente que contiene el carrusel de libros, desarrollado con Swiper, que es una librería que se instala en React y ayuda a crear este tipo de objetos, 
 * sin necesidad de generar mucha programación, ni mucho CSS
 * Despliega el carrusel del Home
 * @returns componente Carrousel
 */

import { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import { BookCard } from './BookCard';
import { Libros } from '../services/LibrosService';
//Mis datos
import { BooksPerCategory } from '../data/Data';
import { Categorias } from '../services/CategoriasService';

// Importar estilos de Swiper
import 'swiper/css';
import 'swiper/css/navigation';

export const Carrousel = ({ categories }) => {

  const [books, setBooks] = useState([]);
  const [categoriasFiltradas, setCategoriasFiltradas] = useState([]);


  useEffect(() => {
    const fetchBooks = async () => {
      const data = await Libros();
      setBooks(data);
    };

    fetchBooks();
  }, []);

  useEffect(() => {
      const fetchCategories = async () => {
        const data = await Categorias();
        const catf = data.filter(cat => categories.includes(cat.idCategoria));
        setCategoriasFiltradas(catf);
      };
      fetchCategories();
    }, categories);

  return (
    <div className="container-fluid text-dark py-5">
      {categoriasFiltradas.map((cat) => {

        // --- LÓGICA DE FILTRADO PARA ESTA CATEGORÍA ESPECÍFICA ---
        // 2. Buscamos en la tabla intermedia los libros de ESTA categoría (cat.id_category)
        const thisCategory = BooksPerCategory
                            .filter(item => item.idCategoria === cat.idCategoria)
                            .map(item => item.idLibro);

        // 3. Filtramos el array principal de libros usando esos IDs
        const booksToShow = books.filter(book => thisCategory.includes(book.idLibro));
        // -------------------------------------------------------

        return (
          <div key={cat.idCategoria} className="mb-2">
            <h5 className="mb-2 fw-bold">{cat.nombreCategoria}</h5>

            <Swiper
              modules={[Navigation]}
              navigation={true}
              spaceBetween={10}
              slidesPerView={3}
              breakpoints={{
                640: { slidesPerView: 6 },
                1024: { slidesPerView: 10 },
                1440: { slidesPerView: 12 },
              }}
              className="mySwiper px-4 py-3 rounded-border back-gray"
            >
              {booksToShow.map((book) => (
                <SwiperSlide
                  key={book.idLibro} // Usamos el id del libro que el index
                >
                  <BookCard book={book} />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        );
      })}
    </div>
  );
}