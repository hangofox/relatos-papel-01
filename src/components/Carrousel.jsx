import React, { PureComponent } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import { BookCard } from './BookCard';
//Mis datos
import { Books, Categories } from '../data/Data';

// Importar estilos de Swiper
import 'swiper/css';
import 'swiper/css/navigation';

export const Carrousel = () => {
  return (
    <div className="container-fluid text-dark py-5 min-vh-100">
      {Categories.map((cat) => (
        <div key={cat.id_category} className="mb-5">
          <h3 className="ms-4 mb-4 fw-bold">{cat.name_category}</h3>
          
          <Swiper
            modules={[Navigation]}
            navigation
            spaceBetween={10}
            slidesPerView={3} // Móvil
            breakpoints={{
              640: { slidesPerView: 4 },
              1024: { slidesPerView: 8 },
              1440: { slidesPerView: 10 },
            }}
            className="px-4 py-3 carrousel"
          >
            {Books.filter(book => book.id_category === cat.id_category).map((book, index) => (
              <SwiperSlide key={index}>
                <BookCard book={book} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      ))}
    </div>
  );
}