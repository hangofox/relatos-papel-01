import { LibroModel } from '../models/generalModel';

const API_URL = import.meta.env.VITE_API_URL;

export const Libros = async () => {
  try {
    const response = await fetch(`${API_URL}catalogue/libros/todos`);
    const data = await response.json();

    const dataMap = data.map(libro => {
      return transformaLibro(libro);
    });

    return dataMap;

  } catch (error) {
    console.error("Error:", error);
    return [];
  }
};

export const Libro = async (idLibro) => {
  try {
    const response = await fetch(`${API_URL}catalogue/libros/${idLibro}`);
    const libro = await response.json();

    return transformaLibro(libro.libroDTO);

  } catch (error) {
    console.error("Error:", error);
    return null;
  }
};

const transformaLibro = (libro) => {
  if (!libro) return null;

  const { autorDTO, categorias, nombreArchivoImagenLibro, ...rest } = libro;

  return {
    ...LibroModel,
    ...rest,
    categorias: buildCategorias(categorias),
    nombreArchivoImagenLibro: `http://books.google.com/books/content?id=${nombreArchivoImagenLibro}&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api`,
    autor: buildAutor(autorDTO)
  };
};

const buildAutor = (autorDTO) => {
  if (!autorDTO) return "";
  return `${autorDTO.nombresAutor ?? ""} ${autorDTO.primerApellidoAutor ?? ""
    } ${autorDTO.segundoApellidoAutor ?? ""
    }`.replace(/\s+/g, " ").trim();
};

const buildCategorias = (categorias) => {
  if (!Array.isArray(categorias) || categorias.length === 0) {
    return "";
  }

  return categorias
    .map(cat => cat.nombreCategoria)
    .filter(Boolean)
    .join(", ");
};