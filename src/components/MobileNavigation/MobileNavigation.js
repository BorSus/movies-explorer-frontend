import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Popup from '../Popup/Popup';
function MobileNavigation({ isMobileMenuActive, onCloseClick }) {
  const location = useLocation();
  const navigate = useNavigate();
  function handleProfileClick() {
    navigate('/profile');
  }
  return (
    <Popup isOpenPopup={isMobileMenuActive} onCloseClick={onCloseClick}>
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
    </Popup>
  );
}
export default MobileNavigation;
