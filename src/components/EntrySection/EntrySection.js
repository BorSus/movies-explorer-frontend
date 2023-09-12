import React from 'react';
import logo from '../../images/logo.svg';
import { Link, useNavigate } from 'react-router-dom';
function EntrySection({ title, linkInfo, link, path, children }) {
  const navigate = useNavigate();
  function handleLogoClick() {
    navigate('/');
  }
  return (
    <section className='entry-section'>
      <img src={logo} alt='Логотип' className='entry-section__logo' onClick={handleLogoClick} />
      <h1 className='entry-section__title'>{title}</h1>
      <form className='entry-section__form'>{children}</form>
      <span className='entry-section__link-info'>
        {linkInfo}
        <Link to={path} className='entry-section__link'>
          {link}
        </Link>
      </span>
    </section>
  );
}
export default EntrySection;
