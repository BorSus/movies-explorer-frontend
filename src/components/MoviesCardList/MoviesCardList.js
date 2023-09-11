import React from 'react';
import MoviesCard from '../MoviesCard/MoviesCard';

function MoviesCardList({ cards }) {
  return (
    <>
      <ul className='movies-card-list'>
        {cards.map(cardItem => (
          <MoviesCard card={cardItem} key={cardItem.id} />
        ))}
      </ul>
    </>
  );
}
export default MoviesCardList;
