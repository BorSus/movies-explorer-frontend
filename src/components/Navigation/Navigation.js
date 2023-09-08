import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import MobileNavigation from '../MobileNavigation/MobileNavigation';
function Navigation() {
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
      <nav className='navigation'>
        <Link
          to='/movies'
          className={`navigation__link 
        ${location.pathname === '/movies' && `navigation__link_active`}
        ${location.pathname === '/' && `navigation__link_main`}
        `}
        >
          Фильмы
        </Link>
        <Link
          to='/saved-movies'
          className={`navigation__link 
        ${location.pathname === '/saved-movies' && `navigation__link_active`}
        ${location.pathname === '/' && `navigation__link_main`}
        `}
        >
          Сохранённые фильмы
        </Link>
      </nav>
      <button className='navigation__profile' onClick={handleProfileClick}>
        Аккаунт
      </button>
      <div
        className={`navigation__mobile-icon ${isMobileMenuActive && `active`}`}
        onClick={handleMobileMenuClick}
      >
        <span></span>
      </div>
      {/* isMobileMenuActive && <MobileNavigation /> */}
    </>
  );
}
export default Navigation;
