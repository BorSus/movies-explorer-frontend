import React, { useState } from 'react';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Preloader from '../Preloader/Preloader';
import { testCards } from '../../utils/constants.js';

function Movies({ handleSearchClick }) {
  const [isLoading, setIsLoading] = useState(false);
  function handleMoreClick() {
    setIsLoading(!isLoading);
  }
  const isNullSearch = testCards.length > 0;
  return (
    <main className='movies'>
      <SearchForm handleSearchClick={handleSearchClick} />
      {isNullSearch ? (
        <MoviesCardList cards={testCards} />
      ) : (
        <p className='movies__not-found'>По вашему запросу ничего не найдено</p>
      )}

      {isLoading && <Preloader />}
      <button className='movies__button' onClick={handleMoreClick}>
        Ещё
      </button>
    </main>
  );
}
export default Movies;
