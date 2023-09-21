import React, { useState, useEffect } from 'react';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Preloader from '../Preloader/Preloader';
import CustomError from '../../utils/CustomError.js';
import { apiMovies } from '../../utils/MoviesApi.js';
import { filterMovies, saveLocalStorage } from '../../utils/FilterMovies.js';
function Movies({ savedMovies, updateSavedMovies }) {
  const [allMovies, setAllMovies] = useState([]);
  // фильмы для отрисовки карточек
  const [moviesCards, setMoviesCards] = useState(
    JSON.parse(localStorage.getItem('foundMovies')) || []
  );
  // фильтр короткометражек
  const [isShortFilm, setIsShortFilm] = useState(
    JSON.parse(localStorage.getItem('isShortFilm')) || false
  );
  // значение поисковой строки
  const [searchInput, setSearchInput] = useState(
    JSON.parse(localStorage.getItem('searchString')) || ''
  );
  // индикатор прелоадера
  const [isLoading, setIsLoading] = useState(false);
  // информационное сообщение
  const [infoMessage, setInfoMessage] = useState(null);
  // сколько карточек и по сколько загружать
  const [countShowCards, setСountShowCards] = useState(0);
  const [moreShowCards, setMoreShowCards] = useState(0);

  // Обработчик изменения значения поиска
  function handleChangeInput(e) {
    setSearchInput(e.target.value);
  }
  async function handleSearchClick() {
    try {
      let filteredMovies = [];
      if (!searchInput) {
        throw new CustomError('no search word');
      }
      setIsLoading(true);
      setInfoMessage('Идет поиск');
      if (allMovies.length === 0) {
        const response = await apiMovies.getAllMovies();
        setAllMovies(response);
        filteredMovies = filterMovies(response, searchInput, isShortFilm);
      } else {
        filteredMovies = filterMovies(allMovies, searchInput, isShortFilm);
      }
      if (filteredMovies.length === 0) {
        throw new CustomError('Ничего не найдено');
      }
      setInfoMessage('');
      setMoviesCards(filteredMovies);
      saveLocalStorage(filteredMovies, searchInput, isShortFilm);
    } catch (error) {
      if (error.message === 'no search word') {
        setInfoMessage('Введите ключевое слово для поиска фильмов');
        return;
      }
      if (error.message === 'Ничего не найдено') {
        setInfoMessage(error.message);
        return;
      }
      setInfoMessage(
        'Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз'
      );
    } finally {
      setIsLoading(false);
    }
  }
  function handleFilterCheckboxClick() {
    setIsShortFilm(!isShortFilm);
  }
  //Функция проверки размера ширины
  // контрольные точки настроены на FireFox
  useEffect(() => {
    function handleResize() {
      const width = window.innerWidth;
      if (width >= 1280) {
        setСountShowCards(16);
        setMoreShowCards(4);
      } else if (width >= 990 && width <= 1279) {
        setСountShowCards(12);
        setMoreShowCards(3);
      } else if (width >= 768 && width <= 989) {
        setСountShowCards(8);
        setMoreShowCards(2);
      } else if (width <= 767) {
        setСountShowCards(5);
        setMoreShowCards(2);
      }
    }
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (infoMessage === null) {
      setInfoMessage('');
    } else if (moviesCards.length > 0) {
      handleSearchClick();
    }
    //eslint-disable-next-line
  }, [isShortFilm]);

  function handleMoreClick() {
    setСountShowCards(countShowCards + moreShowCards);
  }

  return (
    <main className='movies'>
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
          showCards={countShowCards}
          savedMovies={savedMovies}
          updateSavedMovies={updateSavedMovies}
        />
      )}

      {isLoading && <Preloader />}
      {moviesCards.length > countShowCards && (
        <button className='movies__button' onClick={handleMoreClick}>
          Ещё
        </button>
      )}
    </main>
  );
}
export default Movies;
