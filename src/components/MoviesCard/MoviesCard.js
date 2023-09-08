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
    <div className='moviesCard'>
      <img className='moviesCard__img' src={card.image} alt='' />
      <div className='moviesCard__info'>
        <p className='moviesCard__name'>{card.nameRU}</p>
        {locatioin.pathname === '/movies' ? (
          <button
            className={`moviesCard__save ${isSavedMovie && `moviesCard__save_true`}`}
            onClick={handlerOnClickSave}
          ></button>
        ) : (
          <img src={delImg} className='moviesCard__delete' />
        )}
      </div>
      <p className='moviesCard__duration'>{card.duration}</p>
    </div>
  );
}
export default MoviesCard;
