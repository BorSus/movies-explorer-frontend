import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';

import '../../index.css';
import Header from '../Header/Header';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import Footer from '../Footer/Footer';
import Profile from '../Profile/Profile';
import Register from '../Register/Register';
import Login from '../Login/Login';
import PageNotFound from '../PageNotFound/PageNotFound';
import SavedMovies from '../SavedMovies/SavedMovies';
import MobileNavigation from '../MobileNavigation/MobileNavigation';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import { api } from '../../utils/MainApi.js';
import { CurrentUserContext } from '../../contexts/CurrentUserContext.js';

function App() {
  const location = useLocation();
  const navigate = useNavigate();
  //  переменная состояния = авторизированный пользователь
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  //  переменная состояния = данные пользователя
  const [currentUser, setСurrentUser] = useState({});
  //  переменная состояния = сохраненные фильмы пользователя
  const [savedMovies, setSavedMovies] = useState([]);
  //  переменная состояния = статус активности MobileMenu
  const [isMobileMenuActive, setIsMobileMenuActive] = useState(false);
  // переменная состояния = все фильмы

  const wrapRoutes =
    location.pathname === '/' ||
    location.pathname === '/movies' ||
    location.pathname === '/saved-movies';

  //Функция проверки корректности токена, получение данный пользователя.
  async function checkToken(location) {
    try {
      setСurrentUser(await api.getUserMe());
      setSavedMovies(await api.getSavedMovies());
      setIsLoggedIn(true);
      navigate(location);
    } catch (error) {
      setIsLoggedIn(false);
      console.error(`Ошибка при проверки корректности токена: ${error}`);
    } finally {
      console.info('Проверки корректности токена-завершено');
    }
  }
  //Проверка токена при загрузке
  useEffect(() => {
    checkToken(location.pathname);
    //eslint-disable-next-line
  }, []);

  function handleMobileMenuClick() {
    setIsMobileMenuActive(!isMobileMenuActive);
  }

  async function updateSavedMovies(save, movie) {
    save
      ? setSavedMovies([movie, ...savedMovies])
      : setSavedMovies(state => state.filter(stateMovie => stateMovie !== movie));
    // const response = await api.getSavedMovies();
    // setSavedMovies(response);
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      {(wrapRoutes || location.pathname === '/profile') && (
        <Header isLoggedIn={isLoggedIn} handleMobileMenuClick={handleMobileMenuClick} />
      )}
      <Routes>
        <Route path='/' element={<Main />} />
        <Route
          path='/movies'
          element={
            <ProtectedRoute
              isLoggedIn={isLoggedIn}
              element={<Movies savedMovies={savedMovies} updateSavedMovies={updateSavedMovies} />}
            />
          }
        />
        <Route
          path='/saved-movies'
          element={
            <ProtectedRoute
              isLoggedIn={isLoggedIn}
              element={
                <SavedMovies savedMovies={savedMovies} updateSavedMovies={updateSavedMovies} />
              }
            />
          }
        />
        <Route
          path='/profile'
          element={
            <ProtectedRoute isLoggedIn={isLoggedIn} element={<Profile checkToken={checkToken} />} />
          }
        />
        <Route
          path='/signin'
          element={
            isLoggedIn ? (
              <PageNotFound
                code='403'
                info='Доступ запрещен, пожалуйста выйдете из аккаунта, для повторной авторизации'
              />
            ) : (
              <Login checkToken={checkToken} />
            )
          }
        />
        <Route
          path='/signup'
          element={
            isLoggedIn ? (
              <PageNotFound
                code='403'
                info='Доступ запрещен, пожалуйста выйдете из аккаунта, если хотите зарегистрировать новый аккаунт'
              />
            ) : (
              <Register checkToken={checkToken} />
            )
          }
        />
        <Route path='*' element={<PageNotFound code='404' info='Страница не найдена' />} />
      </Routes>
      {wrapRoutes && <Footer />}
      <MobileNavigation
        isMobileMenuActive={isMobileMenuActive}
        onCloseClick={handleMobileMenuClick}
      />
    </CurrentUserContext.Provider>
  );
}

export default App;
