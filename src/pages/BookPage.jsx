/**
 * Creado por: Gabby Zapata
 * Fecha: 2025-12-25
 * Descripción: Componente que contiene la página donde se ve toda la información del libro
 * Contiene el objeto BookInfo
 * @returns componente BookPage
 */
import { useParams } from 'react-router-dom';
import { Books } from '../data/Data';
import { BookInfo } from '../components/Components';
import 'bootstrap-icons/font/bootstrap-icons.css';

export const BookPage = () => {
  const { id } = useParams();
  const book = Books.find((item) => item.id_book === Number(id));

  return (
    <div className="mt-3 mt-lg-5">
      <BookInfo 
        book={book}
      />      
    </div>
  );
}