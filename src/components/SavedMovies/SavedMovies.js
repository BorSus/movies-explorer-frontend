import React from 'react';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import { testCards } from '../../utils/constants.js';

function SavedMovies({ handleSearchClick }) {
  const savedCards = testCards.filter(cardItem => cardItem.saved === true);
  return (
    <section className='saved-movies'>
      <SearchForm handleSearchClick={handleSearchClick} />
      <MoviesCardList cards={savedCards} />
    </section>
  );
}
export default SavedMovies;
