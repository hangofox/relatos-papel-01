import { LibroPorCategoriaModel } from '../models/generalModel';

const API_URL = import.meta.env.VITE_API_URL;

export const LibroPorCategoria = async () => {
  try {
    const response = await fetch(`${API_URL}catalogue/categorias/lista`);
    const data = await response.json();

    return data.map(libroxcategoria => ({
      ...LibroPorCategoriaModel,
      ...libroxcategoria
    }));


  } catch (error) {
    console.error("Error:", error);
    return [];
  }
}