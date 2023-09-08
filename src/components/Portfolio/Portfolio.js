import React from 'react';
import { Link } from 'react-router-dom';
import imgLink from '../../images/link-arrow.svg';
function Portfolio({}) {
  return (
    <section className='portfolio'>
      <p className='portfolio__title'>Портфолио</p>
      <div className='portfolio__project-list'>
        <Link
          to='https://github.com/BorSus/how-to-learn'
          className='portfolio__project-link'
          target='_blank'
        >
          Статичный сайт
          <img src={imgLink} alt='' className='portfolio__link-img' />
        </Link>
        <Link
          to='https://borsus.github.io/russian-travel/'
          className='portfolio__project-link'
          target='_blank'
        >
          Адаптивный сайт
          <img src={imgLink} alt='' className='portfolio__link-img' />
        </Link>
        <Link
          to='https://borsus.github.io/mesto-react/'
          className='portfolio__project-link'
          target='_blank'
        >
          Одностраничное приложение <img src={imgLink} alt='' className='portfolio__link-img' />
        </Link>
      </div>
    </section>
  );
}
export default Portfolio;
