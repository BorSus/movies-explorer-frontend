import React from 'react';
function Footer({}) {
  return (
    <footer className='footer'>
      <p className='footer__text'>Учебный проект Яндекс.Практикум х BeatFilm.</p>
      <div className='footer__info'>
        <p className='footer__copyright'>© 2020</p>
        <ul className='footer__list-link'>
          <li className='footer__link'>Яндекс.Практикум</li>
          <li className='footer__link'>Github</li>
        </ul>
      </div>
    </footer>
  );
}
export default Footer;
