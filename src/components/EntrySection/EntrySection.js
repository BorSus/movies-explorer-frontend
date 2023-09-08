import React from 'react';
import logo from '../../images/logo.svg';
import { Link, useNavigate } from 'react-router-dom';

function EntrySection({ title, submit, linkInfo, link, path, children, handleSubmit }) {
  const navigate = useNavigate();
  function handleLogoClick() {
    navigate('/');
  }
  return (
    <section className='entry-section'>
      <img src={logo} alt='Логотип' className='entry-section__logo' onClick={handleLogoClick} />
      <p className='entry-section__title'>{title}</p>
      <form className='entry-section__form'>{children}</form>
      <button className='entry-section__submit' type='submit' onClick={handleSubmit}>
        {submit}
      </button>
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
