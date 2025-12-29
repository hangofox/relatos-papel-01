import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
/* Hace scroll hacia arriba automáticamente cuando se cambia de página y da efecto al devolverse */
export const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    }); 
  }, [pathname]);           
  return null;
};
//prueba