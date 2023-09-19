import React, { useState, useEffect } from 'react';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import { filterMovies } from '../../utils/FilterMovies.js';
import CustomError from '../../utils/CustomError.js';
function SavedMovies({ savedMovies, updateSavedMovies }) {
  //  переменная состояния значения поисковой строки
  const [searchInput, setSearchInput] = useState('');
  const [isShortFilm, setIsShortFilm] = useState(false);
  const [infoMessage, setInfoMessage] = useState('');
  // фильмы для отрисовки карточек
  const [moviesCards, setMoviesCards] = useState(savedMovies);

  async function handleSearchClick() {
    try {
      if (!searchInput) {
        setMoviesCards(savedMovies);
      }
      const filteredMovies = filterMovies(savedMovies, searchInput, isShortFilm);
      if (filteredMovies.length === 0) {
        throw new CustomError('Ничего не найдено');
      }
      setInfoMessage('');
      setMoviesCards(filteredMovies);
    } catch (error) {
      if (error.message === 'Ничего не найдено') {
        setInfoMessage(error.message);
        return;
      }
      setInfoMessage(
        'Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз'
      );
    } finally {
    }
  }
  function handleChangeInput(e) {
    setSearchInput(e.target.value);
  }

  function handleFilterCheckboxClick() {
    setIsShortFilm(!isShortFilm);
  }

  useEffect(() => {
    handleSearchClick();
  }, [isShortFilm, savedMovies]);

  return (
    <section className='saved-movies'>
      <SearchForm
        handleSearchClick={handleSearchClick}
        isShortFilm={isShortFilm}
        handleFilterCheckboxClick={handleFilterCheckboxClick}
        handleChangeInput={handleChangeInput}
        searchInput={searchInput}
      />
      {infoMessage ? (
        <p className='movies__not-found'>{infoMessage}</p>
      ) : (
        <MoviesCardList
          moviesCards={moviesCards}
          savedMovies={savedMovies}
          updateSavedMovies={updateSavedMovies}
        />
      )}
    </section>
  );
}
export default SavedMovies;
