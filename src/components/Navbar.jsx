import { useState } from 'react';
import { Link } from 'react-router-dom';

export const Navbar = () => {
  //Estado para controlar el colapso del menú
  const [isNavCollapsed, setIsNavCollapsed] = useState(true);
  //Controlar qué menú está activo
  const [activeMenu, setActiveMenu] = useState('INI');

  //Handler para indicar el colapso del menú
  const handleNavCollapse = () => setIsNavCollapsed(!isNavCollapsed);
  //Función que implementa las dos funciones para el menú
  const handleMenu = (collapsed, idMenu) =>{
    setActiveMenu(idMenu);
    setIsNavCollapsed(collapsed);
  }

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <img
          src="/img/logo.png"
          alt="Logo"
          width="50"
          className="d-inline-block align-text-top me-2"
        />
        <Link className="navbar-brand" to="/">Librería Relatos de Papel</Link>
        
        {/* Botón Toggler: agregamos el evento onClick */}
        <button 
          className="navbar-toggler" 
          type="button" 
          aria-controls="navbarSupportedContent" 
          aria-expanded={!isNavCollapsed ? true : false} 
          aria-label="Toggle navigation"
          onClick={handleNavCollapse}
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Contenedor colapsable: manejamos la clase 'show' condicionalmente */}
        <div className={`${isNavCollapsed ? 'collapse' : ''} navbar-collapse`} id="navbarSupportedContent">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className={activeMenu === 'INI' ? "nav-link active" : "nav-link"} to="/" onClick={() => handleMenu(true, 'INI')}>Inicio</Link>
            </li>
            <li className="nav-item">
              <Link className={activeMenu === 'BUS' ? "nav-link active" : "nav-link"} to="/search" onClick={() => handleMenu(true, 'BUS')}>Búsqueda</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" href="#">
                <img src="/img/shoppincart.png" width="25" alt="Shopping-cart" />
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}