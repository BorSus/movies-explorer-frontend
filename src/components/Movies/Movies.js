import React, { useState, useEffect } from 'react';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Preloader from '../Preloader/Preloader';
import CustomError from '../../utils/CustomError.js';
import { widthScreenPoint, paramsCardsForWidth } from '../../utils/constants.js';
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
  // переменная состояния запроса к серверу
  const [isLoading, setIsLoading] = useState(false);
  // информационное сообщение
  const [infoMessage, setInfoMessage] = useState(null);
  // сколько карточек и по сколько загружать
  const [paramsRenderCards, setParamsRenderCards] = useState({});
  const [amountRenderCards, setAmountRenderCards] = useState(0);
  // Обработчик изменения значения поиска
  function handleChangeInput(e) {
    setSearchInput(e.target.value);
  }
  //
  async function handleSearchClick() {
    try {
      let filteredMovies = [];
      if (!searchInput) {
        throw new CustomError('Введите ключевое слово для поиска фильмов');
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
      setAmountRenderCards(paramsRenderCards.initial);
      setMoviesCards(filteredMovies);
      saveLocalStorage(filteredMovies, searchInput, isShortFilm);
    } catch (error) {
      if (error.message === 'Введите ключевое слово для поиска фильмов') {
        setInfoMessage(error.message);
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
      if (width >= widthScreenPoint.desctop) {
        setAmountRenderCards(paramsCardsForWidth.desctop.initial);
        setParamsRenderCards(paramsCardsForWidth.desctop);
      } else if (width >= widthScreenPoint.tablet && width < widthScreenPoint.desctop) {
        setAmountRenderCards(paramsCardsForWidth.notebook.initial);
        setParamsRenderCards(paramsCardsForWidth.notebook);
      } else if (width >= widthScreenPoint.mobile && width < widthScreenPoint.tablet) {
        setAmountRenderCards(paramsCardsForWidth.tablet.initial);
        setParamsRenderCards(paramsCardsForWidth.tablet);
      } else if (width < widthScreenPoint.mobile) {
        setAmountRenderCards(paramsCardsForWidth.mobile.initial);
        setParamsRenderCards(paramsCardsForWidth.mobile);
      }
    }
    handleResize();
    window.addEventListener('resize', handleResize);
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
    setAmountRenderCards(amountRenderCards + paramsRenderCards.count);
  }
  return (
    <main className='movies'>
      <SearchForm
        handleSearchClick={handleSearchClick}
        isShortFilm={isShortFilm}
        handleFilterCheckboxClick={handleFilterCheckboxClick}
        handleChangeInput={handleChangeInput}
        searchInput={searchInput}
        isLoading={isLoading}
      />
      {infoMessage ? (
        <p className='movies__not-found'>{infoMessage}</p>
      ) : (
        <MoviesCardList
          moviesCards={moviesCards}
          showCards={amountRenderCards}
          savedMovies={savedMovies}
          updateSavedMovies={updateSavedMovies}
        />
      )}

      {isLoading && <Preloader />}
      {moviesCards.length > amountRenderCards && !infoMessage && (
        <button className='movies__button' onClick={handleMoreClick}>
          Ещё
        </button>
      )}
    </main>
  );
}
export default Movies;
