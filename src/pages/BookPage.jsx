/**
 * Creado por: Gabby Zapata
 * Fecha: 2025-12-25
 * Descripción: Componente que contiene la página donde se ve toda la información del libro
 * Contiene el objeto BookInfo
 * @returns componente BookPage
 */
import { useParams } from 'react-router-dom';
import { BookInfo } from '../components/Components';
import { useEffect, useState } from 'react';
import { Libro } from '../services/LibrosService';

export const BookPage = () => {
  const { id } = useParams();
  const idLibro = Number(id);
  const [libro, setLibro] = useState(null);

  useEffect(() => {
    const fetchBook = async () => {
      const data = await Libro(idLibro);
      console.log(data.idLibro);
      setLibro(data);
    };

    fetchBook();
  }, []);

  return (
    <div className="mt-3 mt-lg-5">
       {libro && <BookInfo book={libro} />}
    </div>
  );
}