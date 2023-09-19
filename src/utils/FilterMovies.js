const filterMovies = (allMovies, searchString, isShortFilm) => {
  let filеredMovies = [];
  if (isShortFilm) {
    filеredMovies = allMovies.filter(
      movie =>
        (movie.nameRU.toLowerCase().trim().includes(searchString.toLowerCase()) ||
          movie.nameRU.toLowerCase().trim().includes(searchString.toLowerCase())) &&
        isShortFilm === movie.duration <= 40
    );
  } else {
    filеredMovies = allMovies.filter(
      movie =>
        movie.nameRU.toLowerCase().trim().includes(searchString.toLowerCase()) ||
        movie.nameRU.toLowerCase().trim().includes(searchString.toLowerCase())
    );
  }
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
