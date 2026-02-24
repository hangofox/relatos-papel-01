import { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import { BookCard } from './BookCard';
import { LibrosPorCategoria } from '../services/LibrosService';

// Importar estilos de Swiper
import 'swiper/css';
import 'swiper/css/navigation';

export const CategoryCarousel = ({ category }) => {

  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        setLoading(true);
        const data = await LibrosPorCategoria(category.idCategoria);
        setBooks(data || []);
      } catch (error) {
        console.error(error);
        setBooks([]);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, [category.idCategoria]);

  return (
    <div key={category.idCategoria} className="mb-2">
      <h5 className="mb-2 fw-bold">{category.nombreCategoria}</h5>

      {
        loading ? (
          <div
            className="d-flex justify-content-center align-items-center"
            style={{ height: "250px" }}
          >
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Cargando...</span>
            </div>
          </div>
        ) : (
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
            {books
              .filter(book => book && book.idLibro)
              .map((book) => (
                <SwiperSlide key={book.idLibro}>
                  <BookCard book={book} />
                </SwiperSlide>
              ))}
          </Swiper>
        )}

    </div>
  );
};