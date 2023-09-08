import React, { useState } from 'react';
import logo from '../../images/logo.svg';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Navigation from '../Navigation/Navigation';
function Header({ isLoggedIn }) {
  const navigate = useNavigate();
  const location = useLocation();
  function handleLogoClick() {
    navigate('/');
  }
  function handleLoginClick() {
    navigate('/signin');
  }

  return (
    <header className={`header ${location.pathname === '/' && `header_main`}`}>
      <img src={logo} alt='Логотип' className='header__logo' onClick={handleLogoClick} />
      <div className='header__control'>
        {!isLoggedIn && (
          <>
            <Link to='/signup' className='header__link'>
              Регистрация
            </Link>
            <button className='header__login' onClick={handleLoginClick}>
              Войти
            </button>
          </>
        )}
      </div>
      {isLoggedIn && <Navigation />}
    </header>
  );
}
export default Header;
