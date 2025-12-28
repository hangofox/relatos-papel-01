/**
 * Creado por: Gabby Zapata
 * Fecha: 2025-12-24
 * Descripción: Componente que contiene la información de cada libro que se visualiza en el carrusel
 * Despliega
 * @returns componente BookCard
*/

export const BookCard = ({ book }) => {
  return (
    <div className="card h-100 border-0 bg-transparent text-light">
      <img
        src={book.img_url}
        className="card-img-top rounded shadow-sm"
        alt={book.title}
        style={{ aspectRatio: '2/3', objectFit: 'cover' }}
      />
      <div className="card-body px-0 py-2">
        <h6 className="card-title text-dark mb-0 text-truncate" title={book.title}>{book.title}</h6>
        <p className="card-text small text-secondary">{book.author}</p>
      </div>
    </div>
  );
}