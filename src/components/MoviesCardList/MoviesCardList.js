import React from 'react';
import MoviesCard from '../MoviesCard/MoviesCard';

function MoviesCardList({ cards }) {
  return (
    <>
      <section className='moviesCardList'>
        {cards.map(cardItem => (
          <MoviesCard card={cardItem} key={cardItem.id} />
        ))}
      </section>
    </>
  );
}
export default MoviesCardList;
