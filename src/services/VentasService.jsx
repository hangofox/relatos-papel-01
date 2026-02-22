import { Libro } from "./LibrosService";

const API_URL = import.meta.env.VITE_API_URL;

const ventaIngresadaXUsuario = async (idUsuario) => {
  try {
    const response = await fetch(`${API_URL}payments/ventas/ingresada/usuario/${idUsuario}`);
    let venta = await response.json();

    if (response.status === 404) {
      venta = await crearVenta(idUsuario);
    }

    return venta.idVenta;

  } catch (error) {
    alert(error);
    return null;
  }
};

const crearVenta = async (idUsuario) => {
  const res = await fetch(`${API_URL}payments/ventas`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      "idUsuario": idUsuario,
      "numeroOrden": "457878",
      "costoEnvio": 0,
      "estadoVenta": "INGRESADA"
    })
  });

  if (!res.ok) {
    throw new Error(res.message);
  }

  return res.json();
};

export const IngresaLibroCarrito = async (libro, idUsuario, cantidad) => {
  const idVenta = await ventaIngresadaXUsuario(idUsuario);

  if (idVenta) {
    const res = await fetch(`${API_URL}payments/productos`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        "idVenta": idVenta,
        "idLibro": libro.idLibro,
        "cantidadItem": cantidad,
        "precioUnitarioLibro": libro.precioUnitarioLibro,
        "estadoProductoFacturado": "ACTIVO"
      })
    });

    if (!res.ok) {
      throw new Error(res.message);
    }
  }

  return true;

};

export const ListarItemsCarrito = async (idUsuario) => {
  try {
    const idVenta = await ventaIngresadaXUsuario(idUsuario);

    if (idVenta) {
      const response = await fetch(`${API_URL}payments/productos/${idVenta}`);
      const detalles = await response.json();
      if(detalles){
       const productos = detalles.map(async producto =>{
        const libro = await Libro(producto.idLibro);
        producto.tituloLibro = libro.tituloLibro;
        return producto;
       });
       return productos;
      }
      return null;
    }
  } catch (error) {
    alert(error);
  }


};