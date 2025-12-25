import React from 'react';
import { useParams } from 'react-router-dom';
import { Books } from '../data/Data';

export const BookPage = () => {
  const { id } = useParams();

  const book = Books.find((item) => item.id_book === Number(id));

  return (
    <div className="mt-5">
      <div className="row justify-content-center">
        <div className="col-auto p-4 rounded-border back-gray">
          <img src={book.img_url} height="250" alt="" />
        </div>
        <div className='col-auto'></div>
        <div className="col-6 p-4 rounded-border back-gray text-dark">
          <h3>{ book.title }</h3><br />
          <span className='small'>
            <b>Autor:</b> { book.author } | 
            <b>Categoría:</b> { book.id_category } | 
            <b>Año publicación:</b> { book.publication_year }
          </span><br />
          <p className='mt-2'>
            { book.synopsis }
          </p>
        </div>
      </div>
    </div>
  );
}