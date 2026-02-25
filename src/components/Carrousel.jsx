/**
 * Creado por: Gabby Zapata
 * Fecha: 2025-12-24
 * Descripción: Componente que contiene el carrusel de libros, desarrollado con Swiper, que es una librería que se instala en React y ayuda a crear este tipo de objetos, 
 * sin necesidad de generar mucha programación, ni mucho CSS
 * Despliega el carrusel del Home
 * @returns componente Carrousel
 */

import { useState, useEffect } from 'react';
import { Categorias } from '../services/CategoriasService';
import { CategoryCarousel } from './CategoryCarousel';

export const Carrousel = ({ categories }) => {

  const [loading, setLoading] = useState(true);
  const [categoriasFiltradas, setCategoriasFiltradas] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await Categorias();
        const catf = data.filter(cat =>
          categories.includes(Number(cat.idCategoria))
        );
        setCategoriasFiltradas(catf);
      } catch (error) {
        console.error(error);
        setCategoriasFiltradas([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, [categories]);

  return (
    <div className="container-fluid text-dark py-5">
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
          categoriasFiltradas.map((cat) => (
            <CategoryCarousel
              key={cat.idCategoria}
              category={cat}
            />
          ))
        )
      }
    </div>
  );
};