/**
 * Creado por: Gabby Zapata
 * Fecha: 2025-12-24
 * Descripción: Componente que contiene el carrusel de libros, desarrollado con Swiper, que es una librería que se instala en React y ayuda a crear este tipo de objetos, 
 * sin necesidad de generar mucha programación, ni mucho CSS
 * Despliega el carrusel del Home
 * @returns componente Carrousel
 */


import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import { BookCard } from './BookCard';
//Mis datos
import { Books, Categories, BooksPerCategory } from '../data/Data';

// Importar estilos de Swiper
import 'swiper/css';
import 'swiper/css/navigation';

export const Carrousel = ({ categories }) => {
  const categoriesFiltered = Categories.filter(cat => categories.includes(cat.id_category));

  return (
    <div className="container-fluid text-dark py-5">
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
          <div key={cat.id_category} className="mb-2">
            <h5 className="mb-2 fw-bold">{cat.name_category}</h5>

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
                  key={book.id_book} // Usamos el id del libro que el index
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