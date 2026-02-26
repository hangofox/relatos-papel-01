/**
 * Creado por: Gabriela Zapata
 * Fecha: 2026-02-19
 * Service de categorías
 */

import { CategoriaModel } from '../models/generalModel';

//Se coloca en una variable la BASE URL del environment
const API_URL = import.meta.env.VITE_API_URL;

//Función que trae las categorías
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