const filterMovies = (allMovies, searchString, isShortFilm) => {
  let filеredMovies = [];

  filеredMovies = allMovies.filter(movie =>
    isShortFilm
      ? (movie.nameRU.toLowerCase().trim().includes(searchString.toLowerCase()) ||
          movie.nameRU.toLowerCase().trim().includes(searchString.toLowerCase())) &&
        movie.duration <= 40
      : movie.nameRU.toLowerCase().trim().includes(searchString.toLowerCase()) ||
        movie.nameRU.toLowerCase().trim().includes(searchString.toLowerCase())
  );
  return filеredMovies;
};
const saveLocalStorage = (filtеredMovies, searchString, isShortFilm) => {
  localStorage.setItem(
    'filеredMovies',
    JSON.stringify({
      filtеredMovies: filtеredMovies,
      searchString: searchString,
      isShortFilm: isShortFilm
    })
  );
};

export { filterMovies, saveLocalStorage };
