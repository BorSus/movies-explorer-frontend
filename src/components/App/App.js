import React, { useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';

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
import MobileNavigation from '../MobileNavigation/MobileNavigation';
import ErrorServer from '../ErrorServer/ErrorServer';
function App() {
  const location = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isMobileMenuActive, setIsMobileMenuActive] = useState(false);
  const [isErrorServerOpen, setErrorServerOpen] = useState(false);
  const wrapRoutes =
    location.pathname === '/' ||
    location.pathname === '/movies' ||
    location.pathname === '/saved-movies';
  function handleMobileMenuClick() {
    setIsMobileMenuActive(!isMobileMenuActive);
  }

  function handleExiteClick() {
    setIsLoggedIn(false);
  }
  function handleEnterClick() {
    setIsLoggedIn(true);
  }
  function handleSearchClick() {
    setErrorServerOpen(true);
  }
  function handleCloseErrorServer() {
    setErrorServerOpen(false);
  }
  return (
    <>
      {(wrapRoutes || location.pathname === '/profile') && (
        <Header isLoggedIn={isLoggedIn} handleMobileMenuClick={handleMobileMenuClick} />
      )}

      <Routes>
        <Route path='/' element={<Main />} />
        <Route path='/movies' element={<Movies handleSearchClick={handleSearchClick} />} />
        <Route
          path='/saved-movies'
          element={<SavedMovies handleSearchClick={handleSearchClick} />}
        />
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
      <MobileNavigation
        isMobileMenuActive={isMobileMenuActive}
        onCloseClick={handleMobileMenuClick}
      />
      <ErrorServer
        message='Сервер временно не доступен'
        isErrorServerOpen={isErrorServerOpen}
        handleCloseErrorServer={handleCloseErrorServer}
      />
    </>
  );
}

export default App;
