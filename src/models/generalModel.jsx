export const LibroModel = {
  idLibro: null,
  autor: null,
  categorias: "",
  tituloLbro: "",
  fechaPublicacionLibro: "",
  sinopsisLibro: "",
  codigoIsbnLibro: "",
  precioLibro: 0,
  formatoLibro: "",
  nombreArchivoImagenLibro: "",
  estadoLibro: ""
};

export const CategoriaModel = {
  idCategoria: "",
  nombreCategoria: ""
};

export const InventarioModel = {
  idInventario: null,
  idLibro: null,
  tipoMovimiento: "",
  fechaInventario: "",
  cantidadInventario: 0
};

export const LibroPorCategoriaModel = {
  idLibroXCategoria: null,
  idLibro: null,
  idCategoria: null
};

export const VentaModel = {
  idVenta: null,
  idUsuario: null,
  numeroOrden: "",
  fechaVenta: "",
  porcentajeDescuento: 0,
  costoEnvio: 0,
  estadoVenta: ""
};

export const ProductoFacturadoModel = {
  idProductoFacturado: null,
  idVenta: null,
  idLibro: null,
  cantidadItem: "",
  precioUnitarioLibro: "",
  estadoProductoFacturado: ""
};