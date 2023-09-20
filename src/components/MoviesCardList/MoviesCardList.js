import React from 'react';
import MoviesCard from '../MoviesCard/MoviesCard';
function MoviesCardList({ moviesCards, showCards, savedMovies, updateSavedMovies }) {
  return (
    <>
      <ul className='movies-card-list'>
        {moviesCards.slice(0, showCards).map(cardItem => (
          <MoviesCard
            card={cardItem}
            key={cardItem.id || cardItem.movieId}
            savedMovies={savedMovies}
            updateSavedMovies={updateSavedMovies}
          />
        ))}
      </ul>
    </>
  );
}
export default MoviesCardList;
