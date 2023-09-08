import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
function MobileNavigation() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isMobileMenuActive, setIsMobileMenuActive] = useState(false);
  function handleMobileMenuClick() {
    setIsMobileMenuActive(!isMobileMenuActive);
  }
  function handleProfileClick() {
    navigate('/profile');
  }
  return (
    <>
      <div
        className={`mobile-navigation__burger ${isMobileMenuActive && `active`}`}
        onClick={handleMobileMenuClick}
      >
        <span></span>
      </div>
      <nav className='mobile-navigation'>
        <div className='mobile-navigation__links'>
          <Link
            to='/'
            className={`mobile-navigation__link 
        ${location.pathname === '/' && `mobile-navigation__link_active`}
        `}
          >
            Главная
          </Link>
          <Link
            to='/movies'
            className={`mobile-navigation__link 
        ${location.pathname === '/movies' && `mobile-navigation__link_active`}
        `}
          >
            Фильмы
          </Link>
          <Link
            to='/saved-movies'
            className={`mobile-navigation__link 
        ${location.pathname === '/saved-movies' && `mobile-navigation__link_active`}
        `}
          >
            Сохранённые фильмы
          </Link>
        </div>
        <button className='mobile-navigation__profile' onClick={handleProfileClick}>
          Аккаунт
        </button>
      </nav>
    </>
  );
}
export default MobileNavigation;
