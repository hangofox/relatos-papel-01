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

  const [categoriasFiltradas, setCategoriasFiltradas] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      const data = await Categorias();
      const catf = data.filter(cat =>
        categories.includes(Number(cat.idCategoria))
      );
      setCategoriasFiltradas(catf);
    };

    fetchCategories();
  }, [categories]);

  return (
    <div className="container-fluid text-dark py-5">
      {categoriasFiltradas.map((cat) => (
        <CategoryCarousel
          key={cat.idCategoria}
          category={cat}
        />
      ))}
    </div>
  );
};