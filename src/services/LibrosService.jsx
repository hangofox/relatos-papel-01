/**
 * Creado por: Gabriela Zapata
 * Fecha: 2026-02-19
 * Service de libros
 */
import { LibroModel } from '../models/generalModel';

//Se coloca en una variable la BASE URL y BASE IMG del environment
const API_URL = import.meta.env.VITE_API_URL;
const IMG_URL = import.meta.env.VITE_IMG_URL;

//Función que trae todos los libros
export const Libros = async () => {
  try {
    const response = await fetch(`${API_URL}catalogue/libros/lista`);
    const data = await response.json();

    const dataMap = data.map(libro => {
      return transformaLibro(libro);
    });

    return dataMap;

  } catch (error) {
    console.log(error);
    return [];
  }
};

//Función que trae un solo libro por el ID
export const Libro = async (idLibro) => {
  try {
    const response = await fetch(`${API_URL}catalogue/libros/${idLibro}`);
    const libro = await response.json();

    return transformaLibro(libro.libroDTO);

  } catch (error) {
    console.log(error);
    return null;
  }
};

//Función que transforma el objeto del libro en lo que se necesita para consumir los datos
const transformaLibro = (libro) => {
  if (!libro) return null;

  const { autorDTO, categorias, nombreArchivoImagenLibro, ...rest } = libro;

  const imgUrl = IMG_URL.replace("IMAGENRPL", nombreArchivoImagenLibro);

  return {
    ...LibroModel,
    ...rest,
    categorias: buildCategorias(categorias),
    codigoImagen: nombreArchivoImagenLibro,
    nombreArchivoImagenLibro: imgUrl,
    autor: buildAutor(autorDTO)
  };
};

//Función que cambia el DTO del autor para obtener nombre y apellido en una sola línea
const buildAutor = (autorDTO) => {
  if (!autorDTO) return "";
  return `${autorDTO.nombresAutor ?? ""} ${autorDTO.primerApellidoAutor ?? ""
    } ${autorDTO.segundoApellidoAutor ?? ""
    }`.replace(/\s+/g, " ").trim();
};

//Función que cambia el DTO de categorías para tener todas en una sola línea
const buildCategorias = (categorias) => {
  if (!Array.isArray(categorias) || categorias.length === 0) {
    return "";
  }

  return categorias
    .map(cat => cat.nombreCategoria)
    .filter(Boolean)
    .join(", ");
};

//Función que busca los libros
export const BuscarLibros = async (searchText) => {
  try {
    const params = new URLSearchParams({ keyword: searchText, estadoLibro: 'VISIBLE' });
    const response = await fetch(`${API_URL}catalogue/libros?${params}`);

    const data = await response.json();

    const dataMap = data.content.map(libro => {
      return transformaLibro(libro);
    });

    return dataMap;

  } catch (error) {
    console.log(error);
    return [];
  }
};

//Función que trae los libros por categoría
export const LibrosPorCategoria = async (idCategoria) => {
  const response = await fetch(`${API_URL}catalogue/librosxcategorias/categoria/${idCategoria}`);
  console.log(response.status);
  if (response.status === 200) {
    const data = await response.json();

    const dataMap = data.librosxCategoriasDTO
      .map(libro => libro.libroDTO)
      .filter(libro => libro !== null)
      .map(libro => transformaLibro(libro));

    return dataMap;
  }

  return [];

};