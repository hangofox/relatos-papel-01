const API_URL = import.meta.env.VITE_API_URL;
const IMG_URL = import.meta.env.VITE_IMG_URL;

const ventaExistente = async (idUsuario) => {
  try {
    const response = await fetch(`${API_URL}payments/ventas/ingresada/usuario/${idUsuario}`);
    let venta = await response.json();

    if (response.status === 404) {
      return null;
    }

    return venta;

  } catch (error) {
    console.log(error);
    return null;
  }
};

const ventaIngresadaXUsuario = async (idUsuario) => {
  try {
    let venta = await ventaExistente(idUsuario);

    if (venta === null) {
      venta = await crearVenta(idUsuario);
    }

    return venta.idVenta;

  } catch (error) {
    console.log(error);
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
        "precioUnitarioLibro": libro.precioLibro,
        "tituloLibro": libro.tituloLibro,
        "codigoImagen": libro.codigoImagen,
        "modalidad": libro.modalidad,
        "estadoProductoFacturado": "ACTIVO"
      })
    });

    if (!res.ok) {
      return false;
    }
  }

  return true;

};

export const ListarItemsCarrito = async (idUsuario) => {
  try {
    const idVenta = await ventaIngresadaXUsuario(idUsuario);
    if (idVenta) {
      const response = await fetch(`${API_URL}payments/productos/${idVenta}`);
      if (response.ok) {
        const detalles = await response.json();
        if (detalles) {
          return detalles.map(item => ({
            ...item,
            imgUrl: IMG_URL.replace("IMAGENRPL", item.codigoImagen)
          })
          );
        }
      }
    }
    return [];
  } catch (error) {
    console.log(error);
    return [];
  }


};

export const CuantosItems = async (idUsuario) => {
  try {
    const response = await fetch(`${API_URL}payments/ventas/cuantositems/usuario/${idUsuario}`);

    if (!response.ok) {
      throw new Error("Error en la petición");
    }

    const cuantos = await response.json();
    return cuantos;

  } catch (error) {
    console.log(error);
    return null;
  }
};

export const Usuario = async (idUsuario) => {
  try {
    const response = await fetch(`${API_URL}payments/usuarios/${idUsuario}`);
    if (!response.ok) {
      throw new Error("Error en la petición");
    }

    const usuario = await response.json();
    return usuario;

  } catch (error) {
    console.log(error);
    return null;
  }

};

export const ActualizaCantidad = async (idProductoFacturado, cantidad) => {
  try {

    const response = await fetch(`${API_URL}payments/productos/${idProductoFacturado}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        "cantidadItem": cantidad
      })
    });

    if (response.ok) {
      return true;
    }

    return false;

  } catch (error) {
    console.log(error);
    return false;
  }
};

export const EliminaProducto = async (idProductoFacturado) => {
  try {
    const response = await fetch(`${API_URL}payments/productos/${idProductoFacturado}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" }
    });

    if (response.ok) {
      return true;
    }

    return false;

  } catch (error) {
    console.log(error);
    return false;
  }
};

export const ActualizaEstadoVenta = async (idUsuario) => {
  try {
    const venta = await ventaExistente(idUsuario);

    if (venta !== null) {
      const response = await fetch(`${API_URL}payments/ventas/${venta.idVenta}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          "estadoVenta": "PAGADA"
        })
      });

      if (response.ok) {
        return true;
      }
    }

    return false;

  } catch (error) {
    console.log(error);
    return false;
  }
};