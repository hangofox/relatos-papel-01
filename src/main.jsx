/**
 * Creado por: Gabby Zapata
 * Modificado por: Hernan Nuñez
 * Fecha: 2025-12-27
 * Descripción: Startup de la aplicación
 */

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom' // Importamos el Router
import { Viewport } from './pages/Viewport'
import { CartProvider } from './context/CartContext'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <CartProvider>
      <BrowserRouter basename='/relatos'>
        <Viewport />
      </BrowserRouter>
    </CartProvider>
  </StrictMode>,
)