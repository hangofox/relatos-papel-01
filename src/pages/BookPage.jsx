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
  const [libro, setLibro] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        setLoading(true);
        const data = await Libro(idLibro);
        setLibro(data || []);
      } catch (error) {
        console.log(error);
        setLibro([]);
      } finally {
        setLoading(false);
      }
    };

    fetchBook();
  }, []);

  return (
    <div className="mt-3 mt-lg-5">
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
          <BookInfo book={libro} />
        )
      }
    </div>
  );
}