/**
 * Creado por: Gabby Zapata
 * Fecha: 2025-12-24
 * Descripción: Componente que contiene el carrusel de libros, desarrollado con Swiper, que es una librería que se instala en React y ayuda a crear este tipo de objetos, 
 * sin necesidad de generar mucha programación, ni mucho CSS
 * Despliega el carrusel del Home
 * @returns componente Carrousel
 */

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import { BookCard } from './BookCard';
//Mis datos
import { Books, Categories, BooksPerCategory } from '../data/Data';

// Importar estilos de Swiper
import 'swiper/css';
import 'swiper/css/navigation';

export const Carrousel = ({ categories }) => {

  const [clickedBook, setClickedBook] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (clickedBook !== null) {
      navigate(`/book/${clickedBook}`);
    }
  }, [clickedBook, navigate]);

  const categoriesFiltered = Categories.filter(cat => categories.includes(cat.id_category));

  return (
    <div className="container-fluid text-dark py-5 min-vh-100">
      {categoriesFiltered.map((cat) => {

        // --- LÓGICA DE FILTRADO PARA ESTA CATEGORÍA ESPECÍFICA ---
        // 2. Buscamos en la tabla intermedia los libros de ESTA categoría (cat.id_category)
        const thisCategory = BooksPerCategory
                            .filter(item => item.id_category === cat.id_category)
                            .map(item => item.id_book);

        // 3. Filtramos el array principal de libros usando esos IDs
        const booksToShow = Books.filter(book => thisCategory.includes(book.id_book));
        // -------------------------------------------------------

        return (
          <div key={cat.id_category} className="mb-5">
            <h4 className="mb-4 fw-bold">{cat.name_category}</h4>

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
                  onClick={() => setClickedBook(book.id_book)}
                  key={book.id_book} // Mejor usar el id del libro que el index
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