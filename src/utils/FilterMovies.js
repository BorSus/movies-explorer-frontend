import { shortFilmDuration } from './constants.js';
const filterMovies = (allMovies, searchString, isShortFilm) => {
  let filtеredMovies = [];

  filtеredMovies = allMovies.filter(movie =>
    isShortFilm
      ? (movie.nameRU.toLowerCase().trim().includes(searchString.toLowerCase()) ||
          movie.nameRU.toLowerCase().trim().includes(searchString.toLowerCase())) &&
        movie.duration <= shortFilmDuration
      : movie.nameRU.toLowerCase().trim().includes(searchString.toLowerCase()) ||
        movie.nameRU.toLowerCase().trim().includes(searchString.toLowerCase())
  );
  return filtеredMovies;
};
const saveLocalStorage = (filtеredMovies, searchString, isShortFilm) => {
  localStorage.setItem('foundMovies', JSON.stringify(filtеredMovies));
  localStorage.setItem('searchString', JSON.stringify(searchString));
  localStorage.setItem('isShortFilm', JSON.stringify(isShortFilm));
};

export { filterMovies, saveLocalStorage };
