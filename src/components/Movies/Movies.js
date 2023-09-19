import React, { useState, useEffect } from 'react';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Preloader from '../Preloader/Preloader';
import { apiMovies } from '../../utils/MoviesApi.js';
import CustomError from '../../utils/CustomError.js';
import { filterMovies, saveLocalStorage } from '../../utils/FilterMovies.js';
function Movies({ savedMovies, updateSavedMovies }) {
  // фильмы для отрисовки карточек
  const [moviesCards, setMoviesCards] = useState([]);
  // индикатор прелоадера
  const [isLoading, setIsLoading] = useState(false);
  // фильтр короткометражек
  const [isShortFilm, setIsShortFilm] = useState(null);
  // информационное сообщение
  const [infoMessage, setInfoMessage] = useState('');
  // значение поисковой строки
  const [searchInput, setSearchInput] = useState('');
  // сколлько карточек и по сколько загружать
  const [cardsSettings, setCardSettings] = useState({
    total: null,
    more: null
  });
  const [showCards, setShowCards] = useState(null);
  // Обработчик изменения значения поиска
  function handleChangeInput(e) {
    setSearchInput(e.target.value);
  }

  async function handleSearchClick() {
    try {
      if (!searchInput) {
        throw new CustomError('Нужно ввести ключевое слово');
      }
      setIsLoading(true);
      setInfoMessage('Идет поиск');
      const allMovies = await apiMovies.getAllMovies();
      const filteredMovies = filterMovies(allMovies, searchInput, isShortFilm);
      if (filteredMovies.length === 0) {
        throw new CustomError('Ничего не найдено');
      }
      setInfoMessage('');
      setMoviesCards(filteredMovies);
      saveLocalStorage(filteredMovies, searchInput, isShortFilm);
      setShowCards(cardsSettings.total);
    } catch (error) {
      if (error.message === 'Нужно ввести ключевое слово') {
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
  useEffect(() => {
    const localStorageData = JSON.parse(localStorage.getItem('filеredMovies'));
    if (!localStorageData) {
      setIsShortFilm(false);
      setInfoMessage('Нужно ввести ключевое слово');
    } else {
      setMoviesCards(localStorageData.filtеredMovies);
      setIsShortFilm(localStorageData.isShortFilm);
      setSearchInput(localStorageData.searchString);
    }
  }, []);

  useEffect(() => {
    handleSearchClick();
  }, [isShortFilm]);

  //Функция проверки размера ширины
  // контрольные точки настроены на FireFox
  useEffect(() => {
    function handleResize() {
      const width = window.innerWidth;
      if (width >= 1280) {
        setCardSettings({
          total: 16,
          more: 4
        });
      } else if (width >= 990 && width <= 1279) {
        setCardSettings({
          total: 12,
          more: 3
        });
      } else if (width >= 768 && width <= 989) {
        setCardSettings({
          total: 8,
          more: 2
        });
      } else if (width <= 767) {
        setCardSettings({
          total: 5,
          more: 2
        });
      }
    }
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  function handleMoreClick() {
    setShowCards(showCards + cardsSettings.more);
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
          showCards={showCards}
          savedMovies={savedMovies}
          updateSavedMovies={updateSavedMovies}
        />
      )}

      {isLoading && <Preloader />}
      {moviesCards.length > showCards && (
        <button className='movies__button' onClick={handleMoreClick}>
          Ещё
        </button>
      )}
    </main>
  );
}
export default Movies;
