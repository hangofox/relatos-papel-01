import { CategoriaModel } from '../models/generalModel';

const API_URL = import.meta.env.VITE_API_URL;

export const Categorias = async () => {
  try {
    const response = await fetch(`${API_URL}catalogue/categorias/lista`);
    const data = await response.json();

  

    return data.map(cateogria => ({
      ...CategoriaModel,
      ...cateogria
    }));


  } catch (error) {
    console.log(error);
    return [];
  }
}