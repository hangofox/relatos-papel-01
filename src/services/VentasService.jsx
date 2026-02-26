/**
 * Creado por: Gabriela Zapata
 * Fecha: 2026-02-19
 * Service de ventas y productos facturados
 */

//Se coloca en una variable la BASE URL y BASE IMG del environment
const API_URL = import.meta.env.VITE_API_URL;
const IMG_URL = import.meta.env.VITE_IMG_URL;

//Función que devuelve la venta existente
const ventaExistente = async (idUsuario) => {
  try {
    const response = await fetch(`${API_URL}payments/ventas/ingresada/usuario/${idUsuario}`);
    let venta = await response.json();

    if (response.status === 404) {
      return null;
    }

    if(response.status === 200){
      return venta;
    }

    return null;    

  } catch (error) {
    console.log('Venta no existe');
    return null;
  }
};

//Función que devuelve la venta existente
const ventaIngresadaXUsuario = async (idUsuario) => {
  let idVenta;
  let response = await ventaExistente(idUsuario);

  if (response === null) {
    response = await crearVenta(idUsuario);
    if (response !== null || response.status === 200) {
      idVenta = response.idCreated;
    }
  } else {
    idVenta = response.idVenta;
  }
  return idVenta;
};

//Función que crea la venta
const crearVenta = async (idUsuario) => {
  try {
    const nroOrden1 = numeroRandom(10000, 90000);
    const nroOrden2 = numeroRandom(3525, 9810);
    const response = await fetch(`${API_URL}payments/ventas`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        "idUsuario": idUsuario,
        "numeroOrden": nroOrden1 + '-' + nroOrden2,
        "costoEnvio": 0,
        "estadoVenta": "INGRESADA"
      })
    });

    console.log(response.status);

    if (!response.ok) {
      console.log('Error al crear una venta' + response.message);
      return null;
    }

    const venta = await response.json();

    return venta;

  } catch (error) {
    console.log('No se pudo crear la venta');
    return null;
  }
};

//Función que ingresa el libro al detalle de la venta
export const IngresaLibroCarrito = async (libro, idUsuario, cantidad) => {
  const idVenta = await ventaIngresadaXUsuario(idUsuario);

  if (idVenta) {
    console.log("Si hay venta, procede a crear producto" + idVenta);
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
      console.log('No se pudo crear producto 😭');
      return false;
    }
    return true;
  } else {
    console.log('No se pudo crear la venta 😭');
    return false;
  }

};

//Función que retorna la lista todos los ítems del carrito
export const ListarItemsCarrito = async (idUsuario) => {
  try {
    const venta = await ventaExistente(idUsuario);
    if (venta !== null) {
      const response = await fetch(`${API_URL}payments/productos/${venta.idVenta}`);
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
    console.log("Error listar ítems carrito " + error);
    return [];
  }


};

//Función que trae cuántos ítems tiene la venta por usuario
export const CuantosItems = async (idUsuario) => {
  try {
    const response = await fetch(`${API_URL}payments/ventas/cuantositems/usuario/${idUsuario}`);

    if (!response.ok) {
      throw new Error("Error en la petición");
    }

    const cuantos = await response.json();
    return cuantos;

  } catch (error) {
    console.log("Error al sacar cuantos ítems " + error);
    return null;
  }
};

//Función que retorna los datos del usuario
export const Usuario = async (idUsuario) => {
  try {
    const response = await fetch(`${API_URL}payments/usuarios/${idUsuario}`);
    if (!response.ok) {
      throw new Error("Error en la petición");
    }

    const usuario = await response.json();
    return usuario;

  } catch (error) {
    console.log("Error al sacar info del usuario " + error);
    return null;
  }

};

//Función que actualiza la cantidad de cada ítem
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
    console.log("Error al actualizar la cantidad " + error);
    return false;
  }
};

//Función que elimina el producto del carrito
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
    console.log("Error al eliminar " + error);
    return false;
  }
};

//Función que marca la venta como pagada
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
    console.log("Error al actualizar la venta " + error);
    return false;
  }
};

//Función para obtener un número randómico para el número de orden
const numeroRandom = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};