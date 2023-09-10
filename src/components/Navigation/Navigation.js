import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

function Navigation() {
  const location = useLocation();
  const navigate = useNavigate();

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
    </>
  );
}
export default Navigation;
