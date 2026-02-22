/**
 * Creado por: Gabby Zapata
 * Modificado por: Maria Parraga, David Paez
 * Fecha: 2025-12-29
 * Descripción: Componente que contiene la vista de toda la aplicación y el manejo de rutas que renderiza solo la parte central
 * Contiene el Navbar, el Main que es el que se renderiza con las rutas y el Footer
 * @returns componente Viewport
 */

import { Routes, Route } from 'react-router-dom';
import { Home, Search, BookPage, ShoppingCartPage, PaymentMethodPage, CreditCardPage, OrderConfirmationPage, CategoriesPage } from './Pages';
import { Navbar, Footer, ScrollToTop, LayerWelcome } from '../components/Components';
import { useState, useEffect } from 'react';
export const Viewport = () => {
  /*const [pausa, setPausa] = useState(true);

  useEffect(() => {
    // Temporizador de 5 segundos
    const timer = setTimeout(() => {
      setPausa(false);
    }, 5000);

    // Limpieza del temporizador
    return () => clearTimeout(timer);
  }, []);

  //Si la pausa está activa aparece el LayerWelcome
  if (pausa) {
    return <LayerWelcome aparece={pausa} />;
  }*/

  //Cuando la pausa se desactiva aparece la página
  return (
    <>
      <Navbar />
      <ScrollToTop />
      {/* El contenido entre Navbar y Footer cambia según la URL */}
      <main>
        <Routes>
          <Route path="/" element={<Home categories={[1, 2, 3]} />} />
          <Route path="/search" element={<Search />} />
          <Route path="/book/:id" element={<BookPage />} />
          <Route path="/category/:id" element={<CategoriesPage />} />
          <Route path="/shopping" element={<ShoppingCartPage />} />
          <Route path="/payment-method" element={<PaymentMethodPage />} />
          <Route path="/credit-card-payment" element={<CreditCardPage />} />
          <Route path="/order-confirmation" element={<OrderConfirmationPage />} />
          {/* Ruta por defecto si el usuario se pierde */}
          <Route path="*" element={<h1>404 - No encontrado</h1>} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}