/**
 * Creado por: Gabby Zapata
 * Modificado por: Maria Parraga, David Paez
 * Fecha: 2025-12-29
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
        {/* 1. Logo y Nombre */}
        <RBNavbar.Brand as={Link} to="/" className="d-flex align-items-center text-light">
          <img
            src="/relatos/img/logo.png"
            alt="Logo"
            width="50"
            className="d-inline-block align-text-top me-2"
          />
          Librería Relatos de Papel
        </RBNavbar.Brand>

        {/* CONTENEDOR DE ICONOS PARA MÓVIL (Orden visual) */}
        <div className="d-flex align-items-center order-lg-last">
          {/* 2. Carrito (FUERA del Collapse) */}
          <Nav.Link
            as={Link}
            to="/shopping"
            onClick={() => setActiveMenu('CAR')}
            className="position-relative text-light me-3"
          >
            <i className="bi bi-cart-fill" style={{ fontSize: '1.5rem' }}></i>
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

          {/* 3. Botón hamburguesa */}
          <RBNavbar.Toggle aria-controls="navbarSupportedContent" />
        </div>

        {/* 4. Contenedor colapsable (Solo lo que quieres que se oculte) */}
        <RBNavbar.Collapse id="navbarSupportedContent">
          <Form className="me-auto mt-2 mt-lg-0" onSubmit={handleSearch}>
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
            <Nav.Link as={Link} to="/" active={activeMenu === 'INI'} onClick={() => setActiveMenu('INI')}>
              Inicio
            </Nav.Link>

            <NavDropdown title="Categorías" id="navbarDarkDropdownMenuLink" menuVariant="dark">
              {Categories.map((item, index) => (
                <NavDropdown.Item className='small' key={index} as={Link} to={`/category/${item.id_category}`}>
                  {item.name_category}
                </NavDropdown.Item>
              ))}
            </NavDropdown>
          </Nav>
        </RBNavbar.Collapse>
      </Container>
    </RBNavbar>
  );
};