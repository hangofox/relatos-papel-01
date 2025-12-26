/**
 * Creado por: Gabby Zapata
 * Fecha: 2025-12-24
 * Descripción: Componente que contiene la página inicial
 * Contiene el carrusel, que se despliega con diferentes categorías
 * @returns componente Home
 */

import { Carrousel, BarTop } from '../components/Components';

export const Home = () => {
  return (
    <>
      <BarTop />
      <div className='mx-3'>
        <Carrousel 
          categories={[3,4,5]}
        />
      </div>
    </>
  );
}