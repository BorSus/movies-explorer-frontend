import React from 'react';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import { testCards } from '../../utils/constants.js';

function SavedMovies({}) {
  const savedCards = testCards.filter(cardItem => cardItem.saved === true);
  return (
    <section className='saved-movies'>
      <SearchForm />
      <MoviesCardList cards={savedCards} />
    </section>
  );
}
export default SavedMovies;
