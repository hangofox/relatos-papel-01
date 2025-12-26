/**
 * Creado por: Gabby Zapata
 * Fecha: 2025-12-24
 * Descripción: Componente que se coloca debajo del Navbar en la página de búsqueda, donde se colocan los campos para la búsqueda de libros.
 * Despliega un contenedor con fondo negro, dentro tiene una fila (row) con 3 columnas (col), en cada columna se despliega un campo
 * @returns componente BarTopSearc
 */

import { useState } from "react";

export const BarTopSearch = () => {

  const[autor, setAutor] = useState("");
  const[categoria, setCategoria] = useState("");

  return (
    <div className="barra back-black">
      <div className="row p-5">
        <div className="col">
          <input type="text" className="field form-control" name="text_query" id="text_query" placeholder="Buscar por título" />
        </div>
        <div className="col">
          <select 
            className="field form-select" 
            name="id_autor" 
            id="id_autor"
            value={autor}
            onChange={(e) => setAutor(e.target.value)}
            >
            <option value="">Todos los autores</option>
            <option value="1">One</option>
            <option value="2">Two</option>
            <option value="3">Three</option>
          </select>
        </div>
        <div className="col">
          <select 
            className="field form-select" 
            name="id_categoria" 
            id="id_categoria"
            value={categoria}
            onChange={(e) => setCategoria(e.target.value)}
          >
            <option value="">Todas las categorias</option>
            <option value="1">One</option>
            <option value="2">Two</option>
            <option value="3">Three</option>
          </select>
        </div>
      </div>
    </div>
  );
}