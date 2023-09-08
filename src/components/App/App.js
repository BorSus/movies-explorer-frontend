import React, { useState } from 'react';
import { Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom';

import '../../index.css';
// import components
import Header from '../Header/Header';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import Footer from '../Footer/Footer';
import Profile from '../Profile/Profile';
import Register from '../Register/Register';
import Login from '../Login/Login';
import PageNotFound from '../PageNotFound/PageNotFound';
import SavedMovies from '../SavedMovies/SavedMovies';
function App() {
  const location = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const wrapRoutes =
    location.pathname === '/' ||
    location.pathname === '/movies' ||
    location.pathname === '/saved-movies';
  function handleExiteClick() {
    console.log('Вы вышли из аккаунта');
    setIsLoggedIn(false);
  }
  function handleEnterClick() {
    console.log('Вы авторизованы');
    setIsLoggedIn(true);
  }
  return (
    <>
      {(wrapRoutes || location.pathname === '/profile') && <Header isLoggedIn={isLoggedIn} />}

      <Routes>
        <Route path='/' element={<Main />} />
        <Route path='/movies' element={<Movies />} />
        <Route path='/saved-movies' element={<SavedMovies />} />
        <Route
          path='/profile'
          element={
            <Profile
              user={{ name: 'Борис', email: 'boris@mail.ru' }}
              onExiteClick={handleExiteClick}
            />
          }
        />
        <Route path='/signin' element={<Login onEnterClick={handleEnterClick} />} />
        <Route path='/signup' element={<Register />} />
        <Route path='*' element={<PageNotFound code='404' info='Страница не найдена' />} />
      </Routes>
      {wrapRoutes && <Footer />}
    </>
  );
}

export default App;
