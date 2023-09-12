import React from 'react';
import logo from '../../images/logo.svg';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Navigation from '../Navigation/Navigation';
function Header({ isLoggedIn, handleMobileMenuClick }) {
  const navigate = useNavigate();
  const location = useLocation();
  function handleLogoClick() {
    navigate('/');
  }
  function handleLoginClick() {
    navigate('/signin');
  }

  return (
    <header className={`header ${location.pathname === '/' ? `header_main` : ''}`}>
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
      {isLoggedIn && (
        <div
          className={`header__burger-menu  ${
            location.pathname === '/' ? `header__burger-menu_main` : ''
          }`}
          onClick={handleMobileMenuClick}
        >
          <span
            className={`header__burger-line  ${
              location.pathname === '/' ? `header__burger-line_main` : ''
            }`}
          ></span>
        </div>
      )}
    </header>
  );
}
export default Header;
