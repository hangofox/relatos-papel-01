import { LibroModel } from '../models/generalModel';

const API_URL = import.meta.env.VITE_API_URL;
const IMG_URL = import.meta.env.VITE_IMG_URL;

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

export const BuscarLibros = async (searchText) => {
  try {
    const params = new URLSearchParams({ keyword: searchText });
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

export const LibrosPorCategoria = async (idCategoria) => {
  try {
    const response = await fetch(`${API_URL}catalogue/librosxcategorias/categoria/${idCategoria}`);
    const data = await response.json();

    const dataMap = data.librosxCategoriasDTO
      .map(libro => libro.libroDTO)
      .filter(libro => libro !== null)
      .map(libro => transformaLibro(libro));

    return dataMap;

  } catch (error) {
    console.log(error);
    return [];
  }
};