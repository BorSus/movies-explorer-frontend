import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import delImg from '../../images/del-img.svg';
function MoviesCard({ card }) {
  const [isSavedMovie, setIsSavedMovie] = useState(card.saved);
  function handlerOnClickSave() {
    setIsSavedMovie(!isSavedMovie);
  }
  const locatioin = useLocation();
  return (
    <li className='movies-card'>
      <img className='movies-card__img' src={card.image} alt={card.nameRU} />
      <div className='movies-card__info'>
        <p className='movies-card__name'>{card.nameRU}</p>
        {locatioin.pathname === '/movies' ? (
          <button
            className={`movies-card__save ${isSavedMovie && `movies-card__save_true`}`}
            onClick={handlerOnClickSave}
          ></button>
        ) : (
          <img src={delImg} alt='иконка удалить' className='movies-card__delete' />
        )}
      </div>
      <p className='movies-card__duration'>{card.duration}</p>
    </li>
  );
}
export default MoviesCard;
