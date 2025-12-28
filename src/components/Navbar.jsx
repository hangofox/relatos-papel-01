/**
 * Creado por: Gabby Zapata
 * Fecha: 2025-12-24
 * Descripción: Componente que contiene el Navbar con el logo, el nombre de la página y el menú de la aplicación
 * Contiene el objeto nav configurado con el framework de Bootstrap
 * @returns componente Navbar
 */

import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Categories } from '../data/Data';
import 'bootstrap-icons/font/bootstrap-icons.css';

// Importaciones de React-Bootstrap
import { Navbar as RBNavbar, Nav, NavDropdown, Container, Form, Button } from 'react-bootstrap';

export const Navbar = () => {
  // Solo necesitamos el estado para el menú activo
  const [activeMenu, setActiveMenu] = useState('INI');

  return (
    <RBNavbar expand="lg" className="bg-body-tertiary">
      <Container fluid>
        {/* Logo y Nombre */}
        <RBNavbar.Brand as={Link} to="/" className="d-flex align-items-center">
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
          
          {/* Formulario de búsqueda */}
          <Form className="d-flex me-auto">
            <Form.Control
              type="search"
              placeholder="Buscar"
              className="me-1 field"
              aria-label="Search"
            />
            <Button className='button-blue' variant="outline-primary">Buscar</Button>
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
                  to={`/category/${item.id_category}`}
                >
                  {item.name_category}
                </NavDropdown.Item>
              ))}
            </NavDropdown>

            {/* Carrito */}
            <Nav.Link as={Link} to="/shopping" onClick={() => setActiveMenu('CAR')}>
              <i className="bi bi-cart-fill"></i>
            </Nav.Link>
          </Nav>
        </RBNavbar.Collapse>
      </Container>
    </RBNavbar>
  );
};