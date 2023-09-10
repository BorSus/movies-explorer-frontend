import React from 'react';
import SectoinTitle from '../SectoinTitle/SectoinTitle';
import photo from '../../images/photo.jpg';
import { Link } from 'react-router-dom';
function AboutMe() {
  return (
    <section className='about-me'>
      <SectoinTitle text='Студент' id='about-me' />
      <div className='about-me__info'>
        <div className='about-me__description'>
          <p className='about-me__name'>Борис</p>
          <p className='about-me__profession'>Фронтенд-разработчик, 32 года</p>
          <p className='about-me__characteristic'>
            Я живу в деревне Сабурово, закончил факультет прикладной информатики и математики. У
            меня есть жена и дочь.Я их очень люблю. Я работаю инженером в области радиоэлектронки.
            Учеба в яндекс практикуме я начал, для того , чтобы создавать веб-интерфейс для
            радио-модемов.
          </p>
          <Link to='https://github.com/BorSus' className='about-me__github-link' target='_blank'>
            Github
          </Link>
        </div>
        <img src={photo} alt='Фотография' className='about-me__photo' />
      </div>
    </section>
  );
}
export default AboutMe;
