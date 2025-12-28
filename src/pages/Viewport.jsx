/**
 * Creado por: Gabby Zapata
 * Fecha: 2025-12-24
 * Descripción: Componente que contiene la vista de toda la aplicación y el manejo de rutas que renderiza solo la parte central
 * Contiene el Navbar, el Main que es el que se renderiza con las rutas y el Footer
 * @returns componente Viewport
 */

import { Routes, Route } from 'react-router-dom';
import { Home, Search, BookPage, ShoppingCartPage } from './Pages';
import { Navbar, Footer } from '../components/Components';

export const Viewport = () => {
  return (
    <>
      <Navbar />
      {/* El contenido entre Navbar y Footer cambia según la URL */}
      <main>
        <Routes>
          <Route path="/" element={<Home categories={[3,4,5]} />} />
          <Route path="/search" element={<Search />} />
          <Route path="/book/:id" element={<BookPage />} />
          <Route path="/shopping" element={<ShoppingCartPage />} />
          {/* Ruta por defecto si el usuario se pierde */}
          <Route path="*" element={<h1>404 - No encontrado</h1>} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}