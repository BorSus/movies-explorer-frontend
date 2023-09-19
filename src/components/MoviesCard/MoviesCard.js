import React, { useState, useContext, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import delImg from '../../images/del-img.svg';
import { api } from '../../utils/MainApi.js';
function MoviesCard({ card, savedMovies, updateSavedMovies }) {
  const locatioin = useLocation();
  const [isSaved, setIsSaved] = useState(savedMovies.some(movie => movie.movieId === card.id));
  const imageSrc = card.image.url ? `https://api.nomoreparties.co${card.image.url}` : card.image;
  const duration = `${Math.floor(card.duration / 60)}ч${card.duration % 60}м`;
  const thumbnail = card.image.url
    ? `https://api.nomoreparties.co${card.image.formats.thumbnail.url}`
    : card.thumbnail;

  // async function updateSavedMovies() {
  //   const response = await api.getSavedMovies();
  //   setSavedMovies(response);
  //   setIsSaved(response.some(movie => movie.movieId === card.id));
  // }
  async function handleOnClickSave() {
    try {
      await api.postMovie({
        country: card.country,
        director: card.director,
        duration: card.duration,
        year: card.year,
        description: card.description,
        image: imageSrc,
        trailerLink: card.trailerLink,
        thumbnail: thumbnail,
        movieId: card.id,
        nameRU: card.nameRU,
        nameEN: card.nameEN
      });
      await updateSavedMovies();
      setIsSaved(true);
    } catch {
      alert('Не удалось сохранить фильм');
    } finally {
    }
  }
  async function handleOnClickDelete() {
    try {
      const deleteMovie = savedMovies.find(movie => movie.movieId === card.id);
      await api.deleteMovie(deleteMovie._id);
      setIsSaved(false);
      await updateSavedMovies();
    } catch {
      alert('Не удалось удалить фильм');
    } finally {
    }
  }
  async function deleteSavedMovieClick() {
    try {
      await api.deleteMovie(card._id);
      await updateSavedMovies();
    } catch {
      alert('Не удалось удалить фильм');
    } finally {
    }
  }
  function onCardClick() {
    window.open(card.trailerLink, '_blank');
  }

  return (
    <li className='movies-card'>
      <img className='movies-card__img' src={imageSrc} alt={card.nameRU} onClick={onCardClick} />
      <div className='movies-card__info'>
        <p className='movies-card__name'>{card.nameRU}</p>
        {locatioin.pathname === '/movies' ? (
          <button
            className={`movies-card__save ${isSaved && `movies-card__save_true`}`}
            onClick={isSaved ? handleOnClickDelete : handleOnClickSave}
          ></button>
        ) : (
          <img
            src={delImg}
            alt='иконка удалить'
            className='movies-card__delete'
            onClick={deleteSavedMovieClick}
          />
        )}
      </div>
      <p className='movies-card__duration'>{duration}</p>
    </li>
  );
}
export default MoviesCard;
