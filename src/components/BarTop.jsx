export const BarTop = () => {
  return (
    <div className="row barra gx-0 w-100">
      <div className="col-6 back-black text-white">
        <div className="mt-4 mb-2 fw-bold">Recomendaciones personalizadas</div>
        <div className="mb-2"><img src="/img/libreria.png" height="60" alt="Libros" /></div>
      </div>
      <div className="col-6 back-blue text-dark">
        <div className="mt-4 mb-2 fw-bold">Comunidad de lectores</div>
        <div className="mb-2"><img src="/img/comunidad.png" height="60" alt="Libros" /></div>
      </div>
    </div>
  );
}