/**
 * Creado por: Gabby Zapata
 * Modificado por: Hernan Nuñez
 * Fecha: 2025-12-27
 * Descripción: Componente que contiene el Navbar con el logo, el nombre de la página y el menú de la aplicación
 * Contiene el objeto nav configurado con el framework de Bootstrap
 * @returns componente Navbar
 */

import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Categories } from '../data/Data';
import { useCart } from '../context/CartContext';
import 'bootstrap-icons/font/bootstrap-icons.css';

// Importaciones de React-Bootstrap
import { Navbar as RBNavbar, Nav, NavDropdown, Container, Form, Button, Badge } from 'react-bootstrap';

export const Navbar = () => {
  // Solo necesitamos el estado para el menú activo
  const [activeMenu, setActiveMenu] = useState('INI');
  // Estado para el texto de búsqueda
  const [searchQuery, setSearchQuery] = useState('');
  // Obtener el total de items del carrito
  const { getTotalItems } = useCart();
  const totalItems = getTotalItems();
  // Navigate para la búsqueda
  const navigate = useNavigate();

  // Manejar búsqueda
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
    } else {
      navigate('/search');
    }
  };

  return (
    <RBNavbar expand="lg" className="custom-navbar bg-body-tertiary">
      <Container fluid>
        {/* Logo y Nombre */}
        <RBNavbar.Brand as={Link} to="/" className="d-flex align-items-center text-light">
          <img
            src="/img/logo.png"
            alt="Logo Relatos de Papel"
            width="50"
            className="d-inline-block align-text-top me-2"
          />
          Librería Relatos de Papel
        </RBNavbar.Brand>

        {/* Botón hamburguesa automático */}
        <RBNavbar.Toggle aria-controls="navbarSupportedContent" />

        {/* Contenedor colapsable */}
        <RBNavbar.Collapse id="navbarSupportedContent">
                  
          
         
          <Form className="me-auto w-auto" onSubmit={handleSearch}>
            <div className="position-relative">
              <Form.Control
                type="search"
                placeholder="Buscar por titulo..."
                aria-label="Buscar"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="search-input-small pe-5"
              />
              {/* Lupa a la derecha, clickeable */}
              <button
                type="submit"
                className="search-icon-btn"
                aria-label="Buscar"
                title="Buscar"
              >
                <i className="bi bi-search"></i>
              </button>
            </div>
          </Form>


          <Nav className="ms-auto">
            {/* Inicio con 'as={Link}' para mantener la navegación de react-router */}
            <Nav.Link 
              as={Link} 
              to="/" 
              active={activeMenu === 'INI'}
              onClick={() => setActiveMenu('INI')}
            >
              Inicio
            </Nav.Link>

            {/* Dropdown dinámico desde el array Categories */}
            <NavDropdown 
              title="Categorías" 
              id="navbarDarkDropdownMenuLink"
              active={activeMenu === 'CAT'}
              onClick={() => setActiveMenu('CAT')}
              menuVariant="dark"
            >
              {Categories.map((item, index) => (
                <NavDropdown.Item 
                  key={index} 
                  as={Link} 
                  className='small'
                  to={`/category/${item.id_category}`}
                >
                  {item.name_category}
                </NavDropdown.Item>
              ))}
            </NavDropdown>

            {/* Carrito */}
            <Nav.Link as={Link} to="/shopping" onClick={() => setActiveMenu('CAR')} className="position-relative">
              <i className="bi bi-cart-fill"></i>
              {totalItems > 0 && (
                <Badge
                  bg="danger"
                  pill
                  className="position-absolute top-0 start-100 translate-middle"
                  style={{ fontSize: '0.7rem' }}
                >
                  {totalItems}
                </Badge>
              )}
            </Nav.Link>
          </Nav>
        </RBNavbar.Collapse>
      </Container>
    </RBNavbar>
  );
};