import React from 'react';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import { testCards } from '../../utils/constants.js';
function Movies({}) {
  return (
    <section className='movies'>
      <SearchForm />
      <MoviesCardList cards={testCards} />
      <button className='movies__button'>Ещё</button>
    </section>
  );
}
export default Movies;
